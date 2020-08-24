import React from 'react'
import Styles from './SurveyItem.scss'
import Icon, { IconName } from '@/presentation/components/icon/Icon'

const SurveyItem: React.FC = () => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName={IconName.thumbUp} className={Styles.iconWrap} />
        <time>
          <span className={Styles.day}>22</span>
          <span className={Styles.month}>03</span>
          <span className={Styles.year}>2020</span>
        </time>
        <p>What is your favorite web framework?</p>
      </div>
      <footer>See result</footer>
    </li>
  )
}

export default SurveyItem
