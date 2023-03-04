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
import Image from "next/image";

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
        valueChaos
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

  console.log("currentSnapshotchar: ", currentSnapshot);
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
        <div className="flex flex-col gap-2 lg:grid lg:grid-cols-12 lg:grid-rows-[200px, 200px, 200px, 200px] ">
          <div className="flex lg:grid lg:col-start-4 lg:col-end-9 lg:row-start-1 lg:row-end-2  w-full h-full bg-primary ">
            <div className="flex flex-col space-y-1 items-center bg-surface-secondary p-3">
              <EquipmentDisplay
                items={currentSnapshot?.characterSnapshotItems!}
              />
              <SecondaryEquipmentDisplay
                items={currentSnapshot?.characterSnapshotItems!}
              />
            </div>
          </div>
          <div className="grid col-start-1 col-end-4 row-start-1 row-end-2 font-semibold">
            <StyledCard>
              <div className="grid grid-cols-2 w-full h-full">
                <div className="col-start-1 col-end-2  ">
                  <CharacterStatsDisplay
                    pobStats={currentSnapshot?.characterSnapshotPobStats}
                  />
                </div>
                <div className="col-start-2 col-end-3 pl-4">
                  <div className="flex flex-row mt-4 justify-center">
                    <Image
                      src={`/assets/poe/classes/${currentSnapshot?.characterClass}.png`}
                      alt={currentSnapshot!.characterClass}
                      width={120}
                      height={30}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-x-3 w-full h-full mt-4 ">
                    <div>
                      <div className="flex flex-row hover:bg-color-primary-variant ">
                        <h3>Name:</h3>
                        <h5 className=" mx-2  text-right w-full">
                          {currentSnapshot?.poeCharacter?.name}
                        </h5>
                      </div>
                      <div className="flex flex-row hover:bg-color-primary-variant ">
                        <h3>League:</h3>{" "}
                        <h5 className=" mx-2 text-right w-full">
                          {currentSnapshot?.league}
                        </h5>
                      </div>
                      <div className="flex flex-row hover:bg-color-primary-variant ">
                        <h3>Level:</h3>{" "}
                        <h5 className=" mx-2 text-right w-full">
                          {currentSnapshot?.level}
                        </h5>
                      </div>
                      <div className="flex flex-row hover:bg-color-primary-variant">
                        <h3>Class:</h3>{" "}
                        <h5 className=" mx-2 text-right w-full">
                          {currentSnapshot?.characterClass}
                        </h5>
                      </div>
                      <div className="flex flex-row hover:bg-color-primary-variant">
                        <h3>Skill:</h3>{" "}
                        <h5 className=" mx-2 text-right w-full">
                          {GeneralUtils.capitalize(
                            currentSnapshot?.mainSkillKey
                          )}
                        </h5>
                      </div>
                      <div className="flex flex-row hover:bg-color-primary-variant">
                        <h3>DPS:</h3>{" "}
                        <h5 className=" mx-2 text-right w-full">
                          {
                            currentSnapshot?.characterSnapshotPobStats
                              ?.totalDpsWithIgnite
                          }
                        </h5>
                      </div>
                      <h2 className="text-center mt-8">Choices</h2>
                      <div className="flex flex-row hover:bg-color-primary-variant ">
                        <h3>Bandit:</h3>
                        <h5 className=" mx-4  text-right w-full">
                          {
                            currentSnapshot?.characterPassivesSnapshot
                              ?.banditChoice
                          }
                        </h5>
                      </div>
                      <div className="flex flex-row hover:bg-color-primary-variant ">
                        <h3>Major:</h3>{" "}
                        <h5 className=" mx-4  text-right w-full">
                          {currentSnapshot?.characterPassivesSnapshot?.pantheonMajor?.replace(
                            /([a-z])([A-Z])/g,
                            "$1 $2"
                          )}
                        </h5>
                      </div>
                      <div className="flex flex-row hover:bg-color-primary-variant ">
                        <h3>Minor:</h3>{" "}
                        <h5 className=" mx-4  text-right w-full">
                          {currentSnapshot?.characterPassivesSnapshot?.pantheonMinor?.replace(
                            /([a-z])([A-Z])/g,
                            "$1 $2"
                          )}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-full justify-center mt-2 ">
                <StyledButton
                  text={"Copy POB Code"}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      currentSnapshot?.characterSnapshotPobStats?.pobCode ??
                        "not found"
                    );
                  }}
                />
              </div>
            </StyledCard>
          </div>

          <div className="flex lg:grid lg:col-start-9 lg:col-end-13 lg:row-start-1 lg:row-end-2">
            <StyledCard title={"Passive Tree"}>
              <SkillTree
                version={"3.20"}
                selectedNodes={
                  currentSnapshot?.characterPassivesSnapshot?.hashes
                }
              />
            </StyledCard>
          </div>
          <div className="grid col-start-4 col-end-9 row-start-2 row-end-3">
            <StyledCard title="Snapshots" className="flex-1">
              <div className="flex flex-col space-y-2">
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
            <StyledCard title={"Progression"} className="flex-1 w-full ">
              <CharacterLevelChart snapshots={characterSnapshots} props />
            </StyledCard>
          </div>
        </div>
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
