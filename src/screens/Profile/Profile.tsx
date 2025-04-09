import React from "react";
import { useNavigate } from "react-router-dom";
import { IOSLayout } from "../../components/IOSLayout";
import { TrashIcon } from '@heroicons/react/24/outline';

interface UserPreferences {
  voiceEnabled: boolean;
  voiceSpeed: number;
  voiceVolume: number;
}

export const Profile = (): JSX.Element => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const preferences: UserPreferences = JSON.parse(localStorage.getItem('preferences') || '{"voiceEnabled":true,"voiceSpeed":1,"voiceVolume":1}');

  const handleSignOut = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('preferences');
    navigate('/');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      localStorage.removeItem('userData');
      localStorage.removeItem('preferences');
      navigate('/');
    }
  };

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
            onClick={() => navigate('/privacy-policy')}
            className="w-full h-[56px] bg-[#2C3E50] rounded-[12px] flex items-center justify-center hover:bg-[#34495E] transition-colors"
          >
            <span className="text-[#fbfbff] text-[17px] font-semibold">Privacy Policy</span>
          </button>
          
          <button
            onClick={() => navigate('/support')}
            className="w-full h-[56px] bg-[#2C3E50] rounded-[12px] flex items-center justify-center hover:bg-[#34495E] transition-colors"
          >
            <span className="text-[#fbfbff] text-[17px] font-semibold">Support</span>
          </button>
          
          <button
            onClick={handleSignOut}
            className="w-full h-[56px] bg-[#E74C3C] rounded-[12px] flex items-center justify-center hover:bg-[#C0392B] transition-colors"
          >
            <span className="text-[#fbfbff] text-[17px] font-semibold">Sign Out</span>
          </button>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition-colors flex items-center gap-2"
          >
            <TrashIcon className="w-5 h-5" />
            Delete Account
          </button>
        </div>
      </div>
    </IOSLayout>
  );
}; 