import * as Http from '../utils/http-mocks'
import * as Helpers from '../utils/helpers'

const path = /surveys\/+/

const mockOk = (): void => Http.mockOk(path, 'GET', 'fx:load-survey-result')

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => Helpers.setLocalStorageItem('account', account))
    cy.server()
  })

  describe('LoadSurveyResult', () => {
    const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')

    const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')

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

    it('Should present survey result', () => {
      mockOk()
      cy.visit('/surveys/any_id')
      cy.getByTestId('question').should('have.text', 'Question 1')
      cy.getByTestId('day').should('have.text', '29')
      cy.getByTestId('month').should('have.text', 'jul')
      cy.getByTestId('year').should('have.text', '2020')
      cy.get('li:nth-child(1)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer')
        assert.equal(li.find('[data-testid="percent"]').text(), '80%')
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image')
      })
      cy.get('li:nth-child(2)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'other_answer')
        assert.equal(li.find('[data-testid="percent"]').text(), '40%')
        assert.notExists(li.find('[data-testid="image"]'))
      })
    })

    it('Should go back to SurveyList on back click', () => {
      cy.visit('')
      mockOk()
      cy.visit('/surveys/any_id')
      cy.getByTestId('back-btn').click()
      Helpers.testUrl('/')
    })
  })

  describe('SaveSurveyResult', () => {
    const mockUnexpectedError = (): void => Http.mockServerError(path, 'PUT')
    const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'PUT')
    const mockSaveSuccess = (): void => Http.mockOk(path, 'PUT', 'fx:save-survey-result')

    beforeEach(() => {
      cy.fixture('account').then(account => Helpers.setLocalStorageItem('account', account))
      cy.server()
      mockOk()
      cy.visit('/surveys/any_id')
    })

    it('Should present error on UnexpectedError', () => {
      mockUnexpectedError()
      cy.get('li:nth-child(2)').click()
      cy.getByTestId('error').should('contain.text', 'Something went wrong. Try again later.')
    })

    it('Should logout on AccessDeniedError', () => {
      mockAccessDeniedError()
      cy.get('li:nth-child(2)').click()
      Helpers.testUrl('/login')
    })

    it('Should present survey result', () => {
      mockSaveSuccess()
      cy.get('li:nth-child(2)').click()
      cy.getByTestId('question').should('have.text', 'Question 2')
      cy.getByTestId('day').should('have.text', '28')
      cy.getByTestId('month').should('have.text', 'jun')
      cy.getByTestId('year').should('have.text', '2019')
      cy.get('li:nth-child(1)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'other_answer_1')
        assert.equal(li.find('[data-testid="percent"]').text(), '50%')
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'other_image_1')
      })
      cy.get('li:nth-child(2)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'other_answer_2')
        assert.equal(li.find('[data-testid="percent"]').text(), '50%')
        assert.notExists(li.find('[data-testid="image"]'))
      })
    })
  })
})
