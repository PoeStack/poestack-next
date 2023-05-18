import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";

import { gql, useMutation } from "@apollo/client";
import CurrencyValueDisplay from "@components/currency-value-display";
import StyledButton from "@components/library/styled-button";
import StyledCard from "@components/library/styled-card";
import { useStashViewContext } from "@contexts/stash-view-context";
import { StarIcon } from "@heroicons/react/24/outline";

export default function StashViewSnapshotsCard() {
  const router = useRouter();
  const {
    snapshotRecords,
    selectedSnapshotRecord,
    setSelectedSnapshotRecord,
    refetchSnapshotRecords,
    stashViewSettings,
  } = useStashViewContext();

  const [updateRecord] = useMutation(
    gql`
      mutation StashViewUpdateSnapshotRecord(
        $input: StashViewSnapshotRecordUpdateInput!
      ) {
        stashViewUpdateSnapshotRecord(input: $input)
      }
    `
  );

  return (
    <>
      <StyledCard>
        <div>Snapshots</div>

        <table className="divide-y divide-gray-700">
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
                Age
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-white"
              >
                Change
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-white"
              >
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {snapshotRecords?.map((e, i) => {
              const previousRecord = snapshotRecords[i + 1];
              const valueChange =
                (e.fixedValue ?? 0) - (previousRecord?.fixedValue ?? 0);
              return (
                <>
                  <tr
                    key={e.timestamp}
                    className={
                      "" +
                      (selectedSnapshotRecord?.timestamp === e.timestamp
                        ? " text-content-accent"
                        : "")
                    }
                  >
                    <td className={!!e.favorited ? "text-content-accent" : ""}>
                      <StarIcon
                        className="w-5 h-5 cursor-pointer"
                        onClick={() => {
                          updateRecord({
                            variables: {
                              input: {
                                favorited: !e.favorited,
                                timestamp: e.timestamp,
                                name: e.name,
                                league: stashViewSettings.league,
                              },
                            },
                            onCompleted() {
                              refetchSnapshotRecords();
                            },
                          });
                        }}
                      />
                    </td>
                    <td
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedSnapshotRecord(i === 0 ? null : e);
                      }}
                    >
                      {moment(e.timestamp).fromNow()}
                    </td>
                    <td>
                      {previousRecord ? (
                        <CurrencyValueDisplay
                          pValue={valueChange}
                          league={stashViewSettings.league}
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      <CurrencyValueDisplay
                        pValue={e.fixedValue ?? 0}
                        league={stashViewSettings.league}
                      />
                    </td>
                    <td>
                      <Link
                        href={`/poe/stash-view-compare?league=${
                          stashViewSettings.league
                        }&first=${e.timestamp}&second=${
                          selectedSnapshotRecord?.timestamp ??
                          snapshotRecords[0]?.timestamp
                        }`}
                        target="_blank"
                      >
                        Compare
                      </Link>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </StyledCard>
    </>
  );
}
