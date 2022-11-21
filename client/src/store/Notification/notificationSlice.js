import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  visible: false,
  notificationType: 'info',
}

export const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState,
  reducers: {
    show: (state, { payload }) => ({
      ...state,
      message: payload.message,
      visible: true,
      notificationType: payload.notificationType,
    }),
    hideNotification: () => ({ ...initialState }),
  },
})

const { show } = notificationSlice.actions
export const { hideNotification } = notificationSlice.actions

export const showNotification = (message, notificationType) => async (dispatch) => {
  dispatch(show({ message, notificationType }))
}

export default notificationSlice.reducer
