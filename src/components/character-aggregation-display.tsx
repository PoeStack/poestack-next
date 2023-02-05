import React from "react";
import { GenericAggregation } from "../__generated__/resolvers-types";
import StyledCard from "./styled-card";

export default function CharacterAggreationDisplay({
  aggregation,
}: {
  aggregation: GenericAggregation | undefined | null;
}) {
  if (!aggregation) {
    return <>Loading...</>;
  }

  const totalValue = aggregation.values.reduce((e, p) => e + p.value, 0);

  return (
    <>
      <div>
        <div className="flex flex-col space-y-2">
          {aggregation.values.map((e) => (
            <>
              <div className="grid grid-cols-2 items-center">
                <div>{e.key}</div>
                <div className="text-right">
                  {+((e.value / totalValue) * 100).toFixed(2)}%
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
