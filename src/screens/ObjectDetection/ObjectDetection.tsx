/**
 * Object Detection Screen Component
 * 
 * This component provides real-time object detection using the device's camera
 * and the Roboflow API. It includes features for voice feedback, camera switching,
 * and visual display of detection results. The component uses the IOSLayout
 * for consistent iOS-style UI elements.
 */

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { IOSLayout } from "../../components/IOSLayout";
import { BottomNavigation } from "../../components/BottomNavigation.tsx";

/**
 * Detection Interface
 * 
 * Represents a single object detection result with:
 * - x, y: Center coordinates of the detected object
 * - width, height: Dimensions of the bounding box
 * - class: The detected object class/label
 * - confidence: Detection confidence score (0-1)
 */
interface Detection {
  x: number;
  y: number;
  width: number;
  height: number;
  class: string;
  confidence: number;
}

// Speech synthesis configuration
const speechSynthesis = window.speechSynthesis;
let lastSpokenTime = 0;
const SPEECH_COOLDOWN = 2000; // Minimum time between speech cues in milliseconds
let lastSpokenObject = ''; // Track the last spoken object
let speechEnabled = false; // Track if speech is enabled

/**
 * Text-to-Speech Function
 * 
 * Converts text to speech using the Web Speech API
 * Includes error handling and rate limiting
 * 
 * @param text - The text to be spoken
 */
const speak = (text: string) => {
  // If speech is not enabled, don't try to speak
  if (!speechEnabled) return;
  
  const currentTime = Date.now();
  if (currentTime - lastSpokenTime < SPEECH_COOLDOWN) return;
  
  try {
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower rate for better clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Get available voices and select an English voice
    const voices = speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    
    // Add error handling
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      // If we get an error, disable speech to prevent repeated errors
      speechEnabled = false;
    };
    
    speechSynthesis.speak(utterance);
    lastSpokenTime = currentTime;
  } catch (error) {
    console.error('Error with speech synthesis:', error);
    speechEnabled = false;
  }
};

/**
 * ObjectDetection Component
 * 
 * Main component for real-time object detection
 * 
 * Features:
 * - Real-time camera feed
 * - Object detection using Roboflow API
 * - Voice feedback for detected objects
 * - Camera switching (front/back)
 * - Visual display of detection results
 * 
 * @returns {JSX.Element} The rendered Object Detection screen
 */
