describe('Login', () => {
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
    cy.abrirLogin();
  });

  it('deve exibir o formulário de login', () => {
    cy.contains('Já tem conta? Faça seu login:').should('be.visible');
    cy.getByStableSelector('emailInputLogin').should('be.visible');
    cy.getByStableSelector('passwordInputLogin').should('be.visible');
  });

  it('deve aceitar login com credenciais válidas e retornar status 200', () => {
    stubFetchStatus(200, { token: 'fake-token', user: { name: 'Lucas' } });

    cy.preencherFormularioLogin('lucas@example.com', 'Secret123!');
    cy.getByStableSelector('submitButton').click();

    assertFetchStatus(200, { token: 'fake-token' });
  });

  it('deve rejeitar login com senha incorreta e retornar status 401', () => {
    stubFetchStatus(401, { message: 'Credenciais inválidas' });

    cy.preencherFormularioLogin('lucas@example.com', 'SenhaErrada!');
    cy.getByStableSelector('submitButton').click();

    assertFetchStatus(401, { message: 'Credenciais inválidas' });
  });

  it('deve permanecer na tela de login quando o e-mail estiver vazio', () => {
    cy.getByStableSelector('emailInputLogin').clear();
    cy.getByStableSelector('passwordInputLogin').type('Secret123!');
    cy.getByStableSelector('submitButton').click();

    cy.location('pathname').should('eq', '/login');
    cy.getByStableSelector('emailInputLogin').should('have.value', '');
  });
});
