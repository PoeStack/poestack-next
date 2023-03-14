import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";

export default function StyledMultiSelectMultiFilter({
  items,
  selected,
  onSelectChange,
  itemToText = (e) => {
    return e?.toString();
  },
  itemToId = (e) => {
    return e?.toString();
  },
  placeholder,
  multiple = true,
  additionalFilters,
}: {
  selected: any | any[] | undefined;
  items: any[];
  onSelectChange: (e: any[]) => void;
  itemToText?: (e: any) => string;
  itemToId?: (e: any) => string;
  placeholder?: string;
  multiple?: boolean;
  additionalFilters?: [
    {
      title: string;
      toggle: () => void;
      enabled: Boolean;
      filterFunction: (arg0: any) => Boolean;
    }
  ];
}) {
  const [query, setQuery] = useState("");

  const filteredItems = additionalFilters
    ? additionalFilters.reduce((curr, filter) => {
        return filter.enabled
          ? curr.filter((item) => filter.filterFunction(itemToText(item)))
          : curr;
      }, items)
    : items;

  const cleanItems =
    query === ""
      ? filteredItems
      : filteredItems.filter((item) =>
          itemToText(item)
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const unselectItem = (id: any) => {
    const newSelected = selected?.filter((s: any) => itemToId(s) !== id) || [];
    onSelectChange(newSelected);
  };

  return (
    // @ts-ignore
    <Combobox value={selected} onChange={onSelectChange} multiple={multiple}>
      <div className="relative mt-1 ">
        <div className="relative h-12 fit flex w-full cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <div className="bg-color-primary flex w-full rounded-lg mr-2 pr-2">
            <Combobox.Button className="flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>

            <div className="flex items-center">
              {(multiple && selected.length) > 0 && (
                <>
                  {selected.map((el: any) => {
                    return (
                      <div
                        key={itemToId(el)}
                        className="hover:bg-color-secondary bg-color-primary-variant my-1 mx-2 px-2 text-white rounded flex items-center h-[70%] cursor-pointer text-center"
                        onClick={() => unselectItem(itemToId(el))}
                      >
                        <p className="px-2 truncate mx-1">{itemToText(el)}</p>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            <Combobox.Button className="w-full border-none text-sm leading-5 focus:ring-0 ">
              <Combobox.Input
                className="w-full border-none rounded-full text-sm focus:ring-0 bg-color-primary-variant text-content-base backdrop-filter backdrop-blur-lg shadow-lg"
                placeholder={`${placeholder || ""}`}
                onChange={(event) => setQuery(event.target.value)}
              />
            </Combobox.Button>
          </div>

          {additionalFilters &&
            additionalFilters.map((filter, idx) => {
              return (
                <button
                  key={filter.title}
                  className={`bg-color-secondary hover:bg-color-secondary-variant py-1 px-2 border-color-primary border-r-2 rounded-l-lg font-semibold ${
                    filter.enabled ? "text-content-accent" : "text-white"
                  }`}
                  onClick={() => filter.toggle()}
                >
                  <span>{filter.title}</span>
                </button>
              );
            })}

          {multiple && (
            <button
              className={`bg-color-secondary hover:bg-color-secondary-variant py-1 px-2 font-semibold text-white rounded-r-lg`}
              onClick={() => {
                if (selected?.length > 0) {
                  onSelectChange?.([]);
                } else {
                  onSelectChange?.(filteredItems);
                }
              }}
            >
              {selected?.length > 0 ? "Clear" : "All"}
            </button>
          )}
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 z-40 max-h-60 w-full overflow-auto rounded-md bg-color-primary py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {cleanItems.length === 0 ? (
              <div className="relative cursor-default select-none py-2 px-4">
                Nothing found...
              </div>
            ) : (
              cleanItems.map((item) => (
                <Combobox.Option
                  key={itemToId(item)}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 capitalize ml-2 ${
                      active ? "bg-color-primary-variant " : "text-white"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected
                            ? "font-semibold text-content-accent"
                            : "font-normal"
                        }`}
                      >
                        {itemToText(item)}
                      </span>
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
