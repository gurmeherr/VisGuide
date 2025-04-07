import React from "react";
import { useNavigate } from "react-router-dom";
import { IOSLayout } from "../../components/IOSLayout";

export const Start = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <IOSLayout>
      <div className="flex flex-col items-center justify-center h-full">
        {/* App Logo */}
        <div className="w-full h-[169px] mb-8">
          <div className="w-full h-full bg-[#fbfbff] opacity-100 rounded-[12px] p-6 flex items-center justify-center">
            <img 
              src="/Visguide_logo.png" 
              alt="VisGuide Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                console.error('Error loading logo:', e);
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Get Started Button */}
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