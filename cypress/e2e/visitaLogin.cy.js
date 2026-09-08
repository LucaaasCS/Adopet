describe('Acessa a página de login', () => {
  beforeEach(() => {
    cy.abrirLogin();
  });

  it('Visita a página de login e preenche corretamente os campos', () => {
    cy.login('lucas@example.com', 'Secret123!');
  });
});