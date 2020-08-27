import faker from 'faker'

import * as SurveyListHelper from '../support/survey-list-mocks'
import * as Helpers from '../support/helpers'

describe('SurveyList', () => {
  beforeEach(() => {
    cy.server()
    Helpers.setLocalStorageItem('account', {
      accessToken: faker.random.uuid(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`
    })
    cy.visit('')
  })

  it('Should present error on UnexpectedError', () => {
    SurveyListHelper.mockUnexpectedError()
    cy.getByTestId('error').should('contain.text', 'Something went wrong. Try again later.')
  })

  it('Should logout on AccessDeniedError', () => {
    SurveyListHelper.mockAccessDeniedError()
    Helpers.testUrl('/login')
  })

  it('Should present correct username', () => {
    SurveyListHelper.mockUnexpectedError()
    const account = Helpers.getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', account.name)
  })
})
