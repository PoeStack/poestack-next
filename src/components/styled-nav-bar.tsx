import Link from "next/link";
import React from "react";
import GggAuthBtn from "./ggg-auth-btn";
import { usePoeStackAuth } from "../contexts/user-context";
import SearchBar from "./search-bar";
import Image from "next/image";
import { StyledTooltip } from "./styled-tooltip";

import { Tooltip } from "flowbite-react";

export default function StyledNavBar() {
  const { profile } = usePoeStackAuth();

  return (
    <>
      <div className="flex h-12 w-full bg-skin-tertiary-light items-center pl-2 pr-2">
        <div className="flex space-x-2 items-center">
          <div className="flex space-x-1">
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
            <Tooltip
              content="Currency Pricing and Listings"
              className="bg-skin-primary"
            >
              Economy
            </Tooltip>
          </Link>
          <Link
            className="font-semibold hover:text-skin-accent"
            href={`/poe/characters`}
          >
            <Tooltip content="Search Characters like PoeNinja">
              Characters
            </Tooltip>
          </Link>
          {profile && (
            <Link
              className="font-semibold hover:text-skin-accent"
              href={`/poe/characters/${profile.userId}`}
            >
              <Tooltip content="All your Characters">My Characters</Tooltip>
            </Link>
          )}
          {profile && (
            <Link
              className="font-semibold hover:text-skin-accent"
              href="/poe/stash/snapshot/profiles"
            >
              <Tooltip content="Create custom profiles around your stash pages">
                Stash
              </Tooltip>
            </Link>
          )}
        </div>
        <div className="grow">
          <SearchBar />
        </div>
        <div className="flex space-x-6  text-skin-base">
          <div className="font-semibold hover:text-skin-accent">
            <a href="https://discord.gg/zqeTWZvb76">
              <Tooltip content="Found any bugs? Have suggestions for features? Or just want to help contribute. Click and join the discord!">
                Join Discord
              </Tooltip>
            </a>
          </div>
          <div className="font-semibold hover:text-skin-accent">
            <Tooltip content="Found any bugs? Have suggestions for features? Or just want to help contribute. Click and join the discord!">
              <GggAuthBtn />
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}
