import * as Http from '../utils/http-mocks'
import * as Helpers from '../utils/helpers'

const path = /surveys/

const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')

const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')

const mockOk = (): void => Http.mockOk(path, 'GET', 'fx:survey-list')

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => Helpers.setLocalStorageItem('account', account))
    cy.server()
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('/')
    cy.getByTestId('error').should('contain.text', 'Something went wrong. Try again later.')
  })

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('/')
    Helpers.testUrl('/login')
  })

  it('Should present correct username', () => {
    mockUnexpectedError()
    cy.visit('/')
    const account = Helpers.getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', account.name)
  })

  it('Should logout user on logout anchor click', () => {
    mockUnexpectedError()
    cy.visit('/')
    cy.getByTestId('logout').click()
    Helpers.testUrl('/login')
  })

  it('Should present survey items', () => {
    mockOk()
    cy.visit('/')
    cy.get('li:empty').should('have.length', 4)
    cy.get('li:not(:empty)').should('have.length', 2)

    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '29')
      assert.equal(li.find('[data-testid="month"]').text(), 'jul')
      assert.equal(li.find('[data-testid="year"]').text(), '2020')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 1')
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbUp)
      })
    })

    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '08')
      assert.equal(li.find('[data-testid="month"]').text(), 'fev')
      assert.equal(li.find('[data-testid="year"]').text(), '2019')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 2')
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbDown)
      })
    })
  })
})
