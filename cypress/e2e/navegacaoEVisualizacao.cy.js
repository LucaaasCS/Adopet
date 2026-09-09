describe('Navegação e visualização de pets', () => {
  it('deve acessar a tela inicial e visualizar a seção de boas-vindas e pets disponíveis', () => {
    cy.visitarHome();
    cy.contains('Boas-vindas!').should('be.visible');
    cy.contains('Adotar pode mudar uma vida. Que tal buscar seu novo melhor amigo hoje?').should('be.visible');
    cy.getByStableSelector('homeCTA').should('be.visible');
    cy.getByStableSelector('loginLink').should('be.visible');
    cy.getByStableSelector('registerLink').should('be.visible');
  });

  it('deve clicar em Ver pets disponíveis para adoção e navegar para a página de pets', () => {
    cy.visitarHome();
    cy.getByStableSelector('homeCTA').click();
    cy.location('pathname').should('match', /^\/home$/);
    cy.contains('Veja os amigos disponíveis para adoção!').should('be.visible');
  });

  it('deve clicar no link de Tela inicial no header e retornar para a home', () => {
    cy.visit('https://adopet-frontend-cypress.vercel.app/home');
    cy.getByStableSelector('homeLink').first().should('be.visible').click();
    cy.location('pathname').should('eq', '/');
    cy.contains('Boas-vindas!').should('be.visible');
  });

  it('deve clicar em Falar com responsável e redirecionar para login', () => {
    cy.visit('https://adopet-frontend-cypress.vercel.app/home');
    cy.getByStableSelector('messagesLink').first().click();
    cy.location('pathname').should('eq', '/login');
    cy.contains('Já tem conta? Faça seu login:').should('be.visible');
  });
});
