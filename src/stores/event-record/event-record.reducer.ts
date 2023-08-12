/** 
	ใช้ในการสร้าง Reducer Actions และ Initial State
*/
import { createSlice } from "@reduxjs/toolkit";

export type EventRecordType = {
  id: string,
  enable: boolean,
  volume: number,
  sound: string,
}
export type EventRecordsType = EventRecordType[]

export const EVENT_RECORD_INITIAL_STATE = {
  eventRecords: [
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
  ],
};

export const eventRecordsSlice = createSlice({
  name: "eventRecords",
  initialState: EVENT_RECORD_INITIAL_STATE,
  reducers: {
    setEventRecords: (state, action) => {
      state.eventRecords = action.payload;
    },
    deleteEventRecordsById: (state, action) => {
      state.eventRecords = state.eventRecords.filter(
        (item) => item.id != action.payload
      );
    },
  },
});

export const { setEventRecords, deleteEventRecordsById } =
  eventRecordsSlice.actions;
export const eventRecordsReducer = eventRecordsSlice.reducer;
