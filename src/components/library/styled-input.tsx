import { nanoid } from "nanoid";
import React from "react";

export default function StyledInput({
  value,
  onChange,
  className = "",
  type = "text",
  label = "",
  placeholder = "",
}: {
  value: string | number | undefined | null;
  className?: string;
  placeholder?: string;
  type?: string;
  label?: string;
  onChange: (e) => void;
}) {
  const id = nanoid();

  return (
    <>
      <div className="flex flex-row space-x-2 items-center flex-1">
        {!!label?.length && <div>{label}</div>}
        <input
          type={type}
          id={id}
          value={value ?? ""}
          className={
            "bg-transparent border w-full rounded-lg focus:ring-0 ring-0 focus:border-color-accent p-2 text-xs " +
            className
          }
          placeholder={placeholder}
          required
          onChange={(e) => {
            onChange(e?.target?.value);
          }}
        />
      </div>
    </>
  );
}
