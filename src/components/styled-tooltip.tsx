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
import Image from "next/image";
import { myLoader } from "@utils/general-util";

interface Props {
  children?: ReactNode;
  tooltip?: string;
  id?: string;
  texts: string[];
  placement: Placement;
  className?: string;
  arrow?: string;
  noDuration?: boolean;
  imageString?: string;
  title?: string;
}

export const StyledTooltip: FC<Props> = ({
  texts,
  placement,
  children,
  className,
  arrow,
  noDuration,
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
          className={` ${noDuration ? null : `transition-all  duration-400`}  ${
            isVisible ? `opacity-100` : `opacity-0`
          } ${isVisible ? "visible" : "invisible"}`}
          style={styles.popper}
          {...attributes.popper}
        >
          {texts?.length > 1 ? (
            <div
              className={`px-2 grid place-items-center text-sm font-medium text-content-base bg-color-primary min-w-64 w-fit rounded shadow-sm ${className}`}
            >
              {texts.map((text, index) => (
                <div key={index}>
                  <p>{text}</p>
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
              className={`px-2 grid place-items-center text-sm font-medium text-content-base bg-color-primary min-w-64 w-fit rounded shadow-sm ${className}`}
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

// Refined for Skill Images only, as information and styling requirements for other elements, such as items, may vary greatly and warrant separate components.
export const StyledSkillImageTooltip: FC<Props> = ({
  texts,
  placement,
  children,
  className,
  arrow,
  noDuration,
  title,
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
          className={` ${noDuration ? null : `transition-all  duration-400`}  ${
            isVisible ? `opacity-100` : `opacity-0`
          } ${isVisible ? "visible" : "invisible"}`}
          style={styles.popper}
          {...attributes.popper}
        >
          <div
            className={`px-2 grid place-items-center text-sm font-medium text-content-base bg-color-primary min-w-64 w-fit rounded shadow-sm ${className}`}
          >
            <div>
              <p className=" capitalize text-md text-left">{title}</p>
              <div className="flex flex-row items-center mb-2 capitalize">
                <Image
                  src={`/assets/poe/skill_icons/${encodeURIComponent(
                    texts[0]
                  )}.png`}
                  alt=""
                  width={39}
                  height={30}
                  className="flex"
                />
                <div className="pl-2 ">{texts[0]}</div>
              </div>
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
};
