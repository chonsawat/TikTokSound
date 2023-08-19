import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const audioReducer = (state: RootState) => state.audio;

export const audioButtonSelector = createSelector(
  [audioReducer],
  (state) => state.audioButton!
);
export const audioRefSelector = createSelector(
  [audioReducer],
  (state) => state.audioRefs!
);

export const audioStateByAudioRefId = (refId: string) =>
  createSelector([audioRefSelector], (state) =>
    state?.find((item) => item.refId === refId)
  );

export const getAudioRefByRefId = (
  requiredRefId: string
) => createSelector([audioRefSelector], (state) => {
  console.log(state);
  
  // const result = state.find((item) => item!.refId === requiredRefId);
  const result = state[0];
  return result;
});
