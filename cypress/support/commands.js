const baseUrl = 'https://adopet-frontend-cypress.vercel.app';

const appSelectors = {
  homeLink: 'a[href="/"]',
  loginLink: 'a[href="/login"]',
  registerLink: 'a[href="/cadastro"]',
  messagesLink: 'a[href="/mensagem"]',
  homeCTA: 'a[href="/home"]',
  fullNameInput: 'input[placeholder="Digite seu nome completo"]',
  emailInputLogin: 'input[placeholder="Insira seu email"]',
  emailInputCadastro: 'input[placeholder="Escolha seu melhor email"]',
  passwordInputLogin: 'input[placeholder="Insira sua senha"]',
  passwordInputCadastro: 'input[placeholder="Crie uma senha"]',
  confirmPasswordInput: 'input[placeholder="Repita a senha criada acima"]',
  submitButton: 'button[type="submit"]',
};

Cypress.Commands.add('getByStableSelector', (key) => {
  const selector = appSelectors[key];

  if (!selector) {
    throw new Error(`Selector '${key}' não foi encontrado em appSelectors.`);
  }

  return cy.get(selector);
});

Cypress.Commands.add('visitarHome', () => {
  cy.visit(`${baseUrl}/`);
});

Cypress.Commands.add('abrirLogin', () => {
  cy.visitarHome();
  cy.getByStableSelector('loginLink').click();
});

Cypress.Commands.add('abrirCadastro', () => {
  cy.visitarHome();
  cy.getByStableSelector('registerLink').click();
});

Cypress.Commands.add('preencherFormularioLogin', (email, password) => {
  cy.getByStableSelector('emailInputLogin').clear().type(email);
  cy.getByStableSelector('passwordInputLogin').clear().type(password);
});

Cypress.Commands.add('login', (email, password) => {
  cy.preencherFormularioLogin(email, password);
  cy.getByStableSelector('submitButton').click();
});

Cypress.Commands.add('preencherFormularioCadastro', (name, email, password, confirmPassword) => {
  cy.getByStableSelector('fullNameInput').clear().type(name);
  cy.getByStableSelector('emailInputCadastro').clear().type(email);
  cy.getByStableSelector('passwordInputCadastro').clear().type(password);
  cy.getByStableSelector('confirmPasswordInput').clear().type(confirmPassword);
});

Cypress.Commands.add('cadastrar', (name, email, password, confirmPassword) => {
  cy.preencherFormularioCadastro(name, email, password, confirmPassword);
  cy.getByStableSelector('submitButton').click();
});

Cypress.Commands.add('preencherCadastroInvalido', (name, email, password, confirmPassword) => {
  cy.abrirCadastro();
  cy.preencherFormularioCadastro(name, email, password, confirmPassword);
  cy.getByStableSelector('submitButton').click();
});

Cypress.Commands.add('clicarHomeHeader', () => {
  cy.getByStableSelector('homeLink').first().click();
});

Cypress.Commands.add('verPetsDisponiveis', () => {
  cy.contains('a', 'Ver pets disponíveis para adoção').click();
});

Cypress.Commands.add('stubFetchResponse', (statusCode, body) => {
  cy.window().then((win) => {
    cy.stub(win, 'fetch').callsFake(() => {
      return Promise.resolve(
        new win.Response(JSON.stringify(body), {
          status: statusCode,
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });
  });
});

Cypress.Commands.add('assertFetchStatus', (statusCode) => {
  cy.window().then((win) => {
    const fetchStub = win.fetch;
    expect(fetchStub).to.be.a('function');
    expect(fetchStub).to.have.property('callCount');

    return fetchStub.firstCall.returnValue.then((response) => {
      expect(response.status).to.eq(statusCode);
    });
  });
});
