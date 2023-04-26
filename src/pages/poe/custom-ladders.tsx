import StyledCard from "@components/styled-card";
import StyledButton from "../../components/styled-button";
import { useRouter } from "next/router";
import { nanoid } from "nanoid";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { CustomLadderGroup } from "../../__generated__/graphql";
import { usePoeLeagueCtx } from "@contexts/league-context";
import PoeAccountConnectedGaurdPanel from "@components/poe-account-connected-guard-panel";

export default function ViewCustomLadders() {
  const router = useRouter();
  const { userId } = router.query;

  const { league } = usePoeLeagueCtx();

  const [ladderGroups, setLadderGroups] = useState<CustomLadderGroup[]>([]);
  const { refetch: refetchGroups } = useQuery(
    gql`
      query ViewGroupsCustomLadderGroupsByOwner($ownerId: String!) {
        customLadderGroupsByOwner(ownerId: $ownerId) {
          id
          ownerUserId
          name
          createdAtTimestamp
          members {
            userId
            poeProfileName
          }
        }
      }
    `,
    {
      variables: { ownerId: userId },
      onCompleted(data) {
        setLadderGroups(data.customLadderGroupsByOwner);
      },
    }
  );

  const [deleteLadderGroup] = useMutation(
    gql`
      mutation DeleteCustomLadderGroup($groupId: String!) {
        deleteCustomLadderGroup(groupId: $groupId)
      }
    `,
    {
      onCompleted(data) {
        refetchGroups();
      },
    }
  );

  return (
    <>
      <PoeAccountConnectedGaurdPanel>
        <StyledCard title={"Custom Ladders"}>
          <div className="flex flex-col space-y-2">
            <div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Members</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ladderGroups.map((e, i) => (
                    <>
                      <tr key={i}>
                        <td>{e.name}</td>
                        <td>{e.members?.length}</td>
                        <td>
                          <div className="flex flex-row space-x-2">
                            <StyledButton
                              text={"Edit"}
                              onClick={() => {
                                router.push(`/poe/custom-ladders/${e.id}/edit`);
                              }}
                            />
                            <StyledButton
                              text={"Delete"}
                              onClick={() => {
                                deleteLadderGroup({
                                  variables: { groupId: e.id },
                                });
                              }}
                            />
                            <StyledButton
                              text={"Open Ladder"}
                              onClick={() => {
                                router.push(
                                  `/poe/characters?league=${league}&customLadderGroupId=${e.id}`
                                );
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <StyledButton
                text={"Create Ladder"}
                onClick={() => {
                  router.push(`/poe/custom-ladders/${nanoid()}/edit`);
                }}
              />
            </div>
          </div>
        </StyledCard>
      </PoeAccountConnectedGaurdPanel>
    </>
  );
}
