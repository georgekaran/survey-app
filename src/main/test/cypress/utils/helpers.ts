export const baseUrl: string = Cypress.config().baseUrl

export const testHttpCallsCount = (calls: number): void => {
  cy.get('@request.all').should('have.length', calls)
}

export const testUrl = (path: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`)
}

export const testLocalStorageItem = (key: string): void => {
  cy.window().then(window => assert.isOk(window.localStorage.getItem(key)))
}

export const setLocalStorageItem = (key: string, value: object): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorageItem = (key: string): any => {
  return JSON.parse(localStorage.getItem(key))
}
