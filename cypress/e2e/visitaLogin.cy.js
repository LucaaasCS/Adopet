
describe('Acessa a página de login', () => {
  beforeEach(() => {
  cy.visit('https://adopet-frontend-cypress.vercel.app/');
  cy.get('[data-test="login-button"]').click();
  })

  it('Visita a página de login e preenche corretamente os campos', () => {
    cy.get('[data-test="input-loginEmail"]').type('lucas@example.com');
    cy.get('[data-test="input-loginPassword"]').type('Secret123!');
    cy.get('[data-test="submit-button"]').click();
  })
})