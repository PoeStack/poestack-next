import { ItemGroup } from "../__generated__/resolvers-types";

export class GeneralUtils {
  public static capitalize(
    str: string | undefined | null
  ): string | undefined | null {
    if (!str) return str;

    return str
      ?.split(" ")
      .map((w) => {
        return w[0].toUpperCase() + w.slice(1);
      })
      .join(" ");
  }

  public static itemGroupToDisplayName(
    itemGroup: ItemGroup | undefined | null
  ): string {
    if (!itemGroup) return "";

    return (
      GeneralUtils.capitalize(itemGroup?.displayName ?? itemGroup?.key) ?? ""
    );
  }

  public static debounce(func, delay = 80) {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  public static hashPropValue(prop): number | string | boolean | null {
    if (prop["nValue"] !== undefined) return prop["nValue"];
    if (prop["bValue"] !== undefined) return prop["bValue"];
    if (prop["sValue"] !== undefined) return prop["sValue"];
    return prop["value"];
  }
}
