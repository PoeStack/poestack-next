import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import "moment-timezone";
import { useEffect, useState } from "react";
import { ItemGroupValueTimeseries } from "../../../../../../__generated__/resolvers-types";
import { GeneralUtils } from "../../../../../../utils/general-util";
import StyledCard from "../../../../../../components/styled-card";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import StyledMultiSelect2 from "../../../../../../components/styled-multi-select-2";
import moment from "moment";
import { usePoeLeagueCtx } from "../../../../../../contexts/league-context";

export default function EconomyOne() {
  const router = useRouter();
  const { league: routerLeague, hashString } = router.query;

  const { league, setLeague } = usePoeLeagueCtx();
  useEffect(() => {
    setLeague(routerLeague);
  }, [routerLeague, setLeague]);

  const [itemValueTimeseries, setItemValueTimeseries] =
    useState<ItemGroupValueTimeseries | null>(null);
  useQuery(
    gql`
      query Entries($search: ItemGroupValueTimeseriesSearchInput!) {
        itemGroupValueTimeseriesSearch(search: $search) {
          results {
            series {
              entries {
                timestamp
                value
              }
              stockRangeStartInclusive
              type
            }
            itemGroup {
              hashString
              displayName
              key
              tag
              properties
            }
          }
        }
      }
    `,
    {
      skip: !hashString || !league,
      variables: {
        search: {
          seriesTypes: [
            "p7",
            "p10",
            "p15",
            "p20",
            "p50",
            "totalValidListings",
            "totalQuantity",
          ],
          stockStartingRanges: [0, 9, 18, 30, 50, 100, 500, 1000, 10000, 30000],
          itemGroupSearch: {
            itemGroupHashStrings: [hashString],
            itemGroupHashKeys: [],
            league: league,
            skip: null,
            limit: null,
            searchString: null,
            sortDirection: null,
            itemGroupHashTags: [],
          },
        },
      },
      onCompleted(data) {
        setItemValueTimeseries(
          data?.itemGroupValueTimeseriesSearch?.results?.[0] ?? null
        );
      },
    }
  );

  if (!itemValueTimeseries) {
    return <>No data</>;
  }

  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row space-x-2">
          <StyledCard title={"Info"}>
            <h3>
              Item:{" "}
              {GeneralUtils.itemGroupToDisplayName(
                itemValueTimeseries.itemGroup
              )}
            </h3>
            <h3>Tag: {itemValueTimeseries.itemGroup?.tag}</h3>
          </StyledCard>
          <StyledCard title={"Properties"}>
            {itemValueTimeseries.itemGroup?.properties?.map((p) => (
              <>
                <div>{`${p?.key} = ${GeneralUtils.hashPropValue(p)}`}</div>
              </>
            ))}
          </StyledCard>
        </div>
        <StyledCard title={"Chaos Value"}>
          <ValueChaosStockBracketChart timeseries={itemValueTimeseries} />
        </StyledCard>
        <StyledCard title={"Listings"}>
          <ListingsStockBracketChart timeseries={itemValueTimeseries} />
        </StyledCard>
      </div>
    </>
  );
}

export function ListingsStockBracketChart({
  timeseries,
}: {
  timeseries: ItemGroupValueTimeseries;
}) {
  const bracketOptions = [0, 9, 18, 30, 50, 100, 500, 1000, 10000, 30000].map(
    (i) => `${i}+`
  );
  const [selectedStockBrackets, setSelectedStockBrackets] = useState(["0+"]);

  const series: any[] = timeseries?.series
    ?.filter(
      (t) =>
        ["totalValidListings", "totalQuantity"].includes(t.type) &&
        selectedStockBrackets.includes(`${t.stockRangeStartInclusive}+`)
    )
    .map((t) => ({
      name: `${t.type} ${t.stockRangeStartInclusive}+`,
      tooltip: {
        valueDecimals: 0,
      },
      data: t.entries?.map((e) => {
        return [new Date(e?.timestamp).valueOf(), e?.value ?? 0];
      }),
    }));

  console.log("timeseries", timeseries);

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
      enabled: true,
      itemStyle: {
        color: "white",
      },
    },
    series: series,
  };

  return (
    <>
      <div>
        <StyledMultiSelect2
          selected={selectedStockBrackets}
          items={bracketOptions}
          onSelectChange={setSelectedStockBrackets}
        />
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
}

export function ValueChaosStockBracketChart({
  timeseries,
}: {
  timeseries: ItemGroupValueTimeseries;
}) {
  const bracketOptions = [0, 9, 18, 30, 50, 100, 500, 1000, 10000, 30000].map(
    (i) => `${i}+`
  );
  const [selectedStockBrackets, setSelectedStockBrackets] = useState(["0+"]);
  const [selectedPValues, setSelectedPValues] = useState<string[]>([
    "p7",
    "p10",
    "p20",
    "p50",
  ]);

  const series: any[] = timeseries?.series
    ?.filter(
      (t) =>
        selectedPValues.includes(t.type) &&
        selectedStockBrackets.includes(`${t.stockRangeStartInclusive}+`)
    )
    .map((t) => ({
      name: `${t.type} ${t.stockRangeStartInclusive}+`,
      tooltip: {
        valueDecimals: 2,
      },
      data: t.entries?.map((e) => {
        return [new Date(e?.timestamp).valueOf(), e?.value ?? 0];
      }),
    }));

  console.log("timeseries", timeseries);

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
      enabled: true,
      itemStyle: {
        color: "white",
      },
    },
    series: series,
  };

  return (
    <>
      <div>
        <StyledMultiSelect2
          selected={selectedPValues}
          items={["p5", "p7", "p10", "p15", "p20", "p50"]}
          onSelectChange={setSelectedPValues}
        />
        <StyledMultiSelect2
          selected={selectedStockBrackets}
          items={bracketOptions}
          onSelectChange={setSelectedStockBrackets}
        />
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
}
