import React from 'react'
import Styles from './Item.scss'
import Icon, { IconName } from '@/presentation/components/icon/Icon'
import { SurveyModel } from '@/domain/models'
import Calendar from '@/presentation/components/calendar/Calendar'

type Props = {
  survey: SurveyModel
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName={iconName} className={Styles.iconWrap} />
        <Calendar date={survey.date} className={Styles.calendarWrap} />
        <p data-testid="question">
          {survey.question}
        </p>
      </div>
      <footer>See result</footer>
    </li>
  )
}

export default SurveyItem
