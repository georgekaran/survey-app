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

  const onAnswer = (answer: string): void => {
    setState(old => ({ ...old, isLoading: true }))
    saveSurveyResult.save({ answer })
      .then()
      .catch()
  }

  return (
    <SurveyResultContext.Provider value={{ onAnswer }}>
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
    </SurveyResultContext.Provider>
  )
}

export default SurveyResult
