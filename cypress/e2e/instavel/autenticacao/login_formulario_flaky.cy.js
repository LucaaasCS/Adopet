describe('Login flaky', () => {
  const aleatorio = Math.random() < 0.5;

  beforeEach(() => {
    cy.abrirLogin();
  });

  it('cenarioLoginFormularioFlaky', () => {
    cy.window().then((win) => {
      cy.stub(win, 'fetch').callsFake(() => {
        const statusCode = aleatorio ? 200 : 401;
        const body = aleatorio
          ? { token: 'token-flaky', user: { name: 'Lucas' } }
          : { message: 'Credenciais inválidas' };

        return Promise.resolve(
          new win.Response(JSON.stringify(body), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' },
          })
        );
      });
    });

    cy.preencherFormularioLogin('lucas@example.com', 'Secret123!');
    cy.getByStableSelector('submitButton').click();

    cy.window().then((win) => {
      return win.fetch().then((response) => {
        const statusEsperado = aleatorio ? 200 : 401;
        expect(response.status).to.eq(statusEsperado);
      });
    });
  });
});
