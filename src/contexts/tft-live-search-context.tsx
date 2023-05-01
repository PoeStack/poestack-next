import { createContext, useContext, useEffect, useState } from "react";

export interface TftLiveSearchMessageEntry {
  messageId: string;
  userDiscordId: string;
  userDiscordName: string;
  userIgn: string;
  messageBody: string;
}

export interface TftLiveSearchSettings {
  messageHistoryOpen: boolean;
  messageHistory: TftLiveSearchMessageEntry[];
  disclaimerClosed: boolean;
}

const DEFAULT_SETTINGS: TftLiveSearchSettings = {
  messageHistoryOpen: false,
  messageHistory: [],
  disclaimerClosed: false,
};

const initalContext: {
  tftLiveSearchSettings: TftLiveSearchSettings;
  setTftLiveSearchSettings: (settings: TftLiveSearchSettings) => void;
} = {
  tftLiveSearchSettings: DEFAULT_SETTINGS,
  setTftLiveSearchSettings: () => {},
};

export const TftLiveSearchContext = createContext(initalContext);

export function TftLiveSearchContextProvider({
  tag,
  children,
}: {
  tag: string;
  children: any;
}) {
  const [tftLiveSearchSettings, setTftLiveSearchSettings] =
    useState<TftLiveSearchSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    setTftLiveSearchSettings({
      ...DEFAULT_SETTINGS,
      ...JSON.parse(
        localStorage.getItem(`tft_live_search_settings_${tag}`) ??
          JSON.stringify(DEFAULT_SETTINGS)
      ),
    });
  }, []);

  const value = {
    tftLiveSearchSettings: tftLiveSearchSettings,
    setTftLiveSearchSettings: (settings) => {
      localStorage.setItem(
        `tft_live_search_settings_${tag}`,
        JSON.stringify(settings)
      );
      setTftLiveSearchSettings(settings);
    },
  };
  return (
    <TftLiveSearchContext.Provider value={value}>
      {children}
    </TftLiveSearchContext.Provider>
  );
}

export const useTftLiveSearchCtx = () => useContext(TftLiveSearchContext);
