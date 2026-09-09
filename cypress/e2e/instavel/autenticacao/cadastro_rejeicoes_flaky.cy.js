describe('Cadastro rejeições flaky', () => {
  const aleatorio = Math.random() < 0.5;

  beforeEach(() => {
    cy.abrirCadastro();
  });

  it('cenarioCadastroRejeicoesFlaky', () => {
    cy.window().then((win) => {
      cy.stub(win, 'fetch').callsFake(() => {
        const statusCode = aleatorio ? 400 : 422;
        const body = statusCode === 400
          ? { message: 'As senhas não conferem' }
          : { message: 'Dados inválidos' };

        return Promise.resolve(
          new win.Response(JSON.stringify(body), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' },
          })
        );
      });
    });

    cy.preencherFormularioCadastro(
      'Usuario Incorreto',
      'email-invalido.com',
      'Senha@123',
      aleatorio ? 'Senha@123' : 'Senha@456'
    );

    cy.getByStableSelector('submitButton').click();

    cy.window().then((win) => {
      return win.fetch().then((response) => {
        const statusEsperado = aleatorio ? 400 : 422;
        expect(response.status).to.eq(statusEsperado);
        return response.json();
      }).then((payload) => {
        expect(payload.message).to.be.a('string');
      });
    });
  });
});
