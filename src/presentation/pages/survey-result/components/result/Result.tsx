import React from 'react'
import Styles from './Result.scss'
import FlipMove from 'react-flip-move'
import { useHistory } from 'react-router-dom'

import Calendar from '@/presentation/components/calendar/Calendar'
import { LoadSurveyResult } from '@/domain/usecases'

export interface ResultProps {
  surveyResult: LoadSurveyResult.Model
}

const Result: React.SFC<ResultProps> = ({ surveyResult }: ResultProps) => {
  const history = useHistory()
  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <FlipMove data-testid="answers" className={Styles.answers}>
        {surveyResult.answers.map((answer) => (
          <li data-testid="answer-wrap" className={answer.isCurrentAccountAnswer ? Styles.active : ''} key={answer.answer}>
            {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer}/>}
            <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
            <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
          </li>
        ))}
      </FlipMove>
      <button data-testid="back-btn" onClick={() => history.goBack()}>Go back</button>
    </>
  )
}

export default Result
