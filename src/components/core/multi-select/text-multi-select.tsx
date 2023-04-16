import {
  CustomMultiSelect,
  CustomMultiSelectProps,
} from "@components/core/multi-select/custom-multi-select";
import { DefaultMultiOption } from "@components/core/multi-select/default-multi-option";
import { SetOptional } from "type-fest";

export type TextMultiSelectProps = SetOptional<
  CustomMultiSelectProps<string>,
  "renderer" | "keyGenerator"
>;

export function TextMultiSelect(props: TextMultiSelectProps) {
  return (
    <CustomMultiSelect
      {...props}
      renderer={DefaultMultiOption}
      keyGenerator={(x) => x}
    />
  );
}
