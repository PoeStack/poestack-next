import { Listbox } from "@headlessui/react";

interface SelectLabelProps {
  children?: string;
}

export function SelectLabel({ children }: SelectLabelProps) {
  if (!children) return null;

  return (
    <Listbox.Label className="text-primary-variant block text-sm leading-6">
      {children}
    </Listbox.Label>
  );
}
