import { gql, useQuery } from "@apollo/client";
import StyledLoading from "@components/styled-loading";
import {
  CharacterSnapshotItem,
  PoeStashTab,
  StashViewItemSummary,
} from "@generated/graphql";
import { useEffect, useState } from "react";
import Image, { ImageLoaderProps } from "next/image";
import { myLoader } from "@utils/general-util";
import ItemMouseOver from "@components/item-mouseover";
import StyledCard from "@components/styled-card";
import { usePoeLeagueCtx } from "@contexts/league-context";

export default function StashView() {
  const { league } = usePoeLeagueCtx();

  const [selectTab, setSelectedTab] = useState<PoeStashTab | null>(null);
  const [tab, setTab] = useState<{ items: CharacterSnapshotItem[] } | null>(
    null
  );
  useEffect(() => {
    if (selectTab?.id) {
      fetch(
        `https://poe-stack-stash-view.nyc3.digitaloceanspaces.com/tabs/d3d595b6-6982-48f9-9358-048292beb8a7/Crucible/${selectTab.id}.json`
      )
        .then((v) => {
          if (v.ok) {
            return v.json();
          }
        })
        .then((v) => {
          console.log("loaded tab", v);
          setTab(v);
        });
    }
  }, [selectTab]);

  const [stashTabs, setStashTabs] = useState<PoeStashTab[]>([]);
  const { refetch: refetchStashTabs } = useQuery<{
    stashTabs: PoeStashTab[];
  }>(
    gql`
      query StashTabs($league: String!, $forcePull: Boolean) {
        stashTabs(league: $league, forcePull: $forcePull) {
          id
          userId
          league
          parent
          name
          type
          index
          flatIndex
        }
      }
    `,
    {
      skip: !league,
      variables: {
        league: league,
        forcePull: false,
      },
      onCompleted(data) {
        setStashTabs(data.stashTabs);
        setSelectedTab(data.stashTabs?.[0]);
      },
      onError(error) {
        setStashTabs([]);
      },
    }
  );

  const [tabSummaries, setTabSummaries] = useState<
    StashViewItemSummary[] | null
  >(null);
  useQuery(
    gql`
      query StashViewItemsSummary($league: String!) {
        stashViewSummary(league: $league) {
          stashId
          x
          y
          itemGroupHashString
          itemGroupTag
          quantity
          searchableString
          valueChaos
          totalValueChaos
        }
      }
    `,
    {
      onCompleted(data) {
        setTabSummaries(data.stashViewSummary);
      },
      variables: {
        league: league,
      },
    }
  );

  if (!stashTabs) {
    return (
      <>
        <StyledLoading />
      </>
    );
  }

  return (
    <>
      <div className="flex space-x-4">
        <div className="basis-1/12">
          <TabSelectorCard
            tabs={stashTabs!}
            onSelectChange={(tab) => {
              setSelectedTab(tab);
            }}
            selectedTab={selectTab}
          />
        </div>
        <div className="flex space-x-4">
          <TabViewerCard items={tab?.items ?? []} />
          <StashViewSummaryCard items={tabSummaries ?? []} />
        </div>
      </div>
    </>
  );
}

export function TabViewerCard({ items }: { items: CharacterSnapshotItem[] }) {
  return (
    <>
      <div className="shrink-0 w-[586px] h-[586px] bg-surface-primary relative">
        {items?.map((e) => (
          <>
            <div
              style={{ top: 4 + 24 * e["y"], left: 4 + 24 * e["x"] }}
              className={`absolute`}
            >
              <ItemMouseOver item={e}>
                <Image
                  loader={myLoader}
                  height={24 * e["h"]}
                  width={24 * e["w"]}
                  src={e.icon!}
                  alt={""}
                />
              </ItemMouseOver>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export function StashViewSummaryCard({
  items,
}: {
  items: StashViewItemSummary[];
}) {
  return (
    <>
      <StyledCard>
        <div>
          {items.map((e) => (
            <>
              <div>
                <div>{e.searchableString}</div>
              </div>
            </>
          ))}
        </div>
      </StyledCard>
    </>
  );
}

export function TabSelectorCard({
  tabs,
  selectedTab,
  onSelectChange,
}: {
  tabs: PoeStashTab[];
  selectedTab: PoeStashTab | null;
  onSelectChange: (PoeStashTab) => void;
}) {
  return (
    <>
      <StyledCard>
        <div className="flex flex-col">
          {tabs?.map((tab) => (
            <>
              <div
                onClick={() => {
                  selectedTab = tab;
                  onSelectChange(tab);
                }}
              >
                <div
                  className={`${
                    selectedTab?.id === tab.id
                      ? "text-content-accent"
                      : "text-white"
                  }`}
                >
                  {tab.name}
                </div>
              </div>
            </>
          ))}
        </div>
      </StyledCard>
    </>
  );
}
