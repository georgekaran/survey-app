import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Signup from '@/presentation/pages/signup/Signup'

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
