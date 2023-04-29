import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

import { ItemGroupValueTimeseriesGroupSeries } from "@generated/graphql";

export function ItemGroupTimeseriesChart({
  timeseries,
}: {
  timeseries: ItemGroupValueTimeseriesGroupSeries[] | undefined;
}) {
  const series = timeseries?.map((t) => ({
    name: t.type,
    tooltip: {
      valueDecimals: 2,
    },
    data: t.entries?.map((e) => {
      return [new Date(e?.timestamp).valueOf(), e?.value ?? 0];
    }),
  }));

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
