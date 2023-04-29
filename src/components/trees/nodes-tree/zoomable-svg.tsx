import { Selection as d3Selection, select } from "d3-selection";
import { ZoomBehavior, ZoomTransform, zoom, zoomIdentity } from "d3-zoom";
import React, {
  PropsWithChildren,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { ResetEventEmitter } from "./reset-zoom-event-emitter";

/**
 * Props for {@link ZoomableSVG}.
 *
 * minX, minY, width, and height coorespond to the
 * same fields in an {@link SVGElement}'s viewBox.
 *
 * scaleLimit is a tuple of the min and max zoom
 * scaling limits applied to the transform as defined
 * by d3 {@link scaleExtent}.
 *
 * resetZoom can be passed `true` to reset the svg
 * to its base state.
 */
type ZoomableSVGProps = PropsWithChildren<{
  minX: number | string;
  minY: number | string;
  width: number | string;
  height: number | string;
  scaleLimit: [min: number, max: number];
  resetZoomEmitter?: ResetEventEmitter;
}>;

/**
 * This component creates an {@link SVGElement} and the
 * appropriate logic to implement {@link d3-zoom} functionality
 * to the content children.
 */
export default function ZoomableSVG({
  children,
  minX,
  minY,
  width,
  height,
  scaleLimit,
  resetZoomEmitter,
}: ZoomableSVGProps) {
  const id = useId();
  const idRef = useRef(id);
  const slRef = useRef<[min: number, max: number]>();
  const svgRef = useRef<SVGSVGElement>(null);
  const selectedRef =
    useRef<d3Selection<SVGElement, undefined, null, undefined>>();
  const zoomBehaviorRef = useRef<ZoomBehavior<SVGElement, undefined>>();

  const [k, setK] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    slRef.current = scaleLimit;
  }, [scaleLimit]);

  useEffect(() => {
    if (svgRef.current) {
      zoomBehaviorRef.current = zoom<SVGElement, undefined>();
      selectedRef.current = select<SVGElement, undefined>(svgRef.current);

      if (zoomBehaviorRef.current && selectedRef.current) {
        select<SVGElement, undefined>(svgRef.current)
          .call(
            zoomBehaviorRef.current
              .scaleExtent(slRef.current ? slRef.current : [0.25, 10])
              .on("zoom", zoomListener)
          )
          .on("wheel", (event) => {
            event.preventDefault();
          });
      }
    }
  }, [scaleLimit]);

  useEffect(() => {
    if (resetZoomEmitter) {
      resetZoomEmitter.subscribe(idRef, resetZoomState);
    }
    return () => {
      if (resetZoomEmitter) {
        resetZoomEmitter.unsubscribe(idRef);
      }
    };
  }, [resetZoomEmitter]);

  function resetZoomState() {
    if (svgRef.current && zoomBehaviorRef.current) {
      setK(1);
      setX(0);
      setY(0);

      select<SVGElement, undefined>(svgRef.current)
        .transition()
        .duration(250)
        .call(zoomBehaviorRef.current.transform, zoomIdentity);
    }
  }

  function zoomListener({
    transform: { x, y, k },
  }: {
    transform: ZoomTransform;
  }) {
    setK(k);
    setX(x);
    setY(y);
  }

  return (
    <svg
      ref={svgRef}
      width="100%"
      viewBox={`${minX} ${minY} ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform={`translate(${x},${y}) scale(${k})`}>{children}</g>
    </svg>
  );
}
