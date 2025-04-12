/**
 * Registration Screen Component
 * 
 * This component handles user registration by collecting basic information
 * such as the user's name. It uses the IOSLayout component for consistent
 * iOS-style UI elements and stores user data in localStorage for persistence.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IOSLayout } from "../../components/IOSLayout";

/**
 * Registration Component
 * 
 * Features:
 * - Collects user's name through a form
 * - Stores user data in localStorage
 * - Provides navigation to completion screen
 * - Uses consistent iOS-style design elements
 * 
 * @returns {JSX.Element} The rendered Registration screen
 */
export const Registration = (): JSX.Element => {
  // Navigation hook for routing
  const navigate = useNavigate();
  
  // Form state management
  const [formData, setFormData] = useState({
    name: ""
  });

  /**
   * Handles form submission
   * - Prevents default form behavior
   * - Merges new form data with existing preferences
   * - Saves updated user data to localStorage
   * - Navigates to completion screen
   * 
   * @param e - Form submission event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save user data
    const userData = {
      ...JSON.parse(localStorage.getItem('userPreferences') || '{}'),
      ...formData
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    navigate('/completion');
  };

  return (
    <IOSLayout>
      {/* Main container with fixed width and top padding */}
      <div className="w-[343px] mx-auto pt-16">
        {/* Header Section */}
        <h2 className="text-[34px] text-[#fbfbff] leading-[46px] mb-2">
          Tell us about yourself
        </h2>
        <p className="text-[17px] text-[#fbfbff] mb-8">
          This information helps us personalize your experience
        </p>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input Field */}
          <div>
            <label htmlFor="name" className="block text-[17px] text-[#fbfbff] mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full h-[56px] bg-[#fbfbff] rounded-[12px] px-4 text-[#7968ff] text-[17px] focus:outline-none focus:ring-2 focus:ring-[#fbfbff]"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-[56px] bg-[#fbfbff] rounded-[12px] flex items-center justify-center mt-8"
          >
            <span className="text-[#7968ff] text-[17px] font-semibold">Continue</span>
          </button>
        </form>
      </div>
    </IOSLayout>
  );
}; 