
describe('Acessa a página de login', () => {
  beforeEach(() => {
  cy.visit('https://adopet-frontend-cypress.vercel.app/');
  cy.get('[data-test="login-button"]').click();
  })

  it('Visita a página de login e preenche corretamente os campos', () => {
    cy.login('lucas@example.com', 'Secret123!');
  })
})