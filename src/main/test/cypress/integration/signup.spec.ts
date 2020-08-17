import faker from 'faker'

import * as FormHelper from '../support/form-helper'
import * as SignupMocks from '../support/signup-mocks'

const simulateValidSubmit = (): void => {
  cy.getByTestId('name').focus().type(`${faker.name.firstName()} ${faker.name.lastName()}`)
  cy.getByTestId('email').focus().type(faker.internet.email())
  const password = faker.random.alphaNumeric(20)
  cy.getByTestId('password').focus().type(password)
  cy.getByTestId('passwordConfirmation').focus().type(password)
  cy.getByTestId('submit').click()
}

describe('Signup', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    FormHelper.testInputStatus('email', 'Required field')
    cy.getByTestId('email').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('name', 'Required field')
    cy.getByTestId('name').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('password', 'Required field')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('passwordConfirmation', 'Required field')
    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('name', 'Invalid name error')

    cy.getByTestId('email').focus().type(faker.random.word())
    FormHelper.testInputStatus('email', 'Invalid email error')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'Invalid password error')

    cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(4))
    FormHelper.testInputStatus('passwordConfirmation', 'Invalid passwordConfirmation error')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('name').focus().type(faker.name.findName())
    FormHelper.testInputStatus('name', 'Ok!')

    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email', 'Ok!')

    const password = faker.random.alphaNumeric(20)
    cy.getByTestId('password').focus().type(password)
    FormHelper.testInputStatus('password', 'Ok!')

    cy.getByTestId('passwordConfirmation').focus().type(password)
    FormHelper.testInputStatus('passwordConfirmation', 'Ok!')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present EmailInUse on 403', () => {
    SignupMocks.mockEmailInUseError()
    simulateValidSubmit()
    cy.getByTestId('main-error').should('contain.text', 'Email is already in use')
    FormHelper.testUrl('/signup')
  })

  it('Should present UnexpectedError on 400', () => {
    SignupMocks.mockUnexpectedError()
    simulateValidSubmit()
    cy.getByTestId('error-wrap')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Something went wrong. Try again later.')
    FormHelper.testUrl('/signup')
  })
})
