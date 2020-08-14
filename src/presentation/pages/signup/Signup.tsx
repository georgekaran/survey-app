import Styles from './Signup.scss'
import React, { useState } from 'react'

import LoginHeader from '@/presentation/components/login-header/LoginHeader'
import Footer from '@/presentation/components/footer/Footer'
import Input from '@/presentation/components/input/Input'
import FormStatus from '@/presentation/components/form-status/FormStatus'
import Context from '@/presentation/contexts/form/form-context'

const Signup: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    mainError: '',
    nameError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório'
  })

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state }}>
        <form className={Styles.form}>
          <h2>Signup</h2>
          <Input type="text" name="name" placeholder="Name" />
          <Input type="email" name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />
          <Input type="password" name="passwordConfirmation" placeholder="Password confirmation" />
          <button data-testid="submit" disabled className={Styles.submit} type="submit">
            Create account
          </button>
          <span className={Styles.link}>
            Go to login
          </span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
