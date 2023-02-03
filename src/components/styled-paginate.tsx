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
          className="w-20 h-10 relative border-2 rounded-lg hover:bg-skin-primary hover:text-skin-accent"
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
          // className="w-20 h-10 flex flex-col hover:text-skin-accent hover:border-skin-base border-2 rounded-lg hover:bg-skin-primary items-center text-center"
          className="w-20 h-10 relative border-2 rounded-lg hover:bg-skin-primary hover:text-skin-accent "
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
