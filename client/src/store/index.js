import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user/userSlice'
import notificationSlice  from './Notification/notificationSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    notification: notificationSlice,
  }

})

store.subscribe(() => console.log(store.getState()))
