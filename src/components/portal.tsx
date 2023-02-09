import { useRef, useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
//import styles from "./Overlay.module.css";

interface PortalProps {
  children: ReactNode;
}

// export const Portal = (props: any) => {
//   const ref = useRef<Element | null>(null);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     ref.current = document.querySelector<HTMLElement>("#portal");
//     setMounted(true);
//   }, []);

//   return mounted && ref.current
//     ? createPortal(<div>{props.children}</div>, ref.current)
//     : null;
// };

interface Props {
  children: any;
}

export const Portal: React.FC<Props> = ({ children }) => {
  const el = document.createElement("div");
  const wrapper: React.RefObject<HTMLElement> = useRef(el);

  useEffect(() => {
    const current = wrapper.current as HTMLElement;
    current.setAttribute("id", "overlay");
    document.body.appendChild(current);

    return () => {
      document.body.removeChild(current);
    };
  }, []);

  if (!wrapper.current) {
    return <>{null}</>;
  }
  return createPortal(children, wrapper.current);
};

export default Portal;
