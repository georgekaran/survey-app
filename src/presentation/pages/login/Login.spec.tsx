import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import faker from 'faker'

import Login from './Login'
import { ValidationStub, AuthenticationSpy, Helper } from '@/presentation/test'
import { ApiContext } from '@/presentation/contexts'
import { InvalidCredentialsError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const setCurrentAccountMock = jest.fn()
  validationStub.errorMessage = params?.validationError
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountMock
    }}
    >
      <Router history={history}>
        <Login
          validation={validationStub}
          authentication={authenticationSpy} />
      </Router>
    </ApiContext.Provider>
  )
  return {
    validationStub,
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login Page', () => {
  test('Should start with initial state', () => {
    const { validationStub } = makeSut({ validationError: faker.random.words() })
    Helper.testChildCount('error-wrap', 0)
    Helper.testButtonIsDisabled('submit', true)
    Helper.testStatusForField('email', validationStub.errorMessage)
    Helper.testStatusForField('password', validationStub.errorMessage)
  })

  test('Should show email error if Validation fails', () => {
    const { validationStub } = makeSut()
    validationStub.errorMessage = faker.random.words()
    Helper.populateField('email')
    Helper.testStatusForField('email', validationStub.errorMessage)
  })

  test('Should show password error if Validation fails', () => {
    const { validationStub } = makeSut()
    validationStub.errorMessage = faker.random.words()
    Helper.populateField('password')
    Helper.testStatusForField('password', validationStub.errorMessage)
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  test('Should show valid password if state Validation succeeds', () => {
    makeSut()
    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.testButtonIsDisabled('submit', false)
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    Helper.testElementExists('spinner')
  })

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const { authenticationSpy } = makeSut({ validationError: faker.random.words() })
    Helper.populateField('email')
    fireEvent.submit(screen.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should show error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit()
    Helper.testElementText('main-error', error.message)
    Helper.testChildCount('error-wrap', 1)
  })

  test('Should call SaveAccessToken on Authentication success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should redirect to signup page on signup click', () => {
    makeSut()
    const signup = screen.getByTestId('signup-link')
    fireEvent.click(signup)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
