import React from 'react'
import Styles from './SurveyItem.scss'
import Icon, { IconName } from '@/presentation/components/icon/Icon'
import { SurveyModel } from '@/domain/models'

type Props = {
  survey: SurveyModel
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName={IconName.thumbUp} className={Styles.iconWrap} />
        <time>
          <span data-testid="day" className={Styles.day}>
            {survey.date.getDate()}
          </span>
          <span data-testid="month" className={Styles.month}>
            {survey.date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}
          </span>
          <span data-testid="year" className={Styles.year}>
            {survey.date.getFullYear()}
          </span>
        </time>
        <p data-testid="question">
          {survey.question}
        </p>
      </div>
      <footer>See result</footer>
    </li>
  )
}

export default SurveyItem
