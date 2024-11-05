import { create } from 'zustand'

export const useShareRequestUsersStore = create((set) => ({
  requests: [],
  accepted:false,
  isLoading:false,
  acceptedId:null,
  addrequest: (request) => set((state)=>({
    requests:[...state.requests,request],
  })),
  setAccept: ()=>set(()=>({
      accepted:true,
  })),
  changeLoading: (loading)=>set(()=>({
    isLoading:loading,
  })),
  setAcceptedId: (id)=>set(()=>({
    acceptedId:id,
  })),
}))
