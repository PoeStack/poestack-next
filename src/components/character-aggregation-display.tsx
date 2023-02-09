import React, { useCallback, useState } from "react";
import { GenericAggregation } from "../__generated__/resolvers-types";
import { useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { GeneralUtils } from "../utils/general-util";

export default function CharacterAggreationDisplay({
  aggregation,
  allKeys,
  totalMatches,
  localSearchString,
  includedRows = [],
  excludedRows = [],
  onSelectionChanged = (e) => {},
}: {
  aggregation: GenericAggregation | undefined | null;
  allKeys: string[];
  totalMatches: number;
  localSearchString: string;
  includedRows?: any[];
  excludedRows?: any[];
  onSelectionChanged?: (e) => void;
}) {
  if (!aggregation) {
    return <>Loading...</>;
  }

  const valueMap = {};
  for (const v of aggregation.values) {
    valueMap[v?.key ?? ""] = v.value;
  }

  const mappedRow = allKeys
    .map((key) => {
      const value = valueMap[key] ?? 0;
      return { key: key, value: value };
    })
    .filter(
      (e) =>
        !!e.key &&
        e.key !== "" &&
        !excludedRows.includes(e.key) &&
        (localSearchString.length === 0 ||
          e.key.toLowerCase().indexOf(localSearchString.toLowerCase()) >= 0)
    )
    .sort((a, b) => b.value - a.value);

  const Row = ({ index, key, style }) => (
    <div
      key={key}
      style={style}
      className="grid grid-cols-2 items-center pr-3"
      onClick={() => {
        onSelectionChanged?.(mappedRow[index]);
      }}
    >
      <div
        className={
          includedRows.includes(mappedRow[index].key) ? "text-green-400" : ""
        }
      >
        {GeneralUtils.capitalize(mappedRow[index].key)}
      </div>
      <div className={"text-right"}>
        {+(((mappedRow[index]?.value ?? 0) / totalMatches) * 100).toFixed(2)}%
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col flex-1 h-full">
        <div className="flex flex-col space-y-2">
          {excludedRows.map((e) => (
            <>
              <div
                key={e.key}
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
        <div className="flex flex-col flex-1">
          <AutoSizer>
            {({ height, width }) => (
              <List
                width={width}
                height={height}
                itemCount={mappedRow.length}
                itemSize={60}
              >
                {Row}
              </List>
            )}
          </AutoSizer>
        </div>
      </div>
    </>
  );
}
