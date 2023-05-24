import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import StyledCard from "@components/library/styled-card";
import { usePoeStackAuth } from "@contexts/user-context";
import { ItemGroup, StashViewItemSummary } from "@generated/graphql";
import { GeneralUtils, myLoader } from "@utils/general-util";
import { StashViewUtil } from "@utils/stash-view-util";

export default function StashViewComparePanel({
  league,
  second,
  first,
}: {
  league: string;
  second: string;
  first: string;
}) {
  const router = useRouter();
  const { profile } = usePoeStackAuth();

  const [itemGroupSummaries, setItemGroupSummaries] = useState<
    { itemGroup: ItemGroup; s1: number; s2: number }[] | null
  >(null);

  useEffect(() => {
    async function loadStashes() {
      const itemGroupSummaries: Record<
        string,
        { itemGroup: ItemGroup; s1: number; s2: number }
      > = {};
      function mapItem(key: string, e: StashViewItemSummary) {
        if (!e.itemGroup) return;
        const summary = itemGroupSummaries[e.itemGroup?.hashString] ?? {
          itemGroup: e.itemGroup,
          s1: 0,
          s2: 0,
        };
        summary[key] += e.quantity;
        itemGroupSummaries[e.itemGroup?.hashString] = summary;
      }

      const summary1 = await StashViewUtil.fetchStashSummary(
        league,
        profile!.opaqueKey!,
        first
      );
      const summary2 = await StashViewUtil.fetchStashSummary(
        league,
        profile!.opaqueKey!,
        second
      );

      summary1.items.forEach((e) => {
        mapItem("s1", e);
      });
      summary2.items.forEach((e) => {
        mapItem("s2", e);
      });

      const summaries = [...Object.values(itemGroupSummaries)]
        .filter((e) => Math.abs(e.s2 - e.s1) > 0)
        .sort((a, b) => Math.abs(b.s2 - b.s1) - Math.abs(a.s2 - a.s1));
      setItemGroupSummaries(summaries);
    }
    loadStashes();
  }, [router, profile?.opaqueKey]);

  if (!profile?.opaqueKey) {
    return <>loading..</>;
  }

  return (
    <>
      <StyledCard>
        <div className="w-full">
          {router.query.first} vs {router.query.second}
          <table className="divide-y divide-gray-700 w-full">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                ></th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                >
                  Change
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {itemGroupSummaries?.map((e) => {
                return (
                  <>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                        <Image
                          loader={myLoader}
                          height={24}
                          width={24}
                          className="scale-150"
                          src={e.itemGroup.icon!}
                          alt={""}
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {GeneralUtils.capitalize(
                          e.itemGroup.displayName ?? e.itemGroup.key
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {e.s2 - e.s1}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </StyledCard>
    </>
  );
}
