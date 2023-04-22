import { Listbox } from "@headlessui/react";

import { SelectLabel } from "@components/core/select/label";
import { OptionProps } from "@components/core/select/default-option";
import { usePopperDropdown } from "@components/core/select/use-popper-dropdown";

import { MultiSelectOptions } from "@components/core/multi-select/multi-select-options";
import { MultiInputProps } from "@components/core/multi-select/default-multi-input";
import { MultiSelectButton } from "@components/core/multi-select/multi-select-button";

export interface CustomMultiSelectProps<T>
  extends Pick<MultiInputProps<T>, "onClear" | "onRemove"> {
  options: T[];
  selected: T[];
  inputRenderer: (props: MultiInputProps<T>) => JSX.Element;
  optionRenderer: (props: OptionProps<T>) => JSX.Element;
  keyGenerator: (data: T) => string;
  onChange: (data: T[]) => void;
  label?: string;
  optionListClassname?: string;
}

export function CustomMultiSelect<T>(props: CustomMultiSelectProps<T>) {
  const { attributes, setPopperElement, setReferenceElement, styles } =
    usePopperDropdown();

  return (
    <Listbox
      multiple
      value={props.selected}
      onChange={(data) => {
        props.onChange?.(data);
      }}
    >
      {({ open }) => (
        <>
          <SelectLabel>{props.label}</SelectLabel>
          <div className="relative mt-2">
            <MultiSelectButton
              onClear={props.onClear}
              onRemove={props.onRemove}
              inputRenderer={props.inputRenderer}
              selected={props.selected}
              setRef={setReferenceElement}
            />
            <MultiSelectOptions
              keyGenerator={props.keyGenerator}
              options={props.options}
              optionRenderer={props.optionRenderer}
              open={open}
              styles={styles}
              attributes={attributes}
              setRef={setPopperElement}
            />
          </div>
        </>
      )}
    </Listbox>
  );
}
