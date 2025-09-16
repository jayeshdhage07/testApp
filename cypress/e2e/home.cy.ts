describe('home Component', () => {
  it('should display the welcome message', () => {
    cy.visit('/home'); // baseUrl + "/"
    cy.contains('Products'); // change text to match your app
  });
});
