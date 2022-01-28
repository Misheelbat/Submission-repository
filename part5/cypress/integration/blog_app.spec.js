describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset');
    const user = {
      name: 'Black Star',
      username: 'black',
      password: 'star',
    };

    cy.request('POST', 'http://localhost:3000/api/users/', user);

    cy.visit('http://localhost:3000');
  });

  it('login can be opened', function () {
    cy.contains('login').click();
    cy.get('#username').type('black');
    cy.get('#password').type('star');
    cy.get('#login-button').click();
    cy.contains('Black Star logged in');
  });
  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'black', password: 'star' });
    });
    it('new blog can be created', function () {
      cy.contains('create new blog').click();
      cy.get('#title').type('frank');
      cy.get('#author').type('dune');
      cy.get('#url').type('dune.com');
      cy.get('#save').click();
      cy.contains('frank dune');
    });
    it('check likes increases', function () {
      cy.contains('create new blog').click();
      cy.get('#title').type('frank');
      cy.get('#author').type('dune');
      cy.get('#url').type('dune.com');
      cy.get('#save').click();
      cy.contains('view').click();
      cy.get('#likes').click();
      cy.contains('1');
    });
    it('');
  });
});
