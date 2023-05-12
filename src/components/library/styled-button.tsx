import React from "react";

export default function StyledButton({
  text,
  onClick,
  className,
  disabled = false,
}: {
  text: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <>
      <button
        disabled={disabled}
        className={
          "bg-color-secondary hover:bg-color-accent-variant py-1 px-1 text-white rounded-lg pr-5 pl-5" +
          (className ?? "")
        }
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
}
