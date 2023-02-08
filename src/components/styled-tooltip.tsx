import { FC, ReactNode, useRef } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

interface Props {
  children?: ReactNode;
  tooltip?: string;
}

export const StyledTooltip: FC<Props> = ({
  children,
  tooltip,
}): JSX.Element => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={container}
      onMouseEnter={(clientX: any) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();
        tooltipRef.current.style.left = clientX - left + "px";
      }}
      className="group relative inline-block"
    >
      {children}
      {tooltip ? (
        <span
          ref={tooltipRef}
          className="invisible group-hover:visible opacity-0   group-hover:opacity-100 transition bg-skin-primary text-skin-base p-1 rounded absolute top-full mt-2 whitespace-nowrap border-skin-base border-2"
        >
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};

export const StyledTooltipWIcon: FC<Props> = ({ tooltip }): JSX.Element => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={container}
      onMouseEnter={(clientX: any) => {
        if (!tooltipRef.current || !container.current) return;
        const { right } = container.current.getBoundingClientRect();
        tooltipRef.current.style.left = clientX - right + 250 + "px";
      }}
      className="group relative inline-block mr-2"
    >
      <InformationCircleIcon className="w-5 h-5 flex  items-center" />
      {tooltip ? (
        <span
          ref={tooltipRef}
          className="invisible group-hover:visible opacity-0   group-hover:opacity-100 transition bg-skin-primary text-skin-base p-1 rounded absolute top-full mt-2 whitespace-nowrap border-skin-base border-2"
        >
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};
