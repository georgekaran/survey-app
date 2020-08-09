import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import faker from 'faker'

import Login from './Login'
import { ValidationStub } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = faker.random.words()
  const sut = render(<Login validation={validationStub} />)
  return {
    sut,
    validationStub
  }
}

describe('Login Page', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const { sut, validationStub } = makeSut()
    const erroWrap = sut.getByTestId('error-wrap')
    expect(erroWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
  })

  test('Should show email error if Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const emailInput = sut.getByTestId('email')
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
  })

  test('Should show password error if Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const passwordInput = sut.getByTestId('password')
    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
  })

  test('Should show valid password state Validation succeeds', () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = null
    const passwordInput = sut.getByTestId('password')
    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Ok!')
  })
})
