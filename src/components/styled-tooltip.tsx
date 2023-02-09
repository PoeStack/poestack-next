import {
  cloneElement,
  FC,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useRef,
  useState,
} from "react";

import ReactDOM from "react-dom";
import { Placement } from "@popperjs/core";
import { usePopper } from "react-popper";

import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Portal from "./portal";
import ReactPortal from "./portal2";

interface Props {
  children?: ReactNode;
  tooltip?: string;
  id?: string;
  message: string;
  placement: Placement;
  className?: string;
  arrow?: string;
}

export const StyledTooltip: FC<Props> = ({
  message,
  placement,
  children,
  className,
  arrow,
}): JSX.Element => {
  const [popperReference, setPopperReference] = useState<HTMLDivElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(popperReference, popperElement, {
    placement,
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      { name: "offset", options: { offset: [0, 10] } },
    ],
  });

  const [isVisible, setIsVisible] = useState(false);

  if (!isValidElement(children)) {
    console.warn("wrapped element is not a valid element");
    return null as any;
  }

  const childrenWithPopperProps = cloneElement(children as ReactElement, {
    ref: setPopperReference,
    onMouseEnter: () => setIsVisible(() => true),
    onMouseLeave: () => setIsVisible(() => false),
    "aria-describedby": "tooltip-message",
  });

  return (
    <>
      {childrenWithPopperProps}
      <Portal>
        <div
          ref={setPopperElement}
          role="tooltip"
          id="tooltip-message"
          className={`transition-all  duration-300 ${
            isVisible ? `opacity-100` : `opacity-0`
          } ${isVisible ? "visible" : "invisible"}`}
          style={styles.popper}
          {...attributes.popper}
        >
          <div
            className={`px-2 grid place-items-center text-sm font-medium text-white bg-pink-700 h-[30px] min-w-64 w-fit rounded shadow-sm ${className}`}
          >
            <span> {message}</span>
            {arrow ? (
              <div
                ref={setArrowElement}
                data-popper-arrow
                className={`popper-arrow z-10 ${
                  placement ?? "auto"
                } h-5 w-5 before:absolute before:inset-0 before:bg-gray-700`}
                style={styles.arrow}
              />
            ) : null}
          </div>
        </div>
      </Portal>
    </>
  );
};

// export const OldStyledTooltip: FC<Props> = ({
//   children,
//   tooltip,
// }): JSX.Element => {
//   //const tooltipRef = useRef<HTMLSpanElement>(null);
//   //const container = useRef<HTMLDivElement>(null);
//   return (
//     <div
//       //ref={container}
//       //   onMouseEnter={(clientX: any, clientY: any) => {
//       //     if (!tooltipRef.current || !container.current) return;
//       //     const { left, top } = container.current.getBoundingClientRect();
//       //     console.log("left: ", left);
//       //     console.log("clientX: ", clientX);
//       //     // tooltipRef.current.style.left = clientX - left + "px";
//       //     // tooltipRef.current.style.top = clientY - top + "px";
//       //   }}
//       className="group relative inline-block"
//     >
//       {children}
//       {tooltip ? (
//         <span
//           //ref={tooltipRef}
//           className="invisible group-hover:visible opacity-0   group-hover:opacity-100 transition bg-skin-primary text-skin-base p-1 rounded absolute top-full mt-2 whitespace-nowrap border-skin-base border-2"
//         >
//           {tooltip}
//         </span>
//       ) : null}
//     </div>
//   );
// };

// export const StyledTooltipWIcon: FC<Props> = ({ tooltip }): JSX.Element => {
//   const tooltipRef = useRef<HTMLSpanElement>(null);
//   const container = useRef<HTMLDivElement>(null);
//   return (
//     <div
//       ref={container}
//       onMouseEnter={(clientX: any) => {
//         if (!tooltipRef.current || !container.current) return;
//         const { left } = container.current.getBoundingClientRect();
//         tooltipRef.current.style.left = clientX - left + "px";
//       }}
//       className="group relative inline-block mr-2"
//     >
//       <InformationCircleIcon className="w-5 h-5 flex  items-center" />
//       {tooltip ? (
//         <span
//           ref={tooltipRef}
//           className="invisible group-hover:visible opacity-0   group-hover:opacity-100 transition bg-skin-primary text-skin-base p-1 rounded absolute top-full mt-2 whitespace-nowrap border-skin-base border-2"
//         >
//           {tooltip}
//         </span>
//       ) : null}
//     </div>
//   );
// };
