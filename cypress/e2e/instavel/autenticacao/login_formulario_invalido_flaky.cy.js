describe('Login inválido flaky', () => {
  const aleatorio = Math.random() < 0.5;

  beforeEach(() => {
    cy.abrirLogin();
  });

  it('cenarioLoginFormularioInvalidoFlaky', () => {
    cy.window().then((win) => {
      cy.stub(win, 'fetch').callsFake(() => {
        const statusCode = aleatorio ? 401 : 500;
        const body = statusCode === 401
          ? { message: 'Credenciais inválidas' }
          : { message: 'Erro interno do servidor' };

        return Promise.resolve(
          new win.Response(JSON.stringify(body), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' },
          })
        );
      });
    });

    cy.preencherFormularioLogin('usuario@invalido.com', 'SenhaErrada@123');
    cy.getByStableSelector('submitButton').click();

    cy.window().then((win) => {
      return win.fetch().then((response) => {
        const statusEsperado = aleatorio ? 401 : 500;
        expect(response.status).to.eq(statusEsperado);
        return response.json();
      }).then((payload) => {
        expect(payload.message).to.be.a('string');
      });
    });
  });
});
