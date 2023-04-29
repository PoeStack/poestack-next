import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";

export const Profile_Themes = ["Dark", "Light", "Vaal"] as const;

export interface Options {
  IGN: string;
  theme: (typeof Profile_Themes)[number];
}

export const defaultOptions: Options = {
  IGN: "Default",
  theme: "Dark",
};

const initalContext = {
  useOptions: function useOptions<T extends keyof Options>(
    optionsKey: T
  ): [Options[T], Dispatch<SetStateAction<Options[T]>>] {
    const [o, seto] = useState(defaultOptions[optionsKey]);
    return [o, seto];
  },
  restoreDefault: () => {},
};

export const localStorageOptionsName = "options";
export const OptionsContext = createContext(initalContext);

export function PoeStackOptionsProvider({ children }) {
  const [options, setOptions] = useLocalStorage(
    localStorageOptionsName,
    defaultOptions
  );

  function useOptions<T extends keyof Options>(
    optionsKey: T
  ): [Options[T], Dispatch<SetStateAction<Options[T]>>] {
    const [setting, setSetting] = useState(defaultOptions[optionsKey]);

    useEffect(() => {
      setSetting(sanitizeOptions(options)[optionsKey]);
    }, [options]);

    useEffect(() => {
      setOptions(sanitizeOptions({ ...options, [optionsKey]: setting }));
    }, [setting]);

    return [setting, setSetting];
  }

  function restoreDefaultOptions() {
    setOptions(defaultOptions);
  }

  function sanitizeOptions(newOptions: any): Options {
    return (Object.keys(defaultOptions) as (keyof Options)[]).reduce<Options>(
      (returnedOptions: Options, key: keyof Options) => {
        if (key in newOptions) {
          returnedOptions[key] = newOptions[key];
        }
        return returnedOptions;
      },
      defaultOptions
    );
  }

  const value = {
    useOptions: useOptions,
    restoreDefault: restoreDefaultOptions,
  };

  return (
    <OptionsContext.Provider value={value}>{children}</OptionsContext.Provider>
  );
}

export const useOptionsContext = () => useContext(OptionsContext);
