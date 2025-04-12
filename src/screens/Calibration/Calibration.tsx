/**
 * Calibration Screen Component
 * 
 * This component guides users through a series of calibration steps to personalize
 * their experience with the VisGuide application. It includes steps for measuring
 * walking pace, rotation speed, gesture recognition, and audio feedback testing.
 * The component uses the IOSLayout for consistent iOS-style UI elements.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IOSLayout } from "../../components/IOSLayout";
import { BottomNavigation } from "../../components/BottomNavigation";

/**
 * CalibrationStep Interface
 * 
 * Defines the structure for each calibration step:
 * - id: Unique identifier for the step
 * - title: Display title for the step
 * - description: Brief explanation of the step
 * - instruction: Specific instructions for the user
 * - duration: Time allocated for the step in seconds
 */
interface CalibrationStep {
  id: number;
  title: string;
  description: string;
  instruction: string;
  duration: number; // in seconds
}

/**
 * Calibration Steps Configuration
 * 
 * Array of calibration steps that users must complete:
 * 1. Step Length - Measures natural walking pace
 * 2. Rotation - Measures turning speed
 * 3. Gesture Recognition - Tests basic gesture controls
 * 4. Audio Feedback - Verifies audio system functionality
 */
const calibrationSteps: CalibrationStep[] = [
  {
    id: 1,
    title: "Step Length Calibration",
    description: "Let's measure your natural walking pace",
    instruction: "Please walk naturally for 10 steps in a straight line",
    duration: 10
  },
  {
    id: 2,
    title: "Rotation Calibration",
    description: "We'll measure your turning speed",
    instruction: "Please turn 360 degrees to your right at a comfortable pace",
    duration: 5
  },
  {
    id: 3,
    title: "Gesture Recognition",
    description: "Testing basic gesture controls",
    instruction: "Please perform a double tap on the device",
    duration: 3
  },
  {
    id: 4,
    title: "Audio Feedback Test",
    description: "Checking audio response",
    instruction: "Please confirm if you can hear the test sound clearly",
    duration: 2
  }
];

/**
 * Calibration Component
 * 
 * Features:
 * - Multi-step calibration process
 * - Progress tracking and visualization
 * - Timer-based step completion
 * - Audio feedback testing
 * - Data persistence for calibration results
 * 
 * @returns {JSX.Element} The rendered Calibration screen
 */
