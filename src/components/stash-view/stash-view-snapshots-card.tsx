import moment from "moment";

import StyledCard from "@components/library/styled-card";
import { useStashViewContext } from "@contexts/stash-view-context";

export default function StashViewSnapshotsCard() {
  const { snapshotRecords } = useStashViewContext();

  return (
    <>
      <StyledCard>
        <div>Snapshots</div>
        {snapshotRecords?.map((e) => (
          <div key={e.timestamp}>{moment(e.timestamp).fromNow()}</div>
        ))}
      </StyledCard>
    </>
  );
}
