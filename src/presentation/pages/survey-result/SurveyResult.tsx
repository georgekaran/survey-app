import React, { useState, useEffect } from 'react'
import FlipMove from 'react-flip-move'

import Styles from './SurveyResult.scss'
import Header from '@/presentation/components/header/Header'
import Loading from '@/presentation/components/loading/Loading'
import Calendar from '@/presentation/components/calendar/Calendar'
import { LoadSurveyResult } from '@/domain/usecases'
import Footer from '@/presentation/components/footer/Footer'
import Error from '@/presentation/components/error/Error'

type SurveyResultProps = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<SurveyResultProps> = ({ loadSurveyResult }: SurveyResultProps) => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })

  useEffect(() => {
    loadSurveyResult.load()
  }, [])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult &&
          <>
            <hgroup>
              <Calendar date={new Date()} className={Styles.calendarWrap} />
              <h2>Pergunta</h2>
            </hgroup>
            <FlipMove className={Styles.answers}>
              <li>
                <img src="" alt=""/>
                <span className={Styles.answer}>Resposta 1</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li className={Styles.active}>
                <img src="" alt=""/>
                <span className={Styles.answer}>Resposta 1</span>
                <span className={Styles.percent}>50%</span>
              </li>
            </FlipMove>
            <button>Voltar</button>
          </>
        }
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={() => undefined} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
