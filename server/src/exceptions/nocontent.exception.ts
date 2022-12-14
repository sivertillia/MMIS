import {
  API_ERROR_CODES,
  API_ERROR_CODES_MESSAGES,
  API_STATUS_CODES,
  API_STATUS_MESSAGES,
  APPLICATION_ERROR_CODES,
} from '../enum/errorsCodes'
import { HttpException } from '@nestjs/common'
import { N } from '../helpers'


export class CreateException extends HttpException {
  constructor(
    error: string | APPLICATION_ERROR_CODES,
    extended?: Record<any, any>,
    error_status_code?: number,
  ) {
    function processError(code: any) {
      let status_code = 500
      const message =
        API_ERROR_CODES_MESSAGES[code] ||
        API_ERROR_CODES_MESSAGES[API_ERROR_CODES.UNEXPECTED_ERROR]

      Object.keys(API_STATUS_CODES).forEach((key) => {
        if (API_STATUS_CODES[key].includes(code)) status_code = N(key)
      })

      return {
        status_code: status_code,
        message: message,
      }
    }

    const errors_arr = []
    let status = 500
    if (typeof error === 'string' && !API_ERROR_CODES[error]) {
      errors_arr.push({
        code: API_ERROR_CODES.INTERNAL_ERROR,
        message: error,
      })
    }

    const formattedCode = Array.isArray(error) ? error : [error]
    formattedCode?.forEach((item) => {
      const { message, status_code } = processError(item)
      if (message && status_code) {
        errors_arr.push({
          code: item,
          message: message,
        })
        status = status_code
      }
    })

    super(
      {
        errors: errors_arr,
        message: API_STATUS_MESSAGES[error_status_code || status],
        extended,
      },
      error_status_code || status,
    )
  }
}

export class CreateNatsException extends HttpException {
  constructor(payload: CreateException, status_code: number) {
    super(payload, status_code)
  }
}
