import PlayIcon from "../../assets/icon/play.svg";
import MuteIcon from "../../assets/icon/volume-x.svg";

import { Button, Table, Slider } from "@mantine/core";

type AudioButtonProps = {
    audioState: boolean,
    onPress: () => {}
}

const AudioButton = ({audioState, onPress}: AudioButtonProps) => {
  return (
    <Button
    color={audioState ? "pink" : "lime"}
    onClick={onPress}
  >
    {audioState ? (
      <>
        <p>Pause</p>
        <img
          src={"../../assets/icon/play.svg"}
          width={"20px"}
          alt=""
          style={{ marginLeft: "0.5rem" }}
        />
      </>
    ) : (
      <>
        <p>Play</p>
        <img
          src={"../../assets/icon/volume-x.svg"}
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