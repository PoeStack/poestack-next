import React from "react";
import { useState, useEffect } from "react";

export default function StyledPaginate({
  currentSkip,
  onSelectionChange,
  limit = 10,
  hasMore,
}: {
  currentSkip: number;
  onSelectionChange: (skip: number, limit: number) => void;
  limit: number;
  hasMore: boolean;
}) {
  return (
    <>
      <div className="flex flex-row space-x-2">
        <div
          onClick={() => {
            const newSkip = Math.max(currentSkip - limit, 0);
            if (newSkip != currentSkip) {
              onSelectionChange(newSkip, limit);
            }
          }}
        >
          Previous
        </div>
        <div
          onClick={() => {
            if (hasMore) {
              onSelectionChange(currentSkip + limit, limit);
            }
          }}
        >
          Next
        </div>
      </div>
    </>
  );
}
