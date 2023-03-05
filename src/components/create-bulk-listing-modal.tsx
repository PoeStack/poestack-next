import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";

import { gql, useQuery, useMutation } from "@apollo/client";
import StyledSelect from "./styled-select";
import StyledButton from "./styled-button";
import StyledInput from "./styled-input";
import CurrencyValueDisplay from "./currency-value-display";
import {
  StashSnapshotExport,
  StashSnapshotExportInput,
  StashSnapshotItemGroupSummarySearch,
} from "../__generated__/graphql";
import StyledSelect2 from "./styled-select-2";

export const exporterTypesToPanels = {
  csv: {
    name: "csv",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lEdXBsaWNhdGUiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/7111e35254/CurrencyDuplicate.png",
    disableTftButtons: true,
  },
  "forum shop": {
    name: "forum shop",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lEdXBsaWNhdGUiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/7111e35254/CurrencyDuplicate.png",
    panel: ForumExporterOptions,
    disableTftButtons: true,
  },
  compass: {
    name: "compass",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ2hhcmdlZENvbXBhc3MiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/ea8fcc3e35/ChargedCompass.png",
    panel: TftBaseExporterOptions,
  },
  heist: {
    name: "heist",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvSGVpc3QvQ29udHJhY3RJdGVtMiIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/f755c71433/ContractItem2.png",
    panel: TftBaseExporterOptions,
  },
  logbook: {
    name: "logbook",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvTWFwcy9FeHBlZGl0aW9uQ2hyb25pY2xlMyIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/2802fe605e/ExpeditionChronicle3.png",
    panel: TftBaseExporterOptions,
  },
  essence: {
    name: "essence",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRXNzZW5jZS9Db250ZW1wdDYiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/332e9b32e9/Contempt6.png",
    panel: TftBaseExporterOptions,
  },
  scarab: {
    name: "scarab",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvU2NhcmFicy9UaWVyNFNjYXJhYkhhcmJpbmdlcnMiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/81caefbf3f/Tier4ScarabHarbingers.png",
    panel: TftBaseExporterOptions,
  },
  fragment: {
    name: "fragment",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQnJlYWNoL0JyZWFjaEZyYWdtZW50c0NoYW9zIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/04b5c032f4/BreachFragmentsChaos.png",
    panel: TftBaseExporterOptions,
    subFilters: [
      {
        name: "breachstones",
        icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQnJlYWNoL0JyZWFjaEZyYWdtZW50c0NoYW9zIiwic2NhbGUiOjF9XQ/4c99b7dd49/BreachFragmentsChaos.png",
        keys: [
          "Uul-Netol's Flawless Breachstone",
          "Xoph's Flawless Breachstone",
          "Tul's Flawless Breachstone",
          "Esh's Flawless Breachstone",
          "Chayula's Pure Breachstone",
          "Chayula's Breachstone",
          "Chayula's Charged Breachstone",
          "Chayula's Enriched Breachstone",
          "Uul-Netol's Pure Breachstone",
          "Uul-Netol's Enriched Breachstone",
          "Esh's Pure Breachstone",
          "Tul's Pure Breachstone",
          "Uul-Netol's Charged Breachstone",
          "Xoph's Pure Breachstone",
          "Uul-Netol's Breachstone",
          "Xoph's Enriched Breachstone",
          "Tul's Enriched Breachstone",
          "Esh's Enriched Breachstone",
          "Xoph's Charged Breachstone",
          "Tul's Charged Breachstone",
          "Esh's Charged Breachstone",
          "Esh's Breachstone",
          "Xoph's Breachstone",
          "Tul's Breachstone",
          "Chayula's Flawless Breachstone",
        ],
      },
      {
        name: "atizir",
        icon: "https://web.poecdn.com/gen/image/WzI4LDE0LHsiZiI6IjJESXRlbXMvTWFwcy9WYWFsQ29tcGxldGUiLCJzY2FsZSI6MX1d/63035d86d7/VaalComplete.png",
        keys: [
          "Sacrifice at Midnight",
          "Sacrifice at Noon",
          "Sacrifice at Dawn",
          "Sacrifice at Dusk",
        ],
      },
      {
        name: "uber atziri",
        icon: "https://web.poecdn.com/gen/image/WzI4LDE0LHsiZiI6IjJESXRlbXMvTWFwcy9VYmVyVmFhbENvbXBsZXRlIiwic2NhbGUiOjF9XQ/994d9e2821/UberVaalComplete.png",
        keys: [
          "Mortal Rage",
          "Mortal Ignorance",
          "Mortal Hope",
          "Mortal Grief",
        ],
      },
      {
        name: "shaper",
        icon: "https://web.poecdn.com/gen/image/WzI4LDE0LHsiZiI6IjJESXRlbXMvTWFwcy9TaGFwZXJDb21wbGV0ZSIsInNjYWxlIjoxfV0/ace686004d/ShaperComplete.png",
        keys: [
          "Fragment of the Hydra",
          "Fragment of the Phoenix",
          "Fragment of the Minotaur",
          "Fragment of the Chimera",
        ],
      },
      {
        name: "elder",
        icon: "https://web.poecdn.com/gen/image/WzI4LDE0LHsiZiI6IjJESXRlbXMvTWFwcy9FbGRlckNvbXBsZXRlIiwic2NhbGUiOjF9XQ/6db44597fe/ElderComplete.png",
        keys: [
          "Fragment of Enslavement",
          "Fragment of Eradication",
          "Fragment of Constriction",
          "Fragment of Purification",
          "Fragment of Terror",
        ],
      },
      {
        name: "uber elder",
        icon: "https://web.poecdn.com/gen/image/WzI4LDE0LHsiZiI6IjJESXRlbXMvTWFwcy9VYmVyRWxkZXJDb21wbGV0ZSIsInNjYWxlIjoxfV0/715e041869/UberElderComplete.png",
        keys: [
          "Fragment of Knowledge",
          "Fragment of Shape",
          "Fragment of Terror",
          "Fragment of Emptiness",
        ],
      },
      {
        name: "elderslayer",
        icon: "https://web.poecdn.com/gen/image/WzI4LDE0LHsiZiI6IjJESXRlbXMvTWFwcy9TaXJ1c0ZyYWdtZW50Q29tcGxldGUiLCJzY2FsZSI6MX1d/c585a0ae79/SirusFragmentComplete.png",
        keys: [
          "Drox's Crest",
          "Veritania's Crest",
          "Baran's Crest",
          "Al-Hezmin's Crest",
        ],
      },
    ],
  },
  card: {
    name: "card",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvRGl2aW5hdGlvbi9JbnZlbnRvcnlJY29uIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/f34bf8cbb5/InventoryIcon.png",
    panel: TftBaseExporterOptions,
  },
  "delirium orb": {
    name: "delirium orb",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRGVsaXJpdW0vRGVsaXJpdW1PcmJTY2FyYWJzIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/fa4c5160ca/DeliriumOrbScarabs.png",
    panel: TftBaseExporterOptions,
  },
  oil: {
    name: "oil",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvT2lscy9Hb2xkZW5PaWwiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/69094a06e9/GoldenOil.png",
    panel: TftBaseExporterOptions,
  },
  incubator: {
    name: "incubator",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvSW5jdWJhdGlvbi9JbmN1YmF0aW9uQXJtb3VyIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/637c41a730/IncubationArmour.png",
    panel: TftBaseExporterOptions,
  },
  resonator: {
    name: "resonator",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRGVsdmUvUmVyb2xsMngyQyIsInciOjIsImgiOjIsInNjYWxlIjoxfV0/584267701b/Reroll2x2C.png",
    panel: TftBaseExporterOptions,
  },
  artifacts: {
    name: "artifacts",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRXhwZWRpdGlvbi9CYXJ0ZXJSZWZyZXNoQ3VycmVuY3kiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/bf3e6fbe8f/BarterRefreshCurrency.png",
    panel: TftBaseExporterOptions,
  },
  "unidentified watcher's eyes": {
    name: "unidentified watcher's eyes",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvSmV3ZWxzL0VsZGVySmV3ZWwiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/278c673716/ElderJewel.png",
    panel: TftBaseExporterOptions,
  },
  "blood-filled vessels": {
    name: "blood-filled vessels",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvUml0dWFsL0Jsb29kU29ha2VkRWZmaWd5IiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/1adc81c853/BloodSoakedEffigy.png",
    panel: TftBaseExporterOptions,
  },
};

