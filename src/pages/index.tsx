import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Swipe from "react-easy-swipe";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { gql, useQuery } from "@apollo/client";
import { Dialog } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";

import { usePoeLeagueCtx } from "../contexts/league-context";
import { usePoeStackAuth } from "../contexts/user-context";
import Support from "./support";

export default function LandingPage() {
  const { profile } = usePoeStackAuth();
  const { league } = usePoeLeagueCtx();

  return (
    <div className="mb-20 rounded text-content-base">
      <main>
        <div className="flex flex-col">
          <Hero />
          <StatsCard />
          <StashFeatures />
          <OpenSource />
          <Ladder />
          <TftFeatures />
          <GeneralFeatures />
          <Support />
        </div>
      </main>
    </div>
  );
}

export function Hero() {
  return (
    <div className="relative isolate overflow-hidden pb-16 bg-surface-primary">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
        />
      </svg>
      <div
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <img className="h-11" src="/logo_noname.png" alt="PoeStack" />
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <Link
              href="/tft/live-search?tag=compasses"
              className="inline-flex space-x-6"
            >
              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                What&apos;s new
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                <span>Added a tool to bulk buy compasses</span>
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Path of Exile Made Easier
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            All of your POE data in one place along with convenient tools to find
            builds, value/sell items, and discover new currency strategies.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/poe/stash-view?league=Ancestor"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              Get started
            </Link>
            <Link
              href="#"
              className="text-sm font-semibold leading-6 text-white"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <img
              src="/assets/landing/hero.png"
              alt="App screenshot"
              width={2432}
              height={1442}
              className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatsCard() {
  const { data } = useQuery<{
    poestackStats: {
      users: number;
      poeCharacters: number;
      items: number;
      oneClickMessages: number;
    };
  }>(gql`
    query PoestackStats {
      poestackStats
    }
  `);
  return (
    <div className="relative isolate overflow-hidden bg-surface-primary py-24 sm:py-32">
      <div className="pt-10">
        <img
          src="/assets/landing/ladder1.png"
          alt=""
          className="absolute inset-0 translate-x-[30%] -z-10 h-full w-full rounded-lg pl-4 pr-4"
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="absolute -bottom-8 -left-96 -z-10 transform-gpu blur-3xl sm:-bottom-64 sm:-left-40 lg:-bottom-32 lg:left-8 xl:-left-10"
          aria-hidden="true"
        >
          <div
            className="aspect-[1266/975] w-[79.125rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="bg-surface-primary p-6 rounded-lg ">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
            <h2 className="text-base font-semibold leading-8 text-indigo-400">
              Our track record
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Used by thousands of exiles everyday.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              We have a large userbase of players already using our site to
              track their characters, value their stash, and sell their items.
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            <div className="flex flex-col gap-y-3 border-l border-white/10 pl-6">
              <dt className="text-sm leading-6">PoeStack Users</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight">
                {data?.poestackStats?.users?.toLocaleString() ?? "-"}
              </dd>
            </div>
            <div className="flex flex-col gap-y-3 border-l border-white/10 pl-6">
              <dt className="text-sm leading-6">Ladder Characters</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight">
                {data?.poestackStats?.poeCharacters?.toLocaleString() ?? "-"}
              </dd>
            </div>
            <div className="flex flex-col gap-y-3 border-l border-white/10 pl-6">
              <dt className="text-sm leading-6">Tracked Item Groups</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight">
                {data?.poestackStats?.items?.toLocaleString() ?? "-"}
              </dd>
            </div>
            <div className="flex flex-col gap-y-3 border-l border-white/10 pl-6">
              <dt className="text-sm leading-6">TFT One-Click Messages</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight">
                {data?.poestackStats?.oneClickMessages?.toLocaleString() ?? "-"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    name: "Live Pricing.",
    description:
      "We constantly index all public stashes to keep our price data up to date.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Easy Bulk Sales.",
    description:
      "Export your data to the forum shop or click a single button to post it on TFT.",
    icon: LockClosedIcon,
  },
  {
    name: "Full Stash Search.",
    description:
      "Search your entire stash, filter by tabs, or view tabs in the tab viewer.",
    icon: ArrowPathIcon,
  },
  {
    name: "Value History.",
    description:
      "Track your value over time with manual and automatic snapshots.",
    icon: FingerPrintIcon,
  },
  {
    name: "Bring your own prices.",
    description:
      "Enable overrides and enter your own prices, they'll apply to all exports and totals.",
    icon: Cog6ToothIcon,
  },
  {
    name: "Discover value.",
    description: "Totals breakdowns provided by tab and item category.",
    icon: ServerIcon,
  },
];
export function StashFeatures() {
  return (
    <div className="bg-surface-primary py-16 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            Stash-View
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            All your items in one place
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Select tabs or index your entire stash, PoeStack will keep track of
            all your items combined with our pricing data we&apos;ll help you
            find value you didn&apos;t know you had.
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <img
            src="/assets/landing/feature2.png"
            alt="App screenshot"
            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-white/10"
            width={2432}
            height={1442}
          />
          <div className="relative" aria-hidden="true">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-primary pt-[7%]" />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-white">
                <feature.icon
                  className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                  aria-hidden="true"
                />
                {feature.name}
              </dt>{" "}
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

const ladderFeatures = [
  {
    name: "Snapshots on Demand",
    description:
      "Got a big upgrade? Take a snapshot! You can view snapshots of all the characters on the ladder to see how their gear progressed throughout a league.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Find Builds",
    description:
      "Search the ladder, filter by skills, infinite pages. See how the meta is evolving and find the perfect next build.",
    icon: LockClosedIcon,
  },
  {
    name: "Custom Ladders",
    description:
      "Want a ladder that is just you and your friends? Create a custom ladder, add any other PoeStack users and have some friendly competition.",
    icon: ServerIcon,
  },
];

export function Ladder() {
  return (
    <div className="overflow-hidden bg-surface-primary py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pl-4 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                Ladder & Snapshots
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                A Ladder for Everyone
              </p>
              <p className="mt-6 text-lg leading-8 ">
                When you connect your account our system will start tracking and
                snapshotting all of your characters. They will appear on the
                ladder no matter their level or time of creation.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7  lg:max-w-none">
                {ladderFeatures.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="flex items-start justify-end lg:order-first">
            <img
              src="/assets/landing/character.png"
              alt="Product screenshot"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const tftFeatures = [
  {
    name: "TFT One-Click",
    description:
      "Select items, pick a category, click Post to TFT. The server will generate a message and post it in the correct channel letting you get back to mapping faster.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "TFT Live-Search",
    description:
      "TFT has over 300 channels, we index many of them and let you search them in one place. Buy bulk compasses, find five-way carries, and soon much more.",
    icon: LockClosedIcon,
  },
  {
    name: "Fight Scams and Price Fixers",
    description:
      "TFT has 50+ moderators who handle hundreds of scam/price fixing reports a week, combined with the rep system you can be confident when trust is needed.",
    icon: ServerIcon,
  },
];

export function TftFeatures() {
  return (
    <div className="overflow-hidden bg-surface-primary py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-400">
                Reduce Friction, Increase Trust
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                TFT Integrations
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                The Forbidden Trove is the largest POE Discord with 400 thousand
                members, offering many services from bulk selling to boss
                carries. We integrate with TFT to give you a smoother and safer
                trade experince.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-300 lg:max-w-none">
                {tftFeatures.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-white">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src="assets/landing/tft.png"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
}

export function GeneralFeatures() {
  return (
    <div className="bg-surface-primary py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            Consistent Updates
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Future Plans
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            As you explore the site you&apos;ll find a variety of features,
            all with the aim of increasing information and making your POE
            experience more enjoyable. We are committed to continuing to expand
            the site and would love feedback. Feel free to log an issue or join
            our Discord to let us know what you would like to see on the site
            next.
          </p>
        </div>
      </div>
    </div>
  );
}

export function OpenSource() {
  return (
    <div className="bg-surface-primary">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Fully Open Source
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            All PoeStack code is publicly available on Github. We believe people
            should be able to see how their data is being used and verify how
            market data is being calculated. Being open source also means anyone
            is welcome to contribute code!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="https://github.com/PoeStack"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get started
            </a>
            <a
              href="https://github.com/PoeStack/issues/issues"
              className="text-sm font-semibold leading-6 text-white"
            >
              Have an idea? Log an issue <span aria-hidden="true">→</span>
            </a>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
