import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";

export default function StyledSelect2({
  items,
  selected,
  onSelectChange,
  mapToText = (e) => e?.toString(),
  mapToIcon = (e) => null,
}: {
  selected: any;
  onSelectChange: (e: any) => void;
  mapToText?: (e: any) => string;
  mapToIcon?: (e: any) => string | null;
  items: any[];
}) {
  const selectedIconUrl = mapToIcon(selected);
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
            <div className="flex flex-row space-x-2">
              <div>
                {!!selectedIconUrl && (
                  <Image
                    width={25}
                    height={25}
                    src={selectedIconUrl}
                    alt={""}
                  />
                )}
              </div>
              <div> {!!selected ? mapToText(selected) : "..."}</div>
            </div>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-20 mt-2 max-h-80 w-full overflow-auto rounded-md bg-color-primary py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                  {({ selected }) => {
                    const iconUrl = mapToIcon(item);
                    return (
                      <>
                        <span
                          className={`block text-content-base truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          <div className="flex flex-row space-x-2">
                            {!!iconUrl && (
                              <Image
                                width={25}
                                height={25}
                                src={iconUrl}
                                alt={""}
                              />
                            )}
                            <p>{mapToText(item)}</p>
                          </div>
                        </span>
                      </>
                    );
                  }}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
