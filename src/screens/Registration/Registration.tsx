import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IOSLayout } from "../../components/IOSLayout";

export const Registration = (): JSX.Element => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: ""
  });

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
      <div className="w-[343px] mx-auto pt-16">
        <h2 className="text-[34px] text-[#fbfbff] leading-[46px] mb-2">
          Tell us about yourself
        </h2>
        <p className="text-[17px] text-[#fbfbff] mb-8">
          This information helps us personalize your experience
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
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