import { Button, Table, Slider } from "@mantine/core";
import { Checkbox } from "@mantine/core";
import { FileInput } from "@mantine/core";
import { Select } from "@mantine/core";

import { useEffect, useState, useRef, createRef } from "react";

import EditIcon from "../../assets/icon/edit.svg";
import DeleteIcon from "../../assets/icon/trash-2.svg";

import AudioPlayer from "../Audio/audio";
import ReactAudioPlayer from "react-audio-player";

import { BaseDirectory, readDir } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";

import {
  eventRecordsSelector,
  setEventRecords,
  deleteEventRecordsById,
} from "../../stores/event-record";

import {
  createDefualtValue,
  createNewAudioPlayerRow,
} from "../../utils/SoundTable";

import ActionButton from "../Button/ActionButton";
import AudioButton from "../Button/AudioButton";
import { useAppDispatch, useAppSelector } from "../../stores/hook";
import {
  audioRefSelector,
  setAudioRefs,
  setAudioButton,
} from "../../stores/audio";
import { AudioRefsType } from "../../stores/audio/audio.type";
import { EventRecordType } from "../../stores/event-record/event-record.type";
import { eventListSelector } from "../../stores/event-record/event-record.selector";
import { getAudioRefByRefId } from "../../stores/audio/audio.selector";
import { useDispatch, useSelector } from "react-redux";

type AudioRefType = { refId: string; isPlaying: boolean };

const SoundTable = () => {
  const dispatch = useAppDispatch();
  // const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  // const [audioRefs, setAudioRefs] = useState<AudioRefsType[]>([]);
  const [audioSoundPaths, setAudioSoundPaths] = useState<{
    [key: string]: string;
  }>({});
  const [path, setPath] = useState("./");

  const eventRecords = useAppSelector(eventRecordsSelector);
  const audioRefs = useAppSelector(audioRefSelector);
  const eventList = useAppSelector(eventListSelector);

  // TODO: Delete log when production
  // console.log("rendering sound-table");
  // console.log("file upload:", file);
  console.log("eventRecords:", eventRecords);
  console.log("audioRefs:", audioRefs);
  console.log("audioSoundPaths:", audioSoundPaths);

  // TODO: Store persist data

  // Create Refs to audio player object
  useEffect(() => {
    dispatch(setAudioRefs(createNewAudioPlayerRow(eventRecords, audioRefs)));
  }, [eventRecords]);

  // Create audio wav path
  // will be in redux thunk because containt side effect of asycn
  useEffect(() => {
    const updateStatePath: any = {};

    const readFileHandler = async (refId: string, filePath: string) => {
      try {
        const path = await join(filePath);
        const fileConvetedPath = await convertFileSrc(path);
        updateStatePath[refId] = fileConvetedPath;
      } catch (e) {
        console.log("Read file Error:", e);
      }
    };

    setAudioSoundPaths(updateStatePath);

    eventRecords.map(async (item: EventRecordType) => {
      await readFileHandler(item.id, item.sound);
    });
  }, [eventRecords]);

  const onAddHandler = () => {
    const defualtValue = createDefualtValue();
    console.log(defualtValue);
    dispatch(setEventRecords([...eventRecords, defualtValue]));
  };

  const onDeleteHanler = (id: string, refId: string) => {
    const newAudioRefs: AudioRefsType[] = audioRefs!.filter(
      (item: any) => item.refId != refId
    );
    dispatch(deleteEventRecordsById(id));
    dispatch(setAudioRefs(newAudioRefs));
  };

  const onPressPlayHandler = (refId: string) => {
    /* Handle while play and pause button was pressed */
    const element = useSelector(getAudioRefByRefId(refId));
    console.log(
      "element.current instanceof ReactAudioPlayer:",
      element!.current instanceof ReactAudioPlayer
    );
    if (element!.current instanceof ReactAudioPlayer) {
    }
    // const audioEvent = element?.current!.audioEl.current;
    const audioEvent = element!.current.audioEl.current;
    const state = element!.isPlaying;

    if (!state) {
      // Play a audio and loop until pause button was clicked.
      audioEvent!.play();
      audioEvent!.loop = true;

      // update newAudioRefs state
      const newAudioRefs = [...audioRefs];
      newAudioRefs.map((item: AudioRefType) => {
        if (item.refId === refId) item.isPlaying = true;
        return item;
      });
      dispatch(setAudioRefs(newAudioRefs));
    } else {
      // Stop sound playback
      audioEvent!.pause();
      audioEvent!.load();

      // update newAudioRefs state
      const newAudioRefs = [...audioRefs];
      newAudioRefs.map((item: AudioRefType) => {
        if (item.refId === refId) item.isPlaying = false;
        return item;
      });
      dispatch(setAudioRefs(newAudioRefs));
    }
  };

  const ths = (
    <tr>
      <th>
        <ActionButton onAddHandler={onAddHandler} />
      </th>
      <th>Volume</th>
      <th>Enable</th>
      <th>Event Name</th>
      <th>Sound Effects</th>
      <th>Delete</th>
    </tr>
  );

  const rows = eventRecords!.map((element: EventRecordType, iter) => {
    let refId = element.id;
    let isEnable = element.enable;

    let audioState;
    let audioVolume;
    let audioSoundPath;

    const audioPlayer = useAppSelector(getAudioRefByRefId(refId))

    console.log("element: " + Object.keys(element));

    try {
      audioState = useAppSelector(getAudioRefByRefId(refId))?.isPlaying;
      audioVolume = useAppSelector(getAudioRefByRefId(refId))?.volume;
      audioSoundPath = audioSoundPaths[refId];
    } catch (e: any) {
      switch (e.message) {
        case "Cannot read properties of undefined (reading 'isPlaying')":
          audioState = false;
          break;
        case "Cannot read properties of undefined (reading 'volume')":
          audioVolume = 0.1;
          break;
        default:
          console.log(e.message);
      }
    }

    return (
      <tr key={refId}>
        <td>
          <div id="AuidoButton">
            <AudioButton
              audioState={audioState}
              onPress={() => onPressPlayHandler(refId)}
            />
            <ReactAudioPlayer
              ref={audioPlayer}
              src={audioSoundPath}
              volume={audioVolume}
            ></ReactAudioPlayer>
          </div>
        </td>
        <td>
          <Slider
            maw={"auto"}
            value={parseFloat((audioVolume! * 100).toFixed(2))}
            onChange={(event) => {
              const newAudioRefs = [...audioRefs];
              newAudioRefs.map((item) => {
                if (item.refId === refId) item.volume = event / 100;
                return item;
              });
              dispatch(setAudioRefs(newAudioRefs));
              return event;
            }}
            onChangeEnd={(event) => {
              console.log("onChangeEnd:", "ทำอะไรต่อดีละเนี่ย");
            }}
          />
        </td>
        <td>
          <Checkbox
            defaultChecked={isEnable}
            value={isEnable ? "true" : "false"}
            onChange={(event) => {
              isEnable = !event.currentTarget.checked;
            }}
          />
        </td>
        <td>
          <Select
            searchable
            label=""
            placeholder="Pick one of these event"
            data={eventList}
            // value={eventList[1]}
            // onChange={setValue}
          />
        </td>
        <td>
          <FileInput
            onChange={(event) => console.log("event:", event)}
            placeholder="Choose File"
            label=""
            withAsterisk
          />
        </td>
        <td>
          <Button
            color="red"
            onClick={() => {
              onDeleteHanler(element.id, (refId = refId));
            }}
          >
            Delete
            <img src={DeleteIcon} alt="" style={{ marginLeft: "0.5rem" }} />
          </Button>
        </td>
      </tr>
    );
  });

  // TODO: Delete on production
  console.log("============= Slice ================");
  return (
    <div>
      <Table highlightOnHover>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
      {eventRecords?.length === 0 && (
        <p style={{ display: "flex", justifyContent: "center" }}>
          Not found any events, please add some first.
        </p>
      )}
      {/* <h3>Path: {path}</h3> */}
    </div>
  );
};

export default SoundTable;
