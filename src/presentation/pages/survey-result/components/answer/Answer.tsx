import React from 'react'
import Styles from './Answer.scss'

import { LoadSurveyResult } from '@/domain/usecases'

export interface Props {
  answer: LoadSurveyResult.Answer
}

const Answer: React.SFC<Props> = ({ answer }: Props) => {
  const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : ''
  return (
    <li data-testid="answer-wrap" className={[activeClassName, Styles.answerWrap].join(' ')} key={answer.answer}>
      {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer}/>}
      <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
      <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
    </li>
  )
}

export default Answer
