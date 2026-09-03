describe('Acessa a página inicial e clica no header Home', () => {
  it('Acessa a página inicial e clica no header Home', () => {
    cy.visit('https://adopet-frontend-cypress.vercel.app');
    cy.get('.header__home').click();
  })
})