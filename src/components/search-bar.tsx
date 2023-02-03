import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { GeneralUtils } from "../utils/general-util";
import Link from "next/link";
import { usePoeLeagueCtx, POE_LEAGUES } from "../contexts/league-context";
import StyledSelect2 from "./styled-select-2";
import { GlobalSearchResponse } from "../__generated__/resolvers-types";

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<GlobalSearchResponse | null>(null);

  const { league, setLeague } = usePoeLeagueCtx();
  const [searchText, setSearchText] = useState<string>("");

  useQuery(
    gql`
      query GlobalSearch($search: GlobalSearch!) {
        globalSearch(search: $search) {
          results {
            group
            display
            target
            icon
          }
        }
      }
    `,
    {
      variables: { search: { league: league, searchText: searchText } },
      onCompleted(data) {
        setResult(data.globalSearch);
      },
    }
  );

  return (
    <div className="relative mx-10">
      <div className="flex flex-row space-x-2">
        <input
          className="bg-transparent border w-full border-skin-primary focus:border-skin-base rounded-lg outline-none pl-2"
          placeholder="Search"
          onChange={GeneralUtils.debounce((e) => {
            setSearchText(e.target.value);
          })}
          onFocus={() => {
            setOpen(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setOpen(false);
            }, 400);
          }}
        />
        <StyledSelect2
          selected={league}
          onSelectChange={(l) => {
            setLeague(l);
          }}
          items={POE_LEAGUES}
        />
      </div>
      {open && (
        <>
          <div className="absolute mt-2 z-10 w-full transform -translate-x-1/2 left-1/2 sm:px-0 ">
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="bg-skin-primary-dark z-50 flex flex-col">
                {result?.results.map((e, i) => {
                  return (
                    <>
                      <div
                        key={i}
                        className="w-full flex h-[35px] overflow-hidden"
                      >
                        <Link href={e.target!}>
                          <div className="flex flex-row">
                            <Image
                              src={e?.icon ?? ""}
                              alt="icon"
                              width="20"
                              height="20"
                            />
                            <h3 className="font-semibold hover:text-skin-accent ">
                              {GeneralUtils.capitalize(e.display)}
                            </h3>
                          </div>
                        </Link>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
