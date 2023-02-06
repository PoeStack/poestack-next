import React, { useCallback, useState } from "react";
import { GenericAggregation } from "../__generated__/resolvers-types";
import { useEffect } from "react";

export default function CharacterAggreationDisplay({
  aggregation,
  allKeys,
  includedRows = [],
  excludedRows = [],
  onSelectionChanged = (e) => {},
}: {
  aggregation: GenericAggregation | undefined | null;
  allKeys: string[];
  includedRows?: any[];
  excludedRows?: any[];
  onSelectionChanged?: (e) => void;
}) {
  if (!aggregation) {
    return <>Loading...</>;
  }

  const mappedRow = allKeys
    .map((key) => {
      const value = aggregation.values.find((a) => a.key === key)?.value ?? 0;
      return { key: key, value: value };
    })
    .filter((e) => !!e.key && e.key !== "" && !excludedRows.includes(e.key))
    .sort((a, b) => b.value - a.value);

  const totalValue = mappedRow.reduce((e, p) => e + p.value, 0);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col space-y-2">
          {excludedRows.map((e) => (
            <>
              <div
                className="text-red-400"
                onClick={() => {
                  onSelectionChanged({ key: e, value: 0 });
                }}
              >
                {e}
              </div>
            </>
          ))}
        </div>
        <div className="flex flex-col space-y-2">
          {mappedRow.map((e) => (
            <>
              <div
                key={e.key}
                className="grid grid-cols-2 items-center"
                onClick={() => {
                  onSelectionChanged?.(e);
                }}
              >
                <div
                  className={
                    includedRows.includes(e.key) ? "text-green-400" : ""
                  }
                >
                  {e.key}
                </div>
                <div className={"text-right"}>
                  {+(((e?.value ?? 0) / totalValue) * 100).toFixed(2)}%
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
