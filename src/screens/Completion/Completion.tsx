/**
 * Completion Screen Component
 * 
 * This component displays a success message after user registration,
 * welcoming the user and confirming their account creation. It uses
 * the IOSLayout component for consistent iOS-style UI elements and
 * provides navigation to the profile screen.
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { IOSLayout } from "../../components/IOSLayout";

/**
 * Completion Component
 * 
 * Features:
 * - Displays success icon
 * - Shows personalized welcome message
 * - Provides navigation to profile screen
 * - Uses consistent iOS-style design elements
 * 
 * @returns {JSX.Element} The rendered Completion screen
 */
export const Completion = (): JSX.Element => {
  // Navigation hook for routing
  const navigate = useNavigate();
  
  // Load user data from localStorage
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  return (
    <IOSLayout>
      {/* Main container with fixed width and top padding */}
      <div className="w-[343px] mx-auto pt-16">
        {/* Success Icon */}
        <div className="w-[80px] h-[80px] bg-[#fbfbff] rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" stroke="#7968FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Welcome Message Section */}
        <h2 className="text-[34px] text-[#fbfbff] leading-[46px] mb-4">
          Welcome, {userData.name}!
        </h2>
        <p className="text-[17px] text-[#fbfbff] mb-8">
          Your account has been successfully created. We've customized the app based on your preferences to provide the best experience for you.
        </p>

        {/* Start Button */}
        <button
          onClick={() => navigate('/profile')}
          className="w-full h-[56px] bg-[#fbfbff] rounded-[12px] flex items-center justify-center"
        >
          <span className="text-[#7968ff] text-[17px] font-semibold">Start Using VisGuide</span>
        </button>
      </div>
    </IOSLayout>
  );
}; 