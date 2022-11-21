import httpClient from './httpClient'
import { endpoints } from './constants'

const API = {

  async loginRequest(data) {
    return doHttpCall('POST', endpoints.users.login(), data, {})
  },

  async registrationRequest(data) {
    return doHttpCall('POST', endpoints.users.registration(), data, {})
  },

}

export default API

function createResponse(result, errors) {
  return [result, errors || null]
}

async function doHttpCall(
  method,
  url,
  payload,
  params,
) {
  try {
    const access_token = localStorage.getItem('access_token')

    let result = null
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
      Accept: 'application/json',
    }

    if (access_token) {
      headers['Authorization'] = `Bearer ${access_token}`
    }

    if (method === 'GET') {
      result = await httpClient.get(url, { headers, params })
    } else if (method === 'POST') {
      result = await httpClient.post(url, { ...payload }, { headers, params })
    } else if (method === 'PUT') {
      result = await httpClient.put(
        url,
        Array.isArray(payload) ? payload : { ...payload },
        { headers, params },
      )
    } else if (method === 'DELETE') {
      result = await httpClient.delete(url, { headers, params: payload })
    }

    if (result?.data.status) {
      return createResponse(result?.data)
    }
    return createResponse(null, [{ code: 'UNHANDLED_REJECTION', message: 'Unhandled rejection' }])
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        if (error.response.config.url !== endpoints.auth.login()) {
          console.log('Unauthorized')
          // logout();
        }
      }
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log('Error', error.message)
    }
    return createResponse(null, error || 'Unknown error')
  }
}
