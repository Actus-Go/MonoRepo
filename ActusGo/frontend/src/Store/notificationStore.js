import { create } from 'zustand'

export const useNotificationStore = create((set) => ({
  notifications: [],
  hasNewNotifications:false,
  addNotification: (notification) => set((state)=>({
    notifications:[notification,...state.notifications],
    hasNewNotifications:true,
  })),
  updateNotification: (notification) => set((state)=>{
     let found = state.notifications.filter((inNotification)=>{
        if(inNotification._id != notification._id) return true;
     })
     state.notifications = [...found, notification]
  }),
  setHasNotification:(isNew) => set((state)=>({
    hasNewNotifications:isNew
  }))
}))
