import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function StyledSelect2({
  items,
  selected,
  onSelectChange,
  mapToText = (e) => e?.toString(),
}: {
  selected: any;
  onSelectChange: (e: any) => void;
  mapToText?: (e: any) => string;
  items: any[];
}) {
  return (
    <div className="">
      <Listbox
        value={selected}
        onChange={(s) => {
          onSelectChange?.(s);
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative bg-skin-primary text-skin-base w-full cursor-pointer rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm ">
            <span className="block truncate">
              {mapToText(selected) ?? "..."}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-theme-color-2 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map((item, itemIndex) => (
                <Listbox.Option
                  key={itemIndex}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-2 pr-2 ${
                      active ? "bg-skin-primary text-white" : "text-white"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block text-white truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {mapToText(item)}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
