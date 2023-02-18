import StyledCard from "@components/styled-card";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "How does this access my data? Is this safe?",
    answer:
      "This tool exclusively employs the official GGG API and GGG OAuth integrations to retrieve certain data from your profile. Our goal is to always adhere to GGG TOS, and in the event that they request any modifications, we will comply with their demands. If you wish to manage your app integrations or view which apps have integrated access to your data, you can access the corresponding settings and information",
    link: "https://pathofexile.com/my-account/applications",
  },
  {
    question: "How does pricing work?",
    answer:
      "The pricing algorithm of this tool utilizes the official GGG public stash API to retrieve listings for item groups, such as currencies, which can be found",
    link: "https://poestack.com/poe/economy/Sanctum?tag=currency",
  },
  {
    question: " Does this tool take stock/quantity info into account?",
    answer:
      " Currently stock/quantity info is tracked and used for pricing if you enabled the settings.",
  },
  {
    question: "4",
    answer: "Lorem ipsum dolor sit amet.",
  },
  {
    question: "5",
    answer: "Lorem ipsum dolor sit amet.",
  },
];

export default function FAQPage() {
  return (
    <>
      <StyledCard>
        <div className="">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 lg:px-8">
            <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
              <h2 className="text-2xl font-bold leading-10 tracking-tight text-content-base">
                Frequently asked questions
              </h2>
              <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                {faqs.map((faq) => (
                  <Disclosure as="div" key={faq.question} className="pt-6">
                    {({ open }) => (
                      <>
                        <dt>
                          <Disclosure.Button className="flex w-full items-start justify-between text-left text-content-base">
                            <span className="text-base font-semibold leading-7">
                              {faq.question}
                            </span>
                            <span className="ml-6 flex h-7 items-center">
                              {open ? (
                                <PlusSmallIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              ) : (
                                <MinusSmallIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </dt>
                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                          <p className="text-base leading-7 text-content-base">
                            {faq.answer}{" "}
                            {faq.link ? (
                              <Link href={faq.link} className="" legacyBehavior>
                                <a
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-content-accent"
                                >
                                  here
                                </a>
                              </Link>
                            ) : null}
                          </p>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </StyledCard>
    </>
  );
}

// rough draft setup
// <div>
//         <div className=" text-center">
//           <StyledCard title="FAQ">
//             <ul className="space-y-4 text-left">
//               <li>
//        >
//               </li>
//               <li>
//                 <h1 className="text-xl mb-6">
//                   Does this tool take stock/quantity info into account?
//                 </h1>
//                 <p>

//                 </p>
//               </li>
//               <li>
//                 <h1 className="text-xl mb-6">
//                   Will you consider making this tool open source or is it
//                   already open source?
//                 </h1>
//                 <p>
//                   Currently the frontend is open source{" "}
//                   <Link
//                     href="https://github.com/zach-herridge/poestack-next"
//                     className=""
//                     legacyBehavior
//                   >
//                     <a
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-content-accent"
//                     >
//                       here.
//                     </a>
//                   </Link>{" "}
//                 </p>
//               </li>
//             </ul>
//           </StyledCard>
//         </div>
//       </div>
