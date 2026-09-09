describe('Cadastro flaky', () => {
  const aleatorio = Math.random() < 0.5;

  beforeEach(() => {
    cy.abrirCadastro();
  });

  it('cenarioCadastroUsuarioFlaky', () => {
    cy.window().then((win) => {
      cy.stub(win, 'fetch').callsFake(() => {
        const statusCode = aleatorio ? 201 : 400;
        const body = aleatorio
          ? { id: 101, name: 'Usuario Flaky', email: 'flaky.user@example.com' }
          : { message: 'As senhas não conferem' };

        return Promise.resolve(
          new win.Response(JSON.stringify(body), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' },
          })
        );
      });
    });

    cy.preencherFormularioCadastro(
      'Usuario Flaky',
      'flaky.user@example.com',
      'Senha@123',
      aleatorio ? 'Senha@123' : 'Senha@456'
    );

    cy.getByStableSelector('submitButton').click();

    cy.window().then((win) => {
      return win.fetch().then((response) => {
        const statusEsperado = aleatorio ? 201 : 400;
        expect(response.status).to.eq(statusEsperado);
      });
    });
  });
});
