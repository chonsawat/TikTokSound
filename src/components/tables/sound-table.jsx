import { Button, Table, Slider } from "@mantine/core";
import { Checkbox } from "@mantine/core";
import { FileInput } from "@mantine/core";
import { Select } from "@mantine/core";

import { useEffect, useState, useRef, createRef } from "react";

import { randomId } from "@mantine/hooks";

import PlayIcon from "../../assets/icon/play.svg";
import EditIcon from "../../assets/icon/edit.svg";
import DeleteIcon from "../../assets/icon/trash-2.svg";
import MuteIcon from "../../assets/icon/volume-x.svg";
import AudioPlayer from "../audio/audio";
import ReactAudioPlayer from "react-audio-player";

import { BaseDirectory, readDir } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";

import { useStore } from "../../stores/store.store";

const SoundTable = () => {
  const [file, setFile] = useState(null);
  const [audioRefs, setAudioRefs] = useState([]);
  const [audioSoundPaths, setAudioSoundPaths] = useState({});
  const [actionButton, setActionButton] = useState({
    content: "Action",
    variant: "filled",
  });

  const [path, setPath] = useState("./");

  const eventRecords = useStore((state) => state.eventRecords);
  const setEventRecords = useStore((state) => state.setEventRecords);

  // TODO: Delete when production
  // console.log("rendering sound-table");
  // console.log("file upload:", file);
  console.log("eventRecords:", eventRecords);
  console.log("audioRefs:", audioRefs);
  console.log("audioSoundPaths:", audioSoundPaths);

  const eventList = [
    { label: "Following", value: "following" },
    { label: "Subcribe", value: "subcribe" },
    { label: "Any Gift", value: "anygift" },
    { label: "TikTok", value: "tiktok" },
    { label: "Rose", value: "rose" },
    { label: "Heart", value: "heart" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      /* TODO: Store persist data */
      // const store = new Store("/TikTokSound/settings.dat");
      // await store.set("some-key", { value: 5 });
      // const val = await store.get("some-key");
      // console.log(val);
      // await store.save();
      // console.log(val);
      // setPath(appDataDirPath);
    };

    fetchData();
  }, []);

  // Create Refs to audio player object
  useEffect(() => {
    setAudioRefs(
      Array(eventRecords.length)
        .fill()
        .map((_, iter) => {
          let obj = audioRefs[iter] || {
            ...createRef(),
            isPlaying: false,
            volume: eventRecords[iter].volume || 0.3,
            refId: eventRecords[iter].id,
          };
          // console.log(obj);
          return obj;
        })
    );
  }, [eventRecords]);

  // Create audio wav path
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

  const getAudioRefByRefId = (requiredRefId) => {
    const result = audioRefs.find(({ refId }) => refId === requiredRefId);
    // console.log(requiredRefId, result);
    return result;
  };

  const addHandler = () => {
    setEventRecords([
      ...eventRecords,
      {
        id: randomId(),
        enable: true,
        event: "heart",
        sound: "C:\\Users\\Acer\\Documents\\TikTokSoundTemp\\assets\\sound\\begging-meow.wav" || "../assets/sound/begging-meow.wav",
      },
    ]);
  };

  const deleteHanler = (id, refId) => {
    const filterdItems = eventRecords.filter((item) => item.id != id);
    const newAudioRefs = audioRefs.filter((item) => item.refId != refId);
    setEventRecords(filterdItems);
    setAudioRefs(newAudioRefs);
  };

  const pressPlayHandler = (refId) => {
    /* Handle while play and pause button was pressed */
    // const audioEvent = audioRefs[iter].current.audioEl.current;
    const element = getAudioRefByRefId(refId);
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
        <Button
          variant={actionButton.variant}
          onClick={addHandler}
          onMouseOver={(event) => {
            // console.log("mouse over", event);
            if (event.type === "mouseover")
              setActionButton({
                content: "Create new event",
                variant: "outline",
              });
          }}
          onMouseLeave={(event) => {
            // console.log("mouse leave", event);
            if (event.type === "mouseleave")
              setActionButton({ content: "Action", variant: "filled" });
          }}
        >
          {actionButton.content}
        </Button>
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
    let isEnable = element.enable

    let audioState;
    let audioVolume;
    let audioSoundPath;

    console.log("element: " + Object.keys(element));

    try {
      audioState = getAudioRefByRefId(refId).isPlaying;
      audioVolume = getAudioRefByRefId(refId).volume;
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
          <div>
            <Button
              color={audioState ? "pink" : "lime"}
              onClick={() => pressPlayHandler(refId)}
            >
              {audioState ? (
                <>
                  <p>Pause</p>
                  <img
                    src={MuteIcon}
                    width={"20px"}
                    alt=""
                    style={{ marginLeft: "0.5rem" }}
                  />
                </>
              ) : (
                <>
                  <p>Play</p>
                  <img
                    src={PlayIcon}
                    width={"20px"}
                    alt=""
                    style={{ marginLeft: "0.5rem" }}
                  />
                </>
              )}
            </Button>
            <ReactAudioPlayer
              ref={getAudioRefByRefId(refId)}
              src={audioSoundPath}
              volume={audioVolume}
            ></ReactAudioPlayer>
            {/* TODO: Remove edit button */}
            {/* <h3>{auidoVolume}</h3> */}
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
          <Checkbox defaultChecked={isEnable} value={isEnable} onChange={(event) => {isEnable = !(event.currentTarget.checked)}}/>
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
              deleteHanler(element.id, (refId = refId));
            }}
          >
            Delete
            <img src={DeleteIcon} alt="" style={{ marginLeft: "0.5rem" }} />
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <Table highlightOnHover>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
      {eventRecords.length === 0 && (
        <p style={{ display: "flex", justifyContent: "center" }}>
          Not found any events, please add some first.
        </p>
      )}
      {/* <h3>Path: {path}</h3> */}
    </div>
  );
};

export default SoundTable;
