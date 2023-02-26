import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import StyledCard from "@components/styled-card";
import StyledButton from "@components/styled-button";
import StyledInput from "@components/styled-input";
import LeagueSelect from "@components/league-select";
import StyledSelect from "@components/styled-select";
import StyledSelect2 from "@components/styled-select-2";
import {
  PoeStashTab,
  StashSnapshotProfile,
  StashSnapshotProfileInput,
} from "@generated/graphql";

import { nanoid } from "nanoid";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "flowbite-react";
import { StyledTooltip } from "@components/styled-tooltip";
import { usePoeLeagueCtx } from "@contexts/league-context";

export default function ViewProfile() {
  const router = useRouter();
  const { id } = router.query;

  const { league } = usePoeLeagueCtx();

  const [profile, setProfile] = useState<StashSnapshotProfileInput>({
    id: id?.toString() ?? nanoid(),
    name: "New Profile",
    league: league,
    public: true,

    poeStashTabIds: [],

    valuationTargetPValue: "p10",
    valuationStockInfluence: "none",

    automaticSnapshotIntervalSeconds: null,
  });

  useQuery(
    gql`
      query StashSnapshotProfilesViewProfile {
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
      variables: { update: { ...profile, ...{ league: league } } },
      onCompleted() {
        router.push("/poe/stash/snapshot/profiles");
      },
    }
  );

  if (!profile || !stashTabs) {
    return <>loading</>;
  }

  return (
    <>
      <div className="my-4 md:mx-4 lg:mx-20">
        <StyledCard title="Edit Profile">
          <div className="flex flex-col space-y-2 ">
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
            {/* Select League */}
            <div className="flex flex-row items-center space-x-2">
              <StyledTooltip
                texts={["Select the league you want"]}
                placement="top"
                className="mr-2 "
              >
                <h4 className="w-20 cursor-help">League: </h4>
              </StyledTooltip>
              <div className="w-full ">
                <LeagueSelect />
              </div>
            </div>
            {/* Public or Private Select */}
            {/* <div className="flex flex-row items-center space-x-2">
              <StyledTooltip
                texts={[
                  "Public = You can share profile with anyone ",
                  "Private = Only you can see it",
                ]}
                placement="top"
                className="relative mr-2"
              >
                <h4 className="w-20 cursor-help">Privacy: </h4>
              </StyledTooltip>

              <div className="w-full">
                <StyledSelect
                  items={["Public", "Private"]}
                  onSelectChange={(s) =>
                    setProfile({ ...profile, ...{ public: s === "Public" } })
                  }
                  initalValue={profile.public ? "Public" : "Private"}
                />
              </div>
            </div> */}
            {/* Stock Influence - Smart or Not */}
            <div className="flex flex-row items-center space-x-2">
              <StyledTooltip
                texts={[
                  "None: Normal pricing model",
                  "Smart: Systems attempts to price based upon stock of currency.",
                  "If not enough data defaults to normal model",
                ]}
                placement="top"
                className="mr-2 "
              >
                <h4 className="w-20 cursor-help">Stock Influence: </h4>
              </StyledTooltip>

              <div className="w-full">
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
              </div>
            </div>
            {/* Valuation Select - */}
            <div className="flex flex-row items-center space-x-2">
              <StyledTooltip
                texts={[
                  "These " +
                    `"` +
                    "p values" +
                    `"` +
                    " determine the percentile of listings at which you want ",
                  "your item prices to fall. The higher the p value, the higher the item ",
                  "price. P10 has been the standard up to this point. To familiarize yourself",
                  "with these values, you can refer to the " +
                    `"` +
                    "Economy" +
                    `"` +
                    " Page for common items.",
                ]}
                placement="top"
                className="mr-2 "
              >
                <h4 className="w-20 cursor-help">Valuation: </h4>
              </StyledTooltip>

              <div className="w-full">
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
              </div>
            </div>
            {/* SnapShot Interval */}
            <div className="flex flex-row items-center space-x-2">
              <StyledTooltip
                texts={[
                  "In minutes, how often an automatic snapshot will occur. ",
                  "You DO NOT need to keep the page open!",
                ]}
                placement="top"
                className="mr-2"
              >
                <h4 className="w-20 cursor-help">Snapshot Interval: </h4>
              </StyledTooltip>
              <div className="w-full">
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
              </div>
            </div>

            <div className="flex flex-row justify-center w-2/5 h-10 mx-auto ">
              <StyledButton
                className="w-2/5"
                text={"Refresh Tabs"}
                onClick={() => {
                  refetchStashTabs({
                    league: profile?.league,
                    forcePull: true,
                  });
                }}
              />
            </div>
            {stashTabs.stashTabs.map((tab) => (
              <div
                key={tab.id}
                className="flex flex-row hover:text-content-accent"
              >
                <input
                  type="checkbox"
                  id={tab.id}
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
                <label htmlFor={tab.id}>{tab.name}</label>
              </div>
            ))}
            <div className="flex flex-row justify-center w-2/5 h-10 mx-auto ">
              <StyledButton
                className="w-2/5"
                text="Save Profile"
                onClick={() => {
                  if (!loading && profile?.name?.length) {
                    updateProfile();
                  }
                }}
              />
            </div>
          </div>
        </StyledCard>
      </div>
    </>
  );
}
