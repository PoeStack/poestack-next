import {
  CustomMultiSelect,
  CustomMultiSelectProps,
} from "@components/core/multi-select/custom-multi-select";
import { DefaultMultiInput } from "@components/core/multi-select/default-multi-input";
import { DefaultMultiOption } from "@components/core/multi-select/default-multi-option";
import { SetOptional } from "type-fest";

export type TextMultiSelectProps = SetOptional<
  CustomMultiSelectProps<string>,
  "optionRenderer" | "inputRenderer" | "keyGenerator" | "onClear" | "onRemove"
>;

export function TextMultiSelect(props: TextMultiSelectProps) {
  return (
    <CustomMultiSelect
      {...props}
      inputRenderer={DefaultMultiInput}
      optionRenderer={DefaultMultiOption}
      onClear={() => props.onChange([])}
      onRemove={(item) =>
        props.onChange(props.selected.filter((x) => x !== item))
      }
      keyGenerator={(x) => x}
    />
  );
}
