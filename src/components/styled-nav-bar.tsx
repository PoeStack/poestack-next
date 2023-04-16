import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { usePoeStackAuth } from "@contexts/user-context";
import { usePoeLeagueCtx } from "@contexts/league-context";
import LeagueSelect from "@components/league-select";
import ThemeChanger from "@components/theme-changer";
import GggAuthBtn from "@components/ggg-auth-btn";

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
      name: "Ladder",
      href: `/poe/characters?league=${league}`,
      current: false,
    },
    {
      name: "Stash",
      href: "/poe/stash/snapshot/profiles",
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
      href: `/tft/bulk-tool`,
      current: false,
    },
  ];

  return (
    <>
      <div className="sticky top-0 flex h-screen flex-col gap-y-5 bg-surface-primary px-2">
        <div className="flex h-16 w-full items-center justify-center">
          <Link href="/">
            <Image
              height={48}
              width={130}
              src="/logo_white_name.png"
              alt="PoeStack"
            />
          </Link>
        </div>
        {/* Profile */}
        {/* Navigation */}
        <ul role="list" className="space-y-2">
          {navigation.map((item) => (
            <li
              key={item.name}
              className={`block rounded-md text-sm font-semibold leading-6 hover:bg-color-primary ${
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
          <Link href={`http://discord.com/invite/zqeTWZvb76`} legacyBehavior>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center font-semibold underline hover:text-content-accent"
            >
              Join the Discord
            </a>
          </Link>
          <ThemeChanger />
          <LeagueSelect />
          <GggAuthBtn />
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
