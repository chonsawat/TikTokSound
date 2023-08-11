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

import { useDispatch, useSelector } from "react-redux";
import {
  eventRecordsSelector,
  setEventRecords,
  deleteEventRecordsById,
} from "../../stores/event-record";

import {
  createDefualtValue,
  createNewAudioPlayerRow,
  eventList,
  getAudioRefByRefId,
} from "../../utils/SoundTable";

import ActionButton from "../Button/ActionButton";
import AudioButton from "../Button/AudioButton";

const SoundTable = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [audioRefs, setAudioRefs] = useState([]);
  const [audioSoundPaths, setAudioSoundPaths] = useState({});
  const [path, setPath] = useState("./");

  const eventRecords = useSelector(eventRecordsSelector);

  // TODO: Delete log when production
  // console.log("rendering sound-table");
  // console.log("file upload:", file);
  console.log("eventRecords:", eventRecords);
  console.log("audioRefs:", audioRefs);
  console.log("audioSoundPaths:", audioSoundPaths);

  // TODO: Store persist data

  // Create Refs to audio player object
  useEffect(() => {
    setAudioRefs(createNewAudioPlayerRow(eventRecords, audioRefs));
  }, [eventRecords]);

  // Create audio wav path
  // will be in redux thunk because containt side effect of asycn
  useEffect(() => {
    const updateStatePath = {};

    const readFileHandler = async (refId, filePath) => {
      try {
        const path = await join(filePath);
        const fileConvetedPath = await convertFileSrc(path);
        updateStatePath[refId] = fileConvetedPath;
      } catch (e) {
        console.log("Read file Error:", e);
      }
    };

    setAudioSoundPaths(updateStatePath);

    eventRecords.map(async (item) => {
      await readFileHandler(item.id, item.sound);
    });
  }, [eventRecords]);

  const onAddHandler = () => {
    const defualtValue = createDefualtValue();
    console.log(defualtValue);
    dispatch(setEventRecords([...eventRecords, defualtValue]));
  };

  const onDeleteHanler = (id, refId) => {
    const newAudioRefs = audioRefs.filter((item) => item.refId != refId);
    dispatch(deleteEventRecordsById(id));
    setAudioRefs(newAudioRefs);
  };

  const onPressPlayHandler = (refId) => {
    /* Handle while play and pause button was pressed */
    const element = getAudioRefByRefId(audioRefs, refId);
    const audioEvent = element.current.audioEl.current;
    const state = element.isPlaying;

    if (!state) {
      // Play a audio and loop until pause button was clicked.
      audioEvent.play();
      audioEvent.loop = true;

      // update newAudioRefs state
      const newAudioRefs = [...audioRefs];
      newAudioRefs.map((item) => {
        if (item.refId === refId) item.isPlaying = true;
        return item;
      });
      setAudioRefs(newAudioRefs);
    } else {
      // Stop sound playback
      audioEvent.pause();
      audioEvent.load();

      // update newAudioRefs state
      const newAudioRefs = [...audioRefs];
      newAudioRefs.map((item) => {
        if (item.refId === refId) item.isPlaying = false;
        return item;
      });
      setAudioRefs(newAudioRefs);
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

  const rows = eventRecords?.map((element, iter) => {
    let refId = element.id;
    let isEnable = element.enable;

    let audioState;
    let audioVolume;
    let audioSoundPath;

    console.log("element: " + Object.keys(element));

    try {
      audioState = getAudioRefByRefId(audioRefs, refId).isPlaying;
      audioVolume = getAudioRefByRefId(audioRefs, refId).volume;
      audioSoundPath = audioSoundPaths[refId];
    } catch (e) {
      switch (e.message) {
        case "Cannot read properties of undefined (reading 'isPlaying')":
          audioState = false;
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
           <AudioButton onPress={() => onPressPlayHandler(refId)}/>
            <ReactAudioPlayer
              ref={getAudioRefByRefId(audioRefs, refId)}
              src={audioSoundPath}
              volume={audioVolume}
            ></ReactAudioPlayer>
          </div>
        </td>
        <td>
          <Slider
            maw={"auto"}
            value={(audioVolume * 100).toFixed(2)}
            onChange={(event) => {
              const newAudioRefs = [...audioRefs];
              newAudioRefs.map((item) => {
                if (item.refId === refId) item.volume = event / 100;
                return item;
              });
              setAudioRefs(newAudioRefs);
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
            value={isEnable}
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
            value={""}
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
