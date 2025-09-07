import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-t-[tomato] border-gray-200 rounded-full animate-spin"></div>
        <span className="text-lg font-semibold text-[tomato]">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
