import React from "react";
import { useNavigate } from "react-router-dom";

export const Discover = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-center w-full">
      <div className="bg-[#4A90E2] w-[375px] h-[812px] relative">
        {/* Status Bar */}
        <div className="absolute w-[375px] h-11 top-0 left-0">
          <div className="absolute w-[68px] h-[13px] top-[17px] left-[294px]">
            <div className="absolute w-6 h-3 top-px left-[42px] bg-[url(/rectangle.svg)] bg-[100%_100%]">
              <div className="relative w-5 h-2.5 top-px left-px bg-[#fbfbff] rounded-[1.6px]" />
            </div>
            <img className="absolute w-[17px] h-[11px] top-px left-0" alt="Combined shape" src="/combined-shape.svg" />
            <img className="absolute w-[15px] h-[11px] top-px left-[22px]" alt="Wi fi" src="/wi-fi.svg" />
          </div>
          <div className="absolute w-[54px] h-[21px] top-[12px] left-[21px]">
            <div className="absolute w-[54px] h-[21px] top-0 left-0">
              <div className="absolute top-0 left-0 [font-family:'SF_Pro_Text-Semibold',Helvetica] font-normal text-[#fbfbff] text-[17px] tracking-[-0.41px] leading-[22px] whitespace-nowrap">
                19:27
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="absolute w-[375px] h-[92px] top-[44px] left-0">
          <div className="absolute w-[343px] h-[92px] top-0 left-[16px]">
            <div className="absolute w-[343px] h-[92px] top-0 left-0">
              <p className="absolute w-[343px] top-0 left-0 [font-family:'Proxima_Nova_Soft-Regular',Helvetica] font-normal text-[#fbfbff] text-[34px] tracking-[-0.41px] leading-[46px]">
                Discover your next favorite book
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="absolute w-[343px] h-[46px] top-[160px] left-[16px] bg-[#fbfbff] rounded-[12px]">
          <div className="absolute w-[303px] h-[22px] top-[12px] left-[16px]">
            <div className="absolute top-0 left-0 [font-family:'Proxima_Nova_Soft-Regular',Helvetica] font-normal text-[#8e8e93] text-[17px] tracking-[-0.41px] leading-[22px] whitespace-nowrap">
              Search by title, author or ISBN
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="absolute w-[343px] h-[46px] top-[230px] left-[16px] overflow-x-auto">
          <div className="flex gap-2">
            <div className="flex-none px-4 py-2 bg-[#fbfbff] rounded-[12px]">
              <span className="text-[#7968ff] text-[15px] font-semibold">Fiction</span>
            </div>
            <div className="flex-none px-4 py-2 bg-[#fbfbff] rounded-[12px]">
              <span className="text-[#7968ff] text-[15px] font-semibold">Non-Fiction</span>
            </div>
            <div className="flex-none px-4 py-2 bg-[#fbfbff] rounded-[12px]">
              <span className="text-[#7968ff] text-[15px] font-semibold">Science</span>
            </div>
            <div className="flex-none px-4 py-2 bg-[#fbfbff] rounded-[12px]">
              <span className="text-[#7968ff] text-[15px] font-semibold">History</span>
            </div>
          </div>
        </div>

        {/* Book Cards */}
        <div className="absolute w-[343px] top-[300px] left-[16px] flex flex-col gap-4">
          {/* Book Card 1 */}
          <div 
            onClick={() => navigate('/book/1')}
            className="w-full h-[120px] bg-[#fbfbff] rounded-[12px] p-4 flex cursor-pointer hover:bg-[#f5f5f5] transition-colors"
          >
            <div className="w-[72px] h-[92px] bg-gray-200 rounded-[8px]"></div>
            <div className="ml-4 flex flex-col justify-between">
              <div>
                <h3 className="text-[17px] font-semibold text-[#1c1c1e]">The Midnight Library</h3>
                <p className="text-[15px] text-[#8e8e93]">Matt Haig</p>
              </div>
              <div className="flex items-center">
                <span className="text-[15px] text-[#8e8e93]">⭐ 4.5</span>
                <span className="text-[15px] text-[#8e8e93] ml-2">(2.3k reviews)</span>
              </div>
            </div>
          </div>

          {/* Book Card 2 */}
          <div 
            onClick={() => navigate('/book/2')}
            className="w-full h-[120px] bg-[#fbfbff] rounded-[12px] p-4 flex cursor-pointer hover:bg-[#f5f5f5] transition-colors"
          >
            <div className="w-[72px] h-[92px] bg-gray-200 rounded-[8px]"></div>
            <div className="ml-4 flex flex-col justify-between">
              <div>
                <h3 className="text-[17px] font-semibold text-[#1c1c1e]">Atomic Habits</h3>
                <p className="text-[15px] text-[#8e8e93]">James Clear</p>
              </div>
              <div className="flex items-center">
                <span className="text-[15px] text-[#8e8e93]">⭐ 4.8</span>
                <span className="text-[15px] text-[#8e8e93] ml-2">(5.1k reviews)</span>
              </div>
            </div>
          </div>

          {/* Book Card 3 */}
          <div 
            onClick={() => navigate('/book/3')}
            className="w-full h-[120px] bg-[#fbfbff] rounded-[12px] p-4 flex cursor-pointer hover:bg-[#f5f5f5] transition-colors"
          >
            <div className="w-[72px] h-[92px] bg-gray-200 rounded-[8px]"></div>
            <div className="ml-4 flex flex-col justify-between">
              <div>
                <h3 className="text-[17px] font-semibold text-[#1c1c1e]">Project Hail Mary</h3>
                <p className="text-[15px] text-[#8e8e93]">Andy Weir</p>
              </div>
              <div className="flex items-center">
                <span className="text-[15px] text-[#8e8e93]">⭐ 4.9</span>
                <span className="text-[15px] text-[#8e8e93] ml-2">(3.8k reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};