import { CustomSelectProps } from "@components/core/select/custom-select";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Dispatch, SetStateAction } from "react";

type SelectButtonProps<T> = Pick<
  CustomSelectProps<T>,
  "renderer" | "selected"
> & {
  setRef: Dispatch<SetStateAction<HTMLButtonElement | null>>;
};

export function SelectButton<T>({
  renderer: Renderer,
  selected,
  setRef,
}: SelectButtonProps<T>) {
  return (
    <Listbox.Button
      ref={setRef}
      className="relative w-full cursor-default rounded-md bg-color-primary py-1.5 pl-3 pr-10 text-left text-content-base shadow-sm ring-1 ring-inset ring-primary focus:outline-none focus:ring-2 focus:ring-accent sm:text-sm sm:leading-6"
    >
      <Renderer data={selected} />
      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
        <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
      </span>
    </Listbox.Button>
  );
}
