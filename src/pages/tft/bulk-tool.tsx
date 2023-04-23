import { gql, useMutation, useQuery } from "@apollo/client";
import { PoeStashTab, StashSnapshot } from "../../__generated__/graphql";
import { useState } from "react";
import StyledCard from "@components/styled-card";
import StyledButton from "@components/styled-button";
import { usePoeLeagueCtx } from "@contexts/league-context";
import LeagueSelect from "@components/league-select";
import { usePoeStackAuth } from "@contexts/user-context";
import SnapshotItemTable from "@components/item-table/snapshot-item-table";
import StyledMultiSelectMultiFilter from "@components/styled-multi-select-multi-filter";
import { useEffect } from "react";
import TftGuardPanel from "../../components/item-table/tft-guard-panel";
import { useRouter } from "next/router";
import TftOneClickMessageHistoryCard from "@components/tft-oneclick-message-history-card";
import YouTube from "react-youtube";
import { TftOneClickInstructions } from "@components/tft-one-click-instructions";

export default function BulkTool() {
  const router = useRouter();
  const { profile } = usePoeStackAuth();

  const { league } = usePoeLeagueCtx();

  const [selectedStashTabs, setSelectedStashTabs] = useState<PoeStashTab[]>([]);

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
      },
      onError(error) {
        setStashTabs([]);
      },
    }
  );

  const [snapshot, setSnapshot] = useState<StashSnapshot | null>(null);
  const [takeDetatchedSnapshot, { loading: snapshotLoading }] = useMutation(
    gql`
      mutation TakeDeatachedSnapshot($input: DetachedStashSnapshotInput!) {
        takeDeatachedSnapshot(input: $input) {
          id
          league
          userId
          snapshotProfileId
          createdAtTimestamp
          tags
          totalValueChaos
          exaltChaosValue
          divineChaosValue
        }
      }
    `,
    {
      variables: {
        input: {
          userId: profile?.userId,
          league: league,
          poeStashTabIds: selectedStashTabs.map((e) => e.id),
          valuationTargetPValue: "p10",
          valuationStockInfluence: "none",
        },
      },
      onCompleted(data) {
        setSnapshot(data.takeDeatachedSnapshot);
        localStorage.setItem(
          `bulkTool_${league}_lastSnapshot`,
          JSON.stringify(data.takeDeatachedSnapshot)
        );
      },
    }
  );

  useEffect(() => {
    const selectedTabs = localStorage?.getItem(
      `bulkTool_${league}_selectedStashTabs`
    );
    if (selectedTabs) {
      setSelectedStashTabs(JSON.parse(selectedTabs));
    } else {
      setSelectedStashTabs([]);
    }

    const lastSnapshot = localStorage?.getItem(
      `bulkTool_${league}_lastSnapshot`
    );
    if (lastSnapshot) {
      setSnapshot(JSON.parse(lastSnapshot));
    } else {
      setSnapshot(null);
    }
  }, [league]);

  const [removeOnlyEnabled, setRemoveOnlyEnabled] = useState(false);
  const removeOnlyFunction = (stashName: string) => {
    return !stashName.toLowerCase().includes("(remove-only)");
  };

  return (
    <>
      <TftGuardPanel>
        <div className="flex flex-col space-y-4">
          <StyledCard title="Tool">
            <div className="flex flex-col space-y-2">
              <LeagueSelect
                leagueFilter={(e) => ["Crucible", "Standard"].includes(e)}
              />
              <StyledMultiSelectMultiFilter
                selected={selectedStashTabs ?? []}
                items={stashTabs ?? []}
                itemToText={(e) => e?.name ?? "na"}
                itemToId={(e) => e?.id ?? "na"}
                placeholder={"Stash name..."}
                onSelectChange={(e: any[]) => {
                  setSelectedStashTabs(e);
                  localStorage.setItem(
                    `bulkTool_${league}_selectedStashTabs`,
                    JSON.stringify(e)
                  );
                }}
                multiple={true}
                additionalFilters={[
                  {
                    title: "Remove Only",
                    enabled: removeOnlyEnabled,
                    toggle: () => setRemoveOnlyEnabled(!removeOnlyEnabled),
                    filterFunction: removeOnlyFunction,
                  },
                ]}
              />
              <StyledButton
                text={snapshotLoading ? "Loading..." : "Grab Items"}
                onClick={() => {
                  takeDetatchedSnapshot();
                }}
              />
              {snapshot && <SnapshotItemTable snapshot={snapshot!} />}
            </div>
          </StyledCard>
          <StyledCard>
            <TftOneClickMessageHistoryCard />
          </StyledCard>
          <TftOneClickInstructions />
          <StyledCard>
            <div className="flex flex-col space-y-2 w-fit">
              <div>Settings (Optional)</div>
              <StyledButton
                text={"Refresh Stash Tabs"}
                onClick={() => {
                  refetchStashTabs({
                    variables: {
                      league: league,
                      forcePull: true,
                    },
                  });
                }}
              />
              <StyledButton
                text={"Connect Discord"}
                onClick={() => {
                  localStorage.setItem("variable-redirect", router.asPath);
                  router.push(
                    "https://discord.com/api/oauth2/authorize?client_id=1075074940275019836&redirect_uri=https%3A%2F%2Fpoestack.com%2Fdiscord%2Fconnected&response_type=code&scope=identify"
                  );
                }}
              />
            </div>
          </StyledCard>
        </div>
      </TftGuardPanel>
    </>
  );
}
