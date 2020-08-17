import faker from 'faker'

import * as FormHelper from '../support/form-helper'
import * as LoginMocks from '../support/login-mocks'

const simulateValidSubmit = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(20))
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    FormHelper.testInputStatus('email', 'Required field')
    FormHelper.testInputStatus('password', 'Required field')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    FormHelper.testInputStatus('email', 'Invalid email error')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'Invalid password error')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email', 'Ok!')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(20))
    FormHelper.testInputStatus('password', 'Ok!')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present InvalidCredentialsError if invalid credentials are provided', () => {
    LoginMocks.mockInvalidCredentialsError()
    simulateValidSubmit()
    cy.getByTestId('error-wrap')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Invalid credentials')
    FormHelper.testUrl('/login')
  })

  it('Should present UnexpectedError on 400', () => {
    LoginMocks.mockUnexpectedError()
    simulateValidSubmit()
    cy.getByTestId('error-wrap')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Something went wrong. Try again later.')
    FormHelper.testUrl('/login')
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    LoginMocks.mockOkInvalidData()
    simulateValidSubmit()
    cy.getByTestId('error-wrap')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Something went wrong. Try again later.')
    FormHelper.testUrl('/login')
  })

  it('Should present save accessToken if valid credentials are provided', () => {
    LoginMocks.mockOk()
    simulateValidSubmit()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('not.exist')
    FormHelper.testUrl('/')
    FormHelper.testLocalStorageItem('accessToken')
  })

  it('Should submit form if enter key is pressed', () => {
    LoginMocks.mockOk()
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(20)).type('{enter}')
    FormHelper.testHttpCallsCount(1)
  })

  it('Should prevent multiple submits', () => {
    LoginMocks.mockOk()
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(20))
    cy.getByTestId('submit').dblclick()
    FormHelper.testHttpCallsCount(1)
  })

  it('Should not call submit if form is invalid', () => {
    LoginMocks.mockOk()
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    FormHelper.testHttpCallsCount(0)
  })
})
