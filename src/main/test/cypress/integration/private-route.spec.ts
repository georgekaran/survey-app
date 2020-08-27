import * as Helpers from '../utils/helpers'

describe('PrivateRoute', () => {
  it('Should logout if SurveyList has no token', () => {
    cy.visit('')
    Helpers.testUrl('/login')
  })
})
