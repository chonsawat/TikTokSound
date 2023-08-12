import { combineReducers } from "@reduxjs/toolkit"

import { eventRecordsReducer } from "./event-record/event-record.reducer";
import { audioReducer } from "./audio/audio.reducer";

export const rootReducer = combineReducers({
  eventRecords: eventRecordsReducer,
  audio: audioReducer
});

export type RootState = ReturnType<typeof rootReducer>;