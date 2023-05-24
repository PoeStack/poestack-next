import {
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-moment";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import StyledButton from "@components/library/styled-button";
import StyledSelect2 from "@components/library/styled-select-2";
import { useCurrencyConversion } from "@contexts/currency-conversion-context";
import { useStashViewContext } from "@contexts/stash-view-context";
import { PoeStashTab, StashViewValueSnapshotSeries } from "@generated/graphql";
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
          mapToText={(e) => (!!e ? `Last ${timeConvert(e)}` : "Full History")}
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
  const { divValueFromChaos } = useCurrencyConversion();
  const { stashTabs, valueSnapshots, stashViewSettings } =
    useStashViewContext();

  const filteredSeries = valueSnapshots
    .filter((e) => stashViewSettings.checkedTabIds.includes(e.stashId))
    .filter((e) => e.values.some((v) => v > 0));

  const minTimestamp = !stashViewSettings.relativeTimerseriesFilterMins
    ? 0
    : Date.now() - stashViewSettings.relativeTimerseriesFilterMins * 1000 * 60;
  const datasets = filteredSeries.map((s) => {
    return {
      label: stashTabs!.find((e) => e.id === s.stashId)?.name,
      data: s.values
        .map((v, i) => {
          const timestamp = new Date(s.timestamps[i]);
          return { x: timestamp, y: divValueFromChaos(v) };
        })
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
  const { divValueFromChaos } = useCurrencyConversion();
  const { valueSnapshots, stashViewSettings } = useStashViewContext();

  const [netValueSeries, setNetValueSeries] = useState<any[]>([]);

  useEffect(() => {
    const filteredSeries = valueSnapshots
      .filter((e) => stashViewSettings.checkedTabIds?.includes(e.stashId))
      .filter((e) => e.values.some((v) => v > 0));

    const stashValueCache: Record<string, number> = {};
    const groupedSeries: Record<
      number,
      { timestamp: number; value: number; stashId: string }[]
    > = {};
    filteredSeries.forEach((s) =>
      s.timestamps.forEach((t, i) => {
        const v = {
          stashId: s.stashId,
          value: s.values[i],
          timestamp: new Date(t).valueOf(),
        };
        if (!stashValueCache[v.stashId]) {
          stashValueCache[v.stashId] = v.value;
        }
        if (!groupedSeries[v.timestamp]) {
          groupedSeries[v.timestamp] = [];
        }
        groupedSeries[v.timestamp].push(v);
      })
    );

    const flatSeries = [...Object.values(groupedSeries)].sort(
      (a, b) => a[0].timestamp - b[0].timestamp
    );

    const minTimestamp = !stashViewSettings.relativeTimerseriesFilterMins
      ? 0
      : Date.now() -
        stashViewSettings.relativeTimerseriesFilterMins * 1000 * 60;
    const finalSeries = flatSeries
      .map((e) => {
        for (const v of e) {
          stashValueCache[v.stashId] = v.value;
        }
        const netValue = Object.values(stashValueCache).reduce(
          (p: number, c) => p + (c as number),
          0
        );
        const timestamp = new Date(e[0].timestamp);
        return { x: timestamp, y: divValueFromChaos(netValue, timestamp) };
      })
      .filter((e) => e.x.getTime() > minTimestamp);

    setNetValueSeries(finalSeries);
  }, [valueSnapshots, stashViewSettings]);

  const data = {
    datasets: [{ label: "Net Value", data: netValueSeries }],
  };

  return <Line options={options} data={data} />;
}
