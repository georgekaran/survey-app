import React, { useEffect, useState } from 'react'
import Styles from './SurveyList.scss'

import Footer from '@/presentation/components/footer/Footer'
import Header from '@/presentation/components/header/Header'
import { SurveyItemEmpty, SurveyItem } from './components'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  })

  useEffect(() => {
    (async function () {
      try {
        const surveys = await loadSurveyList.loadAll()
        setState(currentState => ({ ...currentState, surveys }))
      } catch (error) {
        setState(currentState => ({ ...currentState, error: error.message }))
      }
    })()
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Surveys</h2>
        {state.error
          ? (<div>
            <span data-testid="error">{state.error}</span>
            <button>Reload</button>
          </div>)
          : (<ul data-testid="survey-list">
            {state.surveys.length
              ? state.surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey} />)
              : <SurveyItemEmpty />
            }
          </ul>)
        }
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
