import React from 'react'
import Signup from '@/presentation/pages/signup/Signup'
import { makeSignupValidation } from './signup-validation-factory'
import { makeLocalUpdateCurrentAccount } from '@/main/factories/usecases/save-access-token/local-update-current-account-factory'
import { makeRemoteAddAccount } from '@/main/factories/usecases/add-account/remote-add-account-factory'

export const makeSignup: React.FC = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      validation={makeSignupValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  )
}
