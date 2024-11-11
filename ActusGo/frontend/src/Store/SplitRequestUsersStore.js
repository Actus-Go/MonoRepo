import { create } from "zustand";

export const useSplitRequestUsersStore = create((set) => ({
  requests: [],
  accepted: false,
  isLoading: false,
  acceptedId: null,
  openpopup: false,
  addrequest: (request) =>
    set((state) => ({
      requests: [...state.requests, request],
    })),
  setAccept: () =>
    set(() => ({
      accepted: true,
    })),
  changeLoading: (loading) =>
    set(() => ({
      isLoading: loading,
    })),
  setAcceptedId: (id) =>
    set(() => ({
      acceptedId: id,
    })),
  setOpenClosePopup: (openClosePopup) =>
    set(() => ({
      openpopup: openClosePopup
    })),
  clear: () =>
    set(() => ({
      requests: [],
      accepted: false,
      isLoading: false,
      acceptedId: null,
      openpopup: false,
    })),
}));
