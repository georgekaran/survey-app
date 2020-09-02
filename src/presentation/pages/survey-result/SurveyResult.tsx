import React, { useState, useEffect } from 'react'

import Styles from './SurveyResult.scss'
import Header from '@/presentation/components/header/Header'
import Loading from '@/presentation/components/loading/Loading'
import { LoadSurveyResult } from '@/domain/usecases'
import Footer from '@/presentation/components/footer/Footer'
import Error from '@/presentation/components/error/Error'
import { useErrorHandler } from '@/presentation/hooks'
import Result from './components/result/Result'
import SurveyResultContext from '@/presentation/pages/survey-result/components/context/context'
import { SaveSurveyResult } from '@/domain/usecases/save-survey-result'

type SurveyResultProps = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<SurveyResultProps> = ({ loadSurveyResult, saveSurveyResult }: SurveyResultProps) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, isLoading: false, error: error.message }))
  })

  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  const onAnswer = (answer: string): void => {
    if (state.isLoading) {
      return
    }
    setState(old => ({ ...old, isLoading: true }))
    saveSurveyResult.save({ answer })
      .then(surveyResult => setState(old => ({ ...old, isLoading: false, surveyResult })))
      .catch(handleError)
  }
  const reload = (): void => setState(old => ({ ...old, error: '', reload: !old.reload }))

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <SurveyResultContext.Provider value={{ onAnswer }}>
        <div data-testid="survey-result" className={Styles.contentWrap}>
          {state.surveyResult && <Result surveyResult={state.surveyResult} /> }
          {state.isLoading && <Loading />}
          {state.error && <Error error={state.error} reload={reload} />}
        </div>
      </SurveyResultContext.Provider>
      <Footer />
    </div>
  )
}

export default SurveyResult
