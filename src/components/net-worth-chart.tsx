import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import "moment-timezone";
import { StashSnapshot } from "../__generated__/graphql";

export default function NetWorthChart({
  snapshots,
}: {
  snapshots: StashSnapshot[];
}) {
  const series = snapshots
    .map((s) => {
      return [
        new Date(s.createdAtTimestamp).valueOf(),
        s.totalValueChaos! / (s.divineChaosValue ?? 245),
      ];
    })
    .sort((a, b) => a[0]?.valueOf() - b[0]?.valueOf());
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
    },
    series: [
      {
        name: "Div Value",
        tooltip: {
          valueDecimals: 1,
        },
        data: series,
      },
    ],
  };

  return (
    <>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
}
