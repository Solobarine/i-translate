import { Request } from 'express'

export interface Req extends Request {
  queryLanguage: string
  queryWord: string
  translationLanguage: string
  translationWord?: string
}
