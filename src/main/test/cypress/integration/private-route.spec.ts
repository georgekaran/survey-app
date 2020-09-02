import * as Helpers from '../utils/helpers'

describe('PrivateRoute', () => {
  it('Should logout if SurveyList has no token', () => {
    cy.visit('')
    Helpers.testUrl('/login')
  })

  it('Should logout if SurveyResult has no token', () => {
    cy.visit('/surveys/any_token')
    Helpers.testUrl('/login')
  })
})
