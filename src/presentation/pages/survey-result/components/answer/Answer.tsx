import React, { useContext } from 'react'
import Styles from './Answer.scss'

import { SurveyResultAnswer } from '@/domain/models'
import SurveyResultContext from '@/presentation/pages/survey-result/components/context/context'

export interface Props {
  answer: SurveyResultAnswer
}

const Answer: React.FC<Props> = ({ answer }: Props) => {
  const { onAnswer } = useContext(SurveyResultContext)
  const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : ''

  const handleClick = (e: React.MouseEvent): void => {
    if (answer.isCurrentAccountAnswer) {
      return
    }
    onAnswer(answer.answer)
  }
  return (
    <li
      data-testid="answer-wrap"
      className={[activeClassName, Styles.answerWrap].join(' ')}
      onClick={handleClick}
    >
      {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
      <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
      <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
    </li>
  )
}

export default Answer
