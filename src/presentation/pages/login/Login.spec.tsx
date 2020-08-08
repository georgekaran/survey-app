import React from 'react'
import { render } from '@testing-library/react'
import Login from './Login'

describe('Login Page', () => {
  test('Should start with initial state', () => {
    const { getByTestId } = render(<Login />)
    const erroWrap = getByTestId('error-wrap')
    expect(erroWrap.childElementCount).toBe(0)
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')
    const passwordStatus = getByTestId('email-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
  })
})