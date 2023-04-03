import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Swipe from "react-easy-swipe";

import { usePoeLeagueCtx } from "../contexts/league-context";
import { usePoeStackAuth } from "../contexts/user-context";

export default function LandingPage() {
  const { profile } = usePoeStackAuth();
  const { league } = usePoeLeagueCtx();

  const characterLadderImages = [
    {
      path: "/images/landingpage/char_ladder_001_nofilter_16x9.png",
      text: "See character's uniques and unique cost calculations",
      id: "CharLadder1",
    },
    {
      path: "/images/landingpage/char_ladder_002_filtered_16x9.png",
      text: "Filter by class, skill, items or keystones",
      id: "CharLadder2",
    },
    {
      path: "/images/landingpage/char_profile_004_inside_16x9.png",
      text: "View any character's items, passive tree, and snapshots of their progression",
      id: "CharLadder2",
    },
  ];
  const characterProfileImages = [
    {
      path: "/images/landingpage/char_profile_004_inside_16x9.png",
      text: "Use Snapshots to track your progress throughout the league on each character ",
      id: "CharProfile2",
    },
    {
      path: "/images/landingpage/char_profile_001_mainpage_SteelMage_16x9.png",
      text: "Easily access your characters & map atlas regardless of league",
      id: "CharProfile1",
    },
    {
      path: "/images/landingpage/char_profile_003_inside_SteelMage_16x9.png",
      text: "All the way up to your characters demise ",
      id: "CharProfile2",
    },
  ];
  const stashImages = [
    {
      path: "/images/landingpage/stash_002_profileView_16x9.png",
      text: "Monitor profits of the profile as well as individual assets",
      id: "Stash1",
    },
    {
      path: "/images/landingpage/stash_001_create_16x9.png",
      text: "Create custom stash profiles with automatic snapshot intervals",
      id: "Stash2",
    },
    {
      path: "/images/landingpage/stash_003_profileView_16x9.png",
      text: "Quickly glance at historical trends for individual items",
      id: "Stash3",
    },
  ];
  const economyImages = [
    {
      path: "/images/landingpage/economy_003_Fossil_Essence_16x9.png",
      text: "View the value and # of listings of multiple categories  concurrently",
      id: "Economy1",
    },
    {
      path: "/images/landingpage/economy_004_search_16x9.png",
      text: "Search any item for quick access",
      id: "Economy2",
    },
    {
      path: "/images/landingpage/economy_002_Inside_Currency_16x9.png",
      text: "In addition to categorizing by price ranges, access charts that categorize the value based on the number of listings",
      id: "Economy3",
    },
  ];
  return (
    <div className="mb-20 rounded text-content-base">
      <main>
        <div className="relative h-full ">
          <div className="max-w-full ">
            {/* Page 1 */}
            <div className="flex flex-col items-center h-full my-10 bg-surface-secondary sm:py-32 lg:pb-20">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl hover:text-content-red">
                Welcome to PoeStack
              </h1>
              <p className="w-5/6 mt-16 text-lg leading-8 lg:w-2/3 xl:w-5/12 text-slate-300">
                Our goal is to increase the amount of information the average
                POE player has access to.
                <br />
                <br />
                We accomplish this by providing tools that use the combined
                information of all of our users to give everyone a better
                understanding of their own data. When you link your POE account
                you will gain access to automatic stash tracking/valuation, a
                full history of your POE characters over the course of a league,
                a nonlimited character ladder any character of any level can
                appear on, atlas tree data from thousands of players, and
                finally some utilities to make it easier to sell items.
                <br />
                <br />
                If any of these tools sound interesting read more below. Thank
                you for your interest in PoeStack.
              </p>
              <div className="relative group">
                <div className="absolute inset-0 mb-2 bg-red-700 rounded-lg mt-14 blur-sm group-hover:blur-md"></div>
                <button className="relative mb-2 mt-14">
                  <a
                    href="#section2"
                    className="flex flex-row rounded-md  px-3.5 py-1.5 text-base items-center justify-center font-semibold leading-7 text-content-base shadow-sm bg-surface-secondary "
                  >
                    <h4>Get started</h4>
                  </a>
                </button>
              </div>
              <div className="mt-10 text-slate-300">
                <p>
                  Have any questions, comments, or concerns? Join the{" "}
                  <Link
                    href={`http://discord.com/invite/zqeTWZvb76`}
                    className=""
                    legacyBehavior
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-content-accent"
                    >
                      Discord
                    </a>
                  </Link>
                </p>
                <p>
                  Want to help or see how the sausage is made?{" "}
                  <Link
                    href={`http://github.com/PoeStack/poestack-next`}
                    className=""
                    legacyBehavior
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-content-accent"
                    >
                      Github
                    </a>
                  </Link>
                </p>
              </div>
            </div>
            {/* Page 2 */}

            <ul className=" lg:space-y-8">
              {/* //?Character Ladders */}
              <li className="h-screen lg:h-full" id="section2">
                <div className="grid w-full h-full lg:grid-cols-[_1fr,_2fr] lg:flex-row grid-rows-[_1fr,_3fr] lg:grid-rows-1">
                  {/* Text & Description */}
                  <div className="flex flex-col justify-center w-full row-start-1 p-4 lg:h-full">
                    {/* //!Have link go to account login unless logged in then */}
                    <Link href={`/poe/characters?league=${league}`}>
                      <h1
                        // id="section2"
                        className="text-4xl text-center text-content-accent hover:text-content-red"
                      >
                        Character Ladder
                      </h1>
                    </Link>
                    <ul className="justify-center inline-block p-4 mx-auto space-y-2 lg:p-10 lg:space-y-8 text-md">
                      <li className="flex flex-row items-center text-left">
                        <Image
                          width={25}
                          height={25}
                          src={"/Chaos_Orb_inventory_icon.png"}
                          className="mr-2"
                          alt="-"
                        />
                        PoeNinja style character ladder with no character limit.
                        Snapshot any of your characters at any level and they
                        will show up on the ladder.
                      </li>
                      <li className="flex flex-row items-center text-left ">
                        <Image
                          width={25}
                          height={25}
                          src={"/Chaos_Orb_inventory_icon.png"}
                          className="mr-2"
                          alt="-"
                        />
                        Create custom ladders of your friends, streamers, or pro
                        builders. Then compare your progress or keep track of
                        them throughout the league.
                      </li>

                      <li className="flex flex-row items-center text-left">
                        <Image
                          width={25}
                          height={25}
                          src={"/Chaos_Orb_inventory_icon.png"}
                          className="mr-2"
                          alt="-"
                        />
                        Automatic snapshots capture all characters progress when
                        items, levels, or POB changes giving you full insight
                        into a characters progression.
                      </li>
                      <ul className="flex flex-row justify-center space-x-10 ">
                        <li>
                          <div className="relative group">
                            <div className="absolute inset-0 mb-2 bg-green-600 rounded-lg w-28 mt-14 blur-sm group-hover:blur-md "></div>
                            <button className="relative mb-2 mt-14">
                              <Link
                                href={`/poe/characters?league=${league}`}
                                className="flex flex-row rounded-md  w-28 px-3.5 py-1.5 text-base items-center justify-center font-semibold leading-7 text-content-base shadow-sm bg-surface-secondary  "
                              >
                                <h4>Try It</h4>
                              </Link>
                            </button>
                          </div>
                        </li>
                        <li>
                          <div className="relative group">
                            <div className="absolute inset-0 mb-2 bg-blue-800 w-28 mt-14 rounded-xl blur-sm group-hover:blur-md"></div>
                            <button className="relative mb-2 mt-14">
                              <Link
                                href="/poe/tutorial"
                                className="flex flex-row rounded-4xl  w-28 px-3.5 py-1.5 text-base items-center justify-center font-semibold leading-7 text-content-base shadow-sm bg-surface-secondary "
                              >
                                <h4>Learn More</h4>
                              </Link>
                            </button>
                          </div>
                        </li>
                        {/* <li className="mb-10">
                          <Link
                            href="/poe/tutorial"
                            className="relative justify-end mx-auto mt-10 text-sm "
                          >
                            <button className="px-4 py-2 font-bold rounded-full text-content-base bg-color-primary hover:bg-color-secondary-variant w-28 ">
                              Learn More
                            </button>
                          </Link>
                        </li> */}
                      </ul>
                    </ul>
                  </div>
                  {/* Carousel & Future Lightbox */}
                  <div className="grid w-full select-none md:order-first -order-1 lg:w-full">
                    <StyledCarousel images={characterLadderImages} />
                  </div>
                </div>
              </li>
              {/* //!Character Profiles */}
              <li className="h-screen lg:h-full">
                <div className="grid w-full h-full lg:grid-cols-[_2fr,_1fr] lg:flex-row  lg:grid-rows-1 grid-rows-[_1fr,_3fr]">
                  {/* Text & Description */}
                  <div className="flex flex-col justify-center w-full row-start-1 p-4 lg:h-full">
                    <Link href={`/poe/characters/${profile?.userId}`}>
                      <h1 className="text-4xl text-center text-content-accent hover:text-content-red">
                        Character Profile
                      </h1>
                    </Link>
                    <ul className="justify-center inline-block p-4 mx-auto space-y-2 lg:p-10 lg:space-y-8 text-md">
                      <li className="flex flex-row items-center text-left">
                        <Image
                          width={25}
                          height={25}
                          src={"/Chaos_Orb_inventory_icon.png"}
                          className="mr-2"
                          alt="-"
                        />
                        View an overview of all your characters by linking your
                        POE Account.
                      </li>
                      <li className="flex flex-row items-center text-left ">
                        <Image
                          width={25}
                          height={25}
                          src={"/Chaos_Orb_inventory_icon.png"}
                          className="mr-2"
                          alt="-"
                        />
                        Track your characters history from Twilight Strand
                        through ubers. Automatically capture and preserve each
                        levelup, item upgrade, and passive tree respec. Use the
                        history view to look back on your progress over a
                        league.
                      </li>

                      <li className="flex flex-row items-center text-left">
                        <Image
                          width={25}
                          height={25}
                          src={"/Chaos_Orb_inventory_icon.png"}
                          className="mr-2"
                          alt="-"
                        />
                        These pages are fully shareable and embedable. Got a new
                        item? Link your profile to your friends on Discord.
                        Automatic POB code generation will let people you link
                        your profile to easily import your well rounded beast of
                        a build.
                      </li>
                      <ul className="flex flex-row justify-center space-x-10 ">
                        <li>
                          <div className="relative group">
                            <div className="absolute inset-0 mb-2 bg-green-600 rounded-lg w-28 mt-14 blur-sm group-hover:blur-md "></div>
                            <button className="relative mb-2 mt-14">
                              <Link
                                href={`/poe/characters/${profile?.userId}`}
                                className="flex flex-row rounded-md  w-28 px-3.5 py-1.5 text-base items-center justify-center font-semibold leading-7 text-content-base shadow-sm bg-surface-secondary "
                              >
                                <h4>Try It</h4>
                              </Link>
                            </button>
                          </div>
                        </li>
                        <li>
                          <div className="relative group">
                            <div className="absolute inset-0 mb-2 bg-blue-800 w-28 mt-14 rounded-xl blur-sm group-hover:blur-md"></div>
                            <button className="relative mb-2 mt-14">
                              <Link
                                href="/poe/tutorial"
                                className="flex flex-row rounded-4xl  w-28 px-3.5 py-1.5 text-base items-center justify-center font-semibold leading-7 text-content-base shadow-sm bg-surface-secondary "
                              >
                                <h4>Learn More</h4>
                              </Link>
                            </button>
                          </div>
                        </li>
                      </ul>
                    </ul>
                  </div>
                  {/* Carousel & Future Lightbox */}
                  <div className="grid w-full row-start-2 select-none lg:row-start-1 md:order-first -order-1 lg:w-full">
                    <StyledCarousel images={characterProfileImages} />
                  </div>
                </div>
              </li>
              {/* //? Stash */}
              <li className="h-screen lg:h-full">
                <div className="grid w-full h-full lg:grid-cols-[_1fr,_2fr] lg:flex-row grid-rows-[_1fr,_3fr] lg:grid-rows-1">
                  {/* Text & Description */}
                  <div className="flex flex-col justify-center w-full row-start-1 p-4 lg:h-full">
                    <Link href="/poe/stash/snapshot/profiles">
                      <h1 className="text-4xl text-center text-content-accent hover:text-content-red">
                        Stash Profiles
                      </h1>
                    </Link>
                    <ul className="justify-center inline-block p-4 mx-auto space-y-2 lg:p-10 lg:space-y-8 text-md">
                      <li className="flex flex-row items-center text-left">
                        <Image
                          width={25}
                          height={25}
                          src={"/Chaos_Orb_inventory_icon.png"}
                          className="mr-2"
                          alt="-"
                        />
                        Select some or all of your stash tabs and get a quick
                        valuation using our pricing data. View/sort breakdowns
                        by item type to quickly find extra value in your stash.
                      </li>
                      <li className="flex flex-row items-center text-left ">
                        <Image
                          width={25}
                          height={25}
                          src={"/Chaos_Orb_inventory_icon.png"}
                          className="mr-2"
                          alt="-"
                        />
                        Take snapshots manually or setup automatic capture
                        intervals to see how much many divs you are making per
                        hour and if that 15 div per hour youtube video was
                        lying.
                      </li>

                      <li className="flex flex-row items-center text-left">
                        <Image
                          width={25}
                          height={25}
                          src={"/Chaos_Orb_inventory_icon.png"}
                          className="mr-2"
                          alt="-"
                        />
                        View your total net worth over time throughout a league.
                        Look back on the big drops and even bigger harvest
                        gamble losses.
                      </li>
                      <ul className="flex flex-row justify-center space-x-10 ">
                        <li>
                          <div className="relative group">
                            <div className="absolute inset-0 mb-2 bg-green-600 rounded-lg w-28 mt-14 blur-sm group-hover:blur-md "></div>
                            <button className="relative mb-2 mt-14">
                              <Link
                                href="/poe/stash/snapshot/profiles"
                                className="flex flex-row rounded-md  w-28 px-3.5 py-1.5 text-base items-center justify-center font-semibold leading-7 text-content-base shadow-sm bg-surface-secondary  "
                              >
                                <h4>Try It</h4>
                              </Link>
                            </button>
                          </div>
                        </li>
                        <li>
                          <div className="relative group">
                            <div className="absolute inset-0 mb-2 bg-blue-800 w-28 mt-14 rounded-xl blur-sm group-hover:blur-md"></div>
                            <button className="relative mb-2 mt-14">
                              <Link
                                href="/poe/tutorial"
                                className="flex flex-row rounded-4xl  w-28 px-3.5 py-1.5 text-base items-center justify-center font-semibold leading-7 text-content-base shadow-sm bg-surface-secondary "
                              >
                                <h4>Learn More</h4>
                              </Link>
                            </button>
                          </div>
                        </li>
                      </ul>
                    </ul>
                  </div>
                  {/* Carousel & Future Lightbox */}
                  <div className="grid w-full select-none md:order-first -order-1 lg:w-full ">
                    <StyledCarousel images={stashImages} />
                  </div>
                </div>
              </li>
              {/* //! Economy  */}
              <li className="h-screen lg:h-full">
                <div className="grid w-full h-full lg:grid-cols-[_2fr,_1fr] lg:flex-row grid-rows-[_1fr,_3fr] lg:grid-rows-1">
                  {/* Text & Description */}
                  <div className="flex flex-col justify-center w-full row-start-1 p-4 lg:h-full">
                    <Link href={`/poe/economy/${league}?tag=currency`}>
                      <h1 className="text-4xl text-center text-content-accent hover:text-content-red">
                        Economy
                      </h1>
                    </Link>
                    <ul className="justify-center inline-block p-4 mx-auto space-y-2 lg:p-10 lg:space-y-8 text-md">
                      <li className="flex flex-row items-center text-left">
                        <Image
                          width={25}
                          height={25}
                          src={"/Chaos_Orb_inventory_icon.png"}
                          className="mr-2"
                          alt="-"
                        />
                        View prices and listings for all items including
                        compasses & memories
                      </li>
                      <li className="flex flex-row items-center text-left ">
                        <Image
                          width={25}
                          height={25}
                          src={"/Chaos_Orb_inventory_icon.png"}
                          className="mr-2"
                          alt="-"
                        />
                        Explore pricing in greater depth with multiple price
                        tiers and stock based pricing.
                      </li>

                      <li className="flex flex-row items-center text-left">
                        <Image
                          width={25}
                          height={25}
                          src={"/Chaos_Orb_inventory_icon.png"}
                          className="mr-2"
                          alt="-"
                        />
                        Monitor historical pricing data for trends.
                      </li>

                      <ul className="flex flex-row justify-center space-x-10 ">
                        <li>
                          <div className="relative group">
                            <div className="absolute inset-0 mb-2 bg-green-600 rounded-lg w-28 mt-14 blur-sm group-hover:blur-md "></div>
                            <button className="relative mb-2 mt-14">
                              <Link
                                href={`/poe/economy/${league}?tag=currency`}
                                className="flex flex-row rounded-md  w-28 px-3.5 py-1.5 text-base items-center justify-center font-semibold leading-7 text-content-base shadow-sm bg-surface-secondary "
                              >
                                <h4>Try It</h4>
                              </Link>
                            </button>
                          </div>
                        </li>
                        <li>
                          <div className="relative group">
                            <div className="absolute inset-0 mb-2 bg-blue-800 w-28 mt-14 rounded-xl blur-sm group-hover:blur-md"></div>
                            <button className="relative mb-2 mt-14">
                              <Link
                                href="/poe/tutorial"
                                className="flex flex-row rounded-4xl  w-28 px-3.5 py-1.5 text-base items-center justify-center font-semibold leading-7 text-content-base shadow-sm bg-surface-secondary "
                              >
                                <h4>Learn More</h4>
                              </Link>
                            </button>
                          </div>
                        </li>
                      </ul>
                    </ul>
                  </div>
                  {/* Carousel & Future Lightbox */}
                  <div className="grid w-full row-start-2 select-none lg:row-start-1 md:order-first -order-1 lg:w-full">
                    <StyledCarousel images={economyImages} />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

function StyledCarousel({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    let newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handlePrevSlide = () => {
    let newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 mb-16 border-2 rounded-lg lg:mb-0 lg:mx-10 xl:pt-4 shadow-neutral-700"></div>
      <div className="relative border-2 rounded-lg border-neutral-900 lg:mx-10 xl:pt-4 bg-surface-primary">
        <div className="grid grid-cols-[_1fr,_20fr,_1fr]">
          {/* <div className="relative bg-surface-primary"> */}
          <AiOutlineLeft
            onClick={handlePrevSlide}
            className="absolute left-0 z-20 w-20 col-start-1 p-2 -ml-4 text-5xl text-white cursor-pointer inset-y-1/2 hover:text-content-accent"
          />
          <div className="w-full h-[30vh] md:h-[50vh] lg:h-[60vh] grid col-start-2 overflow-hidden relative">
            <Swipe
              onSwipeLeft={handleNextSlide}
              onSwipeRight={handlePrevSlide}
              className="z-10 flex flex-row items-center justify-center w-11/12 h-full"
            >
              {images.map((item, index) => {
                if (index === currentSlide) {
                  return (
                    <Image
                      unoptimized={true}
                      key={item.id}
                      src={item.path}
                      fill
                      style={{ objectFit: "contain" }}
                      className="bg-surface-secondary"
                      alt={`Landing Page Image ${item.id}`}
                      sizes="(min-width: 60em) 24vw, (min-width: 28em) 45vw, 100vw"
                      quality={100}
                    />
                  );
                }
              })}
            </Swipe>
          </div>
          <AiOutlineRight
            onClick={handleNextSlide}
            className="absolute right-0 z-20 col-start-3 p-2 -mr-1 text-5xl text-white cursor-pointer inset-y-1/2 hover:text-content-accent"
          />
        </div>

        <div className="relative flex justify-center pb-2">
          {images.map((_, index) => {
            return (
              <div
                className={
                  index === currentSlide
                    ? "h-4 w-4 bg-color-accent rounded-full mx-2 m-4 cursor-pointer"
                    : "h-4 w-4 bg-white rounded-full mx-2 m-4 cursor-pointer"
                }
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                }}
              />
            );
          })}
        </div>
        <div className="pb-4 text-center">
          {images.map((item, index) => {
            if (index === currentSlide) return <div>{item.text}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
