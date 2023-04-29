import StyledCard from "@components/library/styled-card";
import { useStashViewContext } from "@contexts/stash-view-context";
import {
  CheckCircleIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { nanoid } from "nanoid";
import { useState } from "react";

export function StashViewTabGroupsPanel() {
  const { stashViewSettings, setStashViewSettings } = useStashViewContext();

  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);

  return (
    <>
      <StyledCard>
        <div className="flex flex-col space-y-2">
          <div className="flex">
            Tab Groups
            <PlusCircleIcon
              className="w-6 h-6 absolute right-2"
              onClick={() => {
                const newGroupId = nanoid();
                setStashViewSettings({
                  ...stashViewSettings,
                  stashTabGroups: {
                    ...stashViewSettings.stashTabGroups,
                    [newGroupId]: {
                      name: `New Group ${
                        Object.values(stashViewSettings.stashTabGroups).length +
                        1
                      }`,
                      stashTabIds: [...stashViewSettings.checkedTabIds],
                    },
                  },
                });
                setEditingGroupId(newGroupId);
              }}
            />
          </div>

          {Object.entries(stashViewSettings.stashTabGroups).map(
            ([id, group]) => (
              <>
                <div className="flex">
                  {editingGroupId === id ? (
                    <>
                      <div>
                        <input
                          className="h-[24px] w-full bg-transparent border-l-2 border-0 p-1 focus:ring-0 ring-0"
                          type="text"
                          value={group.name}
                          onBlur={() => {
                            setEditingGroupId(null);
                          }}
                          onChange={(e) => {
                            setStashViewSettings({
                              ...stashViewSettings,
                              stashTabGroups: {
                                ...stashViewSettings.stashTabGroups,
                                [id]: { ...group, name: e.target.value },
                              },
                            });
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setStashViewSettings({
                            ...stashViewSettings,
                            checkedTabIds: group.stashTabIds,
                          });
                        }}
                      >
                        {group.name}
                      </div>
                    </>
                  )}
                  {editingGroupId === id ? (
                    <>
                      <CheckCircleIcon
                        className="w-6 h-6 absolute right-8"
                        onClick={() => {
                          setEditingGroupId(null);
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <PencilSquareIcon
                        className="w-6 h-6 absolute right-8"
                        onClick={() => {
                          setEditingGroupId(id);
                        }}
                      />
                    </>
                  )}

                  <TrashIcon
                    className="w-6 h-6 absolute right-2"
                    onClick={() => {
                      const cpy = { ...stashViewSettings.stashTabGroups };
                      delete cpy[id];

                      setStashViewSettings({
                        ...stashViewSettings,
                        stashTabGroups: cpy,
                      });
                    }}
                  />
                </div>
              </>
            )
          )}
        </div>
      </StyledCard>
    </>
  );
}
