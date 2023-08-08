import { TextInput, Button, Group, Box } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { useForm } from "@mantine/form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";

import "../styles/form-input.module.css"

const FormInput = ({openModal}) => {
  const form = useForm({
    initialValues: {
      tiktok_id: "",
    },
  });

  // console.log("rendering form");
  return (
    <>
      <div>
        <Box maw={500}>
          <Group onSubmit={() => {}}>
            <TextInput
              label="TikTok ID"
              placeholder="Enter TikTok ID"
              {...form.getInputProps("tiktok_id")}
            />
            <Button
              mt={"1.5rem"}
              variant="outline"
              onClick={() =>
                form.setValues({
                  tiktok_id: `@${randomId()}`,
                })
              }
            >
              Connect
            </Button>
            <Button mt={"1.5rem"} variant="default" onClick={openModal}>
              <FontAwesomeIcon icon={faSliders} />
            </Button>
          </Group>
        </Box>
      </div>
      
    </>
  );
};

export default FormInput;
