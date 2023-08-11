import "./App.css";

import FormInput from "./components/Input/FormInput";
import SoundTable from "./components/Table/SoundTable";

import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import ModalPopup from "./components/Input/ModalPopup";

function App() {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm< {port: number}>({
    initialValues: {
      port: 8082,
    },
  });

  // TODO: Delete when production
  console.log("rendering APP");

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
        <ModalPopup closed={closed} opened={opened} form={form}/>
      </div>
    </div>
  );
}

export default App;
