import { createRef } from "react";
import { randomId } from "@mantine/hooks";

const eventList = [
  { label: "Following", value: "following" },
  { label: "Subcribe", value: "subcribe" },
  { label: "Any Gift", value: "anygift" },
  { label: "TikTok", value: "tiktok" },
  { label: "Rose", value: "rose" },
  { label: "Heart", value: "heart" },
  { label: "Heart 2", value: "heart" },
];

const getAudioRefByRefId = (audioRefs, requiredRefId) => {
  const result = audioRefs.find(({ refId }) => refId === requiredRefId);
  return result;
};

const createNewAudioPlayerRow = (eventRecords, audioRefs) => {
  /* 
        createNewAudioPlayerRow: create new default object with ref for audio.
    */
  const newEventRecords = Array(eventRecords.length)
    .fill()
    .map((_, iter) => {
      let obj = audioRefs[iter] || {
        ...createRef(),
        isPlaying: false,
        volume: eventRecords[iter].volume || 0.3,
        refId: eventRecords[iter].id,
      };
      return obj;
    });
  return newEventRecords;
};

const createDefualtValue = () => {
  return {
    id: randomId(),
    enable: true,
    event: "heart",
    volume: Math.random(),
    sound:
      "C:\\Users\\Acer\\Documents\\TikTokSoundTemp\\assets\\sound\\begging-meow.wav" ||
      "../assets/sound/begging-meow.wav",
  };
};

export {
  eventList,
  createNewAudioPlayerRow,
  getAudioRefByRefId,
  createDefualtValue,
};
