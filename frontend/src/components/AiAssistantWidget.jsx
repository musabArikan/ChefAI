import { useState } from "react";
import AiOrderWidget from "./AiOrderWidget";
import { assets } from "../assets/assets";

const AiAssistantWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <button
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-[tomato] to-orange-400 rounded-full shadow-lg p-3 hover:scale-110 transition-all cursor-pointer border border-gray-200 animate-pulse-assistant flex flex-col items-center"
          onClick={() => setOpen(true)}
          aria-label="Open AI Assistant"
        >
          <img
            src={assets.assistant_icon}
            alt="AI Assistant"
            className="w-16 h-16 bg-white rounded-full mb-1"
          />
          <span className="text-xs font-semibold text-white">CHEFAI</span>
        </button>
      )}
      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-50 bg-black/40 transition-opacity animate-fade-in"
            onClick={() => setOpen(false)}
          />
          {/* Widget */}
          <AiOrderWidget open={open} onClose={() => setOpen(false)} />
        </>
      )}
    </>
  );
};

export default AiAssistantWidget;
