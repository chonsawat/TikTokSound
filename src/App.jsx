import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

import FormInput from "./components/form-input";
import SoundTable from "./components/tables/sound-table";
import LikeTable from "./components/tables/like-table";

import { Modal, TextInput, Group, Button } from "@mantine/core";
import { useDisclosure, randomId } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useState } from "react";

function App() {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      port: 8082,
    },
  });
  const [saveButton, setSaveButton] = useState({
    color: "primary",
    text: "Save",
  });

  // console.log("rendering APP");

  return (
    <div className="container">
      <div className="main-app">
        <h1>TikTok Sound</h1>
        <p>Play sound rely on event such as Gift, Like, Subcribe.</p>
        <FormInput openModal={open} />

        <div>
          <h4>Event</h4>
          <SoundTable />
        </div>
      </div>
      <div className="modal-input">
        <Modal
          style={{ position: "0" }}
          opened={opened}
          onClose={() => {
            setSaveButton({ color: "primary", text: "Save" });
            return close();
          }}
          title="Authentication"
          xOffset={0}
          yOffset={"20vh"}
          target="div.modal-input"
          centered
        >
          <Group maw={200}>
            <form
              onSubmit={form.onSubmit((values) => {
                console.log("Sent Form Doing Somthing!");
                setSaveButton({ color: "lime", text: "Saved" });
              })}
            >
              <TextInput
                label="Port"
                placeholder="Default 8082"
                {...form.getInputProps("port")}
              />
              <Button
                type="submit"
                mt={"1.5rem"}
                variant="outline"
                color={saveButton.color}
                onClick={() =>
                  form.setValues({
                    tiktok_id: `@${randomId()}`,
                  })
                }
              >
                {saveButton.text}
              </Button>
            </form>
          </Group>
        </Modal>
      </div>
      {/* <div style={{ "margin-top": "5rem" }}>
        <h4>Like Event</h4>
        <LikeTable />
      </div> */}
    </div>
  );
}

export default App;
