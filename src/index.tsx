/**
 * Main Application Entry Point
 * 
 * This is the root component of the VisGuide application that sets up the routing
 * and authentication context. It serves as the application's entry point and
 * defines the main navigation structure.
 * 
 * The application follows a flow:
 * 1. Start -> Initial landing page
 * 2. Onboarding -> User introduction
 * 3. Calibration -> Device setup
 * 4. Object Detection -> Main feature
 * 5. Registration -> User account creation
 * 6. Completion -> Success confirmation
 * 7. Profile -> User settings
 * 8. Privacy Policy -> Legal information
 * 9. Support -> Help resources
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import all screen components
import { Start } from "./screens/Start/Start";
import { Onboarding } from "./screens/Onboarding/Onboarding";
import { Calibration } from "./screens/Calibration/Calibration";
import { ObjectDetection } from "./screens/ObjectDetection/ObjectDetection";
import { Registration } from "./screens/Registration/Registration";
import { Completion } from "./screens/Completion/Completion";
import { Profile } from "./screens/Profile/Profile";
import { PrivacyPolicy } from "./screens/PrivacyPolicy/PrivacyPolicy";
import Support from "./pages/Support";

// Import authentication context provider
import { AuthProvider } from "./contexts/AuthContext";

// Initialize the React application
ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    {/* Wrap the entire app in the authentication context */}
    <AuthProvider>
      {/* Set up routing with React Router */}
      <BrowserRouter>
        <Routes>
          {/* Define all application routes */}
          <Route path="/" element={<Start />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/calibration" element={<Calibration />} />
          <Route path="/object-detection" element={<ObjectDetection />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/completion" element={<Completion />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);