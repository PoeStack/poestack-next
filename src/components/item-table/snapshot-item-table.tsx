import {
  StashSnapshot,
  StashSnapshotItemGroupSummarySearchInput,
  StashSnapshotItemGroupSummarySearchResponse,
} from "@generated/graphql";
import ItemTableBody from "./item-table-body";
import { SetStateAction, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import CreateBulkListingPanel from "./create-bulk-listing-panel";
import StyledPaginate from "@components/styled-paginate";

export interface ItemSearchUserInput {
  excludedItemGroupHashStrings: string[];
  itemValueOverrides: Record<string, number> | null | undefined;
  sortKey: string;
  sortDirection: string;
  tags: string[] | null | undefined;
  keys: string[] | null | undefined;
  skip: number;
  limit: number;
}

export default function SnapshotItemTable({
  snapshot,
}: {
  snapshot: StashSnapshot;
}) {
  const [searchUserInput, setSearchUserInput] = useState<ItemSearchUserInput>({
    excludedItemGroupHashStrings: [],
    itemValueOverrides: {},
    sortKey: "totalValueChaos",
    sortDirection: "desc",
    tags: null,
    keys: null,
    skip: 0,
    limit: 20,
  });

  function buildSearch(
    applyexcludedItemGroupHashStrings: boolean
  ): StashSnapshotItemGroupSummarySearchInput {
    const search: StashSnapshotItemGroupSummarySearchInput = {
      snapshotId: snapshot.id,
      skip: searchUserInput.skip,
      limit: searchUserInput.limit,
      tags: searchUserInput.tags,
      sortKey: searchUserInput.sortKey,
      sortDirection: searchUserInput.sortDirection,
      excludedItemGroupHashStrings: applyexcludedItemGroupHashStrings
        ? searchUserInput.excludedItemGroupHashStrings
        : [],
      keys: searchUserInput.keys?.map((e) => e.toLowerCase()) ?? undefined,
    };
    return search;
  }

  return (
    <>
      <CreateBulkListingPanel
        itemGroupSearch={buildSearch(true)}
        searchUserInput={searchUserInput}
        setSearchUserInput={setSearchUserInput}
      />
      <StyledPaginate
        currentSkip={searchUserInput.skip}
        onSelectionChange={(skip: number, limit: number) => {
          setSearchUserInput({ ...searchUserInput, skip: skip, limit: limit });
        }}
        limit={searchUserInput.limit}
        hasMore={true}
      />
      <ItemTableBody
        itemGroupSearch={buildSearch(false)}
        league={snapshot.league}
        searchUserInput={searchUserInput}
        setSearchUserInput={setSearchUserInput}
        disableTotalValueRow={true}
      />
    </>
  );
}
