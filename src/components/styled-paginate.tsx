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
      <div className="flex flex-row justify-center space-x-40 pt-4">
        <button
          className="w-20 h-10 hover:bg-skin-first hover:text-skin-accent rounded-lg"
          onClick={() => {
            const newSkip = Math.max(currentSkip - limit, 0);
            if (newSkip != currentSkip) {
              onSelectionChange(newSkip, limit);
            }
          }}
        >
          Previous
        </button>
        <button
          className="w-20 h-10 hover:bg-skin-first hover:text-skin-accent rounded-lg"
          onClick={() => {
            if (hasMore) {
              onSelectionChange(currentSkip + limit, limit);
            }
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}
