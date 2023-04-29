import StyledCard from "@components/library/styled-card";
import Image from "next/image";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import YouTube from "react-youtube";

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
    question: "What are p-values?",
    answer:
      "The p-values represent the chaos value percentiles of the listings tracked by the tool, ranging from p5 to p50. The lower p-values indicate the average price of the lowest percentage of listings after applying price fixing filters; for instance, p5 represents the average price of the lowest 5% of listings. These p-values are also monitored for stock brackets, meaning that the p5 of the 100-250 stock bracket is the average price of the bottom 5% of listings from sellers who have 100-250 of the item in question.",
    answerCont:
      "Through testing, it appears that using p5/7 can help undercut or sell items quickly, while p10 is the average selling price and p10+ may require more time to sell. The graphs display the price ranges between p-values and their movements, with a small range indicating a relatively stable price. For example, the essence shown in the graph has a 1c range for the entire range (difference between p20 and p7), which is small for a 23c item with 3k listings and thus provides a reasonable level of confidence in the displayed prices.",
    image: "/PvalueExample.png",
  },
  {
    question: "Why is the tool skipping my map/unique items stash tab(s)?",
    answer:
      "GGG considers every sub-tab as a distinct tab and has rate limits on the number of tabs that can be requested per minute/5 minute period. Currently, the tool does not index map stash tabs to avoid consuming all the stash requests and prolonging the snapshot process to around 15-25 minutes. Although we are searching for a solution, moving maps to a bulk tab and directing the tool to that location remains the most effective approach when selling maps.",
  },
  {
    question:
      "Will you consider making this tool open source or is it already open source?",
    answer: " Currently the frontend is open source",
    link: "https://github.com/zach-herridge/poestack-next",
  },
];

// Lightbox in future:
// This seems like the best library that's free
// https://www.lightgalleryjs.com/

const videoData = {
  name: "Seismic Trap",
  description: `Seismic Trap is a build that utilizes two skills, one for clear (exsanguinate traps) and one for single target damage (seismic trap). The build is a trap build so that means you'll be throwing out traps which will detonate themselves targeting enemies around them. For the purpose of this section of the index we will be including mostly just the poison variant of this build as it's the most league start friendly but it can transition into a crit based version with some investment. This build excels at single target damage and has decent clear, though you may struggle against moving bosses.`,
  youtubeVideos: [
    {
      url: "v2BVj0pl0Io",
      channelUrl: "https://www.youtube.com/@Zizaran",
      title: "One Click TFT Bulk Sell",
      link: "/tft/bulk-tool",
    },
    {
      url: "jUrSW09ka24",
      channelUrl: "https://www.youtube.com/@Zizaran",
      title: "Character Ladders",
      link: "/poe/characters?league=Sanctum",
    },
  ],
};

const opts = {
  height: "360",
  width: "680",
  playerVars: {
    autoplay: 0,
  },
};

export default function FAQPage() {
  return (
    <>
      <div className="py-4 md:px-2 lg:px-10 lg:py-4">
        <StyledCard>
          <div className="">
            <div className="px-6 py-8">
              {/* Video/Help Section */}
              <div className="">
                <h2 className="flex flex-col justify-center w-1/6 mx-auto text-2xl font-bold leading-10 tracking-tight text-center border-b-2 text-content-base">
                  Video Tutorials
                </h2>
                <div className="grid grid-cols-1 text-center lg:grid-cols-2">
                  {videoData.youtubeVideos.map((video, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center w-full py-4 mx-auto text-xl font-semibold text-center "
                    >
                      <Link href={video.link} legacyBehavior>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 text-xl font-semibold text-neutral-200"
                        >
                          <p className="h-10 pb-2 hover:text-content-accent ">
                            {video.title}
                          </p>
                        </a>
                      </Link>
                      <YouTube videoId={video.url} opts={opts} className="" />
                    </div>
                  ))}
                </div>
              </div>
              {/* FAQ Section */}
              <div className="max-w-4xl pt-4 mx-auto divide-y lg:pt-8 divide-content-base">
                <h2 className="text-2xl font-bold leading-10 tracking-tight text-content-base">
                  Frequently asked questions
                </h2>
                <dl className="mt-4 space-y-6 divide-y divide-color-base">
                  {faqs.map((faq) => (
                    <Disclosure as="div" key={faq.question} className="pt-6">
                      {({ open }) => (
                        <>
                          <dt>
                            <Disclosure.Button className="flex items-start justify-between w-full text-left text-content-base">
                              <span className="text-base font-semibold leading-7">
                                {faq.question}
                              </span>
                              <span className="flex items-center ml-6 h-7">
                                {open ? (
                                  <PlusSmallIcon
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <MinusSmallIcon
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </dt>
                          <Disclosure.Panel
                            as="dd"
                            className="p-4 mt-2 rounded-md bg-surface-primary-variant"
                          >
                            <p className="leading-7 text-content-base">
                              {faq.answer}{" "}
                              {faq.link ? (
                                <Link
                                  href={faq.link}
                                  className=""
                                  legacyBehavior
                                >
                                  <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-content-accent"
                                  >
                                    here
                                  </a>
                                </Link>
                              ) : null}
                              {faq.answerCont ? (
                                <div>
                                  <br />
                                  {faq.answerCont}
                                </div>
                              ) : null}
                              {faq.image ? (
                                <div className="flex flex-row justify-center">
                                  <Image
                                    width={1800}
                                    height={1200}
                                    object-fit="contain"
                                    src={faq.image}
                                    alt="image"
                                    quality={100}
                                  />
                                </div>
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
      </div>
    </>
  );
}
