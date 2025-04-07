import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const BottomNavigation = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] p-3 flex justify-around items-center">
      <button
        onClick={() => navigate('/onboarding')}
        className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-colors ${
          isActive('/onboarding') ? 'text-[#4A90E2]' : 'text-[#6B7280]'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <span className="text-xs font-medium">Onboarding</span>
      </button>

      <button
        onClick={() => navigate('/calibration')}
        className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-colors ${
          isActive('/calibration') ? 'text-[#4A90E2]' : 'text-[#6B7280]'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        <span className="text-xs font-medium">Calibrate</span>
      </button>

      <button
        onClick={() => navigate('/object-detection')}
        className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-colors ${
          isActive('/object-detection') ? 'text-[#4A90E2]' : 'text-[#6B7280]'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <span className="text-xs font-medium">Detect</span>
      </button>
    </div>
  );
}; 