import React from "react";
import { nanoid } from "nanoid";

export default function StyledInput({
  value,
  onChange,
  type = "text",
  label = "",
  placeholder = "",
}: {
  value: string | number | undefined | null;
  placeholder?: string;
  type?: string;
  label?: string;
  onChange: (e) => void;
}) {
  const id = nanoid();

  return (
    <>
      <div className="flex flex-row items-center focus:ring-0 ring-0 ">
        {!!label?.length && <div>{label}</div>}
        <input
          type={type}
          id={id}
          value={value ?? ""}
          className="bg-transparent border w-full border-b border-color-base  rounded-lg m-2 focus:ring-0 ring-0 focus:border-color-accent"
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
