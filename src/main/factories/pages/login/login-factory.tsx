import React from 'react'
import { makeLoginValidation } from './login-validation-factory'
import Login from '@/presentation/pages/login/Login'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
