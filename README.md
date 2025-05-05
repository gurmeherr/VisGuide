# VisGuide 

## Overview
VisGuide is a device designed to assist visually impaired users by providing real-time object detection, text recognition, and voice guidance. The onboarding app uses advanced AI models to identify objects, read text, and provide audio feedback to help users navigate their environment.

## Features
- Real-time object detection with voice feedback
- Text recognition (OCR) with voice reading
- Voice-guided navigation
- User preferences for voice settings and detection sensitivity
- Profile management with customizable settings

## Technical Architecture

### System Components
```mermaid
graph TD
    A[Mobile App] --> B[Camera Module]
    A --> C[Voice Synthesis]
    A --> D[Object Detection]
    A --> E[Text Recognition]
    B --> D
    B --> E
    D --> C
    E --> C
```

### Data Flow
```mermaid
sequenceDiagram
    participant User
    participant App
    participant Headband
    participant AI
    participant Voice

    User->>App: Open app
    App->>Headband: Initialize camera
    Headband->>AI: Stream frames
    AI->>AI: Process frame
    AI->>Voice: Generate description
    Voice->>User: Speak description
    User->>App: Adjust settings
    App->>AI: Update parameters
```

### Complete System Architecture
```mermaid
sequenceDiagram
    participant User
    participant UI as React UI
    participant Bridge as React Native Bridge
    participant Native as Native Modules
    participant Camera as Camera Module
    participant AI as AI Models
    participant Voice as Voice Synthesis
    participant Storage as Local Storage
    participant Platform as iOS/Android

    User->>UI: Open app
    UI->>Bridge: Initialize app
    Bridge->>Native: Request permissions
    Native->>Platform: Check camera/mic permissions
    Platform-->>Native: Permission status
    Native-->>Bridge: Permission result
    Bridge-->>UI: Update UI state

    User->>UI: Start detection
    UI->>Bridge: Initialize camera
    Bridge->>Native: Start camera
    Native->>Camera: Configure camera
    Camera->>AI: Stream frames
    AI->>AI: Process frame
    AI->>Voice: Generate description
    Voice->>Native: Synthesize speech
    Native->>Platform: Play audio
    Platform-->>User: Voice feedback

    User->>UI: Adjust settings
    UI->>Bridge: Update preferences
    Bridge->>Storage: Save settings
    Storage-->>Bridge: Confirm save
    Bridge->>AI: Update detection parameters
    Bridge->>Voice: Update voice settings

    User->>UI: Switch camera
    UI->>Bridge: Toggle camera
    Bridge->>Native: Switch camera
    Native->>Camera: Reinitialize camera
    Camera->>AI: Resume frame processing

    User->>UI: Toggle voice
    UI->>Bridge: Update voice state
    Bridge->>Voice: Toggle voice synthesis
    Voice-->>Bridge: Voice state
    Bridge-->>UI: Update UI state
```

## Technology Stack
- Frontend: React Native with TypeScript
- AI Models: TensorFlow.js for object detection
- Voice Synthesis: Web Speech API
- Camera: React Native Camera
- State Management: React Context API

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- React Native development environment
- iOS Simulator or Android Emulator

### Installation
1. Clone the repository
```bash
git clone https://github.com/aziz-1/visguide.git
cd visguide
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Run on iOS or Android
```bash
npm run ios
# or
npm run android
```

## Project Structure
```
visguide/
├── src/
│   ├── components/     # Reusable UI components
│   ├── screens/        # App screens
│   ├── services/       # Business logic
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Helper functions
│   └── types/          # TypeScript definitions
├── assets/            # Images, fonts, etc.
└── App.tsx            # Root component
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- TensorFlow.js team for the object detection models
- React Native community for the excellent framework
- All contributors and testers who helped improve the app
