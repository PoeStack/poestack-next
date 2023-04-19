import { PoeStashTab, StashViewStashSummary } from "@generated/graphql";
import { StashViewSettings } from "pages/poe/stash-view";

export function StashViewValueChangeCard({
  stashSummary,
  tabs,
  stashSettings,
  setStashViewSettings,
}: {
  stashSummary: StashViewStashSummary;
  tabs: PoeStashTab[];
  stashSettings: StashViewSettings;
  setStashViewSettings: (e: StashViewSettings) => void;
}) {
  return (
    <>
      <div>
        <div>Value Change</div>
        
      </div>
    </>
  );
}
