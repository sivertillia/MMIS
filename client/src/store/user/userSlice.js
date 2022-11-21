import { createSlice } from '@reduxjs/toolkit'
import api from '../../api'
import { handleError } from '../../utils/errorsUtil'

const initialState = {
  user: null,
  user_id: 0,
  is_admin: false,
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload
    },
    setUserId: (state, { payload }) => {
      state.user_id = payload
    },
    setAdminStatus: (state, { payload }) => {
      state.is_admin = payload
    },
  },
})

const { setUser, setUserId, setAdminStatus } = userSlice.actions
export const {} = userSlice.actions
export default userSlice.reducer

export const loginDispatch = (data) => async (dispatch) => {
  const [result, error] = await api.loginRequest(data)

  if (result && result.status) {
    localStorage.setItem('access_token', result.data.access_token)
    dispatch(setAdminStatus(result.data.is_admin))
    return true
  }

  if (error) {
    return dispatch(handleError(error))
  }
}

export const registrationDispatch = (data) => async (dispatch) => {
  const [result, error] = await api.registrationRequest(data)

  if (result && result.status) {
    localStorage.setItem('access_token', result.data.access_token)
    dispatch(setAdminStatus(result.data.is_admin))
    return true
  }

  if (error) {
    return dispatch(handleError(error))
  }
}

export const getProfile = (data) => async (dispatch) => {
  const [result, error] = await api.loginRequest(data)
}
