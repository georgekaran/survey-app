import Styles from './Signup.scss'
import { useHistory, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

import LoginHeader from '@/presentation/components/login-header/LoginHeader'
import Footer from '@/presentation/components/footer/Footer'
import Input from '@/presentation/components/input/Input'
import FormStatus from '@/presentation/components/form-status/FormStatus'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, UpdateCurrentAccount } from '@/domain/usecases'

type Props = {
  validation: Validation
  addAccount: AddAccount
  updateCurrentAccount: UpdateCurrentAccount
}

const Signup: React.FC<Props> = ({ validation, addAccount, updateCurrentAccount }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    mainError: '',
    nameError: '',
    passwordError: '',
    emailError: '',
    passwordConfirmationError: ''
  })

  useEffect(() => {
    const { email, password, name, passwordConfirmation } = state
    const formData = { email, password, name, passwordConfirmation }
    setState({
      ...state,
      nameError: validation.validate('name', formData),
      emailError: validation.validate('email', formData),
      passwordError: validation.validate('password', formData),
      passwordConfirmationError: validation.validate('passwordConfirmation', formData)
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const isInvalidState = (): boolean => {
    return !!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || isInvalidState()) {
        return
      }
      setState({
        ...state,
        isLoading: true
      })
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      await updateCurrentAccount.save(account)
      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div className={Styles.signupWrap}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Signup</h2>
          <Input type="text" name="name" placeholder="Name" />
          <Input type="email" name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />
          <Input type="password" name="passwordConfirmation" placeholder="Password confirmation" />
          <button data-testid="submit" disabled={isInvalidState()} className={Styles.submit} type="submit">
            Create account
          </button>
          <Link to="/login" replace data-testid="login" className={Styles.link}>
            Back to login
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
