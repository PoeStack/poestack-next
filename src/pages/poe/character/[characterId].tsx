import { gql, useMutation, useQuery } from "@apollo/client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  CharacterSnapshot,
  CharacterSnapshotRecord,
  PassiveTreeResponse,
} from "@generated/graphql";
import StyledCard from "@components/styled-card";
import EquipmentDisplay from "@components/equipment-display";
import SecondaryEquipmentDisplay from "@components/secondary-equipment-display";
import StyledButton from "@components/styled-button";
import CharacterStatsDisplay from "@components/character-stats-display";
import SkillTree from "@components/trees/skill-tree";
import StyledSelect2 from "@components/styled-select-2";
import CharacterLevelChart from "@components/character-level-chart";
import Head from "next/head";
import client from "poe-stack-apollo-client";
import { GeneralUtils } from "@utils/general-util";

const snapshotQuery = gql`
  query SingleCharacterCharacterSnapshotsSearch($snapshotId: String!) {
    characterSnapshot(snapshotId: $snapshotId) {
      id
      characterId
      timestamp
      characterClass
      league
      experience
      level
      mainSkillKey
      current
      poeCharacter {
        id
        userId
        name
        createdAtTimestamp
        lastSnapshotTimestamp
      }
      characterPassivesSnapshot {
        banditChoice
        pantheonMajor
        pantheonMinor
        hashes
        hashesEx
        jewelData
        masteryEffects
      }
      characterSnapshotItems {
        itemId
        inventoryId
        socketedInId
        baseType
        typeLine
        name
        ilvl
        explicitMods
        utilityMods
        properties
        requirements
        sockets
        frameType
        description
        icon
        w
        h
        corrupted
        support
        socket
        gemColor
        mainSkill
        itemGroupHashString
        craftedMods
        implicitMods
        fracturedMods
        enchantMods
      }
      characterSnapshotPobStats {
        accuracy
        armour
        blockChance
        spellBlockChance
        chaosResist
        coldResist
        dex
        energyShield
        fireResist
        int
        life
        lightningResist
        mana
        str
        evasion
        supression
        totalDpsWithIgnite
        pobCode
      }
    }
  }
`;

