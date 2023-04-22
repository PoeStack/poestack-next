import { SetOptional } from "type-fest";
import clsx from "clsx";
import Image from "next/image";

import {
  CustomSelect,
  CustomSelectProps,
} from "@components/core/select/custom-select";
import { SELECT_PLACEHOLDER } from "@components/core/select/utils";

interface IconItem {
  name?: string;
  icon?: string;
}

export type IconSelectProps<T extends IconItem> = SetOptional<
  CustomSelectProps<T>,
  "optionRenderer" | "keyGenerator"
>;

export function IconSelect<T extends IconItem>(props: IconSelectProps<T>) {
  return (
    <CustomSelect<T>
      {...props}
      optionRenderer={({ data, selected }) => (
        <div className="flex items-center">
          <span
            className={clsx(
              selected ? "font-semibold text-content-accent" : "font-normal",
              "ml-3 block text-base"
            )}
          >
            <div className="flex space-x-2">
              {data?.icon ? (
                <Image
                  width={24}
                  height={24}
                  src={data.icon}
                  alt={`${data?.name} icon`}
                />
              ) : null}
              <p>{data?.name ?? SELECT_PLACEHOLDER}</p>
            </div>
          </span>
        </div>
      )}
      keyGenerator={(x) => x?.name || "unknown"}
    />
  );
}
