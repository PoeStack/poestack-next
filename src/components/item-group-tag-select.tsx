import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import StyledMultiSelect2 from "./styled-multi-select-2";

export default function ItemGroupTagSelect({
  selected,
  league,
  onSelectChange,
}: {
  selected: string | string[] | undefined;
  league: string;
  onSelectChange: (e: string[]) => void;
}) {
  const [allTags, setAllTags] = useState<string[]>([]);
  useQuery(
    gql`
      query Query($league: String!) {
        itemGroupTags(league: $league)
      }
    `,
    {
      variables: { league: league },
      onCompleted(resp) {
        setAllTags(resp?.itemGroupTags);
      },
    }
  );

  return (
    <>
      <StyledMultiSelect2
        selected={selected}
        items={allTags}
        onSelectChange={(e) => {
          onSelectChange(e);
        }}
      />
    </>
  );
}
