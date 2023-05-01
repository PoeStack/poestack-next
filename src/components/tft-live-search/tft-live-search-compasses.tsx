import { useState } from "react";

import { gql, useQuery } from "@apollo/client";
import StyledCard from "@components/library/styled-card";
import {
  TftLiveListing,
  TftLiveListingSearchProperty,
} from "@generated/graphql";

export function TftLiveSearchCompasses() {
  const [filters, setFilters] = useState<TftLiveListingSearchProperty[]>([
    {
      key: "compasses,Alva,quantity",
      value: "2",
    },
    {
      key: "compasses,Breach,quantity",
      value: "10",
    },
  ]);

  const [listings, setListings] = useState<TftLiveListing[]>([]);
  useQuery(
    gql`
      query TftLiveListingSearch($search: TftLiveListingSearch!) {
        tftLiveListingSearch(search: $search) {
          channelId
          messageId
          userDiscordId
          userDiscordName
          userDiscordDisplayRole
          userDiscordHighestRole
          userDiscordDisplayRoleColor
          updatedAtTimestamp
          delistedAtTimestamp
          tag
          properties
        }
      }
    `,
    {
      variables: {
        search: {
          tag: "compasses",
          propertyFilterGroups: [
            {
              filters: filters,
            },
          ],
        },
      },
      onCompleted(data) {
        setListings(data.tftLiveListingSearch);
      },
    }
  );
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {listings.map((listing) => (
          <>
            <StyledCard>
              <div className="flex flex-col">
                <div className="text-lg">{listing.userDiscordName}</div>
                {filters.map((filter) => {
                  const filterKey = filter.key.split(",")[1];
                  return (
                    <>
                      <div className="text-sm">
                        x{listing.properties.compasses[filterKey].quantity}{" "}
                        {filterKey}{" "}
                        {listing.properties.compasses[filterKey].value}c each
                      </div>
                    </>
                  );
                })}
              </div>
            </StyledCard>
          </>
        ))}
      </div>
    </>
  );
}
