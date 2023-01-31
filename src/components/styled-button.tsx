import React from "react";

export default function StyledButton({ text, onClick }) {
  return (
    <>
      <button
        className="bg-theme-color-3 hover:bg-blue-700 py-1 px-1 text-white rounded-lg"
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
}
