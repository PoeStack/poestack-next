import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import GggAuthBtn from "@components/ggg-auth-btn";
import LeagueSelect from "@components/league-select";
import ThemeChanger from "@components/theme-changer";
import { usePoeLeagueCtx } from "@contexts/league-context";
import { usePoeStackAuth } from "@contexts/user-context";

export default function StyledNavBar() {
  const windowWidth = useWindowSize();

  const breakpoint = 1125;

  return <DesktopNavBar />;
}

function DesktopNavBar() {
  const { profile } = usePoeStackAuth();
  const { league } = usePoeLeagueCtx();

  const navigation = [
    {
      name: "Builds",
      href: `/poe/characters?league=${league}`,
      current: false,
    },
    {
      name: "Stash View",
      href: `/poe/stash-view?league=${league}`,
      current: false,
    },
    {
      name: "Profile",
      href: `/poe/characters/${profile?.userId}`,
      current: false,
    },
    {
      name: "Economy",
      href: `/poe/economy/${league}?tag=currency`,
      current: false,
    },
    {
      name: "Atlas",
      href: `/poe/atlas?league=${league}`,
      current: false,
    },
    {
      name: "TFT Bulk Tool",
      href: `/tft/bulk-tool?league=Crucible`,
      current: false,
    },
  ];

  return (
    <>
      <div className="flex flex-col bg-surface-primary px-2 sticky inset-0 min-h-screen">
        <div className="flex items-center text-center justify-center h-16 w-full">
          <Link href="/">
            <Image
              width={48}
              height={130}
              src={"/logo_noname.png"}
              alt="PoeStack"
            />
          </Link>
          <Link href="/">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-content-base">
              PoeStack
            </span>
          </Link>
        </div>
        {/* Profile */}
        {/* Navgiation */}
        <ul role="list" className="space-y-2">
          {navigation.map((item) => (
            <li
              key={item.name}
              className={`block text-sm font-semibold leading-6 rounded-md hover:bg-color-primary ${
                item.current ? "bg-color-primary" : ""
              }`}
            >
              <Link
                href={item.href}
                className="block py-3 px-2 text-sm font-semibold leading-6 "
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* Spacer */}
        <div className="flex-1"></div>
        {/* Settings with Options */}
        <div className="mb-4 space-y-4">
          <Link
            href={`https://www.patreon.com/PoeStack/membership`}
            legacyBehavior
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-content-accent  block font-semibold"
            >
              Patreon
            </a>
          </Link>
          <Link href={`http://discord.com/invite/zqeTWZvb76`} legacyBehavior>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-content-accent  block font-semibold"
            >
              Join the Discord
            </a>
          </Link>
          {/* <LeagueSelect /> */}
        </div>
      </div>
    </>
  );
}

function useWindowSize() {
  const [width, setWidth] = useState(undefined);
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowWidth(window.innerWidth);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowWidth;
}
