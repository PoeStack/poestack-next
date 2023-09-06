import Image from "next/image";
import Link from "next/link";

import GggAuthBtn from "@components/ggg-auth-btn";
import { usePoeLeagueCtx } from "@contexts/league-context";
import { usePoeStackAuth } from "@contexts/user-context";

import NotificationButton from "./notification-button";

export default function StyledNavTop() {
  const { profile } = usePoeStackAuth();
  const { league } = usePoeLeagueCtx();

  const navigation = [
    {
      name: "Builds",
      href: `/poe/characters?league=${league}`,
    },
    {
      name: "Stash View",
      href: `/poe/stash-view?league=${league}`,
    },
    {
      name: "Profile",
      href: `/poe/characters/${profile?.userId}`,
    },
    {
      name: "Economy",
      href: `/pricing`,
    },
    /*     {
      name: "Atlas",
      href: `/poe/atlas?league=${league}`,
    }, */
    {
      name: "TFT Bulk Tool",
      href: `/tft/bulk-tool?league=Ancestor`,
    },
    {
      name: "TFT Compasses",
      href: `/tft/live-search?tag=compasses`,
    },
    {
      name: "TFT Five Ways",
      href: `/tft/live-search?tag=five-ways`,
    },
  ];

  return (
    <>
      <div className="flex h-[70px] items-center bg-surface-primary">
        <div className="flex min-h-[50px] items-center justify-center pl-5 text-center">
          <Link href="/">
            <Image
              width={48}
              height={130}
              src={"/logo_noname.png"}
              alt="PoeStack"
            />
          </Link>
          <Link href="/">
            <div className="self-center whitespace-nowrap text-2xl font-semibold text-content-base">
              PoeStack
            </div>
          </Link>
        </div>
        <div className="flex-1"></div>
        <div className="flex">
          {navigation.map((item) => (
            <li
              key={item.name}
              className={`text-md block rounded-md font-semibold leading-6 hover:bg-color-primary`}
            >
              <Link href={item.href} className="block py-3 px-2 leading-6">
                {item.name}
              </Link>
            </li>
          ))}
        </div>
        <div className="flex-1"></div>
        <NotificationButton />
        <div className="pr-2 pl-4">
          <GggAuthBtn />
        </div>
      </div>
    </>
  );
}