export default function Character({ characterSnapshot }) {
  const router = useRouter();
  const { characterId, snapshotId } = router.query;

  const [characterSnapshots, setCharacterSnapshots] = useState<
    CharacterSnapshotRecord[]
  >([]);
  const [currentSnapshot, setCurrentSnapshot] =
    useState<CharacterSnapshot | null>(characterSnapshot);

  const { refetch: refetchSnapshots } = useQuery(
    gql`
      query CharacterSnapshotRecords($characterId: String!) {
        characterSnapshotRecords(characterId: $characterId) {
          id
          characterId
          timestamp
          experience
          level
        }
      }
    `,
    {
      skip: !characterId,
      variables: { characterId: characterId },
      onCompleted(data) {
        setCharacterSnapshots(data.characterSnapshotRecords);
        if (data.characterSnapshotRecords.length > 0 && !snapshotId) {
          router.replace({
            query: {
              characterId: characterId,
              snapshotId:
                data.characterSnapshotRecords[
                  data.characterSnapshotRecords.length - 1
                ].id,
            },
          });
        }
      },
    }
  );

  useQuery(snapshotQuery, {
    skip: !snapshotId,
    variables: { snapshotId: snapshotId },
    onCompleted(data) {
      setCurrentSnapshot(data.characterSnapshot);
    },
  });

  const [takeSnapshot] = useMutation(
    gql`
      mutation CharacterTakeCharacterSnapshot($characterId: String!) {
        takeCharacterSnapshot(characterId: $characterId)
      }
    `,
    {
      variables: { characterId: characterId },
      onCompleted(data, clientOptions) {
        refetchSnapshots();
      },
    }
  );

  const embeddedDesc = `Life ${currentSnapshot?.characterSnapshotPobStats?.life} ES ${currentSnapshot?.characterSnapshotPobStats?.energyShield}
  Res ${currentSnapshot?.characterSnapshotPobStats?.fireResist}/${currentSnapshot?.characterSnapshotPobStats?.coldResist}/${currentSnapshot?.characterSnapshotPobStats?.lightningResist}/${currentSnapshot?.characterSnapshotPobStats?.chaosResist}
  DPS ${currentSnapshot?.characterSnapshotPobStats?.totalDpsWithIgnite}`;

  return (
    <>
      <div className="flex flex-col my-4 space-y-2 md:mx-4 lg:mx-20">
        <Head>
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="PoeStack" />
          <meta
            property="og:title"
            content={`Level ${currentSnapshot?.level} ${currentSnapshot?.mainSkillKey} ${currentSnapshot?.characterClass}`}
          />
          <meta property="og:description" content={embeddedDesc} />
          <meta
            property="og:image"
            content={`/assets/poe/classes/${currentSnapshot?.characterClass}.png`}
          />
        </Head>
        <div className="flex space-x-2 ">
          <StyledCard title="Equipment" className="min-w-[450px]">
            <div className="flex flex-col space-y-2">
              <EquipmentDisplay
                items={currentSnapshot?.characterSnapshotItems!}
              />

              <SecondaryEquipmentDisplay
                items={currentSnapshot?.characterSnapshotItems!}
              />
            </div>
          </StyledCard>

          <div className="flex flex-col flex-1 space-y-2 ">
            <StyledCard title="Snapshots" className="flex-1">
              <div className="flex flex-col space-y-2 ">
                <StyledSelect2
                  selected={currentSnapshot}
                  items={[...characterSnapshots].reverse() ?? []}
                  mapToText={(e) => new Date(e?.timestamp).toLocaleString()}
                  onSelectChange={(e) => {
                    router.replace({
                      query: {
                        characterId: characterId,
                        snapshotId: e?.id,
                      },
                    });
                  }}
                />
                <div className="flex flex-row w-full space-x-2">
                  <StyledButton
                    className="flex-1"
                    text={"Prev"}
                    onClick={() => {
                      const nextIndex =
                        (characterSnapshots.findIndex(
                          (e) => e.id === snapshotId
                        ) ?? 0) - 1;
                      const nextSnapshot = characterSnapshots[nextIndex];
                      if (nextSnapshot) {
                        router.replace({
                          query: {
                            characterId: characterId,
                            snapshotId: nextSnapshot?.id,
                          },
                        });
                      }
                    }}
                  />
                  <StyledButton
                    className="flex-1 "
                    text={"Take Snapshot"}
                    onClick={() => {
                      takeSnapshot();
                    }}
                  />
                  <StyledButton
                    className="flex-1 "
                    text={"Next"}
                    onClick={() => {
                      const nextIndex =
                        (characterSnapshots.findIndex(
                          (e) => e.id === snapshotId
                        ) ?? 0) + 1;
                      const nextSnapshot = characterSnapshots[nextIndex];
                      if (nextSnapshot) {
                        router.replace({
                          query: {
                            characterId: characterId,
                            snapshotId: nextSnapshot?.id,
                          },
                        });
                      }
                    }}
                  />
                </div>
              </div>
            </StyledCard>
            <StyledCard title={"Progression"} className="flex-1 w-full">
              <CharacterLevelChart snapshots={characterSnapshots} />
            </StyledCard>
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <StyledCard title="Character" className="flex-1">
            <div>
              <div>{currentSnapshot?.league}</div>
              <div>{currentSnapshot?.poeCharacter?.name}</div>
              <div>
                Level {currentSnapshot?.level} {currentSnapshot?.characterClass}
              </div>
              <div>
                Main Skill{" "}
                {GeneralUtils.capitalize(currentSnapshot?.mainSkillKey)}
              </div>
              <div>
                DPS{" "}
                {currentSnapshot?.characterSnapshotPobStats?.totalDpsWithIgnite}
              </div>
            </div>
          </StyledCard>
          <StyledCard title={"Info"} className="flex-1">
            <div>
              <div>
                Bandit:{" "}
                {currentSnapshot?.characterPassivesSnapshot?.banditChoice}
              </div>
              <div>
                Pantheon Major:{" "}
                {currentSnapshot?.characterPassivesSnapshot?.pantheonMajor}
              </div>
              <div>
                Pantheon Minor:{" "}
                {currentSnapshot?.characterPassivesSnapshot?.pantheonMinor}
              </div>
            </div>
          </StyledCard>
        </div>
        <div className="flex flex-row space-x-2">
          <StyledCard title={"Pob Stats"} className="flex-1">
            <CharacterStatsDisplay
              pobStats={currentSnapshot?.characterSnapshotPobStats}
            />
          </StyledCard>
        </div>

        <StyledCard title={"Passive Tree"}>
          <SkillTree
            version={"3.20"}
            selectedNodes={currentSnapshot?.characterPassivesSnapshot?.hashes}
          />
        </StyledCard>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { characterId, snapshotId } = context.query;

  if (characterId && snapshotId) {
    const resp: any = await client.query({
      query: snapshotQuery,
      variables: { snapshotId: snapshotId },
    });

    if (resp?.data?.characterSnapshot) {
      return {
        props: { characterSnapshot: resp?.data?.characterSnapshot },
      };
    }
  }

  return {
    props: {},
  };
}
