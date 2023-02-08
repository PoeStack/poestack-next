import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import StyledCard from "../../../../../../../components/styled-card";
import StyledButton from "../../../../../../../components/styled-button";
import StyledInput from "../../../../../../../components/styled-input";
import LeagueSelect from "../../../../../../../components/league-select";
import StyledSelect from "../../../../../../../components/styled-select";
import StyledSelect2 from "../../../../../../../components/styled-select-2";
import {
  PoeStashTab,
  StashSnapshotProfile,
  StashSnapshotProfileInput,
} from "../../../../../../../__generated__/resolvers-types";
import { nanoid } from "nanoid";

export default function ViewProfile() {
  const router = useRouter();
  const { id } = router.query;

  const [profile, setProfile] = useState<StashSnapshotProfileInput>({
    id: id?.toString() ?? nanoid(),
    name: "",
    league: "Sanctum",
    public: true,

    poeStashTabIds: [],

    valuationTargetPValue: "p10",
    valuationStockInfluence: "none",

    automaticSnapshotIntervalSeconds: null,
  });

  useQuery(
    gql`
      query StashSnapshotProfiles {
        stashSnapshotProfiles {
          id
          league
          name
          public
          poeStashTabIds
          valuationTargetPValue
          valuationStockInfluence
          automaticSnapshotIntervalSeconds
        }
      }
    `,
    {
      onCompleted(data) {
        const matchingProfile = data.stashSnapshotProfiles?.filter(
          (profile) => profile.id === id
        )?.[0];
        if (matchingProfile) {
          setProfile(matchingProfile);
        }
      },
    }
  );

  const { data: stashTabs, refetch: refetchStashTabs } = useQuery<{
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
      skip: !profile?.league,
      variables: {
        league: profile?.league,
        forcePull: false,
      },
    }
  );

  const [updateProfile, { loading }] = useMutation(
    gql`
      mutation UpdateStashsnapshotProfile($update: StashSnapshotProfileInput!) {
        updateStashsnapshotProfile(update: $update)
      }
    `,
    {
      variables: { update: profile },
      onCompleted(data) {
        router.push("/poe/stash/snapshot/profiles");
      },
    }
  );

  if (!profile || !stashTabs) {
    return <>loading</>;
  }

  return (
    <>
      <StyledCard title="Edit Profile">
        <div className="flex flex-col space-y-2">
          {(profile?.poeStashTabIds?.length ?? 0) > 15 && (
            <>
              <div>
                Warning: Due to GGG rate limits the more stash tabs you select
                the longer snapshots will take. It is recommended you try to
                keep profiles at or below 15 selected tabs.
              </div>
            </>
          )}
          <StyledInput
            placeholder="Enter Profile Name..."
            onChange={(e) => {
              setProfile({ ...profile, ...{ name: e } });
            }}
            value={profile?.name ?? ""}
          />

          <LeagueSelect
            onLeagueChanged={(l) => {
              setProfile({ ...profile, ...{ league: l } });
            }}
          />

          <StyledSelect
            items={["Public", "Private"]}
            onSelectChange={(s) =>
              setProfile({ ...profile, ...{ public: s === "Public" } })
            }
            initalValue={profile.public ? "Public" : "Private"}
          />

          <StyledSelect2
            items={["none", "smart-influence"]}
            onSelectChange={(s) =>
              setProfile({
                ...profile,
                ...{
                  valuationStockInfluence: s,
                },
              })
            }
            selected={profile.valuationStockInfluence}
          />

          <StyledSelect2
            items={["p5", "p7", "p10", "p15", "p20", "p50"]}
            onSelectChange={(s) =>
              setProfile({
                ...profile,
                ...{
                  valuationTargetPValue: s,
                },
              })
            }
            selected={profile.valuationTargetPValue}
          />

          <StyledSelect2
            items={["...", "10", "15", "30", "60", "120"]}
            onSelectChange={(s) => {
              const v = s === "..." ? null : parseInt(s) * 60;
              setProfile({
                ...profile,
                ...{
                  automaticSnapshotIntervalSeconds: v,
                },
              });
            }}
            selected={
              profile.automaticSnapshotIntervalSeconds
                ? `Snapshot every ${
                    profile.automaticSnapshotIntervalSeconds / 60
                  } mins`
                : null
            }
          />

          <StyledButton
            text={"Refresh Tabs"}
            onClick={() => {
              refetchStashTabs({
                league: profile?.league,
                forcePull: true,
              });
            }}
          />

          {stashTabs.stashTabs.map((tab) => (
            <div key={tab.id} className="hover:text-skin-accent">
              <input
                type="checkbox"
                id="topping"
                name="topping"
                value="Paneer"
                className="mr-2"
                checked={profile.poeStashTabIds?.includes(tab.id!)}
                onChange={(e) => {
                  if (profile.poeStashTabIds?.includes(tab.id!)) {
                    setProfile({
                      ...profile,
                      ...{
                        poeStashTabIds: profile.poeStashTabIds.filter(
                          (t) => t !== tab.id
                        ),
                      },
                    });
                  } else {
                    setProfile({
                      ...profile,
                      ...{
                        poeStashTabIds: profile.poeStashTabIds!.concat([
                          tab.id!,
                        ]),
                      },
                    });
                  }
                }}
              />
              {tab.name}
            </div>
          ))}

          <StyledButton
            text="Save Profile"
            onClick={() => {
              if (!loading && profile?.name?.length) {
                updateProfile();
              }
            }}
          />
        </div>
      </StyledCard>
    </>
  );
}
