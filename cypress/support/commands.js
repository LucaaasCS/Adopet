Cypress.Commands.add('visitarHome', () => {
  cy.visit('https://adopet-frontend-cypress.vercel.app');
});

Cypress.Commands.add('abrirLogin', () => {
  cy.visitarHome();
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('abrirCadastro', () => {
  cy.visitarHome();
  cy.get('[data-test="register-button"]').click();
});

Cypress.Commands.add('preencherFormularioLogin', (email, password) => {
  cy.get('[data-test="input-loginEmail"]').type(email);
  cy.get('[data-test="input-loginPassword"]').type(password);
});

Cypress.Commands.add('login', (email, password) => {
  cy.preencherFormularioLogin(email, password);
  cy.get('[data-test="submit-button"]').click();
});

Cypress.Commands.add('preencherFormularioCadastro', (name, email, password, confirmPassword) => {
  cy.get('[data-test="input-name"]').type(name);
  cy.get('[data-test="input-email"]').type(email);
  cy.get('[data-test="input-password"]').type(password);
  cy.get('[data-test="input-confirm-password"]').type(confirmPassword);
});

Cypress.Commands.add('cadastrar', (name, email, password, confirmPassword) => {
  cy.preencherFormularioCadastro(name, email, password, confirmPassword);
  cy.get('[data-test="submit-button"]').click();
});

Cypress.Commands.add('preencherCadastroInvalido', (name, email, password, confirmPassword) => {
  cy.abrirCadastro();
  cy.preencherFormularioCadastro(name, email, password, confirmPassword);
  cy.get('[data-test="submit-button"]').click();
});

Cypress.Commands.add('clicarHomeHeader', () => {
  cy.get('.header__home').click();
});

Cypress.Commands.add('verPetsDisponiveis', () => {
  cy.contains('a', 'Ver pets disponíveis para adoção').click();
});
