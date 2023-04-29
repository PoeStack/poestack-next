import moment from "moment";

import CurrencyValueDisplay from "@components/currency-value-display";
import { useStashViewContext } from "@contexts/stash-view-context";
import {
  PoeStashTab,
  StashViewStashSummary,
  StashViewValueSnapshotSeries,
} from "@generated/graphql";
import { GeneralUtils } from "@utils/general-util";

export function StashViewValueChangeCard() {
  const { stashViewSettings, valueSnapshots } = useStashViewContext();

  const tabStartingValuesAll = {};
  const tabStartingValuesTimeseries = {};
  const tabEndingValuesTimeseries = {};

  const timeRangeMin = !stashViewSettings.relativeTimerseriesFilterMins
    ? 0
    : Date.now() - stashViewSettings.relativeTimerseriesFilterMins * 1000 * 60;
  const timeRangeMax = Date.now();

  let firstTimestamp: number | null = null;
  for (const stashSeries of valueSnapshots) {
    const stashId = stashSeries.stashId;
    stashSeries.values.forEach((value, index) => {
      if (tabStartingValuesAll[stashId] === undefined) {
        tabStartingValuesAll[stashId] = value;
      }

      const timestamp = new Date(stashSeries.timestamps[index]).getTime();
      if (timestamp >= timeRangeMin && timestamp <= timeRangeMax) {
        if (firstTimestamp === null || timestamp < firstTimestamp) {
          firstTimestamp = timestamp;
        }

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

  const duration =
    (timeRangeMax - (firstTimestamp ?? timeRangeMax)) / (1000 * 60 * 60);

  const perHourValue =
    totalChangeInRange === 0
      ? 0
      : (totalChangeInRange * (1000 * 60 * 60)) / (timeRangeMax - timeRangeMin);

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="col-span-2">Value Change</div>
        <div>Total Value Change</div>
        <div>
          <CurrencyValueDisplay
            pValue={totalChangeInRange}
            league={stashViewSettings.league}
          />
        </div>
        <div>Duration</div>
        <div className="text-center">
          {GeneralUtils.roundToFirstNoneZeroN(duration)} Hours
        </div>
        <div>Change Per Hour</div>
        <div className="text-center">
          <CurrencyValueDisplay
            pValue={perHourValue}
            league={stashViewSettings.league}
          />
        </div>
      </div>
    </>
  );
}
