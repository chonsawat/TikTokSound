import { create } from "zustand";

const initialStore = [
  {
    id: "1",
    enable: true,
    event: "following",
    volume: 0.2,
    sound:
      "C:\\Users\\Acer\\Documents\\TikTokSoundTemp\\assets\\sound\\fart.wav",
  },
  {
    id: "2",
    enable: false,
    event: "anygift",
    volume: 0.5,
    sound:
      "C:\\Users\\Acer\\Documents\\TikTokSoundTemp\\assets\\sound\\fart01.wav",
  },
  {
    id: "3",
    enable: true,
    event: "rose",
    volume: 0.1,
    sound:
      "C:\\Users\\Acer\\Documents\\TikTokSoundTemp\\assets\\sound\\monkey-laugh-102.wav",
  },
  {
    id: "4",
    enable: true,
    event: "following",
    volume: 0.7,
    sound:
      "C:\\Users\\Acer\\Documents\\TikTokSoundTemp\\assets\\sound\\fart.wav",
  },
  {
    id: "5",
    enable: true,
    event: "anygift",
    volume: 0.5,
    sound:
      "C:\\Users\\Acer\\Documents\\TikTokSoundTemp\\assets\\sound\\fart01.wav",
  },
  {
    id: "6",
    enable: false,
    event: "rose",
    volume: 1,
    sound:
      "C:\\Users\\Acer\\Documents\\TikTokSoundTemp\\assets\\sound\\monkey-laugh-102.wav",
  },
];

export const useEventRecordStore = create((set) => ({
  eventRecords: initialStore,
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
