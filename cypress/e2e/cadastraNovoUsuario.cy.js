describe('Cadastro de usuário', () => {
  beforeEach(() => {
    cy.abrirCadastro();
  });

  it('deve cadastrar um novo usuário com dados válidos', () => {
    const emailUnico = `lucas.${Date.now()}@example.com`;

    cy.cadastrar('Lucas', emailUnico, 'Secret123!', 'Secret123!');
  });
});
