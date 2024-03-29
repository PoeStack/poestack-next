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
import { Line } from "react-chartjs-2";

import { useCurrencyConversion } from "@contexts/currency-conversion-context";
import {
  LivePricingHistoryGroup,
  LivePricingHistorySeries,
} from "@generated/graphql";

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
      radius: 6,
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

export default function LivePricingHistoryChart({
  historyGroup,
  seriesFilter,
  skipConversion = false,
}: {
  historyGroup: LivePricingHistoryGroup;
  seriesFilter?: ((series: LivePricingHistorySeries) => boolean) | null;
  skipConversion?: boolean;
}) {
  const { divValueFromChaos } = useCurrencyConversion();
  const datasets = historyGroup.series
    .filter((e) => !seriesFilter || seriesFilter(e))
    .map((s) => {
      return {
        label: `${historyGroup.itemGroup.key} - ${s.type}${
          s.stockRangeStartInclusive === 1
            ? ""
            : ` ${s.stockRangeStartInclusive}+`
        }`,
        data: s.entries
          .map((v) => ({
            x: new Date(v.timestamp),
            y: skipConversion
              ? v.value
              : divValueFromChaos(v.value, new Date(v.timestamp)),
          }))
          .sort((a, b) => a.x.getTime() - b.x.getTime()),
      };
    });

  const data = {
    datasets: datasets,
  };

  return <Line options={options} data={data} />;
}
