import { useState } from "react";
import AiOrderWidget from "./AiOrderWidget";
import { assets } from "../assets/assets";

const AiAssistantWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <button
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-[tomato] to-orange-400 rounded-xl shadow-lg px-6 py-4 hover:scale-105 transition-all cursor-pointer border border-gray-200 animate-pulse-assistant flex items-center gap-4"
          onClick={() => setOpen(true)}
          aria-label="Open AI Assistant"
        >
          <img
            src={assets.assistant_icon}
            alt="AI Assistant"
            className="w-14 h-14 bg-white rounded-full"
          />
          <span className="text-sm font-semibold text-white text-left">
            Not sure what to eat?
            <br />
            Let our AI Chef help you!
          </span>
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
