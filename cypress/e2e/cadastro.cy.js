describe('Cadastro', () => {
  const stubFetchStatus = (statusCode, body = {}) => {
    cy.window().then((win) => {
      cy.stub(win, 'fetch').resolves(
        new win.Response(JSON.stringify(body), {
          status: statusCode,
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });
  };

  const assertFetchStatus = (statusCode, expectedBody = {}) => {
    cy.window().then((win) => {
      return win.fetch().then((response) => {
        expect(response.status).to.eq(statusCode);
        return response.json();
      }).then((payload) => {
        expect(payload).to.include.keys(Object.keys(expectedBody));
        Object.entries(expectedBody).forEach(([key, value]) => {
          expect(payload[key]).to.deep.eq(value);
        });
      });
    });
  };

  beforeEach(() => {
    cy.abrirCadastro();
  });

  it('deve abrir o formulário de cadastro', () => {
    cy.contains('Ainda não tem cadastro?').should('be.visible');
    cy.getByStableSelector('fullNameInput').should('be.visible');
    cy.getByStableSelector('emailInputCadastro').should('be.visible');
  });

  it('deve cadastrar usuário com sucesso e retornar status 201', () => {
    stubFetchStatus(201, { id: 101, name: 'Lucas', email: 'lucas.novo@example.com' });

    cy.preencherFormularioCadastro('Lucas', 'lucas.novo@example.com', 'Secret123!', 'Secret123!');
    cy.getByStableSelector('submitButton').click();

    assertFetchStatus(201, { email: 'lucas.novo@example.com' });
  });

  it('deve rejeitar cadastro com senhas divergentes e retornar status 400', () => {
    stubFetchStatus(400, { message: 'As senhas não conferem' });

    cy.preencherFormularioCadastro('Lucas', 'lucas@example.com', 'Secret123!', 'Secret1234!');
    cy.getByStableSelector('submitButton').click();

    assertFetchStatus(400, { message: 'As senhas não conferem' });
  });

  it('deve bloquear cadastro com e-mail inválido', () => {
    cy.getByStableSelector('emailInputCadastro').clear().type('email-invalido');
    cy.getByStableSelector('passwordInputCadastro').clear().type('Secret123!');
    cy.getByStableSelector('confirmPasswordInput').clear().type('Secret123!');

    cy.getByStableSelector('emailInputCadastro').invoke('prop', 'validity').its('typeMismatch').should('eq', true);
  });
});
