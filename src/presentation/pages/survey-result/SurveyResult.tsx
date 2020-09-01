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
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })

  useEffect(() => {
    (async () => {
      try {
        const surveyResult = await loadSurveyResult.load()
        setState(old => ({ ...old, surveyResult }))
      } catch (error) {

      }
    })()
  }, [])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult &&
          <>
            <hgroup>
              <Calendar date={state.surveyResult.date} className={Styles.calendarWrap} />
              <h2 data-testid="question">{state.surveyResult.question}</h2>
            </hgroup>
            <FlipMove data-testid="answers" className={Styles.answers}>
              {state.surveyResult.answers.map((answer) => (
                <li data-testid="answer-wrap" className={answer.isCurrentAccountAnswer ? Styles.active : ''} key={answer.answer}>
                  {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer}/>}
                  <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
                  <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
                </li>
              ))}
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
