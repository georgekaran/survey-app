import React from 'react'
import { useParams } from 'react-router-dom'

import SurveyResult from '@/presentation/pages/survey-result/SurveyResult'
import { makeRemoteLoadSurveyResult } from '@/main/factories/usecases/load-survey-result/remote-load-survey-result-factory'
import { makeRemoteSaveSurveyResult } from '@/main/factories/usecases/save-survey-result/remote-save-survey-result-factory'

type Params = {
  id: string
}

export const makeSurveyResult: React.FC = () => {
  const { id } = useParams<Params>()
  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResult(id)}
      saveSurveyResult={makeRemoteSaveSurveyResult(id)}
    />
  )
}
