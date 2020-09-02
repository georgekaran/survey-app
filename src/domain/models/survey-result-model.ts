export type SurveyResultModel = {
  surveyId: string
  question: string
  answers: SurveyResultAnswer[]
  date: Date
}

export type SurveyResultAnswer = {
  image?: string
  answer: string
  count: number
  percent: number
  isCurrentAccountAnswer: boolean
}
