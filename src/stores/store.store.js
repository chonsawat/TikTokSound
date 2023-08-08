import { create } from "zustand";

export const useStore = create((set) => ({
  eventRecords: [
    {
      id: 1,
      enable: true,
      event: "following",
      sound:
        "C:\\Users\\Acer\\Documents\\TikTokSoundTemp\\assets\\sound\\fart.wav",
    },
    {
      id: 2,
      enable: false,
      event: "anygift",
      sound:
        "C:\\Users\\Acer\\Documents\\TikTokSoundTemp\\assets\\sound\\fart01.wav",
    },
    {
      id: 3,
      enable: false,
      event: "rose",
      sound:
        "C:\\Users\\Acer\\Documents\\TikTokSoundTemp\\assets\\sound\\monkey-laugh-102.wav",
    },
  ],
  setEventRecord: (newItem) =>
    set({
      eventRecords: state.eventRecords.map((item) => {
        if (item.refId === item.refId) item = newItem;
        return item;
      }),
    }),
  setEventRecords: (items) => set({ eventRecords: items }),
  addEventRecords: (item) =>
    set({ eventRecords: [...state.eventRecords, item] }),
  removeEventRecords: (refId) =>
    set((state) => ({
      eventRecords: state.eventRecords.filter((item) => item.refId !== refId),
    })),
}));
