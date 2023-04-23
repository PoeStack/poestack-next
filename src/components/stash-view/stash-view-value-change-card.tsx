import {
  PoeStashTab,
  StashViewStashSummary,
  StashViewValueSnapshotSeries,
} from "@generated/graphql";
import { StashViewSettings } from "pages/poe/stash-view";

export function StashViewValueChangeCard({
  stashSummary,
  tabs,
  stashSettings,
  setStashViewSettings,
  series,
}: {
  stashSummary: StashViewStashSummary;
  tabs: PoeStashTab[];
  stashSettings: StashViewSettings;
  setStashViewSettings: (e: StashViewSettings) => void;
  series: StashViewValueSnapshotSeries[];
}) {
  const tabStartingValuesAll = {};
  const tabStartingValuesTimeseries = {};
  const tabEndingValuesTimeseries = {};

  const timeRangeMin = 0;
  const timeRangeMax = Date.now();

  for (const stashSeries of series) {
    const stashId = stashSeries.stashId;
    stashSeries.values.forEach((value, index) => {
      if (tabStartingValuesAll[stashId] === undefined) {
        tabStartingValuesAll[stashId] = value;
      }

      const timestamp = new Date(stashSeries.timestamps[index]).getTime();
      if (timestamp >= timeRangeMin && timestamp <= timeRangeMax) {
        if (tabStartingValuesTimeseries[stashId] === undefined) {
          tabStartingValuesTimeseries[stashId] = value;
        }
        tabEndingValuesTimeseries[stashId] = value;
      }
    });
  }

  const tabStartingValuesCombined: Record<string, number> = {
    ...tabStartingValuesAll,
    ...tabStartingValuesTimeseries,
  };

  const tabEndingValuesCombined: Record<string, number> = {
    ...tabStartingValuesCombined,
    ...tabEndingValuesTimeseries,
  };

  const tabValueCahngeInRange: Record<string, number> = {};
  Object.entries(tabEndingValuesCombined).forEach(([tabId, value]) => {
    tabValueCahngeInRange[tabId] = value - tabStartingValuesCombined[tabId];
  });

  const totalChangeInRange: number = Object.values(
    tabValueCahngeInRange
  ).reduce((p, c) => p + c, 0);

  return (
    <>
      <div>
        <div>Value Change</div>
        {totalChangeInRange} C
        {/* <div>
          {Object.entries(changes).map(([tabId, value]) => {
            const tab = tabs.find((e) => e.id === tabId);
            return (
              <>
                <div>
                  {tab?.name} : {value}
                </div>
              </>
            );
          })}
        </div> */}
      </div>
    </>
  );
}
