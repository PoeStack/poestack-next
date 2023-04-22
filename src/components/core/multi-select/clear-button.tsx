import { XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { ComponentProps } from "react";

interface ClearButtonProps extends Omit<ComponentProps<"span">, "onClick"> {
  onClick: () => void;
}

export default function ClearButton({
  className,
  onClick,
  ...props
}: ClearButtonProps) {
  return (
    <span
      onClick={(ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        onClick();
      }}
      className={clsx(
        "absolute inset-y-0 right-0 ml-3 flex cursor-pointer items-center p-2",
        className
      )}
      {...props}
    >
      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
    </span>
  );
}
