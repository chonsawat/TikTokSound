import { combineReducers } from "@reduxjs/toolkit"

import { eventRecordsReducer } from "./event-record/event-record.slice";
import { audioReducer } from "./audio/audio.slice";

export const rootReducer = combineReducers({
  eventRecords: eventRecordsReducer,
  audio: audioReducer
});

export type RootState = ReturnType<typeof rootReducer>;