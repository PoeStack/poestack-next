import { GeneralUtils } from "@utils/general-util";

export default function ItemGroupPropertiesDisplay({
  properties,
}: {
  properties: { key: string; value: any }[];
}) {
  return (
    <>
      <div className="flex space-x-1">
        {properties
          ?.filter(
            (e) =>
              e.value !== undefined && e.value !== null && e.value !== false
          )
          .map((p) => (
            <div
              key={p.key}
              className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20"
            >
              {p.value === true
                ? GeneralUtils.capitalize(p.key)
                : `${GeneralUtils.capitalize(p.key)}: ${p.value}`}
            </div>
          ))}
      </div>
    </>
  );
}
