import { ResponseDto } from '../types'
import * as jwt from 'jsonwebtoken'


export const N = (number: string | number | boolean): number => {
  number = +number || 0
  return Math.round(number * 100000000) / 100000000
}

export const S = (str: string | number | boolean) => {
  if (typeof str !== 'number' || isNaN(str)) str = str || ''
  return String(str)
}

export const C = (number, symbol = '') => {
  const round = Math.round(N(number) * 100) / 100

  const match = round.toFixed(2).match(/(-?)(.+)/)
  return match[1] + S(symbol) + match[2]
}

export class Response {
  constructor(response?: ResponseDto) {
    const result: ResponseDto = {
      status: true,
      status_code: 200,
      timestamp: new Date().toISOString(),
      errors: null,
      path: null,
      data: null,
    }

    return { ...result, ...response }
  }
}

export const generateRandomChars = (length: number): string => {
  let result = ''
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const charactersLength: number = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
export const getRandomAlNumString = (len: number) => {
  const _chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return Array.from(Array(len))
    .map(() => _chars[Math.floor(Math.random() * _chars.length)])
    .join('')
}

export async function sleep(ms): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const generateReferralCode = async (repository): Promise<string> => {
  let guid: string
  while (!(guid && !!!(await repository.findOne({ referral_code: guid })))) {
    guid = getRandomAlNumString(6)
  }
  return guid
}
export const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1]
    return JSON.parse(Buffer.from(base64Url, 'base64').toString())
  } catch (e) {
    console.log(e)
  }
}

export const generateJwt = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET)
}
