import { createSlice } from "@reduxjs/toolkit";

initialState = {
    audioButton : "false"
}

const audioButtonSlice = createSlice({
    name: "audio",
    initialState,
    reducers: {
        setAudioButton: (state, action) => {
            state.audio = action.payload
        }
    }
})

export const {setAudioButton} = audioButtonSlice.actions;
export const audioButtonReducer = audioButtonSlice.reducer;