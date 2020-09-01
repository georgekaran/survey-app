import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { ApiContext } from '@/presentation/contexts'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignup } from '@/main/factories/pages/signup/singup-factory'
import { makeSurveyList } from '../factories/pages/survey-list/survey-list-factory'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'
import { makeSurveyResult } from '../factories/pages/survey-result/survey-result-factory'
import PrivateRoute from '@/presentation/components/private-route/PrivateRoute'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={makeSignup} />
          <PrivateRoute path="/" exact component={makeSurveyList} />
          <PrivateRoute path="/surveys/:id" component={makeSurveyResult} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
