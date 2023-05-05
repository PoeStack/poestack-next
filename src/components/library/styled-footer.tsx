import Image from "next/image";
import Link from "next/link";

export default function StyledFooter() {
  return (
    <footer className="z-50 text-sm bg-surface-primary sm:p-4 ">
      <div className="grid justify-center grid-cols-2 md:grid-cols-3">
        <div className="relative mb-2 md:mb-0">
          <Link href="/" className="flex flex-row justify-start w-ful">
            <Image
              width={48}
              height={130}
              src={"/logo_noname.png"}
              alt="PoeStack"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-content-base">
              PoeStack
            </span>
          </Link>
          <span className="absolute left-0 text-xs bottom-10 md:bottom-0 text-slate-300">
            This product is not affiliated with or endorsed by Grinding Gear
            Games in any way
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-3">
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase text-content-base ">
              Resources
            </h2>
            <ul className="text-content-base ">
              <li className="mb-2">
                <Link
                  href="/poe/faq"
                  className="hover:underline hover:text-content-accent"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:underline hover:text-content-accent"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase text-content-base ">
              Follow us
            </h2>
            <ul className="text-content-base">
              <li className="mb-2">
                <Link
                  href="https://discord.gg/zqeTWZvb76"
                  className=""
                  legacyBehavior
                >
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-content-accent"
                  >
                    Discord
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://github.com/PoeStack" legacyBehavior>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-content-accent"
                  >
                    Github
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase text-content-base ">
              Legal
            </h2>
            <ul className="text-content-base">
              <li className="mb-2">
                <a
                  href="https://www.privacypolicygenerator.info/live.php?token=6cH1lbmNbc4oU9ntPGezJpm0jjoAAFl1"
                  className="hover:underline hover:text-content-accent"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://www.termsandconditionsgenerator.com/live.php?token=iHhICDjDy7nTvREruFufuv1pCsMHdJ5j"
                  className="hover:underline hover:text-content-accent"
                >
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative">
          <span className="absolute bottom-0 right-0 mr-4 text-sm text-content-base sm:text-center ">
            © 2023{" "}
            <Link href="/" className="hover:underline">
              PoeStack.com
            </Link>
            . All Rights Reserved. v1.0.0
          </span>
        </div>
      </div>
    </footer>
  );
}
