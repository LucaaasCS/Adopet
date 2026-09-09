describe('Mensagem flaky', () => {
  const deveFalhar = Math.random() < 0.5;

  it('cenarioMensagemEnvioFlaky', () => {
    cy.visit('https://adopet-frontend-cypress.vercel.app/login');

    cy.window().then((win) => {
      cy.stub(win, 'fetch').callsFake(() => {
        const statusCode = deveFalhar ? 500 : 201;
        const body = deveFalhar
          ? { message: 'Erro temporário no servidor' }
          : { id: 99, message: 'Mensagem enviada com sucesso' };

        return Promise.resolve(
          new win.Response(JSON.stringify(body), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' },
          })
        );
      });
    });

    cy.getByStableSelector('emailInputLogin').type('lucas@example.com');
    cy.getByStableSelector('passwordInputLogin').type('Secret123!');
    cy.getByStableSelector('submitButton').click();

    cy.window().then((win) => {
      return win.fetch().then((response) => {
        const statusEsperado = deveFalhar ? 500 : 201;
        expect(response.status).to.eq(statusEsperado);
      });
    });
  });
});
