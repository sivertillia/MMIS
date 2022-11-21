import { API_ERROR_CODES } from '../enum/errorsCodes'


interface ErrorType {
  code: API_ERROR_CODES;
  message: string;
}

export class ResponseDto {
  status?: boolean
  status_code: number
  timestamp?: string
  errors?: ErrorType[] | null
  path: string
  data?: any | null
}
