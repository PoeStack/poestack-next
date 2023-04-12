import { gql, useQuery } from "@apollo/client";
import StyledLoading from "@components/styled-loading";
import { CharacterSnapshotItem, StashViewTabSummary } from "@generated/graphql";
import { useEffect, useState } from "react";
import Image, { ImageLoaderProps } from "next/image";
import { myLoader } from "@utils/general-util";
import ItemMouseOver from "@components/item-mouseover";
import StyledCard from "@components/styled-card";

export default function StashView() {
  const [tabSummaries, setTabSummaries] = useState<
    StashViewTabSummary[] | null
  >(null);
  useQuery(
    gql`
      query StashViewTabSummaries($league: String!) {
        stashViewTabs(league: $league) {
          userId
          league
          stashId
          name
          type
          color
          index
          flatIndex
          updatedAtTimestamp
          createdAtTimestamp
          summary
          summaryUpdatedAtTimestamp
        }
      }
    `,
    {
      onCompleted(data) {
        setTabSummaries(data.stashViewTabs);
      },
      variables: {
        league: "Crucible",
      },
    }
  );

  if (!tabSummaries) {
    return (
      <>
        <StyledLoading />
      </>
    );
  }

  return (
    <>
      <div className="flex">
        <div className="basis-1/12">
          <TabSelectorCard tabs={tabSummaries!} />
        </div>
        <div>
          <TabViewerCard tabId={tabSummaries[0].stashId} />
        </div>
      </div>
    </>
  );
}

export function TabViewerCard({ tabId }: { tabId: string }) {
  const [tab, setTab] = useState<{ items: CharacterSnapshotItem[] } | null>(
    null
  );

  useEffect(() => {
    fetch(
      `https://poe-stack-stash-view.nyc3.digitaloceanspaces.com/tabs/d3d595b6-6982-48f9-9358-048292beb8a7/Crucible/${tabId}.json`
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
  }, [tabId]);

  return (
    <>
      <div className="w-[576px] h-[576px] bg-slate-500 relative">
        {tab?.items.map((e) => (
          <>
            <div
              style={{ top: 24 * e["y"], left: 24 * e["x"] }}
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

export function TabSelectorCard({ tabs }: { tabs: StashViewTabSummary[] }) {
  return (
    <>
      <StyledCard>
        <div className="flex flex-col">
          {tabs?.map((tab) => (
            <>
              <div>
                {tab.name} {tab.stashId}
              </div>
            </>
          ))}
        </div>
      </StyledCard>
    </>
  );
}
