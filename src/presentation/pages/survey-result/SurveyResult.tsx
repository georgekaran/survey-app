import React, { useState, useEffect } from 'react'

import Styles from './SurveyResult.scss'
import Header from '@/presentation/components/header/Header'
import Loading from '@/presentation/components/loading/Loading'
import { LoadSurveyResult } from '@/domain/usecases'
import Footer from '@/presentation/components/footer/Footer'
import Error from '@/presentation/components/error/Error'
import { useErrorHandler } from '@/presentation/hooks'
import Result from './components/result/Result'

type SurveyResultProps = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<SurveyResultProps> = ({ loadSurveyResult }: SurveyResultProps) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, error: error.message }))
  })
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  const reload = (): void => {
    setState(old => ({
      surveyResult: null,
      error: '',
      isLoading: false,
      reload: !old.reload
    }))
  }

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult &&
          <Result surveyResult={state.surveyResult} />
        }
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
