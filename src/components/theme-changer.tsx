import { useTheme } from "next-themes";
import { Fragment, useEffect, useState } from "react";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import StyledSelect2 from "./library/styled-select-2";

export default function ThemeChanger({
  onChange = () => {},
}: {
  onChange?: (e: string) => void;
}) {
  //const [theme, setTheme] = useState("Dark");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const themes = ["Dark", "Original", "Vaal"];
  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <StyledSelect2
        items={themes}
        onSelectChange={(e) => {
          setTheme(e);
          onChange?.(e);
        }}
        selected={theme}
      />
    </>
  );
}
