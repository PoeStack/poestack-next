import React, { useEffect, useState } from "react";

import "chartjs-adapter-moment";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { PoeStashTab, StashViewValueSnapshotSeries } from "@generated/graphql";
import { GeneralUtils } from "@utils/general-util";
import { useStashViewContext } from "@contexts/stash-view-context";
import moment from "moment";
import StyledButton from "@components/library/styled-button";
import StyledSelect2 from "@components/library/styled-select-2";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options: any = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: "nearest",
  },
  elements: {
    point: {
      radius: 0,
    },
    line: {
      backgroundColor: [
        "#8dd3c7",
        "#ffffb3",
        "#bebada",
        "#fb8072",
        "#80b1d3",
        "#fdb462",
        "#b3de69",
        "#fccde5",
        "#d9d9d9",
        "#bc80bd",
        "#ccebc5",
        "#ffed6f",
      ],
      borderColor: [
        "#8dd3c7",
        "#ffffb3",
        "#bebada",
        "#fb8072",
        "#80b1d3",
        "#fdb462",
        "#b3de69",
        "#fccde5",
        "#d9d9d9",
        "#bc80bd",
        "#ccebc5",
        "#ffed6f",
      ],
    },
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: "day",
      },
    },
  },
};

export function StashViewChartJsTest() {
  const { stashViewSettings, setStashViewSettings } = useStashViewContext();

  function timeConvert(time) {
    const d = moment.duration(time, "minutes");

    let out: string[] = [];

    if (d.days() > 0) out.push(`${d.days()} days`);
    if (d.hours() > 0) out.push(`${d.hours()} hours`);
    if (d.minutes() > 0) out.push(`${d.minutes()} mins`);

    return out.join(" ");
  }

  return (
    <>
      {stashViewSettings.selectedGraph === "net value" ? (
        <StashViewNetValueChart />
      ) : (
        <StashViewTabValueChart />
      )}
      <div className="flex space-x-2">
        <StyledButton
          className="flex-1"
          text={GeneralUtils.capitalize(stashViewSettings.selectedGraph)!}
          onClick={() => {
            setStashViewSettings({
              ...stashViewSettings,
              selectedGraph:
                stashViewSettings.selectedGraph === "net value"
                  ? "tab value"
                  : "net value",
            });
          }}
        />
        <StyledSelect2
          className="flex-1"
          selected={stashViewSettings.relativeTimerseriesFilterMins}
          onSelectChange={(e) =>
            setStashViewSettings({
              ...stashViewSettings,
              relativeTimerseriesFilterMins: e,
            })
          }
          mapToText={(e) => (!!e ? `Last ${timeConvert(e)}` : "All")}
          items={[
            null,
            10,
            20,
            30,
            60,
            60 * 3,
            60 * 6,
            60 * 12,
            60 * 24,
            60 * 24 * 3,
            60 * 24 * 7,
          ]}
        />
      </div>
    </>
  );
}

export function StashViewTabValueChart() {
  const { stashTabs, valueSnapshots, stashViewSettings } =
    useStashViewContext();

  const filteredSeries = valueSnapshots
    .filter(
      (e) =>
        !stashViewSettings.filterCheckedTabs ||
        stashViewSettings.checkedTabIds.includes(e.stashId)
    )
    .filter((e) => e.values.some((v) => v > 0));

  const minTimestamp = !stashViewSettings.relativeTimerseriesFilterMins
    ? 0
    : Date.now() - stashViewSettings.relativeTimerseriesFilterMins * 1000 * 60;
  const datasets = filteredSeries.map((s) => {
    return {
      label: stashTabs.find((e) => e.id === s.stashId)?.name,
      data: s.values
        .map((v, i) => ({ x: new Date(s.timestamps[i]), y: v }))
        .filter((e) => e.x.getTime() > minTimestamp)
        .sort((a, b) => a.x.getTime() - b.x.getTime()),
    };
  });

  const data = {
    datasets: datasets,
  };

  return <Line options={options} data={data} />;
}

export function StashViewNetValueChart() {
  const { valueSnapshots, stashViewSettings } = useStashViewContext();

  const [netValueSeries, setNetValueSeries] = useState<any[]>([]);

  useEffect(() => {
    const filteredSeries = valueSnapshots
      .filter(
        (e) =>
          !stashViewSettings.filterCheckedTabs ||
          stashViewSettings.checkedTabIds?.includes(e.stashId)
      )
      .filter((e) => e.values.some((v) => v > 0));

    const flatSeries = filteredSeries
      .flatMap((s) =>
        s.timestamps.map((t, i) => ({
          stashId: s.stashId,
          value: s.values[i],
          timestamp: new Date(t).valueOf(),
        }))
      )
      .sort((a, b) => a.timestamp - b.timestamp);

    const stashValueCache = {};

    const minTimestamp = !stashViewSettings.relativeTimerseriesFilterMins
      ? 0
      : Date.now() -
        stashViewSettings.relativeTimerseriesFilterMins * 1000 * 60;
    const finalSeries = flatSeries
      .map((e) => {
        stashValueCache[e.stashId] = e.value;
        const netValue = Object.values(stashValueCache).reduce(
          (p: number, c) => p + (c as number),
          0
        );
        return { x: new Date(e.timestamp), y: netValue };
      })
      .filter((e) => e.x.getTime() > minTimestamp);

    setNetValueSeries(finalSeries);
  }, [valueSnapshots, stashViewSettings]);

  const data = {
    datasets: [{ label: "Net Value", data: netValueSeries }],
  };

  return <Line options={options} data={data} />;
}
