import React, { useContext } from 'react'
import Styles from './Error.scss'

import { SurveyContext } from '@/presentation/pages/survey-list/components'

const Error: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{state.error}</span>
      <button>Reload</button>
    </div>
  )
}

export default Error
