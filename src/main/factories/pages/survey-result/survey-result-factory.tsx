import React from 'react'
import { useParams } from 'react-router-dom'

import SurveyResult from '@/presentation/pages/survey-result/SurveyResult'
import { makeRemoteLoadSurveyResult } from '../../usecases/load-survey-result/remote-load-survey-result-factory'

export const makeSurveyResult: React.FC = () => {
  const { id } = useParams()
  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResult(id)}
    />
  )
}
