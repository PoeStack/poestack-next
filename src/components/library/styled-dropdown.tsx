import { Fragment, useEffect, useRef, useState } from "react";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function StyledDropdown({
  text,
  items,
  className,
}: {
  text: string | null;
  items: { text: string; onClick: () => void }[];
  className?: string | null;
}) {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={
              "inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md shadow-sm bg-color-secondary text-content-base hover:bg-color-secondary-variant focus:outline-none " +
              (className ? className : "")
            }
          >
            {!!text && text}
            <ChevronDownIcon
              className="w-5 h-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`min-w-full absolute z-10 top-8 mt-2 p-1 bg-neutral-700 origin-top-right rounded-md shadow-lg right-0 ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            {items.map((item) => (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-neutral-500 text-content-accent"
                          : "bg-neutral-700 text-white"
                      } group flex w-full items-center rounded-md px-6 py-2 text-sm`}
                      onClick={item.onClick}
                    >
                      {item.text}
                    </button>
                  )}
                </Menu.Item>
              </>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
