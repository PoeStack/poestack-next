import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { SelectLabel } from "@components/core/select/label";

import { OptionProps } from "@components/core/select/default-option";
import { usePopper } from "react-popper";
import { SelectOptions } from "@components/core/select/select-options";
import { SelectButton } from "@components/core/select/select-button";
import { Modifier, ModifierPhases } from "@popperjs/core";

export interface CustomSelectProps<T> {
  options: T[];
  selected: T;
  renderer: (props: OptionProps<T>) => JSX.Element;
  keyGenerator: (data: T) => string;
  onChange: (data: T) => void;
  label?: string;
  optionListClassname?: string;
}
type PopperModifier = Modifier<string, Record<string, unknown>>;

const autoWidthModifier = {
  name: "sameWidth",
  enabled: true,
  phase: "beforeWrite" as ModifierPhases,
  requires: ["computeStyles"],
  fn({ state }) {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect({ state }) {
    state.elements.popper.style.width = `${
      (state.elements.reference as Element).clientWidth
    }px`;
  },
} as PopperModifier;

export function CustomSelect<T>(props: CustomSelectProps<T>) {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);

  const [popperElement, setPopperElement] = useState<HTMLUListElement | null>(
    null
  );

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [autoWidthModifier],
  });

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
              renderer={props.renderer}
              selected={props.selected}
              setRef={setReferenceElement}
            />
            <SelectOptions
              keyGenerator={props.keyGenerator}
              options={props.options}
              renderer={props.renderer}
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
