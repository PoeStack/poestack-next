import React, { useState } from "react";
import StyledCard from "./styled-card";
import { StashSnapshot } from "../__generated__/resolvers-types";
import StyledSelect2 from "./styled-select-2";
import { useEffect } from "react";
import CurrencyValueDisplay from "./currency-value-display";

export default function ProfitCard({
  snapshots,
}: {
  snapshots: StashSnapshot[];
}) {
  const [totalProfitChaos, setTotalProfitChaos] = useState(0);
  const [totalProfitChaosPerHour, setTotalProfitChaosPerHour] = useState(0);

  const [selectedStartSnapshot, setSelectedStartSnapshot] =
    useState<StashSnapshot | null>(null);

  const [selectedEndSnapshot, setSelectedEndSnapshot] =
    useState<StashSnapshot | null>(null);

  useEffect(() => {
    if (snapshots.length > 0) {
      setSelectedEndSnapshot(snapshots[0]);
      setSelectedStartSnapshot(snapshots[snapshots.length - 1]);
    }
  }, [snapshots]);

  useEffect(() => {
    if (selectedStartSnapshot && selectedEndSnapshot) {
      const timeDiff =
        new Date(selectedEndSnapshot.createdAtTimestamp).valueOf() -
        new Date(selectedStartSnapshot.createdAtTimestamp).valueOf();
      if (timeDiff >= 0) {
        const valueDiff =
          selectedEndSnapshot.totalValueChaos -
          selectedStartSnapshot.totalValueChaos;

        const perHourValue =
          valueDiff === 0 ? 0 : (valueDiff * (1000 * 60 * 60)) / timeDiff;
        console.log(`${valueDiff} in ${timeDiff} ms`);
        setTotalProfitChaos(valueDiff);
        setTotalProfitChaosPerHour(perHourValue);
      }
    }
  }, [selectedStartSnapshot, selectedEndSnapshot]);

  return (
    <>
      <StyledCard title={"Income"}>
        <div className="flex flex-col grow align-bottom">
          <div className="grow">
            <div className="flex space-x-1">
              <CurrencyValueDisplay valueChaos={totalProfitChaos} />
              <div>total</div>
            </div>
            <div className="flex space-x-1">
              <CurrencyValueDisplay valueChaos={totalProfitChaosPerHour} />
              <div>per hour</div>
            </div>
          </div>

          <div className="flex flex-col">
            <div>
              Between snapshots at (
              {Math.round(
                (new Date(selectedEndSnapshot?.createdAtTimestamp).valueOf() -
                  new Date(
                    selectedStartSnapshot?.createdAtTimestamp
                  ).valueOf()) /
                  1000 /
                  60
              )}{" "}
              mins)
            </div>
            <div className="flex flex-row space-x-2 items-center">
              <div className="grow">
                <StyledSelect2
                  selected={selectedStartSnapshot}
                  onSelectChange={(e) => {
                    setSelectedStartSnapshot(e);
                  }}
                  mapToText={(e) =>
                    e && new Date(e?.createdAtTimestamp).toLocaleString()
                  }
                  items={snapshots.sort(
                    (a, b) =>
                      new Date(b.createdAtTimestamp).valueOf() -
                      new Date(a.createdAtTimestamp).valueOf()
                  )}
                />
              </div>
              <div>to</div>
              <div className="grow">
                <StyledSelect2
                  selected={selectedEndSnapshot}
                  onSelectChange={(e) => {
                    setSelectedEndSnapshot(e);
                  }}
                  mapToText={(e) =>
                    e && new Date(e?.createdAtTimestamp).toLocaleString()
                  }
                  items={snapshots.sort(
                    (a, b) =>
                      new Date(b.createdAtTimestamp).valueOf() -
                      new Date(a.createdAtTimestamp).valueOf()
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </StyledCard>
    </>
  );
}
