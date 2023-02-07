import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import "moment-timezone";
import { CharacterSnapshot } from "../__generated__/resolvers-types";
import { useRef, useEffect } from "react";

export default function CharacterLevelChart({
  snapshots,
}: {
  snapshots: CharacterSnapshot[];
}) {
  const chart = useRef<any>();

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
        name: "Level",
        tooltip: {
          valueDecimals: 0,
        },
        data: snapshots.map((s) => {
          return [new Date(s.timestamp).valueOf(), s.level];
        }),
      },
    ],
  };

  return (
    <>
      <HighchartsReact ref={chart} highcharts={Highcharts} options={options} />
    </>
  );
}
