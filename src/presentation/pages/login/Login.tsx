import Styles from './Login.scss'
import React, { useState, useEffect } from 'react'

import LoginHeader from '@/presentation/components/login-header/LoginHeader'
import Footer from '@/presentation/components/footer/Footer'
import Input from '@/presentation/components/input/Input'
import FormStatus from '@/presentation/components/form-status/FormStatus'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    mainError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  const isInvalidState = (): boolean => {
    return !!state.emailError || !!state.passwordError
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setState({
      ...state,
      isLoading: true
    })
    await authentication.auth({
      email: state.email,
      password: state.password
    })
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button data-testid="submit" disabled={isInvalidState()} className={Styles.submit} type="submit">
            Entrar
          </button>
          <span className={Styles.link}>
            Criar conta
          </span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
