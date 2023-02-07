import { gql, useMutation, useQuery } from "@apollo/client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  CharacterSnapshot,
  PassiveTreeResponse,
} from "../../../../__generated__/resolvers-types";
import StyledCard from "../../../../components/styled-card";
import EquipmentDisplay from "../../../../components/equipment-display";
import SecondaryEquipmentDisplay from "../../../../components/secondary-equipment-display";
import StyledButton from "../../../../components/styled-button";
import CharacterStatsDisplay from "../../../../components/character-stats-display";
import SkillTree from "../../../../components/skill-tree/skill-tree";
import StyledMultiSelect2 from "../../../../components/styled-multi-select-2";
import StyledSelect2 from "../../../../components/styled-select-2";
import CharacterLevelChart from "../../../../components/character-level-chart";

export default function Character() {
  const router = useRouter();
  const { characterId, snapshotId } = router.query;

  const [characterSnapshots, setCharacterSnapshots] = useState<
    CharacterSnapshot[]
  >([]);
  const [currentSnapshot, setCurrentSnapshot] =
    useState<CharacterSnapshot | null>(null);

  const { refetch: refetchSnapshots } = useQuery(
    gql`
      query CharacterSnapshots($characterId: String!) {
        characterSnapshots(characterId: $characterId) {
          id
          characterId
          timestamp
          characterClass
          league
          experience
          level
          current
        }
      }
    `,
    {
      skip: !characterId,
      variables: { characterId: characterId },
      onCompleted(data) {
        setCharacterSnapshots(data.characterSnapshots);
        if (data.characterSnapshots.length > 0) {
          router.replace({
            query: {
              characterId: characterId,
              snapshotId:
                data.characterSnapshots[data.characterSnapshots.length - 1].id,
            },
          });
        }
      },
    }
  );

  useQuery(
    gql`
      query CharacterSnapshot($snapshotId: String!, $characterId: String!) {
        characterSnapshot(snapshotId: $snapshotId, characterId: $characterId) {
          id
          characterId
          timestamp
          characterClass
          league
          experience
          level
          current
          characterPassivesSnapshot {
            snapshotId
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
            snapshotId
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
            flavourText
            description
            icon
            mainSkill
            w
            h
            corrupted
            support
            socket
            gemColor
            itemGroupHashString
          }
          poeCharacter {
            id
            userId
            name
            createdAtTimestamp
            lastSnapshotTimestamp
          }
          characterSnapshotPobStats {
            snapshotId
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
            pobCode
            supression
            totalDpsWithIgnite
          }
        }
      }
    `,
    {
      skip: !characterId || !snapshotId,
      variables: { characterId: characterId, snapshotId: snapshotId },
      onCompleted(data) {
        setCurrentSnapshot(data.characterSnapshot);
      },
    }
  );

  const [passiveTreeData, setPassiveTreeData] =
    useState<PassiveTreeResponse | null>(null);
  const { refetch: refetchPassiveTreeData } = useQuery(
    gql`
      query PassiveTree($passiveTreeVersion: String!) {
        passiveTree(passiveTreeVersion: $passiveTreeVersion) {
          constants {
            minX
            minY
            maxX
            maxY
            skillsPerOrbit
            orbitRadii
          }
          nodeMap
          connectionMap
        }
      }
    `,
    {
      skip: true,
      variables: { passiveTreeVersion: "3.20" },
      onCompleted(data) {
        setPassiveTreeData(data.passiveTree);
        if (data.passiveTree) {
          localStorage.setItem(
            "3.20_passive_data_5",
            JSON.stringify(data.passiveTree)
          );
        }
      },
    }
  );

  useEffect(() => {
    if (typeof window !== "undefined" && !passiveTreeData) {
      const localData = localStorage.getItem("3.20_passive_data_5");
      if (localData) {
        setPassiveTreeData(JSON.parse(localData));
      } else {
        refetchPassiveTreeData();
      }
    }
  }, [passiveTreeData, refetchPassiveTreeData]);

  const [takeSnapshot] = useMutation(
    gql`
      mutation TakeCharacterSnapshot($characterId: String!) {
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

  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row space-x-2">
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

          <div className="flex flex-col space-y-2 flex-1">
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
                <div className="flex flex-row space-x-2 w-full">
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
                    className="flex-1"
                    text={"Take Snapshot"}
                    onClick={() => {
                      takeSnapshot();
                    }}
                  />
                  <StyledButton
                    className="flex-1"
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
            <StyledCard title={"Progression"} className="flex-1">
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
                {
                  currentSnapshot?.characterSnapshotItems?.find(
                    (e) => e.mainSkill === true
                  )?.typeLine
                }
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
          {passiveTreeData && (
            <SkillTree
              data={passiveTreeData}
              selectedNodes={
                new Set(
                  currentSnapshot?.characterPassivesSnapshot?.hashes.map((h) =>
                    h.toString()
                  ) ?? []
                )
              }
            />
          )}
        </StyledCard>
      </div>
    </>
  );
}
