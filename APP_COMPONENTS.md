# VisGuide App Component Flow

## App Component Flow Diagram

```mermaid
flowchart LR
    
    
    subgraph React["React Components"]
        UI[UI Layer]
        style UI fill:#bbf,stroke:#333,stroke-width:2px
    end
    
    subgraph Platform["Platform Implementation"]
        iOS[iOS]
        Android[Android]
        style iOS fill:#fbb,stroke:#333,stroke-width:2px
        style Android fill:#fbb,stroke:#333,stroke-width:2px
    end
    
    subgraph Native["Native Modules"]
        Camera[Camera Module]
        Voice[Voice Module]
        Roboflow[Roboflow API]
        Storage[Storage Module]
        style Camera fill:#bfb,stroke:#333,stroke-width:2px
        style Voice fill:#bfb,stroke:#333,stroke-width:2px
        style Roboflow fill:#bfb,stroke:#333,stroke-width:2px
        style Storage fill:#bfb,stroke:#333,stroke-width:2px
    end
    
    subgraph DetectionFlow["Detection Flow"]
        Frame[Frame Capture]
        Process[Process Frame]
        Detect[Object Detection]
        Announce[Voice Announcement]
        style Frame fill:#ffd700,stroke:#333,stroke-width:2px
        style Process fill:#ffd700,stroke:#333,stroke-width:2px
        style Detect fill:#ffd700,stroke:#333,stroke-width:2px
        style Announce fill:#ffd700,stroke:#333,stroke-width:2px
    end

    subgraph App["App Components"]
        Start[App Start]
        Onboarding[Onboarding]
        Calibration[Calibration]
        Detection[Detection Page]
        Registration[Registration]
        Profile[Profile Page]
        style Start fill:#f9f,stroke:#333,stroke-width:2px
        style Onboarding fill:#f9f,stroke:#333,stroke-width:2px
        style Calibration fill:#f9f,stroke:#333,stroke-width:2px
        style Detection fill:#f9f,stroke:#333,stroke-width:2px
        style Registration fill:#f9f,stroke:#333,stroke-width:2px
        style Profile fill:#f9f,stroke:#333,stroke-width:2px
    end
    
    %% App flow
    Start --> Onboarding
    Onboarding --> Calibration
    Calibration --> Detection
    Detection --> Registration
    Registration --> Profile
    
    %% Detection flow
    Detection -.-> DetectionFlow
    
    %% Detection details flow
    Frame --> Process
    Process --> Detect
    Detect --> Announce
    
    %% React component connections
    App <--> React
    
    %% React to Native connections
    UI --> Camera
    UI --> Voice
    UI --> Roboflow
    UI --> Storage
    
    %% Native to Platform connections
    Camera --> iOS
    Camera --> Android
    Voice --> iOS
    Voice --> Android
    Roboflow --> iOS
    Roboflow --> Android
    Storage --> iOS
    Storage --> Android
```

## Component Interaction Sequence

```mermaid
sequenceDiagram
    participant User
    participant App
    participant Platform
    participant Detection
    
    User->>App: Launch App
    App->>Platform: Show Onboarding
    User->>App: Complete Onboarding
    App->>Platform: Show Calibration
    User->>App: Complete Calibration
    Platform->>Platform: Test Voice
    Platform-->>User: Voice Test Feedback
    App->>Platform: Show Detection Page
    User->>App: Use Detection
    App->>Platform: Show Registration
    User->>App: Complete Registration
    App->>Platform: Show Profile
    User->>App: View Profile
    
    %% Detection process
    User->>Detection: Start Detection
    Detection->>Platform: Initialize Camera
    Platform-->>Detection: Camera Ready
    Detection->>Detection: Process Frame
    Detection->>Platform: Send to Roboflow
    Platform-->>Detection: Detection Results
    Detection->>Platform: Generate Description
    Platform-->>User: Voice Feedback
```

## Component Descriptions

### App Components
- **App Start**: Entry point of the application
- **Onboarding**: Introduction to app features and capabilities
- **Calibration**: Setup for user preferences and device capabilities, including voice testing
- **Detection Page**: Main screen for object detection
- **Registration**: User account creation and setup
- **Profile Page**: User profile management

### Detection Flow
- **Frame Capture**: Captures image frames from camera
- **Process Frame**: Prepares frames for AI processing
- **Object Detection**: Identifies objects in the frame using Roboflow
- **Voice Announcement**: Converts detection results to speech

### React Components
- **UI Layer**: User interface components and screens

### Native Modules
- **Camera Module**: Controls camera hardware and frame capture
- **Voice Module**: Handles text-to-speech and audio feedback
- **Roboflow API**: Cloud-based object detection service
- **Storage Module**: Manages user data and preferences

### Platform Implementation
- **iOS**: iOS-specific implementations of native modules
- **Android**: Android-specific implementations of native modules

## Key Interactions

1. **App Flow**
   - App starts with onboarding
   - User completes calibration (including voice testing)
   - User goes to detection page
   - User completes registration
   - User accesses profile page

2. **Detection Process**
   - Camera captures frames
   - Frames are sent to Roboflow API for processing
   - Results are converted to voice announcements
   - User receives audio feedback

3. **React to Native Bridge**
   - React components communicate with native modules
   - UI layer triggers native functionality

4. **Native to Platform**
   - Native modules interface with platform-specific implementations
   - Platform handles hardware access and system services
   - Platform-specific optimizations are applied 