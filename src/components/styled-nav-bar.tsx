import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import GggAuthBtn from "./ggg-auth-btn";
import Image from "next/image";
import { Disclosure, Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  BookmarkSquareIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

import {
  GiAtlas,
  GiCharacter,
  GiOpenChest,
  GiReceiveMoney,
} from "react-icons/gi";
import { IoPeople } from "react-icons/io5";

import { StyledTooltip } from "./styled-tooltip";
import SearchBar from "./search-bar";
import { usePoeStackAuth } from "../contexts/user-context";
import { usePoeLeagueCtx } from "../contexts/league-context";
import ThemeChanger from "./theme-changer";

export default function StyledNavBar() {
  const windowWidth = useWindowSize();

  const breakpoint = 1125;

  return windowWidth! < breakpoint ? <MobileNavBar /> : <DesktopNavBar />;
}

function MobileNavBar() {
  const { profile } = usePoeStackAuth();
  const { league } = usePoeLeagueCtx();
  const features = [
    {
      name: "Economy",
      href: `/poe/economy/${league}?tag=currency`,
      icon: GiReceiveMoney,
    },
    { name: "Atlas", href: `/poe/atlas?league=${league}`, icon: GiAtlas },
    {
      name: "Characters",
      href: `/poe/characters?league=${league}`,
      icon: IoPeople,
    },
    {
      name: "My Characters",
      href: `/poe/characters/${profile?.userId}`,
      icon: GiCharacter,
    },
    { name: "Stash", href: "/poe/stash/snapshot/profiles", icon: GiOpenChest },
  ];
  const support = [
    {
      name: "Join Discord",
      href: "#https://discord.gg/zqeTWZvb76",
      icon: GlobeAltIcon,
    },
    { name: "Theme", href: "#", icon: BookmarkSquareIcon },
    { name: "Account", href: "#", icon: ComputerDesktopIcon },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Popover className="relative ">
      {({ open }) => (
        <>
          <div className="relative shadow bg-surface-primary">
            <div className="flex justify-end p-6 mx-auto">
              <div className="grow">
                <SearchBar />
              </div>
              <Popover.Button
                className={classNames(
                  open ? "text-gray-900" : "text-gray-500",
                  "group inline-flex items-center   rounded-md text-base font-medium text-content-base hover:text-content-accent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                )}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#eee"
                    className="w-6 h-6 text-color-accent"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </span>
                <ChevronDownIcon
                  className={classNames(
                    open ? "text-content-inverted" : "text-content-base",
                    "ml-2 h-5 w-5"
                  )}
                  aria-hidden="true"
                />
              </Popover.Button>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
          >
            <Popover.Panel className="absolute inset-x-0 z-10 transform shadow-lg">
              <div className="absolute inset-0 flex" aria-hidden="true">
                <div className="w-1/2 bg-white" />
                <div className="w-1/2 bg-gray-50" />
              </div>
              <div className="relative grid grid-cols-1 mx-auto max-w-7xl lg:grid-cols-2">
                <nav
                  className="grid grid-cols-2 px-6 py-8 bg-color-primary gap-y-2 sm:gap-x-4 "
                  aria-labelledby="navbar-heading"
                >
                  <div>
                    <h3 className="text-base font-medium text-content-base">
                      Features
                    </h3>
                    <ul role="list" className="mt-5 space-y-6">
                      {features.map((item) => (
                        <li key={item.name} className="flow-root">
                          <a
                            href={item.href}
                            className="flex items-center p-3 -m-3 text-base font-medium transition duration-150 ease-in-out rounded-md text-content-base hover:bg-color-primary-variant hover:text-content-accent"
                          >
                            <item.icon
                              className="flex-shrink-0 w-6 h-6 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="ml-4">{item.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-content-base">
                      Support
                    </h3>
                    <ul role="list" className="mt-5 space-y-6">
                      <li className="flow-root">
                        <Link
                          href="#"
                          className="flex items-center p-3 -m-3 text-base font-medium transition duration-150 ease-in-out rounded-md text-content-base hover:bg-color-primary-variant hover:text-content-accent"
                        >
                          <span className="ml-4"></span>
                        </Link>
                      </li>
                      <div className="flex space-x-6 min-w-[200px] text-content-base flex-row items-center">
                        <div className="font-semibold hover:text-content-accent">
                          <Link
                            href="https://discord.gg/zqeTWZvb76"
                            className="flex items-center p-3 -m-3 text-base font-medium transition duration-150 ease-in-out rounded-md text-content-base hover:bg-color-primary-variant hover:text-content-accent"
                          >
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
                          </Link>
                        </div>
                        <ThemeChanger />
                        <div className="font-semibold hover:text-content-accent">
                          <GggAuthBtn />
                        </div>
                      </div>
                    </ul>
                  </div>
                </nav>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

function DesktopNavBar() {
  const { profile } = usePoeStackAuth();
  const { league } = usePoeLeagueCtx();

  const [navigation, setNavigation] = useState([
    {
      name: "Economy",
      href: `/poe/economy/${league}?tag=currency`,
      current: false,
    },
    {
      name: "Characters",
      href: `/poe/characters?league=${league}`,

      current: false,
      // children: [
      //   { name: "Engineering", href: "#" },
      //   { name: "Human Resources", href: "#" },
      //   { name: "Customer Success", href: "#" },
      // ],
    },
    {
      name: "My Characters",
      href: `/poe/characters/${profile?.userId}`,
      current: false,
      // children: [
      //   { name: "GraphQL API", href: "#" },
      //   { name: "iOS App", href: "#" },
      //   { name: "Android App", href: "#" },
      //   { name: "New Customer Portal", href: "#" },
      // ],
    },
    { name: "Stash", href: "/poe/stash/snapshot/profiles", current: false },
    { name: "Atlas", href: `/poe/atlas?league=${league}`, current: false },
  ]);

  return (
    <>
      <div className="sticky top-0 flex flex-col w-full h-full px-6 gap-y-5 bg-surface-primary">
        <div className="flex items-center h-16 shrink-0 ">
          <Link href={"/"}>
            <Image
              height={48}
              width={130}
              src={"/logo_white_name.png"}
              alt={"PoeStack"}
            />
          </Link>
        </div>
        {/* Profile */}

        <GggAuthBtn />

        <nav className="flex flex-col">
          <ul role="list" className="flex flex-col flex-1 gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    {!item.children ? (
                      <Link
                        href={item.href}
                        className={`
                          ${
                            item.current
                              ? "bg-gray-50"
                              : "hover:bg-color-primary-variant"
                          }
                          block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold text-gray-700"`}
                        onClick={() => console.log("hi")}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <Disclosure as="div">
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={`
                          ${item.current ? "bg-gray-50" : "hover:bg-pink-400"}
                          flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700"`}
                            >
                              <ChevronRightIcon
                                className={`
                              ${
                                open
                                  ? "rotate-90 text-gray-400"
                                  : "text-gray-400"
                              }
                              h-5 w-5 shrink-0"`}
                                aria-hidden="true"
                              />
                              {item.name}
                            </Disclosure.Button>
                            <Disclosure.Panel as="ul" className="px-2 mt-1">
                              {item.children.map((subItem) => (
                                <li key={subItem.name}>
                                  <Disclosure.Button
                                    as="a"
                                    href={subItem.href}
                                    className={
                                      (subItem.current
                                        ? "bg-gray-50"
                                        : "hover:bg-gray-50",
                                      "block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-400")
                                    }
                                  >
                                    {subItem.name}
                                  </Disclosure.Button>
                                </li>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

function DesktopNavBarOld() {
  const { profile } = usePoeStackAuth();
  const { league } = usePoeLeagueCtx();
  return (
    <>
      <div className="flex items-center w-full h-12 pl-2 pr-2 min-w-fit bg-surface-primary">
        <div className="flex items-center space-x-2 min-w-fit">
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
            className="font-semibold hover:text-content-accent"
            href={`/poe/economy/${league}?tag=currency`}
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
            className="font-semibold hover:text-content-accent"
            href={`/poe/atlas?league=${league}`}
          >
            <StyledTooltip
              texts={["Data on Atlas passive trees"]}
              placement="bottom"
              className="mt-2"
            >
              <h3>Atlas</h3>
            </StyledTooltip>
          </Link>
          <Link
            className="font-semibold hover:text-content-accent"
            href={`/poe/characters?league=${league}`}
          >
            <StyledTooltip
              texts={["Search Characters"]}
              placement="bottom"
              className="mt-2"
            >
              <h3>Characters</h3>
            </StyledTooltip>
          </Link>
          {profile && (
            <Link
              className="font-semibold hover:text-content-accent"
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
              className="font-semibold hover:text-content-accent"
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
        <div className="flex space-x-6 min-w-[200px] text-content-base flex-row items-center">
          <div className="font-semibold hover:text-content-accent">
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
          <ThemeChanger />
          <div className="font-semibold hover:text-content-accent">
            <GggAuthBtn />
          </div>
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
