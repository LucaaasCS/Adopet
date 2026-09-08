describe('Teste de cadastro de novo usuário com senha inválida', () => {
  it('deve barrar o cadastro quando a senha não atende aos critérios', () => {
    cy.preencherCadastroInvalido('Lucas', 'lucas@example.com', '12345', '12346');

    cy.contains('A senha deve conter pelo menos uma letra maiúscula, um número e ter entre 6 e 15 caracteres').should('be.visible');
  });
});