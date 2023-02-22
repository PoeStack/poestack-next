import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";

import { usePoeLeagueCtx } from "../contexts/league-context";
import { usePoeStackAuth } from "../contexts/user-context";

export default function LandingPage() {
  const { profile } = usePoeStackAuth();
  const { league } = usePoeLeagueCtx();
  return (
    <div className="rounded text-content-base">
      <main>
        <div className="relative h-full ">
          <div className="max-w-full g:px-8 ">
            {/* Page 1 */}
            <div className="flex flex-col items-center h-full py-20 bg-surface-secondary sm:py-32 lg:pb-20">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Welcome to PoeStack
              </h1>
              <p className="w-5/6 mt-6 text-lg leading-8 lg:w-2/3 xl:w-5/12 text-slate-300">
                An app designed to provide players with the information they
                need to make better decisions when it comes to building their
                characters and optimizing their currency farming strategies.
                <br />
                <br />
                If you want to browse, use the navbar above. To better
                understand how the application works, scroll down or click the
                button below for guidance.
              </p>
              <div className="flex items-center justify-center mb-2 mt-14">
                <a
                  href="#section2"
                  className="rounded-md hover:bg-color-accent px-3.5 py-1.5 text-base font-semibold leading-7 text-content-base shadow-sm bg-red-800 hover:text-content-inverted"
                >
                  {/* Link to section overviews + redirects from navbar */}
                  <h4>Get started</h4>
                </a>
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
            <div className="relative">
              <ul className="space-y-4">
                {/* Character Ladders */}
                <li>
                  <div className="flex flex-row justify-center w-full h-full min-h-screen mx-auto">
                    {/* Text & Description */}
                    <div className="flex flex-col justify-center w-1/3 h-screen lg:w-1/4 bg-surface-secondary ">
                      <Link href={`/poe/characters?league=${league}`}>
                        <h1 className="text-4xl text-center hover:text-content-accent">
                          Character Ladder
                        </h1>
                      </Link>
                      <ul className="justify-center inline-block p-10 mx-auto space-y-8 text-md">
                        <li className="flex flex-row items-center text-left">
                          <Image
                            width={25}
                            height={25}
                            src={"/Chaos_Orb_inventory_icon.png"}
                            className="mr-2"
                            alt="-"
                          />
                          Browser by class, skill, items or keystones.
                        </li>
                        <li className="flex flex-row items-center text-left ">
                          <Image
                            width={25}
                            height={25}
                            src={"/Chaos_Orb_inventory_icon.png"}
                            className="mr-2"
                            alt="-"
                          />
                          See character&apos;s uniques and unique cost
                          calculations
                        </li>

                        <li className="flex flex-row items-center text-left">
                          <Image
                            width={25}
                            height={25}
                            src={"/Chaos_Orb_inventory_icon.png"}
                            className="mr-2"
                            alt="-"
                          />
                          Create your own ladders of friends, or players you
                          want to emulate
                        </li>
                        <li>
                          <a
                            href="#characters"
                            className="flex justify-center mx-auto mt-10 text-sm hover:text-content-accent"
                          >
                            Learn More
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* Background Img & Link */}
                    <Link
                      href={`/poe/characters?league=${league}`}
                      className="w-2/3 h-screen lg:w-full border-x-black border-x-8 "
                    >
                      <div className="flex flex-row justify-center min-h-screen bg-fixed bg-right bg-no-repeat xl:bg-contain bg-characterLadder"></div>
                    </Link>
                  </div>
                </li>
                {/* Character Profile */}
                <li>
                  <div className="flex flex-row justify-center w-full h-full min-h-screen mx-auto ">
                    {/* Background Img & Link */}
                    <Link
                      href={`/poe/characters/${profile?.userId}`}
                      className="w-2/3 h-screen lg:w-full border-x-black border-x-8 "
                    >
                      <div className="flex flex-row justify-center min-h-screen bg-fixed bg-left bg-no-repeat xl:bg-contain bg-characterProfile" />
                    </Link>
                    {/* Text & Description */}
                    <div className="flex flex-col justify-center w-1/3 h-screen lg:w-1/4 bg-surface-secondary ">
                      <Link href={`/poe/characters/${profile?.userId}`}>
                        <h1 className="text-4xl text-center hover:text-content-accent">
                          Character Profiles
                        </h1>
                      </Link>
                      <ul className="justify-center inline-block p-10 mx-auto space-y-8 text-md">
                        <li className="flex flex-row items-center text-left">
                          <Image
                            width={25}
                            height={25}
                            src={"/Chaos_Orb_inventory_icon.png"}
                            className="mr-2"
                            alt="-"
                          />
                          Create custom profiles to monitor your currency gains
                        </li>
                        <li className="flex flex-row items-center text-left ">
                          <Image
                            width={25}
                            height={25}
                            src={"/Chaos_Orb_inventory_icon.png"}
                            className="mr-2"
                            alt="-"
                          />
                          Effortlessly export stash tabs to TFT or GGG forums.
                        </li>

                        <li className="flex flex-row items-center text-left">
                          <Image
                            width={25}
                            height={25}
                            src={"/Chaos_Orb_inventory_icon.png"}
                            className="mr-2"
                            alt="-"
                          />
                          Compare longterm results
                        </li>
                        <li>
                          <a
                            href="#characters"
                            className="flex justify-center mx-auto mt-10 text-sm hover:text-content-accent"
                          >
                            Learn More
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                {/* Stash */}
                <li>
                  <div className="flex flex-row justify-center w-full h-full min-h-screen mx-auto">
                    {/* Text & Description */}
                    <div className="flex flex-col justify-center w-1/3 h-screen lg:w-1/4 bg-surface-secondary">
                      <Link href={`/poe/characters?league=${league}`}>
                        <h1 className="text-4xl text-center hover:text-content-accent">
                          Stash
                        </h1>
                      </Link>
                      <ul className="justify-center inline-block p-10 mx-auto space-y-8 text-md">
                        <li className="flex flex-row items-center text-left">
                          <Image
                            width={25}
                            height={25}
                            src={"/Chaos_Orb_inventory_icon.png"}
                            className="mr-2"
                            alt="-"
                          />
                          Create custom profiles to monitor your currency gains
                        </li>
                        <li className="flex flex-row items-center text-left ">
                          <Image
                            width={25}
                            height={25}
                            src={"/Chaos_Orb_inventory_icon.png"}
                            className="mr-2"
                            alt="-"
                          />
                          Effortlessly export stash tabs to TFT or GGG forums.
                        </li>

                        <li className="flex flex-row text-left">
                          <Image
                            width={25}
                            height={25}
                            src={"/Chaos_Orb_inventory_icon.png"}
                            className="mr-2"
                            alt="-"
                          />
                          Compare longterm results
                        </li>
                        <li>
                          <a
                            href="#characters"
                            className="flex justify-center mx-auto mt-10 text-sm hover:text-content-accent"
                          >
                            Learn More
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* Background Img & Link */}
                    <Link
                      href={`/poe/characters?league=${league}`}
                      className="w-2/3 h-screen lg:w-full border-x-black border-x-8 "
                    >
                      <div className="flex flex-row justify-center min-h-screen bg-fixed bg-right bg-no-repeat xl:bg-contain bg-stash"></div>
                    </Link>
                  </div>
                </li>
                {/* Economy */}
                <li>
                  <div className="flex flex-row justify-center w-full h-full min-h-screen mx-auto ">
                    {/* Background Img & Link */}
                    <Link
                      href={`/poe/economy/${league}?tag=currency`}
                      className="w-2/3 h-screen lg:w-full border-x-black border-x-8 "
                    >
                      <div className="flex flex-row justify-center min-h-screen bg-fixed bg-left bg-no-repeat xl:bg-contain bg-economyEssences" />
                    </Link>
                    {/* Text & Description */}
                    <div className="flex flex-col justify-center w-1/3 h-screen lg:w-1/4 bg-surface-secondary ">
                      <Link href={`/poe/economy/${league}?tag=currency`}>
                        <h1 className="text-4xl text-center hover:text-content-accent">
                          Economy
                        </h1>
                      </Link>
                      <ul className="justify-center inline-block p-10 mx-auto space-y-8 text-md">
                        <li className="flex flex-row items-center text-left">
                          <Image
                            width={25}
                            height={25}
                            src={"/Chaos_Orb_inventory_icon.png"}
                            className="mr-2"
                            alt="-"
                          />
                          View prices and listings for all items
                        </li>
                        <li className="flex flex-row items-center text-left ">
                          <Image
                            width={25}
                            height={25}
                            src={"/Chaos_Orb_inventory_icon.png"}
                            className="mr-2"
                            alt="-"
                          />
                          Track changes in pricing and market trends over time
                        </li>

                        <li>
                          <a
                            href="#characters"
                            className="flex justify-center mx-auto mt-10 text-sm hover:text-content-accent"
                          >
                            Learn More
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            {/* Page 3 - Characters/Ladder */}
            <div className="relative w-full h-full mt-2 bg-surface-primary ">
              <div className="h-full px-6 md:h-screen ">
                <div className="text-center">
                  <div
                    id="characters"
                    className="grid w-full grid-cols-2 pt-2 text-4xl font-bold tracking-tight divide-x-2 sm:text-6xl"
                  >
                    <div className="flex flex-col">
                      {/* Characters/Ladder */}
                      <a href="#" className="bg-green-400">
                        <h1>Characters</h1>
                      </a>
                      {/* Characters/Ladder Description */}

                      <p>Characters info</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Page 4 - Economy*/}
            <div className="relative w-full h-full mt-2 bg-surface-primary ">
              <div className="h-full px-6 md:h-screen ">
                <div className="text-center">
                  <div
                    id="economy"
                    className="grid w-full grid-cols-2 pt-2 text-4xl font-bold tracking-tight divide-x-2 sm:text-6xl"
                  >
                    <div className="flex flex-col">
                      {/* Economy */}
                      <a href="#" className="bg-red-400">
                        <h1>Economy</h1>
                      </a>
                      {/* Economy Description */}
                      <p>Econ info</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Page 5 - Characters*/}
            <div className="relative w-full h-full mt-2 bg-surface-primary ">
              <div className="h-full px-6 md:h-screen ">
                <div className="text-center">
                  <div
                    id="mycharacters"
                    className="grid w-full grid-cols-2 pt-2 text-4xl font-bold tracking-tight divide-x-2 sm:text-6xl"
                  >
                    <div className="flex flex-col">
                      {/* Economy */}
                      <a href="#" className="bg-pink-400">
                        <h1>mycharacters</h1>
                      </a>
                      {/* Economy Description */}
                      <p>mycharacters info</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Page 6 - Stash*/}
            <div className="relative w-full h-full mt-2 bg-surface-primary ">
              <div className="h-screen px-6 ">
                <div className="text-center">
                  <div
                    id="stash"
                    className="grid w-full grid-cols-2 pt-2 text-4xl font-bold tracking-tight divide-x-2 sm:text-6xl"
                  >
                    <div className="flex flex-col">
                      {/* Economy */}
                      <a href="#" className="bg-yellow-400">
                        <h1>Stash</h1>
                      </a>
                      {/* Economy Description */}
                      <p>Econ info</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const oldCode = () => {
  return;
};

{
  /* Column 1 */
}
{
  /* <div className="flex flex-col items-center h-screen space-y-10 "> */
}
{
  /* Characters */
}
{
  /* <div className="  w-full p-6 border-2 rounded-lg shadow h-5/12 border-color-primary bg-[url('/PoeStackDemoImg.png')]  ">
  <Link
    href={`/poe/characters?league=${league}`}
    className="flex flex-row items-center justify-center bg-teal-700"
  >
    <h1 className="mr-4 text-4xl">Characters</h1>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-10 h-10 pt-1"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
      />
    </svg>
  </Link> */
}
{
  /* Characters Description */
}
//   <ul className="p-4 text-xl text-left">
//     <li>
//       - Browser ladders by class, skill, items or
//       keystones
//     </li>
//     <li>
//       - See what the top uniques and builds costs are
//     </li>
//     <li>- Create your own custom ladders</li>
//     <li>- View character progression by date/snapshot</li>
//   </ul>
//   <button className="flex flex-row items-center justify-center w-2/3 h-10 mx-auto mt-10 xl:w-2/5 hover:bg-surface-primary hover:text-content-accent bg-color-secondary">
//     <a href="#characters" className="flex flex-row">
//       <h1 className="mr-4 text-xl">More Info</h1>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke-width="1.5"
//         stroke="currentColor"
//         className="w-6 h-6"
//       >
//         <path
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
//         />
//       </svg>
//     </a>
//   </button>
// </div>
{
  /* Economy */
}
{
  /* <div className="w-11/12 p-6 border-2 rounded-lg shadow h-1/3 border-color-primary hover:border-white hover:bg-color-primary">
  <Link
    href={`/poe/economy/${league}?tag=currency`}
    className="flex flex-row items-center justify-center "
  >
    <h1 className="mr-4 text-4xl underline">Economy</h1>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-10 h-10 pt-1"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
      />
    </svg>
  </Link>
  {/* Economy Description */
}
//   <ul className="p-4 text-xl text-left ">
//     <li>- Search for specific items</li>
//     <li>
//       - See the historical pricing of every currency
//     </li>
//     <li>- See the # of listings, the average value.</li>
//   </ul>
//   <button className="flex flex-row items-center justify-center w-2/3 h-10 mx-auto mt-10 xl:w-2/5 hover:bg-surface-primary hover:text-content-accent bg-color-secondary">
//     <a href="#economy" className="flex flex-row">
//       <h1 className="items-center justify-center mr-4 text-xl">
//         More Info
//       </h1>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke-width="1.5"
//         stroke="currentColor"
//         className="w-6 h-6"
//       >
//         <path
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
//         />
//       </svg>
//     </a>
//   </button>
// </div>

{
  /* Column 2 */
}
{
  /* <div className="flex flex-col items-center h-screen space-y-10 ">
<p className="text-content-accent"></p> */
}
{
  /* My Characters */
}
{
  /* <div className="w-11/12 p-6 border-2 rounded-lg shadow h-1/3 border-color-primary hover:border-white hover:bg-color-primary">
  <Link
    href="/poe/stash/snapshot/profiles"
    className="flex flex-row items-center justify-center bg-purple-500"
  >
    <h1 className="mr-4 text-4xl">My Characters</h1>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-10 h-10 pt-1"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
      />
    </svg>
  </Link>
  {/* My Characters Description */
}
//   <ul className="text-2xl text-left">
//     <li>
//       Browser builds by class, skill, items or keystones
//     </li>
//     <li>See what the top uniques and builds costs are</li>
//     <li>Filter by calender date</li>
//   </ul>
//   <button className="flex flex-row items-center justify-center w-2/3 h-10 mx-auto mt-10 xl:w-2/5 hover:bg-surface-primary hover:text-content-accent bg-color-secondary">
//     <a href="#mycharacters" className="flex flex-row">
//       <h1 className="items-center justify-center mr-4 text-xl">
//         More Info
//       </h1>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke-width="1.5"
//         stroke="currentColor"
//         className="w-6 h-6"
//       >
//         <path
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
//         />
//       </svg>
//     </a>
//   </button>
// </div> */}
{
  /* Stash */
}
{
  /* <div className="w-11/12 p-6 border-2 rounded-lg shadow h-1/3 border-color-primary hover:border-white hover:bg-color-primary">
  <Link
    href="/poe/stash/snapshot/profiles"
    className="flex flex-row items-center justify-center bg-yellow-400"
  >
    <h1 className="mr-4 text-4xl">Stash</h1>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-10 h-10 pt-1"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
      />
    </svg>
  </Link>
  {/* Stash Description */
}
{
  /* <ul className="text-2xl text-left">
    
  </ul>
  <button className="flex flex-row items-center justify-center w-2/3 h-10 mx-auto mt-10 xl:w-2/5 hover:bg-surface-primary hover:text-content-accent bg-color-secondary">
    <a href="#stash" className="flex flex-row">
      <h1 className="mr-4 text-xl">More Info</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
        />
      </svg>
    </a>
  </button>
</div>
</div> */
}

{
  /* Old Text: */
}
{
  /* PoeStack's goal is to help track, manage, and sell your POE
                stash tabs. PoeStack is currently under development in alpha
                there are many changes and features to come. If you are
                interested in learning more feel free to poke around. If you
                have any questions join our Discord and ask! If you want a quick
                intro on setting up a bulk listing check out this video
                https://www.youtube.com/watch?v=1n6QlDiuldA */
}

{
  /* 
  
  <div>
              <Image
                width={1144}
                height={1134}
                src={
                  ""
                }
                alt={""}
              />
            </div>
  
            <div className="flex justify-center w-full">
              <div>
                
              </div>
            </div>
  
            <div className="flex flex-row justify-center w-full">
              <Image
                width={1144}
                height={1134}
                src={
                  "https://cdn.discordapp.com/attachments/616816643233808394/1063508968246349865/image.png"
                }
                alt={""}
              />
            </div> 
    */
}
