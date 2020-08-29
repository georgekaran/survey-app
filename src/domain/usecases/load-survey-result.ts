export interface LoadSurveyResult {
  load: () => Promise<LoadSurveyResult.Model>
}

export namespace LoadSurveyResult {
  export type Model = {
    surveyId: string
    question: string
    answers: [
      {
        image?: string
        answer: string
        count: number
        percent: number
        isCurrentAccountAnswer: true
      }
    ]
    date: string
  }
}
