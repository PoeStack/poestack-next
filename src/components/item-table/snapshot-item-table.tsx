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
  itemValueOverrides: Record<string, string> | null | undefined;
  league: string;
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
    league: snapshot.league,
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
        searchUserInput={searchUserInput}
        setSearchUserInput={setSearchUserInput}
        disableTotalValueRow={true}
      />
    </>
  );
}
