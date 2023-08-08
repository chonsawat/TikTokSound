import { Button, Table } from "@mantine/core";
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
import { event } from "@tauri-apps/api";

const SoundTable = () => {
  const [audioRefs, setAudioRefs] = useState([]);
  const [eventRecords, setEventRecords] = useState([]);
  const [actionButton, setActionButton] = useState({
    content: "Action",
    variant: "filled",
  });

  const [playButton, setPlayButton] = useState("Play");
  const [path, setPath] = useState("./");

  const eventList = [
    { label: "Following", value: "following" },
    { label: "Subcribe", value: "subcribe" },
    { label: "Any Gift", value: "anygift" },
    { label: "TikTok", value: "tiktok" },
    { label: "Rose", value: "rose" },
    { label: "Heart", value: "heart" },
  ];

  useEffect(() => {
    // setEventRecords([
    //   { id: 1, enable: true, event: "following", sound: null },
    //   { id: 2, enable: false, event: "anygift", sound: null },
    //   { id: 3, enable: false, event: "rose", sound: null },
    // ]);
    const fetchData = async () => {
      /* TODO: Store persist data */
      // const store = new Store("/TikTokSound/settings.dat");
      // await store.set("some-key", { value: 5 });

      // const val = await store.get("some-key");
      // console.log(val);
      // await store.save();

      // console.log(val);

      // setPath(appDataDirPath);
      const rawPath = await join(
        "C:\\Users\\Acer\\Documents\\TikTokSoundTemp\\assets\\sound",
        "fart.wav"
      );
      setPath(convertFileSrc(rawPath));
      console.log(rawPath);
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
            volume: 0.1,
            refId: eventRecords[iter].id,
          };
          // console.log(obj);
          return obj;
        })
    );
  }, [eventRecords]);

  const getAudioRefByRefId = (requiredRefId) => {
    const result = audioRefs.find(({ refId }) => refId === requiredRefId)
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
        sound: null,
      },
    ]);
  };

  const deleteHanler = (id, refId) => {
    const filterdItems = eventRecords.filter((item) => item.id != id);
    const newAudioRefs = audioRefs.filter((item) => item.refId != refId);
    setEventRecords(filterdItems);
    setAudioRefs(newAudioRefs);
  };

  const pressPlayHandler = (iter) => {
    // const audioEvent = audioRefs[iter].current.audioEl.current;
    const element = getAudioRefByRefId(iter)
    const audioEvent = element.current.audioEl.current;
    const state = element.isPlaying;
    console.log(audioEvent);
    audioEvent.play();
    console.log(state);
    if (!state) {
      console.log("Playing", state);
      audioEvent.play();
      audioEvent.loop = true;
      const newAudioRefs = [...audioRefs];
      newAudioRefs.map((item => {
        if (item.refId === iter) item.isPlaying = true;
        return item;
      }))
      setAudioRefs(newAudioRefs);
      console.log(newAudioRefs[iter]);

      console.log(audioEvent.ended);
    } else {
      console.log("Pause", state);
      audioEvent.pause();
      audioEvent.load();
      const newAudioRefs = [...audioRefs];
      newAudioRefs.map((item => {
        if (item.refId === iter) item.isPlaying = false;
        return item;
      }))
      setAudioRefs(newAudioRefs);
      console.log(newAudioRefs[iter]);
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
      <th>Enable</th>
      <th>Event Name</th>
      <th>Sound Effects</th>
      <th>Delete</th>
    </tr>
  );

  const rows = eventRecords?.map((element, iter) => {
    let audioState;
    let auidoVolume;
    let refId = element.id;

    console.log("refId:", refId);

    try {
      audioState = getAudioRefByRefId(refId).isPlaying;
      auidoVolume = getAudioRefByRefId(refId).volume;
    } catch (e) {
      switch (e.message) {
        case "Cannot read properties of undefined (reading 'isPlaying')":
          audioState = false;
        case "Cannot read properties of undefined (reading 'volume')":
          auidoVolume = 0.1;
        default:
          console.log(e.message);
      }
    }

    // console.log("rendering sound-table");
    // console.log("eventRecords:", eventRecords);
    // console.log("audioRefs:", audioRefs);

    return (
      <tr key={element.id}>
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
              src={path}
              volume={auidoVolume}
            ></ReactAudioPlayer>
            {/* TODO: Remove edit button */}
            {/* <h3>{auidoVolume}</h3> */}
            {/* <Button ml="sm" color="orange" onClick={() => {}}>
              Edit
              <img src={EditIcon} alt="" style={{ marginLeft: "0.5rem" }} />
            </Button> */}
          </div>
        </td>
        <td>
          <Checkbox />
        </td>
        <td>
          <Select
            searchable
            label=""
            placeholder="Pick one of these event"
            data={eventList}
          />
        </td>
        <td>
          <FileInput placeholder="Choose File" label="" withAsterisk />
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
