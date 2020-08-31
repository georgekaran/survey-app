import * as React from 'react'
import FlipMove from 'react-flip-move'
import Styles from './SurveyResult.scss'
import Header from '@/presentation/components/header/Header'
import Loading from '@/presentation/components/loading/Loading'
import Calendar from '@/presentation/components/calendar/Calendar'

type SurveyResultProps = {

}

const SurveyResult: React.FC<SurveyResultProps> = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        {true &&
          <>
            <hgroup>
              <Calendar date={new Date()} className={Styles.calendarWrap} />
              <h2>Pergunta</h2>
            </hgroup>
            <FlipMove className={Styles.answers}>
              <li>
                <img src="" alt=""/>
                <span className={Styles.answer}>Resposta 1</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li className={Styles.active}>
                <img src="" alt=""/>
                <span className={Styles.answer}>Resposta 1</span>
                <span className={Styles.percent}>50%</span>
              </li>
            </FlipMove>
            <button>Voltar</button>
          </>
        }
        {false && <Loading />}
      </div>
    </div>
  )
}

export default SurveyResult
