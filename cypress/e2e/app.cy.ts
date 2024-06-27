import { getHeader } from '../support/pos';

describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    getHeader().should('be.visible');
  });
});
