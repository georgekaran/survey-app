import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Styles from './SurveyList.scss'

import Footer from '@/presentation/components/footer/Footer'
import Header from '@/presentation/components/header/Header'
import { SurveyListItem, SurveyContext, ErrorItem } from './components'
import { LoadSurveyList } from '@/domain/usecases'
import { AccessDeniedError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)

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
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(null)
          history.replace('/login')
        } else {
          setState(currentState => ({ ...currentState, error: error.message }))
        }
      }
    })()
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Surveys</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error
            ? <ErrorItem />
            : <SurveyListItem />
          }
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
