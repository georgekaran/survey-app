export type RemoteSurveyResultModel = {
  surveyId: string
  question: string
  answers: RemoteSurveyResultAnswerModel[]
  date: string
}

export type RemoteSurveyResultAnswerModel = {
  image?: string
  answer: string
  count: number
  percent: number
  isCurrentAccountAnswer: boolean
}
