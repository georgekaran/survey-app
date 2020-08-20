import React from 'react'
import Styles from './SurveyList.scss'

import Footer from '@/presentation/components/footer/Footer'
import Header from '@/presentation/components/header/Header'
import Icon, { IconName } from '@/presentation/components/icon/Icon'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Surveys</h2>
        <ul>
          <li>
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
          <li>
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
          <li>
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
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
