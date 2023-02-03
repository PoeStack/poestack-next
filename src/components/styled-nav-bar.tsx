import Link from "next/link";
import React from "react";
import GggAuthBtn from "./ggg-auth-btn";
import { usePoeStackAuth } from "../contexts/user-context";
import SearchBar from "./search-bar";
import Image from "next/image";

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
            Economy
          </Link>
          {profile && (
            <Link
              className="font-semibold hover:text-skin-accent"
              href={`/poe/characters/${profile.userId}`}
            >
              My Characters
            </Link>
          )}
          {profile && (
            <Link
              className="font-semibold hover:text-skin-accent"
              href="/poe/stash/snapshot/profiles"
            >
              Stash
            </Link>
          )}
        </div>
        <div className="grow">
          <SearchBar />
        </div>
        <div className="flex space-x-6  text-skin-base">
          <div className="font-semibold hover:text-skin-accent">
            <a href="https://discord.gg/zqeTWZvb76">Join Discord</a>
          </div>
          <div className="font-semibold hover:text-skin-accent">
            <GggAuthBtn />
          </div>
        </div>
      </div>
    </>
  );
}
