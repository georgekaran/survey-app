export const baseUrl: string = Cypress.config().baseUrl

export const testInputStatus = (field: string, error: string): void => {
  cy.getByTestId(`${field}-status`).should('have.attr', 'title', error)
}

export const testHttpCallsCount = (calls: number): void => {
  cy.get('@request.all').should('have.length', calls)
}

export const testUrl = (path: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`)
}

export const testLocalStorageItem = (key: string): void => {
  cy.window().then(window => assert.isOk(window.localStorage.getItem(key)))
}