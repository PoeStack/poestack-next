import React from "react";

export default function StyledButton({
  text,
  onClick,
  className,
}: {
  text: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <>
      <button
        className={
          "bg-color-secondary hover:bg-color-accent-variant py-1 px-1 text-white rounded-lg " +
          (className ?? "")
        }
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
}
