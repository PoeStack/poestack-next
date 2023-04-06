import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function StyledDropdown({
  text,
  items,
}: {
  text: string;
  items: { text: string; onClick: () => void }[];
}) {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-24 px-4 py-2 text-sm font-medium rounded-md shadow-sm bg-color-primary text-content-base hover:bg-color-secondary-variant focus:outline-none ">
            {text}
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
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
          <Menu.Items className="absolute z-10 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg -top-2 -right-20 ring-1 ring-black ring-opacity-5 focus:outline-none">
            {items.map((item) => (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-neutral-500 text-content-accent"
                          : "bg-neutral-700 text-white"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
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
