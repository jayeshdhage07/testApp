describe('contact Component', () => {
  it('should display contact Component', () => {
    cy.visit('/contact'); // baseUrl + "/"
  });
  context('User Cards Display', () => {
    it('should display user cards with correct info', () => {
      // Loop over each card and check contents
      cy.get('.card').should('have.length.greaterThan', 0);

      cy.get('.card').each(($card) => {
        cy.wrap($card).find('img').should('be.visible');
        cy.wrap($card).find('h4').should('not.be.empty');
        cy.wrap($card).find('p').should('contain.text', 'Email:');
        cy.wrap($card).find('p').should('contain.text', 'Address:');
      });
    });
  });

  context('Enquiry Form Validations', () => {
    it('should show required errors when form is empty', () => {
      cy.get('button[type=submit]').click();

      cy.get('#Name + div small.text-danger').should('contain.text', 'Name is required');
      cy.get('#MobileNumber + div small.text-danger').should('contain.text', 'Mobile number is required');
      cy.get('#exampleInputEmail1 + div small.text-danger').should('contain.text', 'Email is required');
      cy.get('#enquiryHelp + div small.text-danger').should('contain.text', 'Enquiry message is required');
    });

    it('should show minlength and pattern errors', () => {
      cy.get('#Name').type('Jo'); // less than 3 chars
      cy.get('#MobileNumber').type('12345'); // less than 10 digits
      cy.get('#exampleInputEmail1').type('invalid-email');
      cy.get('#enquiryHelp').type('Hello World!');

      cy.get('button[type=submit]').click();

      cy.get('#Name + div small.text-danger').should('contain.text', 'Name must be at least 3 characters long');
      cy.get('#MobileNumber + div small.text-danger').should('contain.text', 'Mobile number must be 10 digits long');
      cy.get('#exampleInputEmail1 + div small.text-danger').should('contain.text', 'Email must be a valid email address');
    });

    it('should submit form successfully with valid data', () => {
      cy.get('#Name').type('John Doe');
      cy.get('#MobileNumber').type('9876543210');
      cy.get('#exampleInputEmail1').type('john@example.com');
      cy.get('#enquiryHelp').type('This is a test enquiry message.');

      cy.get('button[type=submit]').should('not.be.disabled').click();

      // Assuming your app shows a notification after submit
      cy.get('app-notify').should('exist').and('contain.text', 'Thank you');
    });
  });
});
