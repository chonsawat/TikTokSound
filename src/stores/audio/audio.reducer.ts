import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
