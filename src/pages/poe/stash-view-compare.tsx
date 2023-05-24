import { useRouter } from "next/router";

import StyledCard from "@components/library/styled-card";
import StashViewComparePanel from "@components/stash-view/stash-view-compare-panel";

export default function StashViewCompare() {
  const router = useRouter();

  if (!router.query.league || !router.query.second || !router.query.first) {
    return <>loading...</>;
  }

  return (
    <>
      <StyledCard>
        <StashViewComparePanel
          league={router.query.league as string}
          second={router.query.second as string}
          first={router.query.first as string}
        />
      </StyledCard>
    </>
  );
}
