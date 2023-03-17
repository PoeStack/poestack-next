import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

export default function StyledMultiSelect2({
  items,
  selected,
  onSelectChange,
  itemToText = (e) => {
    return e?.toString();
  },
}: {
  selected: any | any[] | undefined;
  items: any[];
  onSelectChange: (e: any[]) => void;
  itemToText?: (e: any) => string;
}) {
  const mappedSelected = [selected].flat().filter((e) => !!e);

  return (
    <div className="flex flex-row w-full">
      <Listbox
        value={mappedSelected}
        onChange={(s) => {
          onSelectChange?.(s);
        }}
        multiple
      >
        <div className="relative mt-1 grow">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 overflow-x-hidden text-left capitalize rounded-l-lg shadow-md cursor-default bg-color-primary text-content-base focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
            <span className="block truncate">
              {mappedSelected?.length < 1
                ? "...."
                : mappedSelected
                    ?.map((s) => itemToText(s))
                    .join(", ")
                    .slice(0, 100)}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-40 w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg max-h-60 bg-color-primary ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map((item, itemIndex) => (
                <Listbox.Option
                  key={itemIndex}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 capitalize ml-2 ${
                      active ? "bg-color-primary-variant " : "text-white"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <div
                        className={`block grow text-content-base truncate capitalize ml-2 ${
                          selected
                            ? "font-semibold text-content-accent"
                            : "font-normal"
                        }`}
                      >
                        {itemToText(item)}
                      </div>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <button
        className="bg-color-secondary hover:bg-color-secondary-variant py-1 px-1 text-white rounded-r-lg h-[36px] mt-[4px]"
        onClick={() => {
          if (selected?.length > 0) {
            onSelectChange?.([]);
          } else {
            onSelectChange?.(items);
          }
        }}
      >
        {selected?.length > 0 ? "Clear" : "All"}
      </button>
    </div>
  );
}
