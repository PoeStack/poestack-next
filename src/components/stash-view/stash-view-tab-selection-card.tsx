import StyledCard from "@components/styled-card";
import { useStashViewContext } from "@contexts/stash-view-context";
import { PoeStashTab } from "@generated/graphql";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export function StashViewTabSelectionCard() {
  const {
    stashTabs,
    stashViewSettings,
    setStashViewSettings,
    refetchStashTabs,
  } = useStashViewContext();

  const typeToIconMap = {
    CurrencyStash:
      "https://web.poecdn.com/protected/image/layout/stash/currency-tab-icon.png?v=1680235310710&key=c4JmwvlEdlm1iitgRJ-LtQ",
    QuadStash:
      "https://web.poecdn.com/protected/image/layout/stash/quad-tab-icon.png?v=1680235310966&key=SO7Jf8d6g68rhHKJVt1Itw",
    MapStash:
      "https://web.poecdn.com/protected/image/layout/stash/map-tab-icon.png?v=1680235310894&key=jLp8L5BgKpzzyf8Jdu51Zg",
    EssenceStash:
      "https://web.poecdn.com/protected/image/layout/stash/essence-tab-icon.png?v=1680235310746&key=3sC1L24_-V0QEze0P8r_Dg",
    DivinationCardStash:
      "https://web.poecdn.com/protected/image/layout/stash/divination-tab-icon.png?v=1680235310746&key=FaLsxYtmuqBXkJebdF62_w",
    DelveStash:
      "https://web.poecdn.com/protected/image/layout/stash/delve-tab-icon.png?v=1680235310746&key=1eC3WO6hAEtNVN7wtLT6jA",
    FragmentStash:
      "https://web.poecdn.com/protected/image/layout/stash/fragment-tab-icon.png?v=1680235310830&key=NIXjytgKBeGX-0ed5uJWeA",
    PremiumStash:
      "https://web.poecdn.com/protected/image/layout/stash/premium-tab-icon.png?v=1680235310966&key=eFcoMl6FRQpBrNgSIvNgYQ",
    FlaskStash:
      "https://web.poecdn.com/protected/image/layout/stash/flask-tab-icon.png?v=1680235310814&key=-UDcfP_cV6F7uvzOxyD3rw",
    GemStash:
      "https://web.poecdn.com/protected/image/layout/stash/gem-tab-icon.png?v=1680235310878&key=KE0pPt-_F4uZcdNWL6ff4Q",
    UniqueStash:
      "https://web.poecdn.com/protected/image/layout/stash/unique-tab-icon.png?v=1680235310978&key=KfyehDD_rcdiAiNnCw7Qew",
    MetamorphStash:
      "https://web.poecdn.com/protected/image/layout/stash/metamorph-tab-icon.png?v=1680235310966&key=9fUlHmwXXM7dKdwFt_RvnQ",
    BlightStash:
      "https://web.poecdn.com/protected/image/layout/stash/blight-tab-icon.png?v=1680235310698&key=PL1k11by4nAQDMPTAnPZdA",
    DeliriumStash:
      "https://web.poecdn.com/protected/image/layout/stash/delirium-tab-icon.png?v=1680235310730&key=sIX1JMexEbOTIezUWYJqvg",
  };

  return (
    <>
      <StyledCard>
        <div className="flex flex-col space-y-1 max-h-[300px]">
          <div className="flex space-x-1">
            <div>
              <input
                type="checkbox"
                className="w-4 h-4 text-content-accent bg-gray-100 border-gray-300 rounded"
                checked={
                  stashViewSettings.checkedTabIds?.length === stashTabs?.length
                }
                onChange={(e) => {
                  if (
                    stashViewSettings.checkedTabIds?.length ===
                    stashTabs?.length
                  ) {
                    setStashViewSettings({
                      ...stashViewSettings,
                      checkedTabIds: [],
                    });
                  } else {
                    setStashViewSettings({
                      ...stashViewSettings,
                      checkedTabIds: stashTabs?.map((t) => t.id),
                    });
                  }
                }}
              />
            </div>
            <div className="flex-1">Stash Tabs</div>
            <div
              className="cursor-pointer"
              onClick={() => {
                refetchStashTabs?.();
              }}
            >
              <ArrowPathIcon className="w-6 h-6" />
            </div>
          </div>
          <div className="flex flex-col space-y-1  overflow-y-auto">
            {stashTabs?.map((tab) => (
              <>
                <div className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-content-accent bg-gray-100 border-gray-300 rounded"
                    checked={stashViewSettings.checkedTabIds.includes(tab.id)}
                    onChange={(e) => {
                      if (stashViewSettings.checkedTabIds.includes(tab.id)) {
                        setStashViewSettings({
                          ...stashViewSettings,
                          checkedTabIds: stashViewSettings.checkedTabIds.filter(
                            (e) => e !== tab.id
                          ),
                        });
                      } else {
                        setStashViewSettings({
                          ...stashViewSettings,
                          checkedTabIds: [
                            ...stashViewSettings.checkedTabIds,
                            tab.id,
                          ],
                        });
                      }
                    }}
                  />
                  <div
                    className={`${
                      stashViewSettings.selectedTabId === tab.id
                        ? "text-content-accent"
                        : "text-white"
                    } cursor-pointer flex-1`}
                    onClick={() => {
                      setStashViewSettings({
                        ...stashViewSettings,
                        selectedTabId: tab.id,
                      });
                    }}
                  >
                    {tab.name}
                  </div>
                  <div>
                    <img src={typeToIconMap[tab.type]} alt="" />
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </StyledCard>
    </>
  );
}
