import Image from "next/image";
import React, { useState } from "react";
import { useEffect } from "react";

import { gql, useQuery } from "@apollo/client";
import { useCurrencyConversion } from "@contexts/currency-conversion-context";
import { myLoader } from "@utils/general-util";

import { StyledTooltip } from "./library/styled-tooltip";

export const DIV_ICON =
  "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lNb2RWYWx1ZXMiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/e1a54ff97d/CurrencyModValues.png";

export const ALCH_ICON =
  "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lVcGdyYWRlVG9SYXJlIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/f0dc27cd7c/CurrencyUpgradeToRare.png";

export const CHAOS_ICON =
  "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxSYXJlIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/d119a0d734/CurrencyRerollRare.png";

export default function CurrencyValueDisplay({
  pValue,
  onClick = null,
  league,
  forceChaosDisplay,
}: {
  pValue: number;
  league: string | null | undefined;
  onClick?: null | ((n) => void);
  forceChaosDisplay?: boolean;
}) {
  const [display, setDisplay] = useState<string>("");
  const [icon, setIcon] = useState<string>(CHAOS_ICON);
  const { divValueChaos } = useCurrencyConversion();

  useEffect(() => {
    const round = (v) => +(v ?? 0).toFixed(1);

    const absValue = Math.abs(pValue);
    let newDisplay = "" + round(absValue);
    if (league?.toLowerCase()?.includes("ruthless")) {
      setIcon(ALCH_ICON);
    } else if (
      divValueChaos &&
      absValue >= divValueChaos &&
      !forceChaosDisplay
    ) {
      newDisplay = "" + round(absValue / divValueChaos);
      setIcon(DIV_ICON);
    } else {
      setIcon(CHAOS_ICON);
    }

    if (pValue < 0) {
      newDisplay = `(${newDisplay})`;
    }

    setDisplay(newDisplay);
  }, [divValueChaos, pValue, setIcon, league]);

  return (
    <>
      <StyledTooltip
        texts={[`${pValue}c`, `${divValueChaos}c/div`]}
        placement={"auto"}
      >
        <div
          className="flex space-x-1 content-baseline"
          onClick={() => {
            onClick?.(display);
          }}
        >
          <div>{display}</div>
          <div className="">
            <Image
              loader={myLoader}
              src={icon}
              alt={""}
              width={24}
              height={24}
            />
          </div>
        </div>
      </StyledTooltip>
    </>
  );
}
