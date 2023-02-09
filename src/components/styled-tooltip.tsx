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

interface Props {
  children?: ReactNode;
  tooltip?: string;
  id?: string;
  texts: string[];
  placement: Placement;
  className?: string;
  arrow?: string;
}

export const StyledTooltip: FC<Props> = ({
  texts,
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
          {/* New Texts Approach */}
          {texts?.length > 1 ? (
            <div
              className={`px-2 grid place-items-center text-sm font-medium text-skin-base bg-skin-primary border-2 min-w-64 w-fit rounded shadow-sm ${className}`}
            >
              {/* <div>
                <span>{texts[0]}</span>
                <br />
                <span>{texts[1]}</span>
              </div> */}
              {texts.map((text, index) => (
                <div key={index} className="flex flex-wrap">
                  <p>{texts[index]}</p>
                </div>
              ))}
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
          ) : (
            <div
              className={`px-2 grid place-items-center text-sm font-medium text-skin-base bg-skin-primary border-2 min-w-64 w-fit rounded shadow-sm ${className}`}
            >
              <span>{texts}</span>
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
          )}
        </div>
      </Portal>
    </>
  );
};
