import { useState } from "react";

import { Modal, TextInput, Group, Button } from "@mantine/core";
import { randomId } from "@mantine/hooks";

// import { useForm } from "@mantine/form";
import { UseForm } from "@mantine/form/lib/types";

// TODO: Add form.onsubmit action

export type ModalPopupProps = {
  opened: boolean;
  closed: boolean;
  form: {
    port?: string,
    onSubmit: Function
    getInputProps: (port: string) => {}
  };
};

const ModalPopup = ({ opened, closed, form }: ModalPopupProps) => {
  const [saveButton, setSaveButton] = useState({
    color: "primary",
    text: "Save",
  });

  return (
    <Modal
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
          onSubmit={form.onSubmit(() => {
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
          >
            {saveButton.text}
          </Button>
        </form>
      </Group>
    </Modal>
  );
};

export default ModalPopup;
