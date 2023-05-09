import { CheckCircleIcon } from "@heroicons/react/20/solid";

const tiers = [
  {
    name: "Bronze",
    id: "tier-basic",
    href: "https://www.patreon.com/PoeStack",
    price: { monthly: "$5" },
    description: "Everything necessary to get started.",
    features: [
      "Remove all Ads",
      "Discord supporter role",
      "Access to private Discord channel",
      "Bronze ladder badge",
    ],
  },
  {
    name: "Silver",
    id: "tier-essential",
    href: "https://www.patreon.com/PoeStack",
    price: { monthly: "$10" },
    description:
      "Everything in Bronze, plus extra storage and character snapshot priority.",
    features: [
      "Remove all Ads",
      "Discord supporter role",
      "Access to private Discord channel",
      "Silver ladder badge",
      "Automatic scans of characters will happen more often",
    ],
  },
  {
    name: "Gold",
    id: "tier-growth",
    href: "https://www.patreon.com/PoeStack",
    price: { monthly: "$25" },
    description:
      "Everything in Silver, plus help guide the roadmap of future features on PoeStack.",
    features: [
      "Remove all Ads",
      "Discord supporter role",
      "Access to private Discord channel",
      "Gold ladder badge",
      "Automatic scans of characters will happen more often",
      "Increased storage for character snapshots",
      "Previews of upcoming features and higher weight of input on what is built next",
    ],
  },
];

export default function Support() {
  return (
    <div className="bg-surface-primary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl sm:text-center">
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Help support the project
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 sm:text-center">
          PoeStack is totally free using Ads and Patreon to pay for the server
          costs and storage. All tiers remove Ads from the site and come with
          some fun side benfits. None of these benefits will ever give a
          competitive advantage they are meant to be fun ways to show off your
          support. We&apos;re thankful for anyone who helps support the project
          in any amount.
        </p>
        <div className="mt-20 flow-root">
          <div className="isolate -mt-16 grid max-w-sm grid-cols-1 gap-y-16 divide-y divide-gray-100 sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-3 lg:divide-x lg:divide-y-0 xl:-mx-4">
            {tiers.map((tier) => (
              <div key={tier.id} className="pt-16 lg:px-8 lg:pt-0 xl:px-14">
                <h3 id={tier.id} className="text-base font-semibold leading-7">
                  {tier.name}
                </h3>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-5xl font-bold tracking-tight">
                    {tier.price.monthly}
                  </span>
                  <span className="text-sm font-semibold leading-6">
                    /month
                  </span>
                </p>
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className="mt-10 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Become a Supporter
                </a>
                <p className="mt-10 text-sm font-semibold leading-6">
                  {tier.description}
                </p>
                <ul role="list" className="mt-6 space-y-3 text-sm leading-6 ">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckCircleIcon
                        className="h-6 w-5 flex-none"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
