import Image from "next/image";
import Link from "next/link";

import GggAuthBtn from "@components/ggg-auth-btn";
import { usePoeLeagueCtx } from "@contexts/league-context";
import { usePoeStackAuth } from "@contexts/user-context";

import NotificationButton from "./notification-button";
import StyledDropdown from "@components/library/styled-dropdown";
import { useRouter } from "next/router";

export default function StyledNavTop() {
  const { profile } = usePoeStackAuth();
  const { league } = usePoeLeagueCtx();
  const router = useRouter();

  const navigation = [
    /*     {
      name: "Builds",
      href: `/poe/characters?league=${league}`,
    }, */
    {
      name: "Stash View",
      href: `/poe/stash-view?league=${league}`,
    },
    /*     {
      name: "Profile",
      href: `/poe/characters/${profile?.userId}`,
    }, */
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
      href: `/tft/bulk-tool?league=Affliction`,
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
          <StyledDropdown
            items={[
              {
                text: `Connect a ${profile?.discordUsername ? 'different ' : ''}Discord`,
                onClick: () => {
                  localStorage.setItem("variable-redirect", router.asPath);
                  router.push(
                    "https://discord.com/api/oauth2/authorize?client_id=1075074940275019836&redirect_uri=https%3A%2F%2Fpoestack.com%2Fdiscord%2Fconnected&response_type=code&scope=identify"
                  );
                },
              },
            ]}
            text={profile?.discordUsername ? `Discord connected: ${profile?.discordUsername}` : "No discord connected"}
          />
        </div>
        <div className="pr-2 pl-4">
          <GggAuthBtn />
        </div>
      </div>
    </>
  );
}
