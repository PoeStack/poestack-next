import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";
import StyledCard from "@components/styled-card";
import { CustomLadderGroup } from "../../../../__generated__/graphql";
import { useState } from "react";
import StyledButton from "@components/styled-button";
import StyledInput from "@components/styled-input";
import { usePoeLeagueCtx } from "@contexts/league-context";

export default function EditCustomLadder() {
  const router = useRouter();
  const { id } = router.query;

  const { league } = usePoeLeagueCtx();

  const [newMemberPoeProfileName, setNewMemberPoeProfileName] = useState<
    string | null
  >(null);

  const [ladderGroup, setLadderGroup] = useState<CustomLadderGroup>({
    id: id?.toString()!,
    name: "New Group",
    createdAtTimestamp: new Date(),
    members: [],
    ownerUserId: "",
  });
  useQuery(
    gql`
      query CustomLadderGroup($groupId: String!) {
        customLadderGroup(groupId: $groupId) {
          id
          name
          ownerUserId
          createdAtTimestamp
          members {
            poeProfileName
            userId
          }
        }
      }
    `,
    {
      skip: !id,
      variables: { groupId: id },
      onCompleted(data) {
        setLadderGroup(data.customLadderGroup);
      },
    }
  );

  const { refetch: addMember } = useQuery(
    gql`
      query ProfileByPeoProfileName($poeProfileName: String!) {
        profileByPoeProfileName(poeProfileName: $poeProfileName) {
          userId
          poeProfileName
        }
      }
    `,
    {
      skip: true,
      variables: { poeProfileName: newMemberPoeProfileName },
      onCompleted(data) {
        setLadderGroup({
          ...ladderGroup,
          members: [...ladderGroup.members, data.profileByPoeProfileName],
        });
      },
    }
  );

  const [saveProfile] = useMutation(
    gql`
      mutation Mutation($group: CustomLadderGroupInput!) {
        updateCustomLadderGroup(group: $group) {
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
      variables: {
        group: { id: id, name: ladderGroup.name, members: ladderGroup.members },
      },
      onCompleted(data) {
        setLadderGroup(data.updateCustomLadderGroup);
      },
    }
  );

  return (
    <>
      <StyledCard title={`${ladderGroup?.name} - Members`}>
        <div>
          <div className="flex flex-row space-x-2">
            <StyledInput
              value={newMemberPoeProfileName}
              placeholder="POE Profile Name"
              onChange={(e) => setNewMemberPoeProfileName(e)}
            />

            <StyledButton
              text={"Add"}
              onClick={() => {
                addMember();
              }}
            />
          </div>
          <div>
            {ladderGroup?.members.map((member) => (
              <>
                <div>{member.poeProfileName}</div>
              </>
            ))}
          </div>
          <div className="flex flex-row space-x-2">
            <StyledButton
              text={"Save"}
              onClick={() => {
                saveProfile();
              }}
            />
            <StyledButton
              text={"Open Ladder"}
              onClick={() => {
                router.push(
                  `/poe/characters?league=${league}&customLadderGroupId=${ladderGroup.id}`
                );
              }}
            />
          </div>
        </div>
      </StyledCard>
    </>
  );
}
