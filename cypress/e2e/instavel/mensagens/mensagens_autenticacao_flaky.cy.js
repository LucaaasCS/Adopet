describe('Mensagens autenticação flaky', () => {
  const aleatorio = Math.random() < 0.5;

  it('cenarioMensagensAutenticacaoFlaky', () => {
    cy.visit('https://adopet-frontend-cypress.vercel.app/mensagem');
    cy.location('pathname').should('match', /^\/(login|mensagem)$/);

    cy.window().then((win) => {
      cy.stub(win, 'fetch').callsFake((url) => {
        const statusCode = aleatorio ? 401 : 200;
        const body = statusCode === 401
          ? { message: 'Sessão expirada' }
          : { mensagens: [] };

        return Promise.resolve(
          new win.Response(JSON.stringify(body), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' },
          })
        );
      });

      return win.fetch('/api/mensagens').then((response) => {
        const statusEsperado = aleatorio ? 401 : 200;
        expect(response.status).to.eq(statusEsperado);
        return response.json();
      }).then((payload) => {
        if (payload.message) {
          expect(payload.message).to.eq('Sessão expirada');
          cy.location('pathname').should('eq', '/login');
        } else {
          expect(payload.mensagens).to.be.an('array');
        }
      });
    });
  });
});
