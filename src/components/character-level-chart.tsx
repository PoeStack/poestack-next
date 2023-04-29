import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import "moment-timezone";
import React from "react";
import { useEffect, useRef } from "react";

import { CharacterSnapshotRecord } from "../__generated__/graphql";

export default function CharacterLevelChart({
  snapshots,
  props,
}: {
  snapshots: CharacterSnapshotRecord[];
  props: any;
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
      <HighchartsReact
        ref={chart}
        highcharts={Highcharts}
        options={options}
        containerProps={{ className: props.className }}
      />
    </>
  );
}
