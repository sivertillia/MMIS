export enum API_ERROR_CODES {
  // COMMON
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  EXPIRED_TOKEN = 'EXPIRED_TOKEN',
  AUTHORIZATION_TOKEN_REQUIRED = 'AUTHORIZATION_TOKEN_REQUIRED',
  TOKEN_REQUIRED = 'TOKEN_REQUIRED',
  TOKEN_INVALID = 'TOKEN_INVALID',

  // INVALID
  REGISTRATION_INVALID = 'REGISTRATION_INVALID',
  LOGIN_INVALID = 'LOGIN_INVALID',

  // ALREADY EXISTS
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',

  // NOT FOUND
  USER_NOT_FOUND = 'USER_NOT_FOUND',

  // REQUIRED
  DATA_REQUIRED = 'DATA_REQUIRED',

  //USER
  USER_ID_REQUIRED = 'USER_ID_REQUIRED',

  WRONG_PASSWORD = 'WRONG_PASSWORD',

}

export const API_ERROR_CODES_MESSAGES = {
  // COMMON
  INTERNAL_ERROR: 'Internal error exception.',
  UNEXPECTED_ERROR: 'Unexpected error. Please, try again.',
  UNAUTHORIZED: 'Permission denied.',
  EXPIRED_TOKEN: 'Your session is expired.',
  AUTHORIZATION_TOKEN_REQUIRED: 'Authorization token is required.',
  TOKEN_REQUIRED: 'token is required.',
  TOKEN_INVALID: 'Invalid token.',

  // INVALID
  REGISTRATION_INVALID: 'Registration invalid.',
  LOGIN_INVALID: 'Login invalid.',

  USER_ALREADY_EXISTS: 'User already exists.',


  // NOT FOUND
  USER_NOT_FOUND: 'User not found.',

  // REQUIRED
  DATA_REQUIRED: 'Data is required.',

  //USER
  USER_ID_REQUIRED: 'user_id is required.',


  // Wrong
  WRONG_PASSWORD: 'Wrong password.',
}

export const API_STATUS_CODES = {
  400: [
    API_ERROR_CODES.USER_ALREADY_EXISTS,

    API_ERROR_CODES.USER_NOT_FOUND,

    API_ERROR_CODES.DATA_REQUIRED,
    API_ERROR_CODES.USER_ID_REQUIRED,
    API_ERROR_CODES.TOKEN_REQUIRED,
    API_ERROR_CODES.TOKEN_INVALID,
    API_ERROR_CODES.WRONG_PASSWORD,
  ],
  401: [
    API_ERROR_CODES.UNAUTHORIZED,
    API_ERROR_CODES.AUTHORIZATION_TOKEN_REQUIRED,
  ],
  403: [
  ],
}

export const API_STATUS_MESSAGES = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
}

export const createError = (code: API_ERROR_CODES, transform?: (value: string) => string): { error_code: API_ERROR_CODES, error: string } => {
  if (!API_ERROR_CODES_MESSAGES[code]) return { error_code: code, error: '' }
  let message = API_ERROR_CODES_MESSAGES[code]
  if (transform) message = transform(message)
  return {
    error_code: code,
    error: message,
  }
}

export type APPLICATION_ERROR_CODES = API_ERROR_CODES | API_ERROR_CODES[]
