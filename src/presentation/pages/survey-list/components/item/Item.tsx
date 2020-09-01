import React from 'react'
import Styles from './Item.scss'
import Icon, { IconName } from '@/presentation/components/icon/Icon'
import { SurveyModel } from '@/domain/models'
import Calendar from '@/presentation/components/calendar/Calendar'
import { Link } from 'react-router-dom'

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
      <footer>
        <Link data-testid="link" to={`/surveys/${survey.id}`}>
          See result
        </Link>
      </footer>
    </li>
  )
}

export default SurveyItem
