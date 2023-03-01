import "moment-timezone";
import moment from "moment";
import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { StashSnapshot } from "../__generated__/graphql";

export default function NetWorthChart({
  snapshots,
}: {
  snapshots: StashSnapshot[];
}) {
  const data = snapshots?.map((s) => {
    return [
      new Date(s?.createdAtTimestamp).valueOf(),
      +(s.totalValueChaos! / (s.divineChaosValue ?? 245)).toFixed(1),
    ];
  });
  data.sort((a, b) => a[0]?.valueOf() - b[0]?.valueOf());

  const series = [
    {
      name: `Div Value`,
      tooltip: {
        valueDecimals: 0,
      },
      data: data,
    },
  ];

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
    series: series,
  };

  return (
    <>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
}
