import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="rounded bg-surface-primary text-content-base isolate">
      <main>
        <div className="relative h-full py-24 sm:py-32 lg:pb-40">
          <div className="h-screen px-6 mx-aut lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Welcome to PoeStack
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                An app designed to provide players with the information they
                need to make better decisions when it comes to building their
                characters and optimizing their currency farming strategies. If
                you want to browse, use the navbar above. To take a more guided
                approach to understanding how the application works, click the
                button below.
              </p>
              <div className="flex items-center justify-center mb-2 mt-14">
                <a
                  href="#section2"
                  className="rounded-md hover:bg-color-accent px-3.5 py-1.5 text-base font-semibold leading-7 text-content-base shadow-sm bg-color-secondary-variant hover:text-content-inverted"
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
                  Want to help see how the sausage is made?{" "}
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
            <div className="flow-root mt-2">
              <div className="p-2 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <Image
                  src="/PoeStackDemoImg.png"
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="relative h-full py-24 mt-40 sm:py-32 lg:pb-40">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1
              id="section2"
              className="text-4xl font-bold tracking-tight sm:text-6xl"
            >
              Stuff
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

// discord and github redirect links with new window
{
  /* <li>
                
              </li>
              <li>
                <Link
                  href={`http://github.com/PoeStack/poestack-next`}
                  className=""
                  legacyBehavior
                >
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 hover:text-content-accent"
                  >
                    Github
                  </a>
                </Link>
              </li> */
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
