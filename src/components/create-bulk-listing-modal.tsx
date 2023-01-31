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
} from "../__generated__/resolvers-types";

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
    save: false,
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
  });

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
  const [generateListing] = useMutation(
    gql`
      mutation ExportStashSnapshot($input: StashSnapshotExportInput!) {
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
        input: exporterInput,
      },
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
      mutation ExportStashSnapshot($input: StashSnapshotExportInput!) {
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
          ...{ save: true },
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
      ...{ excludedItemGroupHashStrings: excludedItemGroupHashStrings },
    };
    if (exporterInput.exportType && itemGroupSearch) {
      generateListing();
    }
  }, [
    generateListing,
    exporterInput,
    itemGroupSearch,
    excludedItemGroupHashStrings,
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto text-white">
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-theme-color-1 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    Export Item Data
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col space-y-2">
                    <StyledSelect
                      items={[
                        "csv",
                        "forum shop",
                        "compass",
                        "heist",
                        "logbook",
                        "essence",
                        "scarab",
                        "fragment",
                        "card",
                        "delirium orb",
                        "oil",
                        "incubator",
                        "resonator",
                        "artifacts",
                      ]}
                      onSelectChange={(e) => {
                        setExporterInput({
                          ...exporterInput,
                          ...{ exportType: e },
                        });
                      }}
                      initalValue={exporterInput.exportType}
                    />

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
                        exporterInput.alwaysPriceInChaos
                          ? "always price in chaos"
                          : "mixed"
                      }
                    />

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
