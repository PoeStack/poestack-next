import ClearButton from "@components/core/multi-select/clear-button";
import { DefaultOption } from "@components/core/select/default-option";
import { SELECT_PLACEHOLDER } from "@components/core/select/utils";

export interface MultiInputProps<T> {
  data: T[];
  onRemove: (item: T) => void;
  onClear: () => void;
}

type DefaultMultiInputProps = MultiInputProps<string>;

export function DefaultMultiInput({ data, onRemove }: DefaultMultiInputProps) {
  if (data.length === 0) return <span>{SELECT_PLACEHOLDER}</span>;

  return (
    <>
      {data.map((item) => (
        <div
          className="mr-2 flex w-min items-center justify-center rounded-md bg-surface-secondary-variant py-1 px-2"
          key={item}
        >
          <span>{item}</span>
          <ClearButton
            className="relative ml-2 p-0 text-accent"
            onClick={() => {
              onRemove(item);
            }}
          />
        </div>
      ))}
    </>
  );
}
