import { Button, Table } from "@mantine/core";
import { Checkbox } from "@mantine/core";
import { FileInput } from "@mantine/core";
import { Select } from "@mantine/core";
import { useEffect, useState } from "react";

import { ActionIcon } from "@mantine/core";

import PlayIcon from "../../assets/play.svg";
import EditIcon from "../../assets/edit.svg";
import DeleteIcon from "../../assets/trash-2.svg";

const SoundTable = () => {
  const [eventRecords, setEventRecords] = useState([]);

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

  const ths = (
    <tr>
      <th>Action</th>
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
              style={{ "margin-left": "0.5rem" }}
            />
          </Button>
          <Button ml="sm" color="yellow" onClick={() => {}}>
            Edit
            <img src={EditIcon} alt="" style={{ "margin-left": "0.5rem" }} />
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
        <Button color="red" onClick={() => {}}>
          Delete
          <img src={DeleteIcon} alt="" style={{ "margin-left": "0.5rem" }} />
        </Button>
      </td>
    </tr>
  ));

  console.log(eventRecords);

  return (
    <div>
      <Table highlightOnHover>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
      <Button mt={"1.5rem"} onClick={() => {}}>
        Create more event
      </Button>
    </div>
  );
};

export default SoundTable;