export const Calibration = (): JSX.Element => {
  // Navigation and state management
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [calibrationData, setCalibrationData] = useState<Record<number, any>>({});
  const [isStepComplete, setIsStepComplete] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  // Get current step data
  const currentStepData = calibrationSteps[currentStep];

  /**
   * Stops the current calibration step
   * - Clears the timer
   * - Resets calibration state
   * - Resets completion state
   */
  const stopCalibration = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
      setIsCalibrating(false);
      setIsStepComplete(false);
      setTimeLeft(0);
    }
  };

  /**
   * Starts the current calibration step
   * - Initializes timer
   * - Tracks progress
   * - Collects calibration data
   */
  const startCalibration = () => {
    setIsCalibrating(true);
    setIsStepComplete(false);
    setTimeLeft(calibrationSteps[currentStep].duration);
    
    // Simulate calibration process
    const newTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(newTimer);
          setTimer(null);
          setIsCalibrating(false);
          setIsStepComplete(true);
          // Simulate collecting calibration data
          setCalibrationData(prev => ({
            ...prev,
            [calibrationSteps[currentStep].id]: {
              timestamp: new Date().toISOString(),
              duration: calibrationSteps[currentStep].duration
            }
          }));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimer(newTimer);
  };

  /**
   * Handles navigation to the next step
   * - Updates current step
   * - Saves calibration data on completion
   * - Navigates to object detection screen
   */
  const handleNext = () => {
    if (currentStep < calibrationSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTimeLeft(0);
      setIsStepComplete(false);
    } else {
      // Save calibration data and navigate to object detection
      localStorage.setItem('calibrationData', JSON.stringify(calibrationData));
      navigate('/object-detection');
    }
  };

  /**
   * Handles navigation to the previous step
   * - Updates current step
   * - Resets step state
   */
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setTimeLeft(0);
      setIsStepComplete(false);
    }
  };

  /**
   * Plays a test sound for audio feedback calibration
   * - Handles iOS audio playback restrictions
   * - Provides error feedback
   * - Manages sound playing state
   */
  const playTestSound = () => {
    const audio = new Audio('/test-sound.mp3');
    
    // iOS requires user interaction before playing audio
    // We'll try to play immediately, and if it fails, we'll show a message
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Sound played successfully');
          // Set a timeout to mark sound as finished playing
          setTimeout(() => {
            setIsSoundPlaying(false);
          }, 3000); // Assuming sound is 3 seconds long
        })
        .catch((error) => {
          console.error('Error playing sound:', error);
          setIsSoundPlaying(false);
          // Show an alert to the user
          alert('Please tap the play button again to hear the sound');
        });
    }
  };

  // Cleanup timer on unmount
  React.useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  return (
    <IOSLayout>
      {/* Main container with fixed width and padding */}
      <div className="w-[343px] mx-auto pt-8 pb-24">
        {/* Progress Bar */}
        <div className="w-full h-2 mb-4 bg-[#2C3E50] opacity-30 rounded-full">
          <div 
            className="h-full bg-[#E74C3C] rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / calibrationSteps.length) * 100}%` }}
          />
        </div>
        {/* Progress Indicators */}
        <div className="w-full flex justify-between items-center mb-8">
          <span className="text-[#fbfbff] text-[13px] opacity-90">
            Step {currentStep + 1} of {calibrationSteps.length}
          </span>
          <span className="text-[#fbfbff] text-[13px] opacity-90">
            {Math.round(((currentStep + 1) / calibrationSteps.length) * 100)}%
          </span>
        </div>

        {/* Step Title and Description */}
        <h2 className="text-[24px] font-semibold text-[#fbfbff] mb-2">
          {calibrationSteps[currentStep].title}
        </h2>
        <p className="text-[17px] text-[#fbfbff] opacity-90 mb-4">
          {calibrationSteps[currentStep].description}
        </p>

        {/* Calibration Instructions Container */}
        <div className="bg-[#fbfbff] rounded-[12px] p-6 mb-8">
          <p className="text-[20px] text-[#4A90E2] font-medium mb-4">
            {calibrationSteps[currentStep].instruction}
          </p>
          {/* Timer Display */}
          {isCalibrating && (
            <div className="text-center">
              <div className="text-[48px] text-[#4A90E2] font-bold mb-2">
                {timeLeft}
              </div>
              <div className="text-[15px] text-[#4A90E2] opacity-80">
                seconds remaining
              </div>
            </div>
          )}
          {/* Completion Message */}
          {isStepComplete && !isCalibrating && (
            <div className="text-center text-[#4A90E2] text-[17px] font-medium">
              Step completed!
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          {/* Audio Test Step Buttons */}
          {currentStep === 3 && (
            <>
              <button
                onClick={playTestSound}
                disabled={isSoundPlaying}
                className="w-full h-[56px] bg-[#fbfbff] rounded-[12px] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
              >
                <span className="text-[#7968ff] text-[17px] font-semibold">
                  {isSoundPlaying ? 'Playing Sound...' : 'Play Test Sound'}
                </span>
              </button>
              <button
                onClick={() => navigate('/object-detection')}
                className="w-full h-[56px] bg-[#fbfbff] rounded-[12px] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
              >
                <span className="text-[#7968ff] text-[17px] font-semibold flex items-center gap-2">
                  Go to Detection
                </span>
              </button>
            </>
          )}
          {/* Regular Step Buttons */}
          {currentStep !== 3 && (
            <button
              onClick={isCalibrating ? stopCalibration : (isStepComplete ? handleNext : startCalibration)}
              className="w-full h-[56px] bg-[#fbfbff] rounded-[12px] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
            >
              <span className="text-[#7968ff] text-[17px] font-semibold">
                {isCalibrating 
                  ? 'Stop Calibration'
                  : isStepComplete 
                    ? (currentStep === calibrationSteps.length - 1 ? 'Finish' : 'Next Step')
                    : 'Start Calibration'
                }
              </span>
            </button>
          )}
        </div>
      </div>
      <BottomNavigation />
    </IOSLayout>
  );
}; 