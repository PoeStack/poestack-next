import { useLadderViewContext } from "@contexts/ladder-view-context";
import { useEffect } from "react";

export default function LadderView() {
  const { load, vectorRecords } = useLadderViewContext();

  useEffect(() => {
    load();
  }, []);

  return <>{JSON.stringify(vectorRecords)}</>;
}
