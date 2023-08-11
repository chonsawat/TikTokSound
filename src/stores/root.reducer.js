import { combineReducers } from "@reduxjs/toolkit"

import { eventRecordsReducer } from "./event-record/event-record.reducer";

export const rootReducer = combineReducers({
  eventRecords: eventRecordsReducer,
});