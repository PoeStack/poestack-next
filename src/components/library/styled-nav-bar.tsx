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
      href: `/tft/bulk-tool?league=Affliction`,
      current: false,
    },
  ];

  return (
    <>
      <div className="sticky inset-0 flex min-h-screen flex-col bg-surface-primary px-2">
        {/* Profile */}
        {/* Navgiation */}
        <ul role="list" className="space-y-2"></ul>
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
              className="block  font-semibold hover:text-content-accent"
            >
              Patreon
            </a>
          </Link>
          <Link href={`http://discord.com/invite/zqeTWZvb76`} legacyBehavior>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="block  font-semibold hover:text-content-accent"
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
