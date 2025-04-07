import React from "react";
import { useNavigate } from "react-router-dom";
import { IOSLayout } from "../../components/IOSLayout";

interface Preferences {
  [key: string]: string;
}

export const Profile = (): JSX.Element => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const preferences: Preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');

  const preferenceLabels: Record<string, string> = {
    "1": "Vision Impairment Level",
    "2": "Navigation Assistance",
    "3": "Hardware Interaction",
    "4": "Audio Feedback Speed",
    "5": "Obstacle Notifications"
  };

  return (
    <IOSLayout>
      <div className="w-[343px] mx-auto pt-16">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-[100px] h-[100px] bg-[#fbfbff] rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-[40px] text-[#4A90E2] font-bold">
              {userData.name?.[0]?.toUpperCase() || '?'}
            </span>
          </div>
          <h1 className="text-[34px] text-[#fbfbff] font-bold mb-2">{userData.name}</h1>
          <p className="text-[17px] text-[#fbfbff] opacity-80">{userData.age} years old</p>
        </div>

        {/* Preferences Section */}
        <div className="bg-[#fbfbff] rounded-[12px] p-6 mb-6">
          <h2 className="text-[20px] text-[#4A90E2] font-semibold mb-4">Your Preferences</h2>
          
          {/* Display onboarding preferences */}
          {Object.entries(preferences).map(([key, value]) => (
            <div key={key} className="mb-4">
              <h3 className="text-[15px] text-[#4A90E2] font-medium mb-2">
                {preferenceLabels[key]}
              </h3>
              <p className="text-[17px] text-[#4A90E2]">{value}</p>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => {
              localStorage.clear();
              navigate('/');
            }}
            className="w-full h-[56px] bg-[#E74C3C] rounded-[12px] flex items-center justify-center hover:bg-[#C0392B] transition-colors"
          >
            <span className="text-[#fbfbff] text-[17px] font-semibold">Sign Out</span>
          </button>
        </div>
      </div>
    </IOSLayout>
  );
}; 