import React from "react";

export default function StyledCard({ children, title }) {
  return (
    <>
      <div className="flex-1 rounded shadow-lg bg-theme-color-1 flex flex-col p-3">
        <div className="mb-2 border-b border-b-theme-color-2">
          <h1>{title}</h1>
        </div>
        {children}
      </div>
    </>
  );
}
