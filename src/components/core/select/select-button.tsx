import { CustomSelectProps } from "@components/core/select/custom-select";
import SelectIcon from "@components/core/select/select-icon";
import { Listbox } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import { SetRequired } from "type-fest";

type SelectButtonProps<T> = SetRequired<
  Pick<CustomSelectProps<T>, "inputRenderer" | "selected">,
  "inputRenderer"
> & {
  setRef: Dispatch<SetStateAction<HTMLButtonElement | null>>;
};

export function SelectButton<T>({
  inputRenderer: Renderer,
  selected,
  setRef,
}: SelectButtonProps<T>) {
  return (
    <Listbox.Button
      ref={setRef}
      className="relative w-full cursor-default rounded-md bg-color-primary py-1.5 pl-3 pr-10 text-left text-content-base shadow-sm ring-1 ring-inset ring-primary focus:outline-none focus:ring-2 focus:ring-accent sm:text-sm sm:leading-6"
    >
      <Renderer data={selected} />
      <SelectIcon />
    </Listbox.Button>
  );
}
