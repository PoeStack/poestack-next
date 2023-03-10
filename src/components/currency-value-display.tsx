import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import { usePoeLeagueCtx } from "../contexts/league-context";
import { myLoader } from "@utils/general-util";

export const DIV_ICON =
  "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lNb2RWYWx1ZXMiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/e1a54ff97d/CurrencyModValues.png";

export const ALCH_ICON =
  "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lVcGdyYWRlVG9SYXJlIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/f0dc27cd7c/CurrencyUpgradeToRare.png";

export default function CurrencyValueDisplay({
  pValue,
  onClick = null,
  league,
}: {
  pValue: number;
  league: string | null | undefined;
  onClick?: null | ((n) => void);
}) {
  const [display, setDisplay] = useState<string>("");
  const [icon, setIcon] = useState<string>(
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxSYXJlIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/d119a0d734/CurrencyRerollRare.png"
  );

  const [chaosRates, setChaosRates] = useState<{
    div: number;
    ex: number;
  } | null>(null);
  useQuery(
    gql`
      query CurrenyValuePullDivAndEx(
        $key: String!
        $key2: String!
        $league: String!
      ) {
        div: itemGroupValueChaos(key: $key, league: $league)
        ex: itemGroupValueChaos(key: $key2, league: $league)
      }
    `,
    {
      skip: !league,
      variables: {
        league: league,
        key: "divine orb",
        key2: "exalted orb",
      },
      fetchPolicy: "cache-first",
      onCompleted(data) {
        setChaosRates(data);
      },
    }
  );

  useEffect(() => {
    const round = (v) => +(v ?? 0).toFixed(1);

    const absValue = Math.abs(pValue);
    let newDisplay = "" + round(absValue);
    if (league?.toLowerCase()?.includes("ruthless")) {
      setIcon(ALCH_ICON);
    } else if (chaosRates?.div && absValue >= chaosRates?.div) {
      newDisplay = "" + round(absValue / chaosRates?.div);
      setIcon(DIV_ICON);
    } else {
      setIcon(
        "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxSYXJlIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/d119a0d734/CurrencyRerollRare.png"
      );
    }

    if (pValue < 0) {
      newDisplay = `(${newDisplay})`;
    }

    setDisplay(newDisplay);
  }, [chaosRates, pValue, setIcon, league]);

  return (
    <>
      <div
        className="grid grid-cols-2 text-center space-x-1 place-content-center place-items-center w-fit"
        onClick={() => {
          onClick?.(display);
        }}
      >
        <div>{display}</div>
        <div>
          <Image loader={myLoader} src={icon} alt={""} width={30} height={30} />
        </div>
      </div>
    </>
  );
}
