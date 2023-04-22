import { SetOptional } from "type-fest";

import { DefaultOption } from "@components/core/select/default-option";
import {
  CustomSelect,
  CustomSelectProps,
} from "@components/core/select/custom-select";

export type TextSelectProps = SetOptional<
  CustomSelectProps<string>,
  "optionRenderer" | "inputRenderer" | "keyGenerator"
>;

export function TextSelect(props: TextSelectProps) {
  return (
    <CustomSelect
      {...props}
      optionRenderer={DefaultOption}
      keyGenerator={(x) => x}
    />
  );
}
