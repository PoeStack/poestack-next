import StyledCard from "@components/styled-card";
import { StashViewItemSummary, PoeStashTab } from "@generated/graphql";
import { StashViewSettings } from "pages/poe/stash-view";

export function StashViewExportCard({
  items,
  tabs,
  stashSettings,
  setStashViewSettings,
}: {
  items: StashViewItemSummary[];
  tabs: PoeStashTab[];
  stashSettings: StashViewSettings;
  setStashViewSettings: (e: StashViewSettings) => void;
}) {
  return (
    <>
      <StyledCard>Export Items</StyledCard>
    </>
  );
}