export const ObjectDetection = (): JSX.Element => {
  // Navigation and refs
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tempCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detectionResults, setDetectionResults] = useState<Detection[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [speechStatus, setSpeechStatus] = useState<string>('Voice Off');
  const animationFrameRef = useRef<number>();

  /**
   * Toggles between front and back camera
   */
  const toggleCamera = () => {
    setIsFrontCamera(!isFrontCamera);
  };

  /**
   * Sends image to Roboflow API for object detection
   * 
   * @param imageBlob - The image to be processed
   * @returns Array of detection results
   */
  const detectWithRoboflow = async (imageBlob: Blob) => {
    const formData = new FormData();
    formData.append("file", imageBlob);

    try {
      const res = await fetch(
        "https://detect.roboflow.com/visguide-obstacles/1?api_key=e08hgHrFn1SNnOJh4LD1",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await res.json();
      console.log('Roboflow API response:', data);
      return data.predictions;
    } catch (err) {
      console.error('Error calling Roboflow API:', err);
      return [];
    }
  };

  /**
   * Initializes object detection and sets up continuous detection loop
   */
  useEffect(() => {
    const initializeDetection = async () => {
      try {
        console.log('Initializing object detection...');
        setIsLoading(false);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);

        const detectObjects = async () => {
          if (webcamRef.current?.video?.readyState === 4) {
            try {
              const video = webcamRef.current.video;
              const tempCanvas = tempCanvasRef.current;
              if (!tempCanvas) return;

              // Draw video frame to temp canvas
              const ctx = tempCanvas.getContext('2d');
              if (!ctx) return;

              tempCanvas.width = video.videoWidth;
              tempCanvas.height = video.videoHeight;
              ctx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);

              // Convert canvas to blob
              const blob = await new Promise<Blob>((resolve) => {
                tempCanvas.toBlob((blob) => {
                  if (blob) resolve(blob);
                }, 'image/jpeg');
              });

              console.log('Running inference on frame...');
              const predictions = await detectWithRoboflow(blob);
              
              if (predictions) {
                console.log('Detection results:', predictions);
                renderPredictions(predictions);
                setDetectionResults(predictions);
              }
            } catch (detectionErr) {
              console.error('Detection error:', detectionErr);
            }
          }
          animationFrameRef.current = requestAnimationFrame(detectObjects);
        };

        detectObjects();
      } catch (err) {
        console.error('Error initializing detection:', err);
        setError('Failed to initialize object detection. Please try again.');
        setIsLoading(false);
      }
    };

    initializeDetection();

    // Cleanup function to cancel animation frame
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  /**
   * Renders detection results on canvas and updates voice feedback
   * 
   * @param predictions - Array of detection results
   */
  const renderPredictions = (predictions: Detection[]) => {
    if (!canvasRef.current || !webcamRef.current?.video) {
      console.log('Missing canvas or video reference');
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('Could not get canvas context');
      return;
    }

    const video = webcamRef.current.video;
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    console.log('Video dimensions:', { videoWidth, videoHeight });
    console.log('Raw predictions:', predictions);

    // Match canvas size to video
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const validPredictions = predictions.filter(pred => pred.confidence > 0.5);
    console.log('Valid predictions:', validPredictions);
    
    const sortedPredictions = [...validPredictions].sort((a, b) => b.confidence - a.confidence);

    if (sortedPredictions.length > 0) {
      const topDetection = sortedPredictions[0];
      const currentObject = `${topDetection.class} ${getPositionDescription(topDetection, canvas.width, canvas.height)}`;
      
      if (currentObject !== lastSpokenObject) {
        speak(currentObject);
        lastSpokenObject = currentObject;
      }
    } else {
      lastSpokenObject = '';
    }

    // Update detection results state
    setDetectionResults(validPredictions);
  };

  /**
   * Generates a human-readable description of object position
   * 
   * @param detection - The detection result
   * @param width - Canvas width
   * @param height - Canvas height
   * @returns Position description string
   */
  const getPositionDescription = (detection: Detection, width: number, height: number): string => {
    const centerX = detection.x;
    const centerY = detection.y;
    
    let horizontal = '';
    let vertical = '';
    
    // Determine horizontal position
    if (centerX < width * 0.3) horizontal = 'on the left';
    else if (centerX > width * 0.7) horizontal = 'on the right';
    else horizontal = 'in the center';
    
    // Determine vertical position
    if (centerY < height * 0.3) vertical = 'at the top';
    else if (centerY > height * 0.7) vertical = 'at the bottom';
    else vertical = 'in the middle';
    
    return `${horizontal} ${vertical}`;
  };

  /**
   * Initializes speech synthesis and voice selection
   */
  useEffect(() => {
    // Check if speech synthesis is available
    if (!speechSynthesis) {
      console.error('Speech synthesis not supported');
      setSpeechStatus('Voice Off');
      return;
    }
    
    // Load voices
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        console.log('Voices loaded:', voices.length);
      }
    };
    
    // Some browsers need this event to load voices
    speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
    
    // Test speech synthesis
    const testSpeech = () => {
      try {
        const testUtterance = new SpeechSynthesisUtterance('');
        speechSynthesis.speak(testUtterance);
        speechSynthesis.cancel();
        console.log('Speech synthesis test successful');
      } catch (error) {
        console.error('Speech synthesis test failed:', error);
      }
    };
    
    testSpeech();
  }, []);
  
  // Toggle speech on/off
  const toggleSpeech = () => {
    if (speechEnabled) {
      // Disable speech
      speechEnabled = false;
      setSpeechStatus('Voice Off');
      // Cancel any ongoing speech
      speechSynthesis.cancel();
    } else {
      // Enable speech
      try {
        // Create and immediately cancel a test utterance
        const testUtterance = new SpeechSynthesisUtterance('');
        speechSynthesis.speak(testUtterance);
        speechSynthesis.cancel();
        
        speechEnabled = true;
        setSpeechStatus('Voice On');
        
        // Speak a test message
        setTimeout(() => {
          speak('Voice enabled');
        }, 100);
      } catch (error) {
        console.error('Failed to enable speech:', error);
        setSpeechStatus('Voice Off');
      }
    }
  };

  const handleNext = () => {
    localStorage.setItem('objectDetectionResults', JSON.stringify(detectionResults));
    navigate('/registration');
  };

  return (
    <IOSLayout>
      <div className="w-[343px] mx-auto pt-4 pb-20">
        {/* Progress Bar */}
        <div className="w-full h-1.5 mb-2 bg-[#2C3E50] opacity-30 rounded-full">
          <div 
            className="h-full bg-[#E74C3C] rounded-full transition-all duration-300"
            style={{ width: `${isLoading ? 0 : 100}%` }}
          />
        </div>
        <div className="w-full flex justify-between items-center mb-4">
          <span className="text-[#fbfbff] text-[12px] opacity-90">
            Object Detection
          </span>
          <span className="text-[#fbfbff] text-[12px] opacity-90">
            {isLoading ? 0 : 100}%
          </span>
        </div>

        {/* Content */}
        <div className="w-full">
          <h2 className="text-[20px] font-semibold text-[#fbfbff] mb-1">
            Object Detection Calibration
          </h2>
          <p className="text-[15px] text-[#fbfbff] opacity-90 mb-3">
            Let's calibrate the object detection system
          </p>

          {/* Success Message */}
          {showSuccessMessage && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-[12px] z-50 animate-fade-in-out">
              <p className="text-sm font-medium">🚀 Model loaded successfully!</p>
            </div>
          )}

          {/* Camera Feed */}
          <div className="relative w-full aspect-video bg-black rounded-[12px] overflow-hidden mb-4">
            <Webcam
              ref={webcamRef}
              audio={false}
              mirrored={isFrontCamera}
              screenshotFormat="image/jpeg"
              className="w-full h-full object-cover"
              videoConstraints={{
                facingMode: isFrontCamera ? 'user' : 'environment',
                width: { ideal: 1280 },
                height: { ideal: 720 }
              }}
            />
            {/* Canvas is hidden but still used for capturing frames */}
            <canvas
              ref={canvasRef}
              style={{ display: 'none' }}
            />
            {/* Hidden canvas for capturing frames */}
            <canvas
              ref={tempCanvasRef}
              style={{ display: 'none' }}
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-center">
                  <span className="text-white text-lg block mb-2">Loading detection model...</span>
                  <span className="text-white text-sm">{isLoading ? 0 : 100}%</span>
                </div>
              </div>
            )}
          </div>

          {/* Compact Camera Controls */}
          <div className="flex justify-between space-x-2 mb-4">
            <button
              onClick={toggleCamera}
              className="flex-1 h-[40px] bg-[#fbfbff] rounded-[12px] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
            >
              <span className="text-[#7968ff] text-xs font-semibold">Camera</span>
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 h-[40px] bg-[#fbfbff] rounded-[12px] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
            >
              <span className="text-[#7968ff] text-xs font-semibold">Refresh</span>
            </button>
            <button
              onClick={toggleSpeech}
              className="flex-1 h-[40px] bg-[#fbfbff] rounded-[12px] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
            >
              <span className="text-[#7968ff] text-xs font-semibold">{speechStatus}</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-[12px] mb-4">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Detection Results */}
          <div className="bg-[#fbfbff] rounded-[12px] p-4 mb-4">
            <h3 className="text-[17px] text-[#4A90E2] font-medium mb-3">
              Detected Objects
            </h3>
            {detectionResults.length > 0 ? (
              <div className="space-y-2">
                {detectionResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg border border-[#4A90E2] border-opacity-20">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[15px] text-[#4A90E2] font-medium">
                          {result.class}
                        </span>
                        <span className="text-xs text-[#4A90E2] opacity-70">
                          ({Math.round(result.x)}, {Math.round(result.y)})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-[#00ff00]"></div>
                      <span className="text-[15px] text-[#4A90E2] font-medium">
                        {Math.round(result.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-3">
                <p className="text-[#4A90E2] opacity-70">
                  {isLoading ? 'Detecting objects...' : 'No objects detected'}
                </p>
              </div>
            )}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleNext}
            className="w-full h-[48px] bg-[#fbfbff] rounded-[12px] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
          >
            <span className="text-[#7968ff] text-[15px] font-semibold">Continue to Registration</span>
          </button>
        </div>
      </div>
      <BottomNavigation />
    </IOSLayout>
  );
}; 