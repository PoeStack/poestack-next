import { DefaultOption } from "@components/core/select/default-option";

export interface InputProps<T> {
  data: T | undefined;
}

type DefaultInputProps = InputProps<string>;

export function DefaultInput({ data }: DefaultInputProps) {
  return <DefaultOption data={data} />;
}
