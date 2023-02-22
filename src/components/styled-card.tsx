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
      <div
        className={
          "rounded shadow-lg bg-surface-primary flex flex-col p-3 md:mx-4 lg:mx-20 my-4" +
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
