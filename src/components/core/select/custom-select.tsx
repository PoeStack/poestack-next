import { Listbox } from "@headlessui/react";
import { SelectLabel } from "@components/core/select/label";

import { OptionProps } from "@components/core/select/default-option";
import { SelectOptions } from "@components/core/select/select-options";
import { SelectButton } from "@components/core/select/select-button";
import { usePopperDropdown } from "@components/core/select/use-popper-dropdown";
import { InputProps } from "@components/core/select/default-input";

export interface CustomSelectProps<T> {
  options: T[];
  selected: T | undefined;
  optionRenderer: (props: OptionProps<T>) => JSX.Element;
  inputRenderer?: (props: InputProps<T>) => JSX.Element;
  keyGenerator: (data: T) => string;
  onChange: (data: T) => void;
  label?: string;
  optionListClassname?: string;
}

export function CustomSelect<T>({
  optionRenderer,
  inputRenderer = optionRenderer,
  ...props
}: CustomSelectProps<T>) {
  const { attributes, setPopperElement, setReferenceElement, styles } =
    usePopperDropdown();

  return (
    <Listbox
      value={props.selected}
      onChange={(data) => {
        props.onChange?.(data);
      }}
    >
      {({ open }) => (
        <>
          <SelectLabel>{props.label}</SelectLabel>
          <div className="relative mt-2">
            <SelectButton
              inputRenderer={inputRenderer}
              selected={props.selected}
              setRef={setReferenceElement}
            />
            <SelectOptions
              keyGenerator={props.keyGenerator}
              options={props.options}
              optionRenderer={optionRenderer}
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
