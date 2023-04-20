import StyledButton from "@components/styled-button";
import StyledCard from "@components/styled-card";
import { PoeStashTab, StashViewValueSnapshotSeries } from "@generated/graphql";
import { GeneralUtils } from "@utils/general-util";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import { StashViewSettings } from "pages/poe/stash-view";
import { useState, useEffect } from "react";

export function StashViewGraphCard({
  stashTabs,
  stashViewSettings,
  setStashViewSettings,
  valueSnapshots,
}: {
  stashTabs: PoeStashTab[];
  stashViewSettings: StashViewSettings;
  setStashViewSettings: (e: StashViewSettings) => void;
  valueSnapshots: StashViewValueSnapshotSeries[];
}) {
  return (
    <>
      <div className="flex flex-col">
        {stashViewSettings.selectedGraph === "tab value" ? (
          <StashViewTabValueGraph
            tabs={stashTabs}
            stashViewSettings={stashViewSettings}
            setStashViewSettings={setStashViewSettings}
            series={valueSnapshots}
          />
        ) : (
          <StashViewNetValueGraph
            tabs={stashTabs}
            stashViewSettings={stashViewSettings}
            setStashViewSettings={setStashViewSettings}
            series={valueSnapshots}
          />
        )}
        <StyledButton
          text={
            GeneralUtils.capitalize(stashViewSettings.selectedGraph) ?? "NA"
          }
          onClick={() => {
            setStashViewSettings({
              ...stashViewSettings,
              selectedGraph:
                stashViewSettings.selectedGraph === "tab value"
                  ? "net value"
                  : "tab value",
            });
          }}
        />
      </div>
    </>
  );
}

export function StashViewNetValueGraph({
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
      return { time: e.timestamp, value: netValue };
    });
    setNetValueSeries(finalSeries);
  }, [series, stashViewSettings]);

  const data1 = [
    { x: "2020-01-01", y: 50 },
    { x: "2020-01-02", y: 10 },
    { x: "2020-01-03", y: 20 },
  ];

  const accessors = {
    xAccessor: (d) => d.x,
    yAccessor: (d) => d.y,
  };

  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: "",
    },
    time: {
      moment: moment,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    yAxis: {
      title: {
        enabled: false,
      },
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        minute: "%l:%M %P",
        hour: "%l:%M %P",
        day: "%e. %b",
        week: "%e. %b",
        month: "%b '%y",
        year: "%Y",
      },
    },
    legend: {
      enabled: false,
      itemStyle: {
        color: "white",
      },
    },
    series: netValueSeries,
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}

export function StashViewTabValueGraph({
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

  const highchartsSeries = filteredSeries.map((s) => {
    return {
      name: tabs.find((e) => s.stashId === e.id)?.name ?? "NA",
      tooltip: {
        valueDecimals: 0,
      },
      data: s.values.map((v, i) => [new Date(s.timestamps[i]).valueOf(), v]),
    };
  });

  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: "",
    },
    time: {
      moment: moment,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    yAxis: {
      title: {
        enabled: false,
      },
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        minute: "%l:%M %P",
        hour: "%l:%M %P",
        day: "%e. %b",
        week: "%e. %b",
        month: "%b '%y",
        year: "%Y",
      },
    },
    legend: {
      enabled: false,
      itemStyle: {
        color: "white",
      },
    },
    series: highchartsSeries,
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}
