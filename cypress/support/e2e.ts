// This is processed automatically before test files.
// Use it to import custom commands or setup global behavior.
import '@cypress/code-coverage/support';
import './commands';

// Example: run a hook before each test (optional)
beforeEach(() => {
  cy.log('Starting a new test...');
});
