describe('Cadastro com usuários válidos', () => {
  const usuariosValidos = require('../fixtures/usuariosValidos.json');

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

  it('deve cadastrar múltiplos usuários válidos com sucesso e retornar status 201 para cada um', () => {
    usuariosValidos.forEach((usuario) => {
      cy.abrirCadastro();
      stubFetchStatus(201, { id: 101, name: usuario.name, email: usuario.email });

      cy.preencherFormularioCadastro(usuario.name, usuario.email, usuario.password, usuario.confirmPassword);
      cy.getByStableSelector('submitButton').click();

      assertFetchStatus(201, { email: usuario.email });
    });
  });
});
