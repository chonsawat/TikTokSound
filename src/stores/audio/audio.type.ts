import { LegacyRef } from "react";
import ReactAudioPlayer from "react-audio-player";

interface ReactAudioRefsType {
  // audioRef: LegacyRef<ReactAudioPlayer>;
  playButtonRef: LegacyRef<HTMLButtonElement>;
  pauseButtonRef: LegacyRef<HTMLButtonElement>;
}

export type AudioButtonType = {
  content: string;
  variant: string;
};

export type AudioRefsType = {
  refId: string;
  isPlaying: boolean;
  current: ReactAudioPlayer;
  volume: number;
};
