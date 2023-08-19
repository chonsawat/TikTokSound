import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const eventRecordsReducer = (state: RootState) => (state.eventRecords);

export const eventRecordsSelector = createSelector([eventRecordsReducer], (state) => state.eventRecords);
export const eventListSelector = createSelector([eventRecordsReducer], (state) => state.eventList);