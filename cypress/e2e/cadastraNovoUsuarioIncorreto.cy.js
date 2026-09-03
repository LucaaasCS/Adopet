describe('Teste de cadastro de novo usuário', () => {
  it('Cadastro de novo usuário na plataforma', () => {
    cy.visit('https://adopet-frontend-cypress.vercel.app');
    cy.get('[data-test="register-button"]').click();
    cy.get('[data-test="submit-button"]').type('Lucas');
    cy.get('[data-test="input-email"]').type('lucas@example.com');
    cy.contains('Crie uma senha').should('be.visible');
    cy.contains('Repita a senha criada').should('be.visible');
  })
})