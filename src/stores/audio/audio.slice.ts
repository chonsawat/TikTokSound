import { createSlice } from "@reduxjs/toolkit";
import { AudioButtonType, AudioRefsType } from "./audio.type";

type InitialStateType = {
  audioButton: AudioButtonType,
  audioRefs: AudioRefsType[],
}

const initialState: InitialStateType = {
  audioButton: {
    content: "Action",
    variant: "filled",
  },
  audioRefs: [],
};

const audioButtonSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setAudioButton: (state, action) => {
      state.audioButton = action.payload;
    },
    setAudioRefs: (state, action) => {
      state.audioRefs = action.payload;
    },
  },
});

export const { setAudioButton, setAudioRefs } = audioButtonSlice.actions;
export const audioReducer = audioButtonSlice.reducer;
