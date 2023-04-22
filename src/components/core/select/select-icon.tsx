import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function SelectIcon() {
  return (
    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
      <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
    </span>
  );
}
