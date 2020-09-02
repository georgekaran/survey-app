import * as Http from '../utils/http-mocks'
import * as Helpers from '../utils/helpers'

const path = /surveys/

const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')

const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')

const mockOk = (): void => Http.mockOk(path, 'GET', 'fx:survey-result')

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => Helpers.setLocalStorageItem('account', account))
    cy.server()
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', 'Something went wrong. Try again later.')
  })

  it('Should reload on button reload click', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', 'Something went wrong. Try again later.')
    mockOk()
    cy.getByTestId('reload-btn').click()
    cy.getByTestId('question').should('exist')
  })

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('/surveys/any_id')
    Helpers.testUrl('/login')
  })
})
