describe('Navegação flaky', () => {
  const aleatorio = Math.random() < 0.5;

  it('cenarioNavegacaoFlaky', () => {
    cy.visitarHome();

    if (aleatorio) {
      cy.getByStableSelector('homeCTA').should('be.visible');
      cy.getByStableSelector('homeCTA').click();
      cy.location('pathname').should('match', /^\/home$/);
    } else {
      cy.getByStableSelector('loginLink').should('be.visible');
      cy.getByStableSelector('registerLink').should('be.visible');
      cy.getByStableSelector('messagesLink').first().click();
      cy.location('pathname').should('eq', '/login');
    }
  });
});
