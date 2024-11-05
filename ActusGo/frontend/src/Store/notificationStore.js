import { create } from 'zustand'

export const useNotificationStore = create((set) => ({
  notifications: [],

  addNotification: (notification) => set((state)=>({
    notifications:[...state.notifications,notification]
  })),
  updateNotification: (notification) => set((state)=>{
     let found = state.notifications.filter((inNotification)=>{
        if(inNotification._id != notification._id) return true;
     })
     state.notifications = [...found, notification]
  })
}))
