import { createSelector } from "@reduxjs/toolkit";

const eventRecordsReducer = (state) => (state.eventRecords);

export const eventRecordsSelector = createSelector([eventRecordsReducer], (state) => state.eventRecords);