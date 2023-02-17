import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function StyledSelect({
  items,
  onSelectChange,
  initalValue = null,
}: {
  items: any[];
  onSelectChange: (e: any) => void;
  initalValue: any | null;
}) {
  const [selected, setSelected] = useState<any | null>(initalValue);

  return (
    <div className="">
      <Listbox
        value={selected}
        onChange={(s) => {
          setSelected(s);
          onSelectChange?.(s);
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative bg-color-primary  text-content-base w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none hover:bg-color-secondary-variant focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm ">
            <span className="block truncate">{selected ?? "..."}</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-40 mt-1 max-h-80 w-full overflow-auto rounded-md bg-color-primary py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map((item, itemIndex) => (
                <Listbox.Option
                  key={itemIndex}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-2 pr-4 ${
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
                        {item}
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
