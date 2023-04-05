import React from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { GeneralUtils } from "@utils/general-util";
import { StyledTooltip } from "./styled-tooltip";
import { GenericIntKeyValue } from "@generated/graphql";
import StyledLoading from "./styled-loading";

export default function CharacterAggregationDisplay({
  values,
  allKeys,
  totalMatches,
  localSearchString,
  includedRows = [],
  excludedRows = [],
  onSelectionChanged = (e) => {},
  keyToText = (e) => e.key,
}: {
  values: GenericIntKeyValue[] | undefined | null;
  allKeys: string[];
  totalMatches: number;
  localSearchString: string;
  includedRows?: any[];
  excludedRows?: any[];
  onSelectionChanged?: (e) => void;
  keyToText?: (e) => string;
}) {
  if (!values) {
    return (
      <>
        <StyledLoading />
      </>
    );
  }

  const valueMap = {};
  for (const v of values) {
    valueMap[v?.key ?? ""] = v;
  }

  const mappedRow = allKeys
    .map((key) => {
      const value = valueMap[key];
      return { ...value, key: key, value: value?.value ?? 0 };
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

  const Row = ({ index, style }) => (
    <div
      style={style}
      className={`truncate grid capitalize cursor-pointer grid-cols-2 items-center hover:bg-color-primary  text-sm space-x-1 pr-2 ${
        includedRows.includes(mappedRow[index].key)
          ? "bg-color-primary"
          : "null"
      }
      }`}
      onClick={() => {
        onSelectionChanged?.(mappedRow[index]);
      }}
    >
      <div
        className={`
        truncate
          ${
            includedRows.includes(mappedRow[index].key)
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
            {GeneralUtils.capitalize(keyToText(mappedRow[index]))}
          </li>
        </StyledTooltip>
      </div>
      <div
        className={`text-right ${
          includedRows.includes(mappedRow[index].key)
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
          {excludedRows.map((e) => (
            <>
              <div
                key={e.key}
                className="bg-red-600/50 text-content-base"
                onClick={() => {
                  onSelectionChanged({ key: e, value: 0 });
                }}
              >
                <StyledTooltip
                  texts={[`${e}`]}
                  placement="left"
                  className="mr-2 capitalize bg-red-900/50"
                  noDuration={true}
                >
                  <div>{keyToText(e)}</div>
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
