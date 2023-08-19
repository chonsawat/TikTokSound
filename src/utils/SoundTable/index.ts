import { createRef } from "react";
import { useSelector } from "react-redux";
import { randomId } from "@mantine/hooks";

import { AudioRefsType } from "../../stores/audio/audio.type";
import { EventRecordType } from "../../stores/event-record/event-record.type";
import { eventListSelector } from "../../stores/event-record/event-record.selector";
import ReactAudioPlayer from "react-audio-player";

const createNewAudioPlayerRow = (
  eventRecords: EventRecordType[],
  audioRefs: AudioRefsType[]
) => {
  /* 
        createNewAudioPlayerRow: create new default object with ref for audio.
    */
  const newEventRecords = Array<any>(eventRecords.length).map((_, iter) => {
    let obj = audioRefs[iter] || {
      ...createRef<ReactAudioPlayer>(),
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

export { createNewAudioPlayerRow, createDefualtValue };
