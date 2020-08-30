import React, { useEffect, useState } from 'react'
import Styles from './SurveyList.scss'

import Footer from '@/presentation/components/footer/Footer'
import Header from '@/presentation/components/header/Header'
import { SurveyListItem, SurveyContext } from './components'
import { LoadSurveyList } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import Error from '@/presentation/components/error/Error'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const errorHandler = useErrorHandler((error: Error) => setState(currentState => ({ ...currentState, error: error.message })))

  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    (async function () {
      try {
        const surveys = await loadSurveyList.loadAll()
        setState(currentState => ({ ...currentState, surveys }))
      } catch (error) {
        errorHandler(error)
      }
    })()
  }, [state.reload])

  const reload = (): void => {
    setState(currentState => ({
      surveys: [] as LoadSurveyList.Model[],
      error: '',
      reload: !currentState.reload
    }))
  }

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Surveys</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error
            ? <Error error={state.error} reload={reload} />
            : <SurveyListItem />
          }
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
