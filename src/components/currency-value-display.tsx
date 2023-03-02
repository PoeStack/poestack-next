import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import { usePoeLeagueCtx } from "../contexts/league-context";

export const DIV_ICON =
  "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lNb2RWYWx1ZXMiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/e1a54ff97d/CurrencyModValues.png";

export default function CurrencyValueDisplay({
  valueChaos,
  onClick = null,
}: {
  valueChaos: number;
  onClick?: null | ((n) => void);
}) {
  const { league } = usePoeLeagueCtx();

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
    const round = (v) => +(v ?? 0).toFixed(2);

    const absValue = Math.abs(valueChaos);
    let newDisplay = "" + round(absValue);
    if (chaosRates?.div && absValue >= chaosRates?.div) {
      newDisplay = "" + round(absValue / chaosRates?.div);
      setIcon(DIV_ICON);
    } else {
      setIcon(
        "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxSYXJlIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/d119a0d734/CurrencyRerollRare.png"
      );
    }

    if (valueChaos < 0) {
      newDisplay = `(${newDisplay})`;
    }

    setDisplay(newDisplay);
  }, [chaosRates, valueChaos, setIcon]);

  // <td className="font-semibold">
  //   {!!snapshot.totalValueDivine && (
  //     <div className="grid w-32 grid-cols-2">
  //       <div className="grid items-center justify-end">
  //         {+snapshot.totalValueDivine.toFixed(1)}
  //       </div>
  //       <div className="pl-2 ">
  //         <Image src={DIV_ICON} alt={""} width={30} height={30} />
  //       </div>
  //     </div>
  //   )}
  // </td>;

  return (
    <>
      <div
        className="grid grid-cols-4 space-x-1"
        onClick={() => {
          onClick?.(display);
        }}
      >
        <div className="grid justify-end col-start-2 ">{display}</div>
        <div className="col-start-3 pl-2">
          <Image src={icon} alt={""} width={30} height={30} />
        </div>
      </div>
    </>
  );
}
