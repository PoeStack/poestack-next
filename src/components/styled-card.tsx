import React from "react";

export default function StyledCard({
  children,
  title,
  className,
}: {
  children?: any;
  title?: string;
  className?: string;
}) {
  return (
    <>
      {/* Keep a space after p-3 in div className. */}
      <div
        className={
          "rounded shadow-lg bg-surface-primary flex flex-col p-3 " +
          (className ? className : "")
        }
      >
        <div className="mb-2">
          <h1>{title}</h1>
        </div>
        {children}
      </div>
    </>
  );
}
