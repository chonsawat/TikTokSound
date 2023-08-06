import { Button, Table } from "@mantine/core";
import { Checkbox } from "@mantine/core";
import { FileInput } from "@mantine/core";
import { Select } from "@mantine/core";
import { useEffect, useState } from "react";

import { randomId } from "@mantine/hooks";

import PlayIcon from "../../assets/icon/play.svg";
import EditIcon from "../../assets/icon/edit.svg";
import DeleteIcon from "../../assets/icon/trash-2.svg";
import AudioPlay from "../temp-audio";
import AudioPlayer from "../audio/audio";

const SoundTable = () => {
  const [eventRecords, setEventRecords] = useState([]);
  const [actionButton, setActionButton] = useState({
    content: "Action",
    variant: "filled",
  });

  const [playButton, setPlayButton] = useState("Play");

  const eventList = [
    { label: "Following", value: "following" },
    { label: "Subcribe", value: "subcribe" },
    { label: "Any Gift", value: "anygift" },
    { label: "TikTok", value: "tiktok" },
    { label: "Rose", value: "rose" },
    { label: "Heart", value: "heart" },
  ];

  useEffect(() => {
    setEventRecords([
      { id: 1, enable: true, event: "following", sound: null },
      { id: 2, enable: false, event: "anygift", sound: null },
      { id: 3, enable: false, event: "rose", sound: null },
      { id: 4, enable: true, event: "heart", sound: null },
    ]);
  }, []);

  const addHandler = () => {
    setEventRecords([
      ...eventRecords,
      { id: randomId(), enable: true, event: "heart", sound: null },
    ]);
  };

  const deleteHanler = (id) => {
    const filterdItems = eventRecords.filter((item) => item.id != id);
    setEventRecords(filterdItems);
  };

  const ths = (
    <tr>
      <th>
        <Button
          variant={actionButton.variant}
          onClick={addHandler}
          onMouseOver={(event) => {
            if (event.type === "mouseover")
            console.log("mouse over", event);
              setActionButton({
                content: "Create new event",
                variant: "outline",
              });
          }}
          onMouseLeave={(event) => {
            console.log(event);
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

  const rows = eventRecords?.map((element) => (
    <tr key={element.id}>
      <td>
        <div>
          <Button color="cyan" onClick={() => {}}>
            Play
            <img
              src={PlayIcon}
              width={"20px"}
              alt=""
              style={{ marginLeft: "0.5rem" }}
            />
          </Button>
          <Button ml="sm" color="orange" onClick={() => {}}>
            Edit
            <img src={EditIcon} alt="" style={{ marginLeft: "0.5rem" }} />
          </Button>
        </div>
      </td>
      <td>
        <Checkbox />
      </td>
      <td>
        <Select
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
            deleteHanler(element.id);
          }}
        >
          Delete
          <img src={DeleteIcon} alt="" style={{ marginLeft: "0.5rem" }} />
        </Button>
      </td>
    </tr>
  ));

  function play() {
    var audio = document.getElementById("audio");
    audio.play();
  }

  return (
    <div>
      <Table highlightOnHover onClick={play}>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
      {eventRecords.length === 0 && <p style={{"display": "flex", "justify-content": "center"}}>Not found any events, please add some first.</p>}
      {/* <AudioPlay/> */}
      {/* <AudioPlayer /> */}
    </div>
  );
};

export default SoundTable;
