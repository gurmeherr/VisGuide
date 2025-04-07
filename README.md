# VisGuide - Visual Assistance Application

VisGuide is a web application designed to assist visually impaired individuals by providing real-time object detection and audio feedback. The application uses computer vision to identify objects in the camera feed and provides voice announcements about detected objects and their positions.

## Features

- Real-time object detection using Roboflow API
- Voice announcements for detected objects
- Position description (left, right, top, bottom, center)
- Camera switching between front and back cameras
- Voice toggle functionality
- Responsive design for mobile and desktop

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Web Speech API
- Roboflow API for object detection
- React Webcam

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/VisGuide.git
   cd VisGuide
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Allow camera access when prompted
2. The application will automatically start detecting objects
3. Use the "Camera" button to switch between front and back cameras
4. Use the "Voice" button to toggle voice announcements on/off
5. Use the "Refresh" button to reload the application if needed

## Deployment

This application can be deployed to Vercel or any other hosting platform that supports React applications.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Roboflow for providing the object detection API
- React Webcam for the camera integration
- Web Speech API for voice synthesis
