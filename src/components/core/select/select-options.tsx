import { CSSProperties, Dispatch, Fragment, SetStateAction } from "react";
import clsx from "clsx";
import { Listbox, Transition } from "@headlessui/react";

import Portal from "@components/portal";
import { CustomSelectProps } from "@components/core/select/custom-select";

type SelectOptionsProps<T> = Pick<
  CustomSelectProps<T>,
  "options" | "optionRenderer" | "keyGenerator"
> & {
  open: boolean;
  setRef: Dispatch<SetStateAction<HTMLUListElement | null>>;
  styles?: Record<string, CSSProperties>;
  attributes?: Record<string, Record<string, string> | undefined>;
  className?: string;
};

export function SelectOptions<T>({
  options,
  optionRenderer: Renderer,
  keyGenerator,
  open,
  setRef,
  styles,
  attributes,
  className,
}: SelectOptionsProps<T>) {
  return (
    <Portal>
      <Transition
        show={open}
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options
          ref={setRef}
          style={styles?.popper}
          {...attributes?.popper}
          className={clsx(
            "absolute z-10 mt-1 max-h-56 overflow-auto rounded-md bg-primary py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
            className
          )}
        >
          {options.map((option) => (
            <Listbox.Option
              key={keyGenerator(option)}
              className={({ active }) =>
                clsx(
                  active ? "bg-color-primary-variant" : "",
                  "relative cursor-default select-none py-2 pl-3 pr-9 text-white"
                )
              }
              value={option}
            >
              {(data) => <Renderer {...data} data={option} />}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Portal>
  );
}
