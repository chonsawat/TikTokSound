import { Button } from "@mantine/core";

import { useAppDispatch, useAppSelector } from "../../stores/hook";
import { audioButtonSelector } from "../../stores/audio";

import PlayIcon from "../../assets/icon/play.svg";
import MuteIcon from "../../assets/icon/volume-x.svg";

type AudioButtonProps = {
    audioState: boolean,
    onPress: () => void
}

const AudioButton : React.FC<AudioButtonProps> = ({audioState, onPress}) => {
  const dispatch = useAppDispatch();
  const actionButton = useAppSelector(audioButtonSelector);

  return (
    <Button
    color={audioState ? "pink" : "lime"}
    onClick={onPress}
  >
    {audioState ? (
      <>
        <p>Pause</p>
        <img
          src={PlayIcon}
          width={"20px"}
          alt=""
          style={{ marginLeft: "0.5rem" }}
        />
      </>
    ) : (
      <>
        <p>Play</p>
        <img
          src={MuteIcon}
          width={"20px"}
          alt=""
          style={{ marginLeft: "0.5rem" }}
        />
      </>
    )}
  </Button>
  )
}

export default AudioButton