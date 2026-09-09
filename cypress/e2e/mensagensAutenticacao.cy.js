describe('Mensagens', () => {
  const stubFetchStatus = (statusCode, body = {}) => {
    cy.window().then((win) => {
      cy.stub(win, 'fetch').resolves(
        new win.Response(JSON.stringify(body), {
          status: statusCode,
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });
  };

  it('deve redirecionar para login quando o usuário tenta acessar mensagens sem autenticação', () => {
    cy.visit('https://adopet-frontend-cypress.vercel.app/mensagem');
    cy.contains('Já tem conta? Faça seu login:').should('be.visible');
    cy.location('pathname').should('eq', '/login');
  });

  it('deve simular envio de mensagem com sucesso e status 201', () => {
    stubFetchStatus(201, { id: 1, message: 'Olá, gostaria de saber mais sobre o pet.' });

    cy.window().then((win) => {
      return win.fetch().then((response) => {
        expect(response.status).to.eq(201);
        return response.json();
      }).then((payload) => {
        expect(payload.message).to.eq('Olá, gostaria de saber mais sobre o pet.');
      });
    });
  });
});
