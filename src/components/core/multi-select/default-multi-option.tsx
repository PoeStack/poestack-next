import {
  DefaultOption,
  OptionProps,
} from "@components/core/select/default-option";
import { SELECT_PLACEHOLDER } from "@components/core/select/utils";
import { useMemo } from "react";

type DefaultMultiOptionProps = OptionProps<string | string[]>;

export function DefaultMultiOption({
  data,
  ...props
}: DefaultMultiOptionProps) {
  const content = useMemo<string>(() => {
    if (!data || data.length === 0) return SELECT_PLACEHOLDER;

    if (Array.isArray(data)) return data.join(", ");

    return data;
  }, [data]);

  return <DefaultOption {...props} data={content} />;
}
