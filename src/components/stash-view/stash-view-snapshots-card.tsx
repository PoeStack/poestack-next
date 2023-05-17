import moment from "moment";

import CurrencyValueDisplay from "@components/currency-value-display";
import StyledCard from "@components/library/styled-card";
import { useStashViewContext } from "@contexts/stash-view-context";

export default function StashViewSnapshotsCard() {
  const {
    snapshotRecords,
    selectedSnapshotRecord,
    setSelectedSnapshotRecord,
    stashViewSettings,
  } = useStashViewContext();

  return (
    <>
      <StyledCard>
        <div>Snapshots</div>

        {snapshotRecords?.map((e, i) => (
          <div
            key={e.timestamp}
            className={
              "grid grid-cols-2 cursor-pointer" +
              (selectedSnapshotRecord?.timestamp === e.timestamp
                ? " text-content-accent"
                : "")
            }
            onClick={() => {
              setSelectedSnapshotRecord(i === 0 ? null : e);
            }}
          >
            <div>{moment(e.timestamp).fromNow()}</div>
            <div className="content-end">
              <CurrencyValueDisplay
                pValue={e.fixedValue ?? 0}
                league={stashViewSettings.league}
              />
            </div>
          </div>
        ))}
      </StyledCard>
    </>
  );
}
