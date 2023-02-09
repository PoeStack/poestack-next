import Link from "next/link";
import React from "react";
import GggAuthBtn from "./ggg-auth-btn";
import { usePoeStackAuth } from "../contexts/user-context";
import SearchBar from "./search-bar";
import Image from "next/image";
import { StyledTooltip } from "./styled-tooltip";

export default function StyledNavBar() {
  const { profile } = usePoeStackAuth();

  return (
    <>
      <div className="flex h-12 w-full min-w-fit bg-skin-tertiary-light items-center pl-2 pr-2">
        <div className="flex min-w-fit space-x-2 items-center">
          <div className="flex min-w-[130px] space-x-1">
            <Link href={"/"}>
              <Image
                height={48}
                width={130}
                src={"/logo_white_name.png"}
                alt={"PoeStack"}
              />
            </Link>
          </div>
          <Link
            className="font-semibold hover:text-skin-accent"
            href="/poe/economy/Sanctum?tag=currency"
          >
            <StyledTooltip
              texts={["Currency Pricing and Listings"]}
              placement="bottom"
              className="mt-2"
            >
              <h3>Economy</h3>
            </StyledTooltip>
          </Link>
          <Link
            className="font-semibold hover:text-skin-accent"
            href={`/poe/characters`}
          >
            <StyledTooltip
              texts={["Search Characters like PoeNinja"]}
              placement="bottom"
              className="mt-2"
            >
              <h3>Characters</h3>
            </StyledTooltip>
          </Link>
          {profile && (
            <Link
              className="font-semibold hover:text-skin-accent"
              href={`/poe/characters/${profile.userId}`}
            >
              <StyledTooltip
                texts={["All your Characters"]}
                placement="bottom"
                className="mt-2"
              >
                <h3>My Characters</h3>
              </StyledTooltip>
            </Link>
          )}
          {profile && (
            <Link
              className="font-semibold hover:text-skin-accent"
              href="/poe/stash/snapshot/profiles"
            >
              <StyledTooltip
                texts={["Create custom profiles around your stash pages"]}
                placement="bottom"
                className="mt-2"
              >
                <h3>Stash</h3>
              </StyledTooltip>
            </Link>
          )}
        </div>
        <div className="grow">
          <SearchBar />
        </div>
        <div className="flex space-x-6 min-w-[200px] text-skin-base">
          <div className="font-semibold hover:text-skin-accent">
            <a href="https://discord.gg/zqeTWZvb76">
              <StyledTooltip
                texts={[
                  "Found any bugs? Have suggestions for features?",
                  "Or just want to help contribute. Click and join the discord!",
                ]}
                placement="bottom"
                className="mt-2"
              >
                <h3>Join Discord</h3>
              </StyledTooltip>
            </a>
          </div>
          <div className="font-semibold hover:text-skin-accent">
            <StyledTooltip
              texts={[
                "Found any bugs? Have suggestions for features?",
                "Or just want to help contribute. Click and join the discord!",
              ]}
              placement="bottom"
              className="mt-2"
            >
              <GggAuthBtn />
            </StyledTooltip>
          </div>
        </div>
      </div>
    </>
  );
}
