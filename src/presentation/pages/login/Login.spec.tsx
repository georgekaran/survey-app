import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Login from './Login'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Login />)
  return {
    sut
  }
}

describe('Login Page', () => {
  test('Should start with initial state', () => {
    const { sut } = makeSut()
    const erroWrap = sut.getByTestId('error-wrap')
    expect(erroWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')
    const passwordStatus = sut.getByTestId('email-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
  })
})
