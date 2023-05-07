import Image from "next/image";
import Link from "next/link";

import GggAuthBtn from "@components/ggg-auth-btn";
import { usePoeLeagueCtx } from "@contexts/league-context";
import { usePoeStackAuth } from "@contexts/user-context";

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
      href: `/poe/economy/${league}?tag=currency`,
    },
    /*     {
      name: "Atlas",
      href: `/poe/atlas?league=${league}`,
    }, */
    {
      name: "TFT Bulk Tool",
      href: `/tft/bulk-tool?league=Crucible`,
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
      <div className="h-[70px] bg-surface-primary flex items-center">
        <div className="flex items-center text-center justify-center pl-5 min-h-[50px]">
          <Link href="/">
            <Image
              width={48}
              height={130}
              src={"/logo_noname.png"}
              alt="PoeStack"
            />
          </Link>
          <Link href="/">
            <div className="self-center text-2xl font-semibold whitespace-nowrap text-content-base">
              PoeStack
            </div>
          </Link>
        </div>
        <div className="flex-1"></div>
        <div className="flex">
          {navigation.map((item) => (
            <li
              key={item.name}
              className={`block text-md font-semibold leading-6 rounded-md hover:bg-color-primary`}
            >
              <Link href={item.href} className="block py-3 px-2 leading-6">
                {item.name}
              </Link>
            </li>
          ))}
        </div>
        <div className="flex-1"></div>
        <li
          className={`block text-md font-semibold leading-6 rounded-md hover:bg-color-primary pr-2`}
        >
          <Link
            href={"/poe-stack/support"}
            className="block py-3 px-2 leading-6"
          >
            Become a Supporter
          </Link>
        </li>
        <div className="pr-2">
          <GggAuthBtn />
        </div>
      </div>
    </>
  );
}
