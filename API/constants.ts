import { EServerErrorMessage } from 'constants/enum';

interface IErrorInfo {
  missingProperty: string
}

interface IErrorDetails {
  code: string
  info: IErrorInfo
  message: EServerErrorMessage | string
  path: string
}


export interface IHeader {
  authorization?: string
}

export interface IServerError {
  statusCode?: number
  name?: string
  message?: string | EServerErrorMessage
  code?: string
  details?: IErrorDetails[]
}
