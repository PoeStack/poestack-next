import ClearButton from "@components/core/multi-select/clear-button";
import { CustomMultiSelectProps } from "@components/core/multi-select/custom-multi-select";
import { MultiInputProps } from "@components/core/multi-select/default-multi-input";
import SelectIcon from "@components/core/select/select-icon";
import { Listbox } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import { SetRequired } from "type-fest";

type MultiSelectButtonProps<T> = SetRequired<
  Pick<CustomMultiSelectProps<T>, "inputRenderer" | "selected">,
  "inputRenderer"
> &
  Pick<MultiInputProps<T>, "onClear" | "onRemove"> & {
    setRef: Dispatch<SetStateAction<HTMLButtonElement | null>>;
  };

export function MultiSelectButton<T>({
  inputRenderer: Renderer,
  selected,
  setRef,
  onClear,
  onRemove,
}: MultiSelectButtonProps<T>) {
  return (
    <Listbox.Button
      ref={setRef}
      className="relative flex w-full cursor-default rounded-md bg-color-primary py-1.5 pl-3 pr-10 text-left text-content-base shadow-sm ring-1 ring-inset ring-primary focus:outline-none focus:ring-2 focus:ring-accent sm:text-sm sm:leading-6"
    >
      <Renderer data={selected} onClear={onClear} onRemove={onRemove} />
      {selected.length > 0 ? <ClearButton onClick={onClear} /> : <SelectIcon />}
    </Listbox.Button>
  );
}
