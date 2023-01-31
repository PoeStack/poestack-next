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
      <div className="flex h-12 w-full bg-theme-color-1 items-center pl-2 pr-2">
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
          <Link href="/poe/economy/Sanctum?tag=currency">Economy</Link>
          {profile && (
            <Link href="/poe/stash/snapshot/profiles">My Profiles</Link>
          )}
        </div>
        <div className="grow">
          <SearchBar />
        </div>
        <div className="flex space-x-6">
          <a href="https://discord.gg/zqeTWZvb76">Join Discord</a>
          <GggAuthBtn />
        </div>
      </div>
    </>
  );
}
