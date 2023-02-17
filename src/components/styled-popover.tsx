import { Popover, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

export default function StyledPopover({ text, children }) {
  return (
    <div>
      <Popover className="relative">
        {({ open }) => {
          return (
            <>
              <div>
                <Popover.Button className={``}>
                  <span>{text}</span>
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-0 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="bg-color-primary z-50">{children}</div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </div>
            </>
          );
        }}
      </Popover>
    </div>
  );
}
