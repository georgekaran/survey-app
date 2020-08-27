import * as Http from '../utils/http-mocks'
import * as Helpers from '../utils/helpers'

const path = /surveys/

export const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')

export const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => Helpers.setLocalStorageItem('account', account))
    cy.server()
    cy.visit('')
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.getByTestId('error').should('contain.text', 'Something went wrong. Try again later.')
  })

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    Helpers.testUrl('/login')
  })

  it('Should present correct username', () => {
    mockUnexpectedError()
    const account = Helpers.getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', account.name)
  })

  it('Should logout user on logout anchor click', () => {
    mockUnexpectedError()
    cy.getByTestId('logout').click()
    Helpers.testUrl('/login')
  })
})
