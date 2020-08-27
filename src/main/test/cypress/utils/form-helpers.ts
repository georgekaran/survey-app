export const testInputStatus = (field: string, error: string): void => {
  cy.getByTestId(`${field}-status`).should('have.attr', 'title', error)
}
