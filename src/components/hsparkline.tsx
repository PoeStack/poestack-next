import "moment-timezone";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { gql, useQuery } from "@apollo/client";
import { ItemGroupValueTimeseriesGroupSeries } from "../__generated__/graphql";

export default function HSparkline({
  series,
}: {
  series?: ItemGroupValueTimeseriesGroupSeries;
}) {
  //This is a hack but it works and I don't want to fix highcharts right now
  const [shouldRender, doRender] = useState(true);
  useEffect(() => {
    if (shouldRender) {
      doRender(!shouldRender);
    }
  }, [shouldRender]);

  const entires = series?.entries ?? [];
  const shortEntires = entires.length > 7 ? entires.slice(-7) : entires;

  const hSeries = {
    name: `Chaos Value`,
    data: shortEntires.map((e) => {
      return [new Date(e?.timestamp).valueOf(), +e.value.toFixed(2)];
    }),
  };

  const options = {
    chart: {
      type: "area",
      backgroundColor: null,
      borderWidth: 0,
      margin: [2, 0, 2, 0],
      width: 120,
      height: 20,
      style: {
        overflow: "visible",
      },
      // small optimalization, saves 1-2 ms each sparkline
      skipClone: true,
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      labels: {
        enabled: false,
      },
      title: {
        text: null,
      },
      startOnTick: false,
      endOnTick: false,
      tickPositions: [],
      type: "datetime",
      dateTimeLabelFormats: {
        day: "%e. %b",
        week: "%e. %b",
        month: "%b '%y",
        year: "%Y",
      },
    },
    time: {
      moment: moment,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    yAxis: [
      {
        endOnTick: false,
        startOnTick: false,
        labels: {
          enabled: false,
        },
        title: {
          text: null,
        },
        tickPositions: [0],
      },
    ],
    legend: {
      enabled: false,
    },
    tooltip: {
      hideDelay: 0,
      outside: true,
      shared: true,
    },
    plotOptions: {
      series: {
        animation: false,
        lineWidth: 1,
        shadow: false,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        marker: {
          radius: 1,
          states: {
            hover: {
              radius: 2,
            },
          },
        },
        fillOpacity: 0.25,
      },
      column: {
        negativeColor: "#910000",
        borderColor: "silver",
      },
    },
    series: hSeries,
  };

  let pChange = 0;
  if (hSeries?.data?.length) {
    const startingValue = hSeries.data[0][1];
    const endingValue = hSeries.data[hSeries.data?.length - 1][1];

    pChange = +(((endingValue - startingValue) / startingValue) * 100).toFixed(
      0
    );
  }

  return (
    <>
      <div className="flex flex-row space-x-1">
        <HighchartsReact highcharts={Highcharts} options={options} />
        <div
          className={
            pChange === 0 ? "" : pChange > 0 ? "text-green-500" : "text-red-400"
          }
        >
          {pChange}%
        </div>
      </div>
    </>
  );
}
