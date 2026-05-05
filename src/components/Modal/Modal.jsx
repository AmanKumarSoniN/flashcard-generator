import React from "react";
import { FaTimes, FaCopy } from "react-icons/fa";

const Modal = ({ url, title, onClose }) => {
  const copy = () => {
    navigator.clipboard.writeText(url);
    alert("Link Copied!");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md relative">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold mb-6 text-center">Share This Deck</h2>

       
        <div className="flex flex-col items-center gap-4 mb-6">
          <button 
            onClick={copy}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all active:scale-95"
          >
            <FaCopy /> Copy Link
          </button>
        </div>

       
        <div className="bg-gray-100 p-3 rounded-lg text-xs text-gray-500 truncate border border-gray-200">
          {url}
        </div>
      </div>
    </div>
  );
};

export default Modal;