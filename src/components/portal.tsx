import { useEffect, useState, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {}

export default function Portal({ children }: PropsWithChildren<PortalProps>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(children, document.querySelector('#portal') as HTMLElement)
    : null;
}
