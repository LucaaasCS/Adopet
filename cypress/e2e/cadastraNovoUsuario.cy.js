describe('Teste de cadastro de novo usuário', () => {
  it('Cadastro de novo usuário na plataforma', () => {
    cy.visit('https://adopet-frontend-cypress.vercel.app');
    cy.get('[data-test="register-button"]').click();
    cy.get('[data-test="input-name"]').type('Lucas');
    cy.get('[data-test="input-email"]').type('lucas@example.com');
    cy.get('[data-test="input-password"]').type('Secret123!');
    cy.get('[data-test="input-confirm-password"]').type('Secret123!');
    cy.get('[data-test="submit-button"]').click();   
  })
})