export default function CreateBulkListingModal({
  open,
  itemGroupSearch,
  onComplete,
  excludedItemGroupHashStrings,
  itemValueOverrides,
}: {
  open: boolean;
  itemGroupSearch: StashSnapshotItemGroupSummarySearch;
  onComplete: () => void;
  excludedItemGroupHashStrings: string[];
  itemValueOverrides: Record<string, number | null>;
}) {
  const [exporterInput, setExporterInput] = useState<StashSnapshotExportInput>({
    league: "",
    search: itemGroupSearch,
    alwaysPriceInChaos: false,
    visualDecimalPrecision: 2,
    maxStackSizeSetting: "max",
    ign: "",
    listedValueMultiplier: 1.0,
    exportType: "",
    stashIndexOffset: 0,
    absoluteMinValueChaos: 0,
    itemGroupValueOverrides: [],
    oneClickPost: false,
  });

  const [selectedExporter, setSelectedExporter] = useState<any | undefined>(
    undefined
  );
  const [selectedSubFilter, setSelectedSubFilter] = useState<any | undefined>(
    undefined
  );
  const [generatingImage, setGeneratingImage] = useState(false);

  useEffect(() => {
    setExporterInput((p) => ({
      ...p,
      ...{
        itemGroupValueOverrides: Object.entries(itemValueOverrides)
          .filter((e) => e[1] !== null)
          .map((o) => ({ itemGroupHashString: o[0], valueChaos: o[1]! })),
      },
    }));
  }, [itemValueOverrides, setExporterInput]);

  const [bulkListing, setBulkListing] = useState<StashSnapshotExport | null>(
    null
  );
  const [generateListing, { loading: generatingListing }] = useMutation(
    gql`
      mutation BulkModalExportStashSnapshot($input: StashSnapshotExportInput!) {
        exportStashSnapshot(input: $input) {
          id
          userId
          createdAtTimestamp
          totalValueChaos
          divineChaosValue
          exportRaw
        }
      }
    `,
    {
      onCompleted(data, clientOptions) {
        setBulkListing(data?.exportStashSnapshot);
      },
    }
  );

  const [
    generateListingToClipboard,
    { loading: generateListingToClipboardLoading },
  ] = useMutation(
    gql`
      mutation BulkModalExportStashSnapshotToClipBoard(
        $input: StashSnapshotExportInput!
      ) {
        exportStashSnapshot(input: $input) {
          id
          userId
          createdAtTimestamp
          totalValueChaos
          divineChaosValue
          exportRaw
        }
      }
    `,
    {
      variables: {
        input: {
          ...exporterInput,
        },
      },
      onCompleted(data, clientOptions) {
        navigator.clipboard.writeText(data?.exportStashSnapshot.exportRaw);
      },
    }
  );

  useEffect(() => {
    exporterInput.search = {
      ...itemGroupSearch,
      ...{
        excludedItemGroupHashStrings: excludedItemGroupHashStrings,
        keys: selectedSubFilter?.keys?.map((e) => e?.toLowerCase()) ?? [],
      },
    };
    if (exporterInput.exportType && itemGroupSearch) {
      generateListing({
        variables: {
          input: exporterInput,
        },
      });
    }
  }, [
    generateListing,
    exporterInput,
    itemGroupSearch,
    excludedItemGroupHashStrings,
    selectedSubFilter,
  ]);

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            onComplete();
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto text-content-base">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden min-h-[500px] rounded-2xl bg-surface-primary p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-content-base"
                  >
                    Export Item Data
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col space-y-2">
                    <StyledSelect2
                      items={Object.values(exporterTypesToPanels)}
                      onSelectChange={(e) => {
                        setSelectedSubFilter(undefined);
                        setSelectedExporter(e);
                        setExporterInput({
                          ...exporterInput,
                          ...{ exportType: e?.name },
                        });
                      }}
                      mapToText={(e) => e?.name}
                      mapToIcon={(e) => e?.icon}
                      selected={selectedExporter}
                    />

                    {exporterTypesToPanels[exporterInput.exportType]?.subFilters
                      ?.length && (
                      <StyledSelect2
                        items={
                          exporterTypesToPanels[exporterInput.exportType]
                            ?.subFilters ?? []
                        }
                        onSelectChange={(e) => {
                          setSelectedSubFilter(e);
                        }}
                        selected={selectedSubFilter}
                        mapToText={(e) => e?.name}
                        mapToIcon={(e) => e?.icon}
                      />
                    )}

                    {exporterTypesToPanels[exporterInput.exportType]?.panel?.({
                      exporterInput,
                      setExporterInput,
                    })}

                    <input
                      id="minmax-range"
                      type="range"
                      min={0}
                      max={200}
                      step={5}
                      value={exporterInput.listedValueMultiplier! * 100}
                      onChange={(e) => {
                        setExporterInput({
                          ...exporterInput,
                          ...{
                            listedValueMultiplier:
                              parseInt(e.target.value) / 100,
                          },
                        });
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />

                    <div className="flex flex-row space-x-2">
                      <h3>Value: </h3>{" "}
                      <CurrencyValueDisplay
                        valueChaos={bulkListing?.totalValueChaos ?? 0}
                      />
                    </div>

                    <div className="flex flex-row space-x-2">
                      <h3>
                        Multiplier: {exporterInput.listedValueMultiplier! * 100}
                        %
                      </h3>
                    </div>

                    <div className="flex flex-row space-x-2">
                      <h3>Listed Value: </h3>{" "}
                      <CurrencyValueDisplay
                        valueChaos={
                          (bulkListing?.totalValueChaos ?? 0) *
                          (exporterInput.listedValueMultiplier ?? 1)
                        }
                      />
                    </div>

                    <StyledButton
                      text={
                        generateListingToClipboardLoading
                          ? "Loading..."
                          : "Copy"
                      }
                      onClick={() => {
                        generateListingToClipboard();
                      }}
                    />
                    {!exporterTypesToPanels[exporterInput.exportType]
                      ?.disableTftButtons && (
                      <StyledButton
                        text={generatingImage ? "Loading..." : "Copy Image"}
                        onClick={() => {
                          setGeneratingImage(true);
                          const cpy = async () => {
                            const response = await fetch(
                              `/api/bulk-export/test?input=${JSON.stringify(
                                exporterInput
                              )}`
                            );
                            const blob = await response.blob();
                            await navigator.clipboard.write([
                              new ClipboardItem({
                                [blob.type]: blob,
                              }),
                            ]);
                          };
                          cpy().finally(() => {
                            setGeneratingImage(false);
                          });
                        }}
                      />
                    )}
                    {!exporterTypesToPanels[exporterInput.exportType]
                      ?.disableTftButtons && (
                      <StyledButton
                        text={
                          generatingListing
                            ? "Loading..."
                            : "Post to TFT (coming soon)"
                        }
                        onClick={() => {
                          generateListing({
                            variables: {
                              input: { ...exporterInput, oneClickPost: true },
                            },
                          });
                        }}
                      />
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export function ForumExporterOptions({ exporterInput, setExporterInput }) {
  return (
    <>
      <StyledSelect
        items={["single", "max", "stack", "full inventory"]}
        onSelectChange={(e) => {
          setExporterInput({
            ...exporterInput,
            ...{ maxStackSizeSetting: e },
          });
        }}
        initalValue={exporterInput.maxStackSizeSetting}
      />

      <StyledSelect
        items={["mixed", "always price in chaos"]}
        onSelectChange={(e) => {
          setExporterInput({
            ...exporterInput,
            ...{
              alwaysPriceInChaos: e === "always price in chaos",
            },
          });
        }}
        initalValue={
          exporterInput.alwaysPriceInChaos ? "always price in chaos" : "mixed"
        }
      />
      <StyledInput
        placeholder="Stash Index Offset"
        type="number"
        value={exporterInput?.stashIndexOffset}
        onChange={(e) => {
          setExporterInput({
            ...exporterInput,
            ...{ stashIndexOffset: parseInt(e) },
          });
        }}
      />
    </>
  );
}

export function TftBaseExporterOptions({ exporterInput, setExporterInput }) {
  return (
    <>
      <StyledInput
        placeholder="IGN"
        value={exporterInput.ign!}
        onChange={(e) => {
          setExporterInput({
            ...exporterInput,
            ...{ ign: e },
          });
        }}
      />
    </>
  );
}
