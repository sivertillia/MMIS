import { showNotification } from '../store/Notification/notificationSlice'

export const handleError = (error) => (dispatch) => {
  if (error) {
    console.log('ERROR', error)
    if (
      (error.response?.data &&
        (error.response.data.message ||
          error.response.data.errorMessage ||
          error.response.data.detail ||
          error.response.data?.Message)) ||
      error.errorMessage
    ) {
      dispatch(
        showNotification(
          error.errorMessage ||
          error.response.data.message ||
          error.response.data.detail ||
          error.response.data.errorMessage ||
          error.response.data?.Message ||
          'Oops! Something went wrong. Please try again.',
          'error',
        ),
      )
    } else if (error && error?.message && error?.message?.response?.data) {
      dispatch(
        showNotification(
          error.message.response.data.message ||
          error?.message ||
          'Oops! Something went wrong. Please try again.',
          'error',
        ),
      )
    } else if (error && error?.message) {
      dispatch(
        showNotification(
          error?.message ||
          'Oops! Something went wrong. Please try again.',
          'error',
        ),
      )
    }
  } else {
    console.log('ERROR')
    dispatch(
      showNotification('Oops! Something went wrong. Please try again.', 'error'),
    )
  }
}
