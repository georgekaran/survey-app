import React from 'react'
import Styles from './Result.scss'
import { useHistory } from 'react-router-dom'

import Calendar from '@/presentation/components/calendar/Calendar'
import { LoadSurveyResult } from '@/domain/usecases'
import Answer from '@/presentation/pages/survey-result/components/answer/Answer'

export interface ResultProps {
  surveyResult: LoadSurveyResult.Model
}

const Result: React.FC<ResultProps> = ({ surveyResult }: ResultProps) => {
  const { goBack } = useHistory()
  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <ul data-testid="answers" className={Styles.answersList}>
        {surveyResult.answers.map(answer => <Answer key={answer.answer} answer={answer} />)}
      </ul>
      <button className={Styles.button} data-testid="back-btn" onClick={goBack}>Voltar</button>
    </>
  )
}

export default Result
