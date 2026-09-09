describe('Cadastro com rejeição e bloqueio', () => {
  const usuariosSenhaInvalida = require('../../../fixtures/usuariosSenhaInvalida.json');
  const usuariosEmailInvalido = require('../../../fixtures/usuariosEmailInvalido.json');

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

  it('deve rejeitar cadastro com senha divergente e retornar status 400', () => {
    usuariosSenhaInvalida.forEach((usuario) => {
      cy.abrirCadastro();
      stubFetchStatus(400, { message: 'As senhas não conferem' });

      cy.preencherFormularioCadastro(usuario.name, usuario.email, usuario.password, usuario.confirmPassword);
      cy.getByStableSelector('submitButton').click();

      assertFetchStatus(400, { message: 'As senhas não conferem' });
    });
  });

  it('deve bloquear cadastro com e-mail inválido', () => {
    usuariosEmailInvalido.forEach((usuario) => {
      cy.abrirCadastro();
      cy.getByStableSelector('fullNameInput').clear().type(usuario.name);
      cy.getByStableSelector('emailInputCadastro').clear().type(usuario.email);
      cy.getByStableSelector('passwordInputCadastro').clear().type(usuario.password);
      cy.getByStableSelector('confirmPasswordInput').clear().type(usuario.confirmPassword);

      cy.getByStableSelector('emailInputCadastro').invoke('prop', 'validity').its('typeMismatch').should('eq', true);
    });
  });
});
