import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Start } from "./screens/Start/Start";
import { Onboarding } from "./screens/Onboarding/Onboarding";
import { Calibration } from "./screens/Calibration/Calibration";
import { ObjectDetection } from "./screens/ObjectDetection/ObjectDetection";
import { Registration } from "./screens/Registration/Registration";
import { Completion } from "./screens/Completion/Completion";
import { Discover } from "./screens/Discover/Discover";
import { Profile } from "./screens/Profile/Profile";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/calibration" element={<Calibration />} />
        <Route path="/object-detection" element={<ObjectDetection />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/completion" element={<Completion />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);