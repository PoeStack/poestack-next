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
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { PoeStashTab, StashViewValueSnapshotSeries } from "@generated/graphql";
import { StashViewSettings } from "pages/poe/stash-view";
import StyledButton from "@components/styled-button";
import { GeneralUtils } from "@utils/general-util";

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

export function StashViewChartJsTest({
  tabs,
  stashViewSettings,
  setStashViewSettings,
  series,
}: {
  tabs: PoeStashTab[];
  stashViewSettings: StashViewSettings;
  setStashViewSettings: (e: StashViewSettings) => void;
  series: StashViewValueSnapshotSeries[];
}) {
  return (
    <>
      {stashViewSettings.selectedGraph === "net value" ? (
        <StashViewNetValueChart
          tabs={tabs}
          stashViewSettings={stashViewSettings}
          setStashViewSettings={setStashViewSettings}
          series={series}
        />
      ) : (
        <StashViewTabValueChart
          tabs={tabs}
          stashViewSettings={stashViewSettings}
          setStashViewSettings={setStashViewSettings}
          series={series}
        />
      )}
      <StyledButton
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
    </>
  );
}

export function StashViewTabValueChart({
  tabs,
  stashViewSettings,
  setStashViewSettings,
  series,
}: {
  tabs: PoeStashTab[];
  stashViewSettings: StashViewSettings;
  setStashViewSettings: (e: StashViewSettings) => void;
  series: StashViewValueSnapshotSeries[];
}) {
  const filteredSeries = series
    .filter(
      (e) =>
        !stashViewSettings.filterCheckedTabs ||
        stashViewSettings.checkedTabIds.includes(e.stashId)
    )
    .filter((e) => e.values.some((v) => v > 0));

  const datasets = filteredSeries.map((s) => {
    return {
      label: tabs.find((e) => e.id === s.stashId)?.name,
      data: s.values
        .map((v, i) => ({ x: new Date(s.timestamps[i]), y: v }))
        .sort((a, b) => a.x.getTime() - b.x.getTime()),
    };
  });

  const data = {
    datasets: datasets,
  };

  return <Line options={options} data={data} />;
}

export function StashViewNetValueChart({
  tabs,
  stashViewSettings,
  setStashViewSettings,
  series,
}: {
  tabs: PoeStashTab[];
  stashViewSettings: StashViewSettings;
  setStashViewSettings: (e: StashViewSettings) => void;
  series: StashViewValueSnapshotSeries[];
}) {
  const [netValueSeries, setNetValueSeries] = useState<any[]>([]);

  useEffect(() => {
    const filteredSeries = series
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

    const finalSeries = flatSeries.map((e) => {
      stashValueCache[e.stashId] = e.value;
      const netValue = Object.values(stashValueCache).reduce(
        (p: number, c) => p + (c as number),
        0
      );
      return { x: new Date(e.timestamp), y: netValue };
    });
    setNetValueSeries(finalSeries);
  }, [series, stashViewSettings]);

  const data = {
    datasets: [{ label: "Net Value", data: netValueSeries }],
  };

  return <Line options={options} data={data} />;
}
