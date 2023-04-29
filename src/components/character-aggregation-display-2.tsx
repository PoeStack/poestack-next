import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";

import { GenericIntKeyValue } from "@generated/graphql";
import { GeneralUtils } from "@utils/general-util";
import { LadderVector, LadderVectorSearch } from "@utils/ladder-vector";

import { StyledTooltip } from "./library/styled-tooltip";

export default function CharacterAggregationDisplay2({
  onRowClicked,
  aggregation,
  localSearchString,
  query,
}: {
  onRowClicked: (key: string) => void;
  aggregation: Record<string, number>;
  localSearchString: string;
  query: string | string[] | undefined;
}) {
  let totalMatches = 0;
  const mappedRow = Object.entries(aggregation)
    .map(([key, value]) => {
      totalMatches += value;
      return { key: key, value: value };
    })
    .filter((e) => e.key !== "na")
    .filter((e) =>
      e.key.toLowerCase().includes(localSearchString.toLowerCase())
    )
    .sort((a, b) => b.value - a.value);

  const includeRows = [query]
    .flatMap((e) => e)
    .filter((e) => !e?.startsWith("!"));
  const excludeRows = [query]
    .flatMap((e) => e)
    .filter((e) => e?.startsWith("!"));

  const Row = ({ index, style }) => (
    <div
      style={style}
      className={`truncate grid capitalize cursor-pointer grid-cols-2 items-center hover:bg-color-primary  text-sm space-x-1 pr-2 
      }`}
      onClick={() => {
        onRowClicked?.(mappedRow[index]?.key);
      }}
    >
      <div
        className={`
              truncate
                ${
                  includeRows.includes(mappedRow[index].key)
                    ? "bg-color-primary text-content-accent"
                    : ""
                }`}
      >
        <StyledTooltip
          texts={[`${GeneralUtils.capitalize(mappedRow[index].key)}`]}
          placement="left"
          className="mr-2 delay-500"
          noDuration={true}
        >
          <li className="w-full list-none">
            {GeneralUtils.capitalize(mappedRow[index].key)}
          </li>
        </StyledTooltip>
      </div>
      <div
        className={`text-right ${
          includeRows.includes(mappedRow[index].key)
            ? "bg-skin-primary text-content-accent"
            : ""
        }`}
      >
        {+(((mappedRow[index]?.value ?? 0) / totalMatches) * 100).toFixed(2)}%
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col flex-1 h-full">
        <div className="grid items-center pr-2 space-y-1 text-sm capitalize truncate cursor-pointer hover:bg-color-primary ">
          {excludeRows
            .map((e) => e?.slice(1))
            .map((e) => (
              <>
                <div
                  key={e}
                  className="bg-red-600/50 text-content-base"
                  onClick={() => {
                    onRowClicked(e ?? "");
                  }}
                >
                  <StyledTooltip
                    texts={[`${e}`]}
                    placement="left"
                    className="mr-2 capitalize bg-red-900/50"
                    noDuration={true}
                  >
                    <div>{e}</div>
                  </StyledTooltip>
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
                itemSize={20}
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
