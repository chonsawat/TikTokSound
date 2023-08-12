import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const audioReducer = (state: RootState) => state.audio
export const audioButtonSelector = createSelector([audioReducer], (state) => state.audioButton);
export const audioRefSelector = createSelector([audioReducer], (state) => state.audioRefs);