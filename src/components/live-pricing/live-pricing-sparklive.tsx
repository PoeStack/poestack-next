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

import StyledLoading from "@components/library/styled-loading";
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
  responsive: false,
  label: {
    display: false,
  },
  elements: {
    line: {
      borderColor: "#8dd3c7",
      borderWidth: 1,
    },
    point: {
      radius: 0,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  tooltips: {
    enabled: false,
  },
  scales: {
    y: { display: false },
    x: {
      display: false,
      type: "time",
      time: {
        unit: "day",
      },
    },
  },
};

export default function LivePricingSparkline({
  historyGroup,
}: {
  historyGroup: LivePricingHistoryGroup | null | undefined;
}) {
  if (!historyGroup) {
    return <>Loading...</>;
  }

  const datasets = historyGroup.series.map((s) => {
    return {
      data: s.entries
        .map((v) => ({ x: new Date(v.timestamp), y: v.value }))
        .sort((a, b) => a.x.getTime() - b.x.getTime()),
    };
  });

  const data = {
    datasets: datasets,
  };

  return <Line width={125} height={25} options={options} data={data} />;
}
