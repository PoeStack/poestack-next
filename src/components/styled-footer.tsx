import Image from "next/image";
import Link from "next/link";

export default function StyledFooter() {
  return (
    <footer className="p-4 mt-2 bg-surface-primary sm:p-6">
      <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0">
          <Link href="/" className="flex items-center">
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
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-content-base uppercase ">
              Resources
            </h2>
            <ul className="text-content-base">
              <li className="mb-4">
                <a
                  href="https://flowbite.com/"
                  className="hover:underline hover:text-content-accent"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com/"
                  className="hover:underline hover:text-content-accent"
                >
                  Tailwind CSS
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-content-base uppercase ">
              Follow us
            </h2>
            <ul className="text-content-base">
              <li className="mb-4">
                <Link
                  href="https://discord.gg/zqeTWZvb76"
                  className="hover:underline hover:text-content-accent"
                  legacyBehavior
                >
                  <a target="_blank" rel="noopener noreferrer">
                    Discord
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/PoeStack"
                  className="hover:underline hover:text-content-accent"
                  legacyBehavior
                >
                  <a target="_blank" rel="noopener noreferrer">
                    Github
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-content-base uppercase ">
              Legal
            </h2>
            <ul className="text-content-base">
              <li className="mb-4">
                <a
                  href="#"
                  className="hover:underline hover:text-content-accent"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-content-accent"
                >
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-content-base sm:text-center ">
          © 2023{" "}
          <Link href="/" className="hover:underline">
            PoeStack.com
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

{
  /* Old Footer */
}
{
  /* <div classNameName="flex flex-row space-x-3 bg-pink-400 justify-center">
        <div >
          <h3>
            This product isn&apos;t affiliated with or endorsed by Grinding Gear
            Games in any way.
          </h3>
        </div>
        <div>
          <Link
            href={
              "https://www.privacypolicygenerator.info/live.php?token=6cH1lbmNbc4oU9ntPGezJpm0jjoAAFl1"
            }
          >
            Privacy Policy
          </Link>
        </div>
        <div>
          <Link
            href={
              "https://www.termsandconditionsgenerator.com/live.php?token=iHhICDjDy7nTvREruFufuv1pCsMHdJ5j"
            }
          >
            Terms of Service
          </Link>
        </div>
        <div>Copyright ©2023 PoeStack.com Owner</div>
      </div> */
}
