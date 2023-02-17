import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { StyledTooltip } from "./styled-tooltip";

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
        <div className="relative">
          <Listbox.Button className="relative bg-color-primary text-content-base hover:bg-color-secondary-variant w-full cursor-default rounded-lg px-4 py-2 text-left shadow-md font-medium ">
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
            <Listbox.Options className="absolute z-40 mt-2 max-h-80 w-full overflow-auto rounded-md bg-color-primary py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map((item, itemIndex) => (
                <Listbox.Option
                  key={itemIndex}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-2 pr-2  ${
                      active
                        ? "bg-surface-secondary-variant  text-content-base"
                        : "text-white"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block text-content-base truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        <StyledTooltip
                          texts={[mapToText(item)]}
                          placement="left"
                        >
                          <p>{mapToText(item)}</p>
                        </StyledTooltip>
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
