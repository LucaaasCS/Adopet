describe('Acessa a página inicial e verific', () => {
  it('passes', () => {
    cy.visit('https://adopet-frontend-cypress.vercel.app');
    cy.contains('a', 'Ver pets disponíveis para adoção').click();

  })
})
