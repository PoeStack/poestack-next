import { useState } from "react";
import { usePopper } from "react-popper";

import type { Modifier, ModifierPhases } from "@popperjs/core";

type PopperModifier = Modifier<string, Record<string, unknown>>;

export const autoWidthModifier = {
  name: "sameWidth",
  enabled: true,
  phase: "beforeWrite" as ModifierPhases,
  requires: ["computeStyles"],
  fn({ state }) {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect({ state }) {
    state.elements.popper.style.width = `${
      (state.elements.reference as Element).clientWidth
    }px`;
  },
} satisfies PopperModifier;

export function usePopperDropdown() {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);

  const [popperElement, setPopperElement] = useState<HTMLUListElement | null>(
    null
  );

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [autoWidthModifier],
  });

  return { setReferenceElement, setPopperElement, styles, attributes };
}
