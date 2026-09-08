describe('Acessa a página inicial e verifica os pets disponíveis', () => {
  it('deve abrir a lista de pets disponíveis para adoção', () => {
    cy.visitarHome();
    cy.verPetsDisponiveis();
  });
});
