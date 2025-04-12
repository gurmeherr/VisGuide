/**
 * Start Screen Component
 * 
 * This is the initial landing screen of the VisGuide application.
 * It displays the app logo and a "Get Started" button that navigates to the onboarding flow.
 * The screen uses the IOSLayout component for consistent iOS-style UI elements.
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { IOSLayout } from "../../components/IOSLayout";

/**
 * Start Component
 * 
 * @returns {JSX.Element} The rendered Start screen
 * 
 * Features:
 * - Displays the VisGuide logo in a clean, iOS-style container
 * - Provides a prominent "Get Started" button for user interaction
 * - Handles logo loading errors gracefully
 * - Uses consistent iOS-style design elements through IOSLayout
 */
export const Start = (): JSX.Element => {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  return (
    <IOSLayout>
      <div className="flex flex-col items-center justify-center h-full">
        {/* Logo Container */}
        {/* 
          The logo is displayed in a full-width container with a light background
          and rounded corners for a modern iOS look. The container has padding
          and flex centering to ensure proper logo placement.
        */}
        <div className="w-full h-[169px] mb-8">
          <div className="w-full h-full bg-[#fbfbff] opacity-100 rounded-[12px] p-6 flex items-center justify-center">
            <img 
              src="/Visguide_logo.png" 
              alt="VisGuide Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                // Log error and hide the image if it fails to load
                console.error('Error loading logo:', e);
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Get Started Button */}
        {/* 
          A full-width button with iOS-style design:
          - Light background (#fbfbff)
          - Rounded corners (12px)
          - Purple text (#7968ff)
          - Bold font weight
          - Fixed height for consistent touch targets
        */}
        <button
          onClick={() => navigate('/onboarding')}
          className="w-full h-[56px] bg-[#fbfbff] rounded-[12px] flex items-center justify-center"
        >
          <span className="text-[#7968ff] text-[17px] font-semibold">Get Started</span>
        </button>
      </div>
    </IOSLayout>
  );
};