import { gql, useQuery } from "@apollo/client";
import StyledButton from "@components/library/styled-button";
import StyledCard from "@components/library/styled-card";
import StyledMultiSelect2 from "@components/library/styled-multi-select-2";
import { TftLiveListing } from "@generated/graphql";
import { GeneralUtils } from "@utils/general-util";
import moment from "moment";
import { useState } from "react";

export default function TftSearch() {
  const [searchSettings, setSearchSettings] = useState<{
    selectedRegion: string[];
  }>({ selectedRegion: ["NA", "EU", "KR", "RU", "SG", "JP"] });

  const [listings, setListings] = useState<TftLiveListing[] | null>(null);
  useQuery(
    gql`
      query TftLiveListings {
        tftLiveListings {
          messageId
          listedAtTimestamp
          updatedAtTimestamp
          delistedAtTimestamp
          tag
          body
          properties
        }
      }
    `,
    {
      pollInterval: 1000,
      onCompleted(data) {
        setListings(data.tftLiveListings);
      },
    }
  );

  return (
    <>
      <StyledCard>
        <StyledMultiSelect2
          selected={searchSettings.selectedRegion}
          items={["NA", "EU", "KR", "RU", "SG", "JP"]}
          onSelectChange={(e) => {
            setSearchSettings({ ...searchSettings, selectedRegion: e });
          }}
        />
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th></th>
              <th>IGN</th>
              <th>Regions</th>
              <th>Price Per Run</th>
              <th>Listing</th>
              <th>Clients</th>
              <th>Resetters</th>
              <th>Aurabots</th>
              <th>Age</th>
            </tr>
          </thead>
          {listings
            ?.filter((e) =>
              e.properties.regions.some((r) =>
                searchSettings.selectedRegion.includes(r.toUpperCase())
              )
            )
            ?.map((listing, i) => (
              <>
                <tr key={i}>
                  <td>
                    <StyledButton
                      text={"Copy Whisper"}
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `@${listing.properties.ign} Hey I'd like to join your 5 way as a client, ${listing.properties.priceDiv} div / ${listing.properties.runs} runs.`
                        );
                      }}
                    />
                  </td>
                  <td>{listing.properties.ign}</td>
                  <td>{listing.properties.regions.join(", ")}</td>
                  <td>
                    {GeneralUtils.roundToFirstNoneZeroN(
                      listing.properties.priceDiv / listing.properties.runs
                    )}{" "}
                    div
                  </td>
                  <td>
                    {listing.properties.priceDiv} div /{" "}
                    {listing.properties.runs} runs
                  </td>
                  <td>
                    {listing.properties.currentClients}/
                    {listing.properties.maxClients}
                  </td>
                  <td>
                    {listing.properties.currentResetters}/
                    {listing.properties.maxResetters}
                  </td>
                  <td>
                    {listing.properties.currentAurabots}/
                    {listing.properties.maxAurabots}
                  </td>
                  <td> {moment(listing.updatedAtTimestamp).fromNow()}</td>
                </tr>
              </>
            ))}
        </table>
      </StyledCard>
    </>
  );
}
