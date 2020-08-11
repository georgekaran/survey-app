import React from 'react'
import ReactDOM from 'react-dom'
import '@/presentation/styles/global.scss'

import Router from '@/presentation/components/router/Router'
import { makeLogin } from './factories/pages/login-factory'

ReactDOM.render(
  <Router
    makeLogin={makeLogin}
  />,
  document.getElementById('root')
)
