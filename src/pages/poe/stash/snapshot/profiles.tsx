import { gql, useMutation, useQuery } from "@apollo/client";
import { nanoid } from "nanoid";
import StyledCard from "@components/styled-card";

import { InformationCircleIcon } from "@heroicons/react/24/solid";

import { useState, useEffect } from "react";
import { StashSnapshotProfile } from "@generated/graphql";
import Link from "next/link";
import { StyledTooltip } from "@components/styled-tooltip";

export default function Profiles() {
  const [profiles, setProfiles] = useState<StashSnapshotProfile[]>([]);
  const { refetch: refetchProfiles } = useQuery(
    gql`
      query StashSnapshotProfiles {
        stashSnapshotProfiles {
          id
          userId
          league
          name
          public
          poeStashTabIds
          valuationTargetPValue
          valuationStockInfluence
        }
      }
    `,
    {
      onCompleted(data) {
        setProfiles(data.stashSnapshotProfiles);
      },
    }
  );

  const [deleteProfile] = useMutation(
    gql`
      mutation DeleteStashSnapshotProfile($stashSnapshotProfileId: String!) {
        deleteStashSnapshotProfile(
          stashSnapshotProfileId: $stashSnapshotProfileId
        )
      }
    `,
    {
      onCompleted(data, clientOptions) {
        refetchProfiles();
      },
    }
  );

  useEffect(() => {
    refetchProfiles();
  });

  return (
    <>
      <StyledCard title={"Profiles"}>
        <div>
          <div className="flex flex-row items-center">
            <div className="flex flex-row items-center mr-2">
              <StyledTooltip
                texts={[
                  "Create Profile to save custom stash profiles.",
                  "You can have numerous profiles.",
                ]}
                placement="left"
              >
                <button className="w-5 h-5 ">
                  <InformationCircleIcon />
                </button>
              </StyledTooltip>
              <Link
                className="px-1 py-1 rounded-lg bg-color-secondary hover:bg-color-accent-variant"
                href={"/poe/stash/snapshot/profiles/" + nanoid() + "/edit"}
              >
                <p className="font-semibold text-content-base hover:text-content-inverted">
                  Create Profile
                </p>
              </Link>
            </div>
          </div>
          <div className="overflow-y-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="w-full">
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {profiles?.map((profile, index) => (
                  <tr key={index}>
                    <td>
                      <Link
                        className="hover:text-content-accent"
                        href={"/poe/stash/snapshot/profiles/" + profile.id}
                      >
                        {profile?.name}
                      </Link>
                    </td>

                    <td>
                      <div className="flex flex-row space-x-3">
                        <Link
                          className="hover:text-content-accent"
                          href={
                            "/poe/stash/snapshot/profiles/" +
                            profile.id +
                            "/edit"
                          }
                        >
                          Edit
                        </Link>
                        <div
                          className="hover:text-content-accent"
                          onClick={() => {
                            deleteProfile({
                              variables: { stashSnapshotProfileId: profile.id },
                            });
                          }}
                        >
                          Delete
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </StyledCard>
    </>
  );
}
