import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

import FormInput from "./components/form-input";
import SoundTable from "./components/tables/sound-table";
import LikeTable from "./components/tables/like-table";

function App() {
  return (
    <div className="container">
      <h1>TikTok Sound</h1>
      <p>Play sound rely on event such as Gift, Like, Subcribe.</p>
      <FormInput />

      <div>
        <h4>Event</h4>
        <SoundTable />
      </div>

      <div style={{ "margin-top": "5rem" }}>
        <h4>Like Event</h4>
        <LikeTable />
      </div>
    </div>
  );
}

export default App;
