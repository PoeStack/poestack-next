import { gql, useQuery } from "@apollo/client";
import ItemMouseOver from "@components/item-mouseover";
import StyledCard from "@components/styled-card";
import { PublicStashUpdateRecordResponse } from "@generated/graphql";
import { useRouter } from "next/router";
import { useState } from "react";
import Image, { ImageLoaderProps } from "next/image";
import { myLoader } from "../../../../utils/general-util";

export default function PublicStash() {
  const router = useRouter();

  const { profileName } = router.query;

  const [selectedTabId, setSelectedTabId] = useState<string | null>(null);
  const [publicTab, setPublicTab] = useState<any | null>(null);
  const { refetch: fetchPublicTab } = useQuery(
    gql`
      query Query($publicStashId: String!) {
        publicStash(id: $publicStashId)
      }
    `,
    {
      skip: !selectedTabId,
      variables: {
        publicStashId: selectedTabId,
      },
      onCompleted(data) {
        setPublicTab(data.publicStash);
      },
    }
  );

  const [tabsResponse, setTabsResponse] =
    useState<PublicStashUpdateRecordResponse | null>(null);
  useQuery(
    gql`
      query Results($search: PublicStashUpdateRecordSearch!) {
        publicStashUpdateRecords(search: $search) {
          results {
            publicStashId
            league
            poeProfileName
            createdAtTimestamp
            updatedAtTimestamp
            delisted
            stashName
            stashType
          }
        }
      }
    `,
    {
      skip: !profileName,
      variables: { search: { poeProfileNames: [profileName?.toString()] } },
      onCompleted(data) {
        setTabsResponse(data.publicStashUpdateRecords);
        if (data.publicStashUpdateRecords?.results?.length) {
          setSelectedTabId(
            data.publicStashUpdateRecords?.results?.[0]?.publicStashId
          );
        }
      },
    }
  );

  return (
    <>
      <div className="my-4 md:mx-4 lg:mx-20">
        <div className="flex flex-row space-x-2">
          <StyledCard title={"Tabs"}>
            <div className="flex flex-col space-y-2">
              {tabsResponse?.results?.map((e) => (
                <>
                  <div
                    onClick={() => {
                      setSelectedTabId(e?.publicStashId);
                    }}
                  >
                    <div>{e.league}</div>
                    <div>{e.stashName}</div>
                  </div>
                </>
              ))}
            </div>
          </StyledCard>
          <StyledCard title={"Contents"} className="flex-1">
            <div className="grid grid-cols-12">
              {publicTab?.items?.map((e) => (
                <>
                  <div>
                    <ItemMouseOver item={e} items={[]}>
                      <Image
                        loader={myLoader}
                        height={94}
                        width={94}
                        src={e?.icon!}
                        alt={""}
                      />
                    </ItemMouseOver>
                  </div>
                </>
              ))}
            </div>
          </StyledCard>{" "}
        </div>
      </div>
    </>
  );
}
