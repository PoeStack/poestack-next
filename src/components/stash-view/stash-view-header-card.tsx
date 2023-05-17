import moment from "moment";

import StyledCard from "@components/library/styled-card";
import { useStashViewContext } from "@contexts/stash-view-context";

export default function StashViewHeaderCard() {
  const { snapshotRecords, selectedSnapshotRecord } = useStashViewContext();

  const currentRecord = selectedSnapshotRecord ?? snapshotRecords![0];

  return (
    <>
      <StyledCard className="col-span-1 2xl:col-span-2">
        <div className="flex">
          <div>
            Stash-View Snapshot:{" "}
            {!selectedSnapshotRecord
              ? "Most Recent"
              : new Date(currentRecord.timestamp).toLocaleString()}
          </div>
          <div className="flex-1"></div>
          <div>{moment(currentRecord.timestamp).fromNow()}</div>
        </div>
      </StyledCard>
    </>
  );
}
