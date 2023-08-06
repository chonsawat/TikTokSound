import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { randomId } from '@mantine/hooks';

const FormInput = () => {
  const form = useForm({
    initialValues: {
      tiktok_id: "",
    },
  });

  return (
    <div>
      <Box maw={320}>
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
        </Group>
      </Box>
    </div>
  );
};

export default FormInput;