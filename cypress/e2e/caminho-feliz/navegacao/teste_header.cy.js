describe('Acessa a página inicial e clica no header Home', () => {
  it('Acessa a página inicial e clica no header Home', () => {
    cy.visitarHome();
    cy.clicarHomeHeader();
  });
});