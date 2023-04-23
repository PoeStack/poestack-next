/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: any;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type AtlasPassiveSnapshot = {
  __typename?: 'AtlasPassiveSnapshot';
  createdAtTimestamp: Scalars['DateTime'];
  hashes: Array<Scalars['Float']>;
  league: Scalars['String'];
  source: Scalars['String'];
  systemSnapshotTimestamp: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type AtlasPassiveSnapshotResponse = {
  __typename?: 'AtlasPassiveSnapshotResponse';
  results: Array<AtlasPassiveSnapshot>;
};

export type AtlasPassiveSnapshotSearch = {
  excludedHashes?: InputMaybe<Array<Scalars['String']>>;
  includedHashes?: InputMaybe<Array<Scalars['String']>>;
  league?: InputMaybe<Scalars['String']>;
  timestampEndInclusive?: InputMaybe<Scalars['DateTime']>;
};

export type CharacterPassivesSnapshot = {
  __typename?: 'CharacterPassivesSnapshot';
  banditChoice?: Maybe<Scalars['String']>;
  hashes: Array<Scalars['Float']>;
  hashesEx: Array<Scalars['Float']>;
  jewelData: Scalars['JSON'];
  masteryEffects: Scalars['JSON'];
  pantheonMajor?: Maybe<Scalars['String']>;
  pantheonMinor?: Maybe<Scalars['String']>;
};

export type CharacterSnapshot = {
  __typename?: 'CharacterSnapshot';
  characterClass: Scalars['String'];
  characterId: Scalars['String'];
  characterPassivesSnapshot?: Maybe<CharacterPassivesSnapshot>;
  characterSnapshotItems?: Maybe<Array<CharacterSnapshotItem>>;
  characterSnapshotPobStats?: Maybe<CharacterSnapshotPobStats>;
  current: Scalars['Boolean'];
  experience: Scalars['BigInt'];
  id: Scalars['String'];
  league: Scalars['String'];
  level: Scalars['Float'];
  mainSkillKey?: Maybe<Scalars['String']>;
  poeCharacter?: Maybe<PoeCharacter>;
  poeProfileName: Scalars['String'];
  timestamp: Scalars['String'];
  totalValueChaos?: Maybe<Scalars['Float']>;
  totalValueDivine?: Maybe<Scalars['Float']>;
  userId: Scalars['String'];
};

export type CharacterSnapshotItem = {
  __typename?: 'CharacterSnapshotItem';
  baseType?: Maybe<Scalars['String']>;
  corrupted?: Maybe<Scalars['Boolean']>;
  craftedMods?: Maybe<Array<Scalars['String']>>;
  crucible?: Maybe<Scalars['JSON']>;
  description?: Maybe<Scalars['String']>;
  enchantMods?: Maybe<Array<Scalars['String']>>;
  explicitMods?: Maybe<Array<Scalars['String']>>;
  flavourText: Array<Scalars['String']>;
  fracturedMods?: Maybe<Array<Scalars['String']>>;
  frameType: Scalars['Float'];
  gemColor?: Maybe<Scalars['String']>;
  h: Scalars['Float'];
  icon: Scalars['String'];
  ilvl: Scalars['Float'];
  implicitMods?: Maybe<Array<Scalars['String']>>;
  influences?: Maybe<Scalars['JSON']>;
  inventoryId?: Maybe<Scalars['String']>;
  itemGroupHashString?: Maybe<Scalars['String']>;
  itemId?: Maybe<Scalars['String']>;
  mainSkill?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  properties: Array<Scalars['JSON']>;
  requirements: Array<Scalars['JSON']>;
  socket?: Maybe<Scalars['Float']>;
  socketedInId?: Maybe<Scalars['String']>;
  sockets: Array<Scalars['JSON']>;
  support?: Maybe<Scalars['Boolean']>;
  typeLine?: Maybe<Scalars['String']>;
  utilityMods?: Maybe<Array<Scalars['String']>>;
  valueChaos?: Maybe<Scalars['Float']>;
  w: Scalars['Float'];
};

export type CharacterSnapshotPobStats = {
  __typename?: 'CharacterSnapshotPobStats';
  accuracy?: Maybe<Scalars['Float']>;
  armour?: Maybe<Scalars['Float']>;
  blockChance?: Maybe<Scalars['Float']>;
  chaosResist?: Maybe<Scalars['Float']>;
  coldResist?: Maybe<Scalars['Float']>;
  dex?: Maybe<Scalars['Float']>;
  energyShield?: Maybe<Scalars['Float']>;
  evasion?: Maybe<Scalars['Float']>;
  fireResist?: Maybe<Scalars['Float']>;
  int?: Maybe<Scalars['Float']>;
  life?: Maybe<Scalars['Float']>;
  lightningResist?: Maybe<Scalars['Float']>;
  mana?: Maybe<Scalars['Float']>;
  pobCode?: Maybe<Scalars['String']>;
  spellBlockChance?: Maybe<Scalars['Float']>;
  str?: Maybe<Scalars['Float']>;
  supression?: Maybe<Scalars['Float']>;
  totalDpsWithIgnite?: Maybe<Scalars['Float']>;
};

export type CharacterSnapshotRecord = {
  __typename?: 'CharacterSnapshotRecord';
  characterId: Scalars['String'];
  experience: Scalars['BigInt'];
  id: Scalars['String'];
  level: Scalars['Float'];
  timestamp: Scalars['DateTime'];
};

export type CharacterSnapshotSearch = {
  customLadderGroupId?: InputMaybe<Scalars['String']>;
  includedCharacterIds?: InputMaybe<Array<Scalars['String']>>;
  league?: InputMaybe<Scalars['String']>;
};

export type CharacterSnapshotSearchResponse = {
  __typename?: 'CharacterSnapshotSearchResponse';
  hasMore: Scalars['Boolean'];
  snapshots: Array<CharacterSnapshotSearchResponseEntry>;
};

export type CharacterSnapshotSearchResponseEntry = {
  __typename?: 'CharacterSnapshotSearchResponseEntry';
  characterClass: Scalars['String'];
  characterId: Scalars['String'];
  current: Scalars['Boolean'];
  energyShield?: Maybe<Scalars['Float']>;
  league: Scalars['String'];
  level: Scalars['Float'];
  life?: Maybe<Scalars['Float']>;
  mainSkillKey?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  pobDps?: Maybe<Scalars['Float']>;
  snapshotId?: Maybe<Scalars['String']>;
  topItems?: Maybe<Array<Scalars['JSON']>>;
  totalValueChaos?: Maybe<Scalars['Float']>;
  totalValueDivine?: Maybe<Scalars['Float']>;
  twitchProfileName?: Maybe<Scalars['String']>;
};

export type CustomLadderGroup = {
  __typename?: 'CustomLadderGroup';
  createdAtTimestamp: Scalars['DateTime'];
  id: Scalars['String'];
  members: Array<CustomLadderMember>;
  name: Scalars['String'];
  ownerUserId: Scalars['String'];
};

export type CustomLadderGroupInput = {
  id: Scalars['String'];
  members: Array<CustomLadderMemberInput>;
  name: Scalars['String'];
};

export type CustomLadderMember = {
  __typename?: 'CustomLadderMember';
  poeProfileName: Scalars['String'];
  userId: Scalars['String'];
};

export type CustomLadderMemberInput = {
  poeProfileName: Scalars['String'];
  userId: Scalars['String'];
};

export type DetachedStashSnapshotInput = {
  league: Scalars['String'];
  poeStashTabIds: Array<Scalars['String']>;
  userId: Scalars['String'];
  valuationStockInfluence: Scalars['String'];
  valuationTargetPValue: Scalars['String'];
};

export type GenericAggregation = {
  __typename?: 'GenericAggregation';
  values: Array<GenericIntKeyValue>;
};

export type GenericIntKeyValue = {
  __typename?: 'GenericIntKeyValue';
  key?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['DateTime']>;
  value?: Maybe<Scalars['Float']>;
};

export type GlobalSearch = {
  league: Scalars['String'];
  searchText: Scalars['String'];
};

export type GlobalSearchResponse = {
  __typename?: 'GlobalSearchResponse';
  results: Array<GlobalSearchResponseEntry>;
};

export type GlobalSearchResponseEntry = {
  __typename?: 'GlobalSearchResponseEntry';
  display: Scalars['String'];
  group: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
  target: Scalars['String'];
};

export type ItemGroup = {
  __typename?: 'ItemGroup';
  baseType?: Maybe<Scalars['String']>;
  createdAtTimestamp: Scalars['DateTime'];
  displayName?: Maybe<Scalars['String']>;
  hashString: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
  inventoryMaxStackSize?: Maybe<Scalars['Float']>;
  key: Scalars['String'];
  properties?: Maybe<Array<Scalars['JSONObject']>>;
  tag: Scalars['String'];
};

export type ItemGroupListing = {
  __typename?: 'ItemGroupListing';
  accountName: Scalars['String'];
  listedAtTimestamp: Scalars['DateTime'];
  listedValueChaos: Scalars['Float'];
  stackSize: Scalars['Float'];
};

export type ItemGroupSearchInput = {
  itemGroupHashKeys?: InputMaybe<Array<Scalars['String']>>;
  itemGroupHashStrings?: InputMaybe<Array<Scalars['String']>>;
  itemGroupHashTags?: InputMaybe<Array<Scalars['String']>>;
  league: Scalars['String'];
  limit?: InputMaybe<Scalars['Float']>;
  searchString?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Float']>;
  sortDirection?: InputMaybe<Scalars['Float']>;
};

export type ItemGroupValueTimeseries = {
  __typename?: 'ItemGroupValueTimeseries';
  itemGroup: ItemGroup;
  series: Array<ItemGroupValueTimeseriesGroupSeries>;
};

export type ItemGroupValueTimeseriesGroupEntry = {
  __typename?: 'ItemGroupValueTimeseriesGroupEntry';
  timestamp: Scalars['DateTime'];
  value: Scalars['Float'];
};

export type ItemGroupValueTimeseriesGroupSeries = {
  __typename?: 'ItemGroupValueTimeseriesGroupSeries';
  entries: Array<ItemGroupValueTimeseriesGroupEntry>;
  stockRangeStartInclusive: Scalars['Float'];
  type: Scalars['String'];
};

export type ItemGroupValueTimeseriesResult = {
  __typename?: 'ItemGroupValueTimeseriesResult';
  results: Array<ItemGroupValueTimeseries>;
};

export type ItemGroupValueTimeseriesSearchInput = {
  bucketType?: InputMaybe<Scalars['String']>;
  itemGroupSearch: ItemGroupSearchInput;
  seriesTypes: Array<Scalars['String']>;
  stockStartingRanges: Array<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteCustomLadderGroup: Scalars['Boolean'];
  deleteSnapshots: Scalars['Boolean'];
  deleteStashSnapshotProfile: Scalars['Boolean'];
  deleteTftOneClickMessage: Scalars['Boolean'];
  exchangeAuthCode: Scalars['String'];
  exportStashSnapshot: StashSnapshotExport;
  refreshPoeCharacters: Scalars['Boolean'];
  stashViewOneClickPost: Scalars['Boolean'];
  stashViewSnapshot: Scalars['String'];
  takeCharacterSnapshot: Scalars['Boolean'];
  takeDeatachedSnapshot: StashSnapshot;
  takeSnapshot: StashSnapshot;
  updateCustomLadderGroup: CustomLadderGroup;
  updateDiscordCode: Scalars['Boolean'];
  updateStashsnapshotProfile: Scalars['Boolean'];
};


export type MutationDeleteCustomLadderGroupArgs = {
  groupId: Scalars['String'];
};


export type MutationDeleteSnapshotsArgs = {
  stashSnapshotIds: Array<Scalars['String']>;
};


export type MutationDeleteStashSnapshotProfileArgs = {
  stashSnapshotProfileId: Scalars['String'];
};


export type MutationDeleteTftOneClickMessageArgs = {
  messageId: Scalars['String'];
};


export type MutationExchangeAuthCodeArgs = {
  authCode: Scalars['String'];
};


export type MutationExportStashSnapshotArgs = {
  input: StashSnapshotExportInput;
};


export type MutationStashViewOneClickPostArgs = {
  input: StashViewSettings;
};


export type MutationStashViewSnapshotArgs = {
  input: StashViewSnapshotInput;
};


export type MutationTakeCharacterSnapshotArgs = {
  characterId: Scalars['String'];
};


export type MutationTakeDeatachedSnapshotArgs = {
  input: DetachedStashSnapshotInput;
};


export type MutationTakeSnapshotArgs = {
  stashSnapshotProfileId: Scalars['String'];
};


export type MutationUpdateCustomLadderGroupArgs = {
  group: CustomLadderGroupInput;
};


export type MutationUpdateDiscordCodeArgs = {
  code: Scalars['String'];
};


export type MutationUpdateStashsnapshotProfileArgs = {
  update: StashSnapshotProfileInput;
};

export type OneClickMessageHistory = {
  __typename?: 'OneClickMessageHistory';
  channelId: Scalars['String'];
  exportSubType?: Maybe<Scalars['String']>;
  exportType: Scalars['String'];
  messageId: Scalars['String'];
  rateLimitExpires: Scalars['DateTime'];
  timestamp: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type PassiveTreeConnection = {
  __typename?: 'PassiveTreeConnection';
  curved: Scalars['Boolean'];
  fromNode: Scalars['String'];
  toNode: Scalars['String'];
};

export type PassiveTreeConstants = {
  __typename?: 'PassiveTreeConstants';
  maxX: Scalars['Float'];
  maxY: Scalars['Float'];
  minX: Scalars['Float'];
  minY: Scalars['Float'];
  orbitRadii: Array<Scalars['Float']>;
  skillsPerOrbit: Array<Scalars['Float']>;
};

export type PassiveTreeNode = {
  __typename?: 'PassiveTreeNode';
  activeEffectImage?: Maybe<Scalars['String']>;
  activeIcon?: Maybe<Scalars['String']>;
  ascendancyName?: Maybe<Scalars['String']>;
  flavourText: Array<Scalars['String']>;
  group: Scalars['Float'];
  hash: Scalars['String'];
  icon: Scalars['String'];
  in: Array<Scalars['String']>;
  inactiveIcon?: Maybe<Scalars['String']>;
  isJewelSocket?: Maybe<Scalars['Boolean']>;
  isKeystone?: Maybe<Scalars['Boolean']>;
  isMastery?: Maybe<Scalars['Boolean']>;
  isMultipleChoiceOption?: Maybe<Scalars['Boolean']>;
  isNotable?: Maybe<Scalars['Boolean']>;
  masteryEffects?: Maybe<Array<Scalars['JSON']>>;
  name: Scalars['String'];
  orbit: Scalars['Float'];
  orbitIndex: Scalars['Float'];
  out: Array<Scalars['String']>;
  recipe: Array<Scalars['String']>;
  reminderText: Array<Scalars['String']>;
  size: Scalars['Float'];
  stats: Array<Scalars['String']>;
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type PassiveTreeResponse = {
  __typename?: 'PassiveTreeResponse';
  allConnections?: Maybe<Array<PassiveTreeConnection>>;
  allNodes?: Maybe<Array<PassiveTreeNode>>;
  connectionMap: Scalars['JSON'];
  constants: PassiveTreeConstants;
  nodeMap: Scalars['JSON'];
};

export type PoeCharacter = {
  __typename?: 'PoeCharacter';
  createdAtTimestamp: Scalars['DateTime'];
  id: Scalars['String'];
  lastLeague: Scalars['String'];
  lastSnapshotTimestamp?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  userId: Scalars['String'];
};

export type PoeLeague = {
  __typename?: 'PoeLeague';
  description: Scalars['String'];
  id: Scalars['String'];
  realm: Scalars['String'];
  url: Scalars['String'];
};

export type PoeStashTab = {
  __typename?: 'PoeStashTab';
  flatIndex?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  index: Scalars['Float'];
  league: Scalars['String'];
  name: Scalars['String'];
  parent?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  userId: Scalars['String'];
};

export type PublicStashUpdateRecord = {
  __typename?: 'PublicStashUpdateRecord';
  createdAtTimestamp: Scalars['DateTime'];
  delisted: Scalars['Boolean'];
  lastPoeCharacterName?: Maybe<Scalars['String']>;
  league: Scalars['String'];
  poeProfileName: Scalars['String'];
  publicStashId: Scalars['String'];
  stashName?: Maybe<Scalars['String']>;
  stashType?: Maybe<Scalars['String']>;
  updatedAtTimestamp: Scalars['DateTime'];
};

export type PublicStashUpdateRecordResponse = {
  __typename?: 'PublicStashUpdateRecordResponse';
  results: Array<PublicStashUpdateRecord>;
};

export type PublicStashUpdateRecordSearch = {
  poeProfileNames: Array<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  atlasPassiveSnapshotsByUser: AtlasPassiveSnapshotResponse;
  atlasPassiveTreeSnapshotPopularityAggregation: GenericAggregation;
  atlasTree: PassiveTreeResponse;
  characterSnapshot: CharacterSnapshot;
  characterSnapshotRecords: Array<CharacterSnapshotRecord>;
  characterSnapshotsSearch: CharacterSnapshotSearchResponse;
  checkTftMembership: Scalars['Boolean'];
  customLadderGroup: CustomLadderGroup;
  customLadderGroupsByOwner: Array<CustomLadderGroup>;
  globalSearch: GlobalSearchResponse;
  itemGroupListings: Array<ItemGroupListing>;
  itemGroupTags: Array<Scalars['String']>;
  itemGroupValueChaos: Scalars['Float'];
  itemGroupValueTimeseriesSearch: ItemGroupValueTimeseriesResult;
  leagueActvityTimeseries: GenericAggregation;
  leagues: Array<PoeLeague>;
  myProfile: UserProfile;
  passiveTree: PassiveTreeResponse;
  poeCharacters: Array<PoeCharacter>;
  profileByPoeProfileName: UserProfile;
  publicStash?: Maybe<Scalars['JSON']>;
  publicStashUpdateRecords: PublicStashUpdateRecordResponse;
  stashSnapshot: StashSnapshot;
  stashSnapshotItemGroupSummaries: StashSnapshotItemGroupSummarySearchResponse;
  stashSnapshotItemGroupSummariesAggregation: StashSnapshotItemGroupSummarySearchAggregationResponse;
  stashSnapshotProfile: StashSnapshotProfile;
  stashSnapshotProfiles: Array<StashSnapshotProfile>;
  stashSnapshots: Array<StashSnapshot>;
  stashTabs: Array<PoeStashTab>;
  stashViewJobStat: StashViewJob;
  stashViewStashSummary: StashViewStashSummary;
  stashViewValueSnapshotSeries: Array<StashViewValueSnapshotSeries>;
  tftOneClickMessageHistory: Array<OneClickMessageHistory>;
};


export type QueryAtlasPassiveSnapshotsByUserArgs = {
  timestampEndInclusive?: InputMaybe<Scalars['DateTime']>;
  userId: Scalars['String'];
};


export type QueryAtlasPassiveTreeSnapshotPopularityAggregationArgs = {
  search: AtlasPassiveSnapshotSearch;
};


export type QueryAtlasTreeArgs = {
  passiveTreeVersion: Scalars['String'];
};


export type QueryCharacterSnapshotArgs = {
  snapshotId: Scalars['String'];
};


export type QueryCharacterSnapshotRecordsArgs = {
  characterId: Scalars['String'];
};


export type QueryCharacterSnapshotsSearchArgs = {
  search: CharacterSnapshotSearch;
};


export type QueryCheckTftMembershipArgs = {
  forcePull?: InputMaybe<Scalars['Boolean']>;
};


export type QueryCustomLadderGroupArgs = {
  groupId: Scalars['String'];
};


export type QueryCustomLadderGroupsByOwnerArgs = {
  ownerId: Scalars['String'];
};


export type QueryGlobalSearchArgs = {
  search: GlobalSearch;
};


export type QueryItemGroupListingsArgs = {
  hashString: Scalars['String'];
  league: Scalars['String'];
  minStock?: InputMaybe<Scalars['Float']>;
};


export type QueryItemGroupTagsArgs = {
  league: Scalars['String'];
};


export type QueryItemGroupValueChaosArgs = {
  key: Scalars['String'];
  league: Scalars['String'];
};


export type QueryItemGroupValueTimeseriesSearchArgs = {
  search: ItemGroupValueTimeseriesSearchInput;
};


export type QueryPassiveTreeArgs = {
  passiveTreeVersion: Scalars['String'];
};


export type QueryPoeCharactersArgs = {
  userId: Scalars['String'];
};


export type QueryProfileByPoeProfileNameArgs = {
  poeProfileName: Scalars['String'];
};


export type QueryPublicStashArgs = {
  id: Scalars['String'];
};


export type QueryPublicStashUpdateRecordsArgs = {
  search: PublicStashUpdateRecordSearch;
};


export type QueryStashSnapshotArgs = {
  stashSnapshotId: Scalars['String'];
  stashSnapshotProfileId: Scalars['String'];
};


export type QueryStashSnapshotItemGroupSummariesArgs = {
  search: StashSnapshotItemGroupSummarySearchInput;
};


export type QueryStashSnapshotItemGroupSummariesAggregationArgs = {
  aggregation: Scalars['String'];
  search: StashSnapshotItemGroupSummarySearchInput;
};


export type QueryStashSnapshotProfileArgs = {
  snapshotProfileId: Scalars['String'];
};


export type QueryStashSnapshotsArgs = {
  stashSnapshotProfileId: Scalars['String'];
};


export type QueryStashTabsArgs = {
  forcePull?: InputMaybe<Scalars['Boolean']>;
  league: Scalars['String'];
};


export type QueryStashViewJobStatArgs = {
  jobId: Scalars['String'];
};


export type QueryStashViewStashSummaryArgs = {
  search: StashViewStashSummarySearch;
};


export type QueryStashViewValueSnapshotSeriesArgs = {
  league: Scalars['String'];
};

export type StashLocation = {
  __typename?: 'StashLocation';
  flatIndex: Scalars['Float'];
  index: Scalars['Float'];
  name: Scalars['String'];
  quantity?: Maybe<Scalars['Float']>;
  tabId: Scalars['String'];
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type StashSnapshot = {
  __typename?: 'StashSnapshot';
  createdAtTimestamp: Scalars['DateTime'];
  divineChaosValue: Scalars['Float'];
  exaltChaosValue: Scalars['Float'];
  id: Scalars['String'];
  league: Scalars['String'];
  snapshotProfileId?: Maybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
  totalValueChaos: Scalars['Float'];
  userId: Scalars['String'];
};

export type StashSnapshotExport = {
  __typename?: 'StashSnapshotExport';
  createdAtTimestamp: Scalars['DateTime'];
  divineChaosValue: Scalars['Float'];
  exportRaw: Scalars['String'];
  id: Scalars['String'];
  input: StashSnapshotExportInputObject;
  itemGroupSummaries: Array<StashSnapshotItemGroupSummary>;
  totalValueChaos: Scalars['Float'];
  userId: Scalars['String'];
};

export type StashSnapshotExportInput = {
  absoluteMinValueChaos: Scalars['Float'];
  alwaysPriceInChaos: Scalars['Boolean'];
  exportSubType?: InputMaybe<Scalars['String']>;
  exportType: Scalars['String'];
  ign: Scalars['String'];
  itemGroupValueOverrides: Array<StashSnapshotExportItemValueOverrideInput>;
  league: Scalars['String'];
  listedValueMultiplier: Scalars['Float'];
  maxStackSizeSetting: Scalars['String'];
  oneClickPost: Scalars['Boolean'];
  search: StashSnapshotItemGroupSummarySearchInput;
  stashIndexOffset: Scalars['Float'];
  visualDecimalPrecision: Scalars['Float'];
};

export type StashSnapshotExportInputObject = {
  __typename?: 'StashSnapshotExportInputObject';
  absoluteMinValueChaos: Scalars['Float'];
  alwaysPriceInChaos: Scalars['Boolean'];
  exportSubType?: Maybe<Scalars['String']>;
  exportType: Scalars['String'];
  ign: Scalars['String'];
  itemGroupValueOverrides: Array<StashSnapshotExportItemValueOverride>;
  league: Scalars['String'];
  listedValueMultiplier: Scalars['Float'];
  maxStackSizeSetting: Scalars['String'];
  oneClickPost: Scalars['Boolean'];
  search: StashSnapshotItemGroupSummarySearch;
  stashIndexOffset: Scalars['Float'];
  visualDecimalPrecision: Scalars['Float'];
};

export type StashSnapshotExportItemValueOverride = {
  __typename?: 'StashSnapshotExportItemValueOverride';
  itemGroupHashString: Scalars['String'];
  valueChaos: Scalars['Float'];
};

export type StashSnapshotExportItemValueOverrideInput = {
  itemGroupHashString: Scalars['String'];
  valueChaos: Scalars['Float'];
};

export type StashSnapshotItemGroupSearchSummaryAggregationEntry = {
  __typename?: 'StashSnapshotItemGroupSearchSummaryAggregationEntry';
  key: Scalars['String'];
  matches?: Maybe<Scalars['BigInt']>;
  value: Scalars['Float'];
};

export type StashSnapshotItemGroupSummary = {
  __typename?: 'StashSnapshotItemGroupSummary';
  createdAtTimestamp: Scalars['DateTime'];
  itemGroup?: Maybe<ItemGroup>;
  itemGroupHashString: Scalars['String'];
  league: Scalars['String'];
  quantity: Scalars['Float'];
  stashLocations: Array<StashLocation>;
  stashSnapshot?: Maybe<StashSnapshot>;
  stashSnapshotId: Scalars['String'];
  totalValueChaos: Scalars['Float'];
  userId: Scalars['String'];
  valueChaos: Scalars['Float'];
};

export type StashSnapshotItemGroupSummarySearch = {
  __typename?: 'StashSnapshotItemGroupSummarySearch';
  excludedItemGroupHashStrings?: Maybe<Array<Scalars['String']>>;
  keys?: Maybe<Array<Scalars['String']>>;
  limit?: Maybe<Scalars['Float']>;
  minTotalValueChaos?: Maybe<Scalars['Float']>;
  minValueChaos?: Maybe<Scalars['Float']>;
  searchstring?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Float']>;
  snapshotId?: Maybe<Scalars['String']>;
  sortDirection?: Maybe<Scalars['String']>;
  sortKey?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type StashSnapshotItemGroupSummarySearchAggregationResponse = {
  __typename?: 'StashSnapshotItemGroupSummarySearchAggregationResponse';
  entries: Array<StashSnapshotItemGroupSearchSummaryAggregationEntry>;
};

export type StashSnapshotItemGroupSummarySearchInput = {
  excludedItemGroupHashStrings?: InputMaybe<Array<Scalars['String']>>;
  keys?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Float']>;
  minTotalValueChaos?: InputMaybe<Scalars['Float']>;
  minValueChaos?: InputMaybe<Scalars['Float']>;
  searchstring?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Float']>;
  snapshotId?: InputMaybe<Scalars['String']>;
  sortDirection?: InputMaybe<Scalars['String']>;
  sortKey?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type StashSnapshotItemGroupSummarySearchResponse = {
  __typename?: 'StashSnapshotItemGroupSummarySearchResponse';
  hasMore: Scalars['Boolean'];
  itemGroupSummaries: Array<StashSnapshotItemGroupSummary>;
  totalValueChaos: Scalars['Float'];
};

export type StashSnapshotProfile = {
  __typename?: 'StashSnapshotProfile';
  automaticSnapshotIntervalSeconds?: Maybe<Scalars['Float']>;
  createdAtTimestamp: Scalars['DateTime'];
  id: Scalars['String'];
  league: Scalars['String'];
  name: Scalars['String'];
  poeStashTabIds: Array<Scalars['String']>;
  public: Scalars['Boolean'];
  userId: Scalars['String'];
  valuationStockInfluence: Scalars['String'];
  valuationTargetPValue: Scalars['String'];
};

export type StashSnapshotProfileInput = {
  automaticSnapshotIntervalSeconds?: InputMaybe<Scalars['Float']>;
  id: Scalars['String'];
  league: Scalars['String'];
  name: Scalars['String'];
  poeStashTabIds: Array<Scalars['String']>;
  public: Scalars['Boolean'];
  valuationStockInfluence: Scalars['String'];
  valuationTargetPValue: Scalars['String'];
};

export type StashViewItemSummary = {
  __typename?: 'StashViewItemSummary';
  icon?: Maybe<Scalars['String']>;
  itemGroup?: Maybe<ItemGroup>;
  itemGroupHashString?: Maybe<Scalars['String']>;
  itemGroupTag?: Maybe<Scalars['String']>;
  itemId: Scalars['String'];
  league: Scalars['String'];
  quantity: Scalars['Float'];
  searchableString: Scalars['String'];
  stashId: Scalars['String'];
  totalValueChaos?: Maybe<Scalars['Float']>;
  userId: Scalars['String'];
  valueChaos?: Maybe<Scalars['Float']>;
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type StashViewJob = {
  __typename?: 'StashViewJob';
  id: Scalars['String'];
  status: Scalars['String'];
  timestamp: Scalars['DateTime'];
  totalStahes: Scalars['Float'];
  userId: Scalars['String'];
};

export type StashViewSettings = {
  chaosToDivRate: Scalars['Float'];
  checkedTabIds: Array<Scalars['String']>;
  checkedTags?: InputMaybe<Array<Scalars['String']>>;
  exporterListedValueMultipler: Scalars['Float'];
  filterCheckedTabs: Scalars['Boolean'];
  ign?: InputMaybe<Scalars['String']>;
  itemGroupValueOverrides: Scalars['JSONObject'];
  league: Scalars['String'];
  searchString?: InputMaybe<Scalars['String']>;
  selectedExporter: Scalars['String'];
  selectedTabId?: InputMaybe<Scalars['String']>;
  tftSelectedCategory?: InputMaybe<Scalars['String']>;
  tftSelectedSubCategory?: InputMaybe<Scalars['String']>;
  valueOverridesEnabled: Scalars['Boolean'];
};

export type StashViewSnapshotInput = {
  league: Scalars['String'];
  stashIds: Array<Scalars['String']>;
};

export type StashViewStashSummary = {
  __typename?: 'StashViewStashSummary';
  itemGroups: Array<ItemGroup>;
  items: Array<StashViewItemSummary>;
};

export type StashViewStashSummarySearch = {
  execludeNonItemGroups?: InputMaybe<Scalars['Boolean']>;
  league: Scalars['String'];
  opaqueKey?: InputMaybe<Scalars['String']>;
};

export type StashViewValueSnapshotSeries = {
  __typename?: 'StashViewValueSnapshotSeries';
  stashId: Scalars['String'];
  timestamps: Array<Scalars['DateTime']>;
  values: Array<Scalars['Float']>;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  createdAtTimestamp?: Maybe<Scalars['DateTime']>;
  discordUserId?: Maybe<Scalars['String']>;
  lastConnectedTimestamp?: Maybe<Scalars['DateTime']>;
  oAuthTokenUpdatedAtTimestamp?: Maybe<Scalars['DateTime']>;
  poeProfileName: Scalars['String'];
  userId: Scalars['String'];
};

export type BulkModalExportStashSnapshotMutationVariables = Exact<{
  input: StashSnapshotExportInput;
}>;


export type BulkModalExportStashSnapshotMutation = { __typename?: 'Mutation', exportStashSnapshot: { __typename?: 'StashSnapshotExport', id: string, userId: string, createdAtTimestamp: any, totalValueChaos: number, divineChaosValue: number, exportRaw: string } };

export type BulkModalExportStashSnapshotToClipBoardMutationVariables = Exact<{
  input: StashSnapshotExportInput;
}>;


export type BulkModalExportStashSnapshotToClipBoardMutation = { __typename?: 'Mutation', exportStashSnapshot: { __typename?: 'StashSnapshotExport', id: string, userId: string, createdAtTimestamp: any, totalValueChaos: number, divineChaosValue: number, exportRaw: string } };

export type CurrenyValuePullDivAndExQueryVariables = Exact<{
  key: Scalars['String'];
  key2: Scalars['String'];
  league: Scalars['String'];
}>;


export type CurrenyValuePullDivAndExQuery = { __typename?: 'Query', div: number, ex: number };

export type FilterableItemTableStashSnapshotItemGroupSummariesQueryVariables = Exact<{
  search: StashSnapshotItemGroupSummarySearchInput;
}>;


export type FilterableItemTableStashSnapshotItemGroupSummariesQuery = { __typename?: 'Query', stashSnapshotItemGroupSummaries: { __typename?: 'StashSnapshotItemGroupSummarySearchResponse', hasMore: boolean, totalValueChaos: number, itemGroupSummaries: Array<{ __typename?: 'StashSnapshotItemGroupSummary', userId: string, stashSnapshotId: string, createdAtTimestamp: any, itemGroupHashString: string, quantity: number, valueChaos: number, totalValueChaos: number, itemGroup?: { __typename?: 'ItemGroup', hashString: string, key: string, tag: string, baseType?: string | null, icon?: string | null, inventoryMaxStackSize?: number | null, displayName?: string | null } | null }> } };

export type FilterableTimeTableTimeseriesSearchQueryVariables = Exact<{
  search: ItemGroupValueTimeseriesSearchInput;
}>;


export type FilterableTimeTableTimeseriesSearchQuery = { __typename?: 'Query', itemGroupValueTimeseriesSearch: { __typename?: 'ItemGroupValueTimeseriesResult', results: Array<{ __typename?: 'ItemGroupValueTimeseries', series: Array<{ __typename?: 'ItemGroupValueTimeseriesGroupSeries', type: string, entries: Array<{ __typename?: 'ItemGroupValueTimeseriesGroupEntry', timestamp: any, value: number }> }>, itemGroup: { __typename?: 'ItemGroup', hashString: string } }> } };

export type GetAllItemGroupTagsQueryVariables = Exact<{
  league: Scalars['String'];
}>;


export type GetAllItemGroupTagsQuery = { __typename?: 'Query', itemGroupTags: Array<string> };

export type GlobalSearchQueryVariables = Exact<{
  search: GlobalSearch;
}>;


export type GlobalSearchQuery = { __typename?: 'Query', globalSearch: { __typename?: 'GlobalSearchResponse', results: Array<{ __typename?: 'GlobalSearchResponseEntry', group: string, display: string, target: string, icon?: string | null }> } };

export type DeleteSnapshotsMutationVariables = Exact<{
  stashSnapshotIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteSnapshotsMutation = { __typename?: 'Mutation', deleteSnapshots: boolean };

export type StashViewOneClickPostMutationVariables = Exact<{
  input: StashViewSettings;
}>;


export type StashViewOneClickPostMutation = { __typename?: 'Mutation', stashViewOneClickPost: boolean };

export type ItemGroupListingsQueryVariables = Exact<{
  hashString: Scalars['String'];
  league: Scalars['String'];
}>;


export type ItemGroupListingsQuery = { __typename?: 'Query', itemGroupListings: Array<{ __typename?: 'ItemGroupListing', accountName: string, listedAtTimestamp: any, stackSize: number, listedValueChaos: number }> };

export type TakeStashViewSanpshotMutationVariables = Exact<{
  input: StashViewSnapshotInput;
}>;


export type TakeStashViewSanpshotMutation = { __typename?: 'Mutation', stashViewSnapshot: string };

export type StashViewJobStatQueryVariables = Exact<{
  jobId: Scalars['String'];
}>;


export type StashViewJobStatQuery = { __typename?: 'Query', stashViewJobStat: { __typename?: 'StashViewJob', id: string, userId: string, status: string, totalStahes: number, timestamp: any } };

export type TftOneClickMessageHistoryQueryVariables = Exact<{ [key: string]: never; }>;


export type TftOneClickMessageHistoryQuery = { __typename?: 'Query', tftOneClickMessageHistory: Array<{ __typename?: 'OneClickMessageHistory', messageId: string, channelId: string, userId: string, timestamp: any, exportType: string, exportSubType?: string | null, rateLimitExpires: any }> };

export type DeleteTftOneClickMessageMutationVariables = Exact<{
  messageId: Scalars['String'];
}>;


export type DeleteTftOneClickMessageMutation = { __typename?: 'Mutation', deleteTftOneClickMessage: boolean };

export type PassiveAtlasTreeQueryVariables = Exact<{
  passiveTreeVersion: Scalars['String'];
}>;


export type PassiveAtlasTreeQuery = { __typename?: 'Query', atlasTree: { __typename?: 'PassiveTreeResponse', nodeMap: any, connectionMap: any, constants: { __typename?: 'PassiveTreeConstants', minX: number, minY: number, maxX: number, maxY: number, skillsPerOrbit: Array<number>, orbitRadii: Array<number> } } };

export type PassiveTreeQueryVariables = Exact<{
  passiveTreeVersion: Scalars['String'];
}>;


export type PassiveTreeQuery = { __typename?: 'Query', passiveTree: { __typename?: 'PassiveTreeResponse', nodeMap: any, connectionMap: any, constants: { __typename?: 'PassiveTreeConstants', minX: number, minY: number, maxX: number, maxY: number, skillsPerOrbit: Array<number>, orbitRadii: Array<number> } } };

export type StashSnapshotItemGroupSummariesAggregationQueryVariables = Exact<{
  search: StashSnapshotItemGroupSummarySearchInput;
  aggregation: Scalars['String'];
}>;


export type StashSnapshotItemGroupSummariesAggregationQuery = { __typename?: 'Query', stashSnapshotItemGroupSummariesAggregation: { __typename?: 'StashSnapshotItemGroupSummarySearchAggregationResponse', entries: Array<{ __typename?: 'StashSnapshotItemGroupSearchSummaryAggregationEntry', key: string, value: number, matches?: any | null }> } };

export type ExchangeAuthCodeMutationVariables = Exact<{
  authCode: Scalars['String'];
}>;


export type ExchangeAuthCodeMutation = { __typename?: 'Mutation', exchangeAuthCode: string };

export type MyProfileQueryVariables = Exact<{
  forcePull?: InputMaybe<Scalars['Boolean']>;
}>;


export type MyProfileQuery = { __typename?: 'Query', checkTftMembership: boolean, myProfile: { __typename?: 'UserProfile', userId: string, poeProfileName: string, createdAtTimestamp?: any | null, lastConnectedTimestamp?: any | null, oAuthTokenUpdatedAtTimestamp?: any | null, discordUserId?: string | null } };

export type ExportStashSnapshotMutationVariables = Exact<{
  input: StashSnapshotExportInput;
}>;


export type ExportStashSnapshotMutation = { __typename?: 'Mutation', exportStashSnapshot: { __typename?: 'StashSnapshotExport', totalValueChaos: number, divineChaosValue: number, itemGroupSummaries: Array<{ __typename?: 'StashSnapshotItemGroupSummary', quantity: number, valueChaos: number, itemGroup?: { __typename?: 'ItemGroup', displayName?: string | null, key: string, icon?: string | null } | null }> } };

export type StashExportSearchSummaryQueryVariables = Exact<{
  search: StashViewStashSummarySearch;
}>;


export type StashExportSearchSummaryQuery = { __typename?: 'Query', stashViewStashSummary: { __typename?: 'StashViewStashSummary', itemGroups: Array<{ __typename?: 'ItemGroup', hashString: string, key: string, tag: string, properties?: Array<any> | null, baseType?: string | null, icon?: string | null, inventoryMaxStackSize?: number | null, displayName?: string | null, createdAtTimestamp: any }>, items: Array<{ __typename?: 'StashViewItemSummary', itemId: string, userId: string, league: string, stashId: string, x: number, y: number, quantity: number, searchableString: string, itemGroupHashString?: string | null, itemGroupTag?: string | null, valueChaos?: number | null, totalValueChaos?: number | null, icon?: string | null }> } };

export type UpdateDiscordCodeMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type UpdateDiscordCodeMutation = { __typename?: 'Mutation', updateDiscordCode: boolean };

export type AtlasPassiveTreeSnapshotPopularityAggregationQueryVariables = Exact<{
  search: AtlasPassiveSnapshotSearch;
}>;


export type AtlasPassiveTreeSnapshotPopularityAggregationQuery = { __typename?: 'Query', atlasPassiveTreeSnapshotPopularityAggregation: { __typename?: 'GenericAggregation', values: Array<{ __typename?: 'GenericIntKeyValue', key?: string | null, value?: number | null }> } };

export type AtlasTreeQueryVariables = Exact<{
  passiveTreeVersion: Scalars['String'];
}>;


export type AtlasTreeQuery = { __typename?: 'Query', atlasTree: { __typename?: 'PassiveTreeResponse', nodeMap: any } };

export type SingleCharacterCharacterSnapshotsSearchQueryVariables = Exact<{
  snapshotId: Scalars['String'];
}>;


export type SingleCharacterCharacterSnapshotsSearchQuery = { __typename?: 'Query', characterSnapshot: { __typename?: 'CharacterSnapshot', id: string, characterId: string, timestamp: string, characterClass: string, league: string, experience: any, level: number, mainSkillKey?: string | null, current: boolean, poeCharacter?: { __typename?: 'PoeCharacter', id: string, userId: string, name: string, createdAtTimestamp: any, lastSnapshotTimestamp?: any | null } | null, characterPassivesSnapshot?: { __typename?: 'CharacterPassivesSnapshot', banditChoice?: string | null, pantheonMajor?: string | null, pantheonMinor?: string | null, hashes: Array<number>, hashesEx: Array<number>, jewelData: any, masteryEffects: any } | null, characterSnapshotItems?: Array<{ __typename?: 'CharacterSnapshotItem', itemId?: string | null, inventoryId?: string | null, socketedInId?: string | null, baseType?: string | null, typeLine?: string | null, name?: string | null, ilvl: number, explicitMods?: Array<string> | null, utilityMods?: Array<string> | null, properties: Array<any>, requirements: Array<any>, sockets: Array<any>, frameType: number, description?: string | null, icon: string, w: number, h: number, crucible?: any | null, corrupted?: boolean | null, support?: boolean | null, socket?: number | null, gemColor?: string | null, mainSkill?: boolean | null, itemGroupHashString?: string | null, craftedMods?: Array<string> | null, implicitMods?: Array<string> | null, fracturedMods?: Array<string> | null, enchantMods?: Array<string> | null, valueChaos?: number | null }> | null, characterSnapshotPobStats?: { __typename?: 'CharacterSnapshotPobStats', accuracy?: number | null, armour?: number | null, blockChance?: number | null, spellBlockChance?: number | null, chaosResist?: number | null, coldResist?: number | null, dex?: number | null, energyShield?: number | null, fireResist?: number | null, int?: number | null, life?: number | null, lightningResist?: number | null, mana?: number | null, str?: number | null, evasion?: number | null, supression?: number | null, totalDpsWithIgnite?: number | null, pobCode?: string | null } | null } };

export type CharacterSnapshotRecordsQueryVariables = Exact<{
  characterId: Scalars['String'];
}>;


export type CharacterSnapshotRecordsQuery = { __typename?: 'Query', characterSnapshotRecords: Array<{ __typename?: 'CharacterSnapshotRecord', id: string, characterId: string, timestamp: any, experience: any, level: number }> };

export type CharacterTakeCharacterSnapshotMutationVariables = Exact<{
  characterId: Scalars['String'];
}>;


export type CharacterTakeCharacterSnapshotMutation = { __typename?: 'Mutation', takeCharacterSnapshot: boolean };

export type CustomLadderGroupQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type CustomLadderGroupQuery = { __typename?: 'Query', customLadderGroup: { __typename?: 'CustomLadderGroup', id: string, name: string, ownerUserId: string, createdAtTimestamp: any, members: Array<{ __typename?: 'CustomLadderMember', poeProfileName: string, userId: string }> } };

export type CharactersPoeCharactersQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type CharactersPoeCharactersQuery = { __typename?: 'Query', poeCharacters: Array<{ __typename?: 'PoeCharacter', id: string, userId: string, name: string, lastLeague: string, createdAtTimestamp: any, lastSnapshotTimestamp?: any | null }> };

export type PullCharacterSnapshotsQueryQueryVariables = Exact<{
  search: CharacterSnapshotSearch;
}>;


export type PullCharacterSnapshotsQueryQuery = { __typename?: 'Query', characterSnapshotsSearch: { __typename?: 'CharacterSnapshotSearchResponse', snapshots: Array<{ __typename?: 'CharacterSnapshotSearchResponseEntry', name: string, level: number, characterClass: string, mainSkillKey?: string | null, characterId: string, snapshotId?: string | null, league: string, totalValueDivine?: number | null }> } };

export type AtlasPassiveSnapshotsByUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type AtlasPassiveSnapshotsByUserQuery = { __typename?: 'Query', atlasPassiveSnapshotsByUser: { __typename?: 'AtlasPassiveSnapshotResponse', results: Array<{ __typename?: 'AtlasPassiveSnapshot', league: string, userId: string, systemSnapshotTimestamp: any, createdAtTimestamp: any, hashes: Array<number>, source: string }> } };

export type RefreshPoeCharactersMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshPoeCharactersMutation = { __typename?: 'Mutation', refreshPoeCharacters: boolean };

export type ViewGroupsCustomLadderGroupsByOwnerQueryVariables = Exact<{
  ownerId: Scalars['String'];
}>;


export type ViewGroupsCustomLadderGroupsByOwnerQuery = { __typename?: 'Query', customLadderGroupsByOwner: Array<{ __typename?: 'CustomLadderGroup', id: string, ownerUserId: string, name: string, createdAtTimestamp: any, members: Array<{ __typename?: 'CustomLadderMember', userId: string, poeProfileName: string }> }> };

export type DeleteCustomLadderGroupMutationVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type DeleteCustomLadderGroupMutation = { __typename?: 'Mutation', deleteCustomLadderGroup: boolean };

export type ProfileByPeoProfileNameQueryVariables = Exact<{
  poeProfileName: Scalars['String'];
}>;


export type ProfileByPeoProfileNameQuery = { __typename?: 'Query', profileByPoeProfileName: { __typename?: 'UserProfile', userId: string, poeProfileName: string } };

export type MutationMutationVariables = Exact<{
  group: CustomLadderGroupInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', updateCustomLadderGroup: { __typename?: 'CustomLadderGroup', id: string, ownerUserId: string, name: string, createdAtTimestamp: any, members: Array<{ __typename?: 'CustomLadderMember', userId: string, poeProfileName: string }> } };

export type EconSearch1QueryVariables = Exact<{
  search: ItemGroupValueTimeseriesSearchInput;
}>;


export type EconSearch1Query = { __typename?: 'Query', itemGroupValueTimeseriesSearch: { __typename?: 'ItemGroupValueTimeseriesResult', results: Array<{ __typename?: 'ItemGroupValueTimeseries', series: Array<{ __typename?: 'ItemGroupValueTimeseriesGroupSeries', type: string, entries: Array<{ __typename?: 'ItemGroupValueTimeseriesGroupEntry', timestamp: any, value: number }> }>, itemGroup: { __typename?: 'ItemGroup', icon?: string | null, displayName?: string | null, key: string, hashString: string } }> } };

export type EntriesQueryVariables = Exact<{
  search: ItemGroupValueTimeseriesSearchInput;
}>;


export type EntriesQuery = { __typename?: 'Query', itemGroupValueTimeseriesSearch: { __typename?: 'ItemGroupValueTimeseriesResult', results: Array<{ __typename?: 'ItemGroupValueTimeseries', series: Array<{ __typename?: 'ItemGroupValueTimeseriesGroupSeries', type: string, entries: Array<{ __typename?: 'ItemGroupValueTimeseriesGroupEntry', timestamp: any, value: number }> }>, itemGroup: { __typename?: 'ItemGroup', icon?: string | null, displayName?: string | null, key: string, hashString: string, properties?: Array<any> | null } }> } };

export type EconOneItemGroupSearchQueryVariables = Exact<{
  search: ItemGroupValueTimeseriesSearchInput;
}>;


export type EconOneItemGroupSearchQuery = { __typename?: 'Query', itemGroupValueTimeseriesSearch: { __typename?: 'ItemGroupValueTimeseriesResult', results: Array<{ __typename?: 'ItemGroupValueTimeseries', series: Array<{ __typename?: 'ItemGroupValueTimeseriesGroupSeries', stockRangeStartInclusive: number, type: string, entries: Array<{ __typename?: 'ItemGroupValueTimeseriesGroupEntry', timestamp: any, value: number }> }>, itemGroup: { __typename?: 'ItemGroup', hashString: string, displayName?: string | null, key: string, tag: string, properties?: Array<any> | null } }> } };

export type LeagueActvityTimeseriesQueryVariables = Exact<{ [key: string]: never; }>;


export type LeagueActvityTimeseriesQuery = { __typename?: 'Query', leagueActvityTimeseries: { __typename?: 'GenericAggregation', values: Array<{ __typename?: 'GenericIntKeyValue', timestamp?: any | null, key?: string | null, value?: number | null }> } };

export type StashTabsQueryVariables = Exact<{
  league: Scalars['String'];
  forcePull?: InputMaybe<Scalars['Boolean']>;
}>;


export type StashTabsQuery = { __typename?: 'Query', stashTabs: Array<{ __typename?: 'PoeStashTab', id: string, userId: string, league: string, parent?: string | null, name: string, type: string, index: number, flatIndex?: number | null }> };

export type StashViewValueSnapshotSeriesQueryVariables = Exact<{
  league: Scalars['String'];
}>;


export type StashViewValueSnapshotSeriesQuery = { __typename?: 'Query', stashViewValueSnapshotSeries: Array<{ __typename?: 'StashViewValueSnapshotSeries', stashId: string, values: Array<number>, timestamps: Array<any> }> };

export type CurrenyValuePullDivQueryVariables = Exact<{
  key: Scalars['String'];
  league: Scalars['String'];
}>;


export type CurrenyValuePullDivQuery = { __typename?: 'Query', div: number };

export type StashSnapshotProfilesQueryVariables = Exact<{ [key: string]: never; }>;


export type StashSnapshotProfilesQuery = { __typename?: 'Query', stashSnapshotProfiles: Array<{ __typename?: 'StashSnapshotProfile', id: string, userId: string, league: string, name: string, public: boolean, poeStashTabIds: Array<string>, valuationTargetPValue: string, valuationStockInfluence: string }> };

export type DeleteStashSnapshotProfileMutationVariables = Exact<{
  stashSnapshotProfileId: Scalars['String'];
}>;


export type DeleteStashSnapshotProfileMutation = { __typename?: 'Mutation', deleteStashSnapshotProfile: boolean };

export type StashSnapshotProfileQueryVariables = Exact<{
  snapshotProfileId: Scalars['String'];
}>;


export type StashSnapshotProfileQuery = { __typename?: 'Query', stashSnapshotProfile: { __typename?: 'StashSnapshotProfile', id: string, userId: string, league: string, name: string, public: boolean, createdAtTimestamp: any, poeStashTabIds: Array<string>, valuationTargetPValue: string, valuationStockInfluence: string, automaticSnapshotIntervalSeconds?: number | null } };

export type StashSnapshotsQueryVariables = Exact<{
  stashSnapshotProfileId: Scalars['String'];
}>;


export type StashSnapshotsQuery = { __typename?: 'Query', stashSnapshots: Array<{ __typename?: 'StashSnapshot', id: string, league: string, userId: string, snapshotProfileId?: string | null, createdAtTimestamp: any, tags: Array<string>, totalValueChaos: number, divineChaosValue: number, exaltChaosValue: number }> };

export type TakeSnapshotMutationVariables = Exact<{
  stashSnapshotProfileId: Scalars['String'];
}>;


export type TakeSnapshotMutation = { __typename?: 'Mutation', takeSnapshot: { __typename?: 'StashSnapshot', id: string } };

export type StashSnapshotProfilesViewProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type StashSnapshotProfilesViewProfileQuery = { __typename?: 'Query', stashSnapshotProfiles: Array<{ __typename?: 'StashSnapshotProfile', id: string, league: string, name: string, public: boolean, poeStashTabIds: Array<string>, valuationTargetPValue: string, valuationStockInfluence: string, automaticSnapshotIntervalSeconds?: number | null }> };

export type UpdateStashsnapshotProfileMutationVariables = Exact<{
  update: StashSnapshotProfileInput;
}>;


export type UpdateStashsnapshotProfileMutation = { __typename?: 'Mutation', updateStashsnapshotProfile: boolean };

export type TakeDeatachedSnapshotMutationVariables = Exact<{
  input: DetachedStashSnapshotInput;
}>;


export type TakeDeatachedSnapshotMutation = { __typename?: 'Mutation', takeDeatachedSnapshot: { __typename?: 'StashSnapshot', id: string, league: string, userId: string, snapshotProfileId?: string | null, createdAtTimestamp: any, tags: Array<string>, totalValueChaos: number, exaltChaosValue: number, divineChaosValue: number } };


export const BulkModalExportStashSnapshotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BulkModalExportStashSnapshot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StashSnapshotExportInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exportStashSnapshot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalValueChaos"}},{"kind":"Field","name":{"kind":"Name","value":"divineChaosValue"}},{"kind":"Field","name":{"kind":"Name","value":"exportRaw"}}]}}]}}]} as unknown as DocumentNode<BulkModalExportStashSnapshotMutation, BulkModalExportStashSnapshotMutationVariables>;
export const BulkModalExportStashSnapshotToClipBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BulkModalExportStashSnapshotToClipBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StashSnapshotExportInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exportStashSnapshot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"totalValueChaos"}},{"kind":"Field","name":{"kind":"Name","value":"divineChaosValue"}},{"kind":"Field","name":{"kind":"Name","value":"exportRaw"}}]}}]}}]} as unknown as DocumentNode<BulkModalExportStashSnapshotToClipBoardMutation, BulkModalExportStashSnapshotToClipBoardMutationVariables>;
export const CurrenyValuePullDivAndExDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrenyValuePullDivAndEx"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key2"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"league"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"div"},"name":{"kind":"Name","value":"itemGroupValueChaos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}},{"kind":"Argument","name":{"kind":"Name","value":"league"},"value":{"kind":"Variable","name":{"kind":"Name","value":"league"}}}]},{"kind":"Field","alias":{"kind":"Name","value":"ex"},"name":{"kind":"Name","value":"itemGroupValueChaos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key2"}}},{"kind":"Argument","name":{"kind":"Name","value":"league"},"value":{"kind":"Variable","name":{"kind":"Name","value":"league"}}}]}]}}]} as unknown as DocumentNode<CurrenyValuePullDivAndExQuery, CurrenyValuePullDivAndExQueryVariables>;
export const FilterableItemTableStashSnapshotItemGroupSummariesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FilterableItemTableStashSnapshotItemGroupSummaries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StashSnapshotItemGroupSummarySearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stashSnapshotItemGroupSummaries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"totalValueChaos"}},{"kind":"Field","name":{"kind":"Name","value":"itemGroupSummaries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"stashSnapshotId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"itemGroupHashString"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"valueChaos"}},{"kind":"Field","name":{"kind":"Name","value":"totalValueChaos"}},{"kind":"Field","name":{"kind":"Name","value":"itemGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashString"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"baseType"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"inventoryMaxStackSize"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FilterableItemTableStashSnapshotItemGroupSummariesQuery, FilterableItemTableStashSnapshotItemGroupSummariesQueryVariables>;
export const FilterableTimeTableTimeseriesSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FilterableTimeTableTimeseriesSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ItemGroupValueTimeseriesSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemGroupValueTimeseriesSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"itemGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashString"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FilterableTimeTableTimeseriesSearchQuery, FilterableTimeTableTimeseriesSearchQueryVariables>;
export const GetAllItemGroupTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllItemGroupTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"league"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemGroupTags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"league"},"value":{"kind":"Variable","name":{"kind":"Name","value":"league"}}}]}]}}]} as unknown as DocumentNode<GetAllItemGroupTagsQuery, GetAllItemGroupTagsQueryVariables>;
export const GlobalSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GlobalSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GlobalSearch"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"globalSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"}},{"kind":"Field","name":{"kind":"Name","value":"display"}},{"kind":"Field","name":{"kind":"Name","value":"target"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]}}]}}]} as unknown as DocumentNode<GlobalSearchQuery, GlobalSearchQueryVariables>;
export const DeleteSnapshotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSnapshots"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stashSnapshotIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSnapshots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stashSnapshotIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stashSnapshotIds"}}}]}]}}]} as unknown as DocumentNode<DeleteSnapshotsMutation, DeleteSnapshotsMutationVariables>;
export const StashViewOneClickPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StashViewOneClickPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StashViewSettings"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stashViewOneClickPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<StashViewOneClickPostMutation, StashViewOneClickPostMutationVariables>;
export const ItemGroupListingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ItemGroupListings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hashString"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"league"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemGroupListings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hashString"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hashString"}}},{"kind":"Argument","name":{"kind":"Name","value":"league"},"value":{"kind":"Variable","name":{"kind":"Name","value":"league"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountName"}},{"kind":"Field","name":{"kind":"Name","value":"listedAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"stackSize"}},{"kind":"Field","name":{"kind":"Name","value":"listedValueChaos"}}]}}]}}]} as unknown as DocumentNode<ItemGroupListingsQuery, ItemGroupListingsQueryVariables>;
export const TakeStashViewSanpshotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TakeStashViewSanpshot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StashViewSnapshotInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stashViewSnapshot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<TakeStashViewSanpshotMutation, TakeStashViewSanpshotMutationVariables>;
export const StashViewJobStatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StashViewJobStat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stashViewJobStat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalStahes"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]} as unknown as DocumentNode<StashViewJobStatQuery, StashViewJobStatQueryVariables>;
export const TftOneClickMessageHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TftOneClickMessageHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tftOneClickMessageHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"exportType"}},{"kind":"Field","name":{"kind":"Name","value":"exportSubType"}},{"kind":"Field","name":{"kind":"Name","value":"rateLimitExpires"}}]}}]}}]} as unknown as DocumentNode<TftOneClickMessageHistoryQuery, TftOneClickMessageHistoryQueryVariables>;
export const DeleteTftOneClickMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTftOneClickMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTftOneClickMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"messageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}}}]}]}}]} as unknown as DocumentNode<DeleteTftOneClickMessageMutation, DeleteTftOneClickMessageMutationVariables>;
export const PassiveAtlasTreeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PassiveAtlasTree"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"passiveTreeVersion"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"atlasTree"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"passiveTreeVersion"},"value":{"kind":"Variable","name":{"kind":"Name","value":"passiveTreeVersion"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"constants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minX"}},{"kind":"Field","name":{"kind":"Name","value":"minY"}},{"kind":"Field","name":{"kind":"Name","value":"maxX"}},{"kind":"Field","name":{"kind":"Name","value":"maxY"}},{"kind":"Field","name":{"kind":"Name","value":"skillsPerOrbit"}},{"kind":"Field","name":{"kind":"Name","value":"orbitRadii"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodeMap"}},{"kind":"Field","name":{"kind":"Name","value":"connectionMap"}}]}}]}}]} as unknown as DocumentNode<PassiveAtlasTreeQuery, PassiveAtlasTreeQueryVariables>;
export const PassiveTreeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PassiveTree"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"passiveTreeVersion"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"passiveTree"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"passiveTreeVersion"},"value":{"kind":"Variable","name":{"kind":"Name","value":"passiveTreeVersion"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"constants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minX"}},{"kind":"Field","name":{"kind":"Name","value":"minY"}},{"kind":"Field","name":{"kind":"Name","value":"maxX"}},{"kind":"Field","name":{"kind":"Name","value":"maxY"}},{"kind":"Field","name":{"kind":"Name","value":"skillsPerOrbit"}},{"kind":"Field","name":{"kind":"Name","value":"orbitRadii"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodeMap"}},{"kind":"Field","name":{"kind":"Name","value":"connectionMap"}}]}}]}}]} as unknown as DocumentNode<PassiveTreeQuery, PassiveTreeQueryVariables>;
export const StashSnapshotItemGroupSummariesAggregationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StashSnapshotItemGroupSummariesAggregation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StashSnapshotItemGroupSummarySearchInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"aggregation"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stashSnapshotItemGroupSummariesAggregation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"aggregation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"aggregation"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"matches"}}]}}]}}]}}]} as unknown as DocumentNode<StashSnapshotItemGroupSummariesAggregationQuery, StashSnapshotItemGroupSummariesAggregationQueryVariables>;
export const ExchangeAuthCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ExchangeAuthCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exchangeAuthCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}}}]}]}}]} as unknown as DocumentNode<ExchangeAuthCodeMutation, ExchangeAuthCodeMutationVariables>;
export const MyProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"forcePull"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"poeProfileName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"lastConnectedTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"oAuthTokenUpdatedAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"discordUserId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"checkTftMembership"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"forcePull"},"value":{"kind":"Variable","name":{"kind":"Name","value":"forcePull"}}}]}]}}]} as unknown as DocumentNode<MyProfileQuery, MyProfileQueryVariables>;
export const ExportStashSnapshotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ExportStashSnapshot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StashSnapshotExportInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exportStashSnapshot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemGroupSummaries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"valueChaos"}},{"kind":"Field","name":{"kind":"Name","value":"itemGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalValueChaos"}},{"kind":"Field","name":{"kind":"Name","value":"divineChaosValue"}}]}}]}}]} as unknown as DocumentNode<ExportStashSnapshotMutation, ExportStashSnapshotMutationVariables>;
export const StashExportSearchSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StashExportSearchSummary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StashViewStashSummarySearch"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stashViewStashSummary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashString"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"properties"}},{"kind":"Field","name":{"kind":"Name","value":"baseType"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"inventoryMaxStackSize"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtTimestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"league"}},{"kind":"Field","name":{"kind":"Name","value":"stashId"}},{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"searchableString"}},{"kind":"Field","name":{"kind":"Name","value":"itemGroupHashString"}},{"kind":"Field","name":{"kind":"Name","value":"itemGroupTag"}},{"kind":"Field","name":{"kind":"Name","value":"valueChaos"}},{"kind":"Field","name":{"kind":"Name","value":"totalValueChaos"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]}}]}}]} as unknown as DocumentNode<StashExportSearchSummaryQuery, StashExportSearchSummaryQueryVariables>;
export const UpdateDiscordCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDiscordCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDiscordCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<UpdateDiscordCodeMutation, UpdateDiscordCodeMutationVariables>;
export const AtlasPassiveTreeSnapshotPopularityAggregationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AtlasPassiveTreeSnapshotPopularityAggregation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AtlasPassiveSnapshotSearch"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"atlasPassiveTreeSnapshotPopularityAggregation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<AtlasPassiveTreeSnapshotPopularityAggregationQuery, AtlasPassiveTreeSnapshotPopularityAggregationQueryVariables>;
export const AtlasTreeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AtlasTree"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"passiveTreeVersion"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"atlasTree"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"passiveTreeVersion"},"value":{"kind":"Variable","name":{"kind":"Name","value":"passiveTreeVersion"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodeMap"}}]}}]}}]} as unknown as DocumentNode<AtlasTreeQuery, AtlasTreeQueryVariables>;
export const SingleCharacterCharacterSnapshotsSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SingleCharacterCharacterSnapshotsSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"snapshotId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"characterSnapshot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"snapshotId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"snapshotId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"characterId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"characterClass"}},{"kind":"Field","name":{"kind":"Name","value":"league"}},{"kind":"Field","name":{"kind":"Name","value":"experience"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"mainSkillKey"}},{"kind":"Field","name":{"kind":"Name","value":"current"}},{"kind":"Field","name":{"kind":"Name","value":"poeCharacter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"lastSnapshotTimestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"characterPassivesSnapshot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"banditChoice"}},{"kind":"Field","name":{"kind":"Name","value":"pantheonMajor"}},{"kind":"Field","name":{"kind":"Name","value":"pantheonMinor"}},{"kind":"Field","name":{"kind":"Name","value":"hashes"}},{"kind":"Field","name":{"kind":"Name","value":"hashesEx"}},{"kind":"Field","name":{"kind":"Name","value":"jewelData"}},{"kind":"Field","name":{"kind":"Name","value":"masteryEffects"}}]}},{"kind":"Field","name":{"kind":"Name","value":"characterSnapshotItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"inventoryId"}},{"kind":"Field","name":{"kind":"Name","value":"socketedInId"}},{"kind":"Field","name":{"kind":"Name","value":"baseType"}},{"kind":"Field","name":{"kind":"Name","value":"typeLine"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ilvl"}},{"kind":"Field","name":{"kind":"Name","value":"explicitMods"}},{"kind":"Field","name":{"kind":"Name","value":"utilityMods"}},{"kind":"Field","name":{"kind":"Name","value":"properties"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}},{"kind":"Field","name":{"kind":"Name","value":"sockets"}},{"kind":"Field","name":{"kind":"Name","value":"frameType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"w"}},{"kind":"Field","name":{"kind":"Name","value":"h"}},{"kind":"Field","name":{"kind":"Name","value":"crucible"}},{"kind":"Field","name":{"kind":"Name","value":"corrupted"}},{"kind":"Field","name":{"kind":"Name","value":"support"}},{"kind":"Field","name":{"kind":"Name","value":"socket"}},{"kind":"Field","name":{"kind":"Name","value":"gemColor"}},{"kind":"Field","name":{"kind":"Name","value":"mainSkill"}},{"kind":"Field","name":{"kind":"Name","value":"itemGroupHashString"}},{"kind":"Field","name":{"kind":"Name","value":"craftedMods"}},{"kind":"Field","name":{"kind":"Name","value":"implicitMods"}},{"kind":"Field","name":{"kind":"Name","value":"fracturedMods"}},{"kind":"Field","name":{"kind":"Name","value":"enchantMods"}},{"kind":"Field","name":{"kind":"Name","value":"valueChaos"}}]}},{"kind":"Field","name":{"kind":"Name","value":"characterSnapshotPobStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accuracy"}},{"kind":"Field","name":{"kind":"Name","value":"armour"}},{"kind":"Field","name":{"kind":"Name","value":"blockChance"}},{"kind":"Field","name":{"kind":"Name","value":"spellBlockChance"}},{"kind":"Field","name":{"kind":"Name","value":"chaosResist"}},{"kind":"Field","name":{"kind":"Name","value":"coldResist"}},{"kind":"Field","name":{"kind":"Name","value":"dex"}},{"kind":"Field","name":{"kind":"Name","value":"energyShield"}},{"kind":"Field","name":{"kind":"Name","value":"fireResist"}},{"kind":"Field","name":{"kind":"Name","value":"int"}},{"kind":"Field","name":{"kind":"Name","value":"life"}},{"kind":"Field","name":{"kind":"Name","value":"lightningResist"}},{"kind":"Field","name":{"kind":"Name","value":"mana"}},{"kind":"Field","name":{"kind":"Name","value":"str"}},{"kind":"Field","name":{"kind":"Name","value":"evasion"}},{"kind":"Field","name":{"kind":"Name","value":"supression"}},{"kind":"Field","name":{"kind":"Name","value":"totalDpsWithIgnite"}},{"kind":"Field","name":{"kind":"Name","value":"pobCode"}}]}}]}}]}}]} as unknown as DocumentNode<SingleCharacterCharacterSnapshotsSearchQuery, SingleCharacterCharacterSnapshotsSearchQueryVariables>;
export const CharacterSnapshotRecordsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CharacterSnapshotRecords"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"characterId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"characterSnapshotRecords"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"characterId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"characterId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"characterId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"experience"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}}]}}]} as unknown as DocumentNode<CharacterSnapshotRecordsQuery, CharacterSnapshotRecordsQueryVariables>;
export const CharacterTakeCharacterSnapshotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CharacterTakeCharacterSnapshot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"characterId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"takeCharacterSnapshot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"characterId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"characterId"}}}]}]}}]} as unknown as DocumentNode<CharacterTakeCharacterSnapshotMutation, CharacterTakeCharacterSnapshotMutationVariables>;
export const CustomLadderGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomLadderGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customLadderGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ownerUserId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"poeProfileName"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]}}]} as unknown as DocumentNode<CustomLadderGroupQuery, CustomLadderGroupQueryVariables>;
export const CharactersPoeCharactersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CharactersPoeCharacters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"poeCharacters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeague"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"lastSnapshotTimestamp"}}]}}]}}]} as unknown as DocumentNode<CharactersPoeCharactersQuery, CharactersPoeCharactersQueryVariables>;
export const PullCharacterSnapshotsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PullCharacterSnapshotsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CharacterSnapshotSearch"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"characterSnapshotsSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"snapshots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"characterClass"}},{"kind":"Field","name":{"kind":"Name","value":"mainSkillKey"}},{"kind":"Field","name":{"kind":"Name","value":"characterId"}},{"kind":"Field","name":{"kind":"Name","value":"snapshotId"}},{"kind":"Field","name":{"kind":"Name","value":"league"}},{"kind":"Field","name":{"kind":"Name","value":"totalValueDivine"}}]}}]}}]}}]} as unknown as DocumentNode<PullCharacterSnapshotsQueryQuery, PullCharacterSnapshotsQueryQueryVariables>;
export const AtlasPassiveSnapshotsByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AtlasPassiveSnapshotsByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"atlasPassiveSnapshotsByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"league"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"systemSnapshotTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"hashes"}},{"kind":"Field","name":{"kind":"Name","value":"source"}}]}}]}}]}}]} as unknown as DocumentNode<AtlasPassiveSnapshotsByUserQuery, AtlasPassiveSnapshotsByUserQueryVariables>;
export const RefreshPoeCharactersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshPoeCharacters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshPoeCharacters"}}]}}]} as unknown as DocumentNode<RefreshPoeCharactersMutation, RefreshPoeCharactersMutationVariables>;
export const ViewGroupsCustomLadderGroupsByOwnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ViewGroupsCustomLadderGroupsByOwner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ownerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customLadderGroupsByOwner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ownerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ownerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ownerUserId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"poeProfileName"}}]}}]}}]}}]} as unknown as DocumentNode<ViewGroupsCustomLadderGroupsByOwnerQuery, ViewGroupsCustomLadderGroupsByOwnerQueryVariables>;
export const DeleteCustomLadderGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCustomLadderGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCustomLadderGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}]}]}}]} as unknown as DocumentNode<DeleteCustomLadderGroupMutation, DeleteCustomLadderGroupMutationVariables>;
export const ProfileByPeoProfileNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProfileByPeoProfileName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poeProfileName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileByPoeProfileName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"poeProfileName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poeProfileName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"poeProfileName"}}]}}]}}]} as unknown as DocumentNode<ProfileByPeoProfileNameQuery, ProfileByPeoProfileNameQueryVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"group"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CustomLadderGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCustomLadderGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"group"},"value":{"kind":"Variable","name":{"kind":"Name","value":"group"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ownerUserId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"poeProfileName"}}]}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const EconSearch1Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EconSearch1"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ItemGroupValueTimeseriesSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemGroupValueTimeseriesSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"itemGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hashString"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EconSearch1Query, EconSearch1QueryVariables>;
export const EntriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Entries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ItemGroupValueTimeseriesSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemGroupValueTimeseriesSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"itemGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hashString"}},{"kind":"Field","name":{"kind":"Name","value":"properties"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EntriesQuery, EntriesQueryVariables>;
export const EconOneItemGroupSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EconOneItemGroupSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ItemGroupValueTimeseriesSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemGroupValueTimeseriesSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stockRangeStartInclusive"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"itemGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashString"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"properties"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EconOneItemGroupSearchQuery, EconOneItemGroupSearchQueryVariables>;
export const LeagueActvityTimeseriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LeagueActvityTimeseries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leagueActvityTimeseries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<LeagueActvityTimeseriesQuery, LeagueActvityTimeseriesQueryVariables>;
export const StashTabsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StashTabs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"league"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"forcePull"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stashTabs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"league"},"value":{"kind":"Variable","name":{"kind":"Name","value":"league"}}},{"kind":"Argument","name":{"kind":"Name","value":"forcePull"},"value":{"kind":"Variable","name":{"kind":"Name","value":"forcePull"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"league"}},{"kind":"Field","name":{"kind":"Name","value":"parent"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"flatIndex"}}]}}]}}]} as unknown as DocumentNode<StashTabsQuery, StashTabsQueryVariables>;
export const StashViewValueSnapshotSeriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StashViewValueSnapshotSeries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"league"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stashViewValueSnapshotSeries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"league"},"value":{"kind":"Variable","name":{"kind":"Name","value":"league"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stashId"}},{"kind":"Field","name":{"kind":"Name","value":"values"}},{"kind":"Field","name":{"kind":"Name","value":"timestamps"}}]}}]}}]} as unknown as DocumentNode<StashViewValueSnapshotSeriesQuery, StashViewValueSnapshotSeriesQueryVariables>;
export const CurrenyValuePullDivDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrenyValuePullDiv"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"league"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"div"},"name":{"kind":"Name","value":"itemGroupValueChaos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}},{"kind":"Argument","name":{"kind":"Name","value":"league"},"value":{"kind":"Variable","name":{"kind":"Name","value":"league"}}}]}]}}]} as unknown as DocumentNode<CurrenyValuePullDivQuery, CurrenyValuePullDivQueryVariables>;
export const StashSnapshotProfilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StashSnapshotProfiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stashSnapshotProfiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"league"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"public"}},{"kind":"Field","name":{"kind":"Name","value":"poeStashTabIds"}},{"kind":"Field","name":{"kind":"Name","value":"valuationTargetPValue"}},{"kind":"Field","name":{"kind":"Name","value":"valuationStockInfluence"}}]}}]}}]} as unknown as DocumentNode<StashSnapshotProfilesQuery, StashSnapshotProfilesQueryVariables>;
export const DeleteStashSnapshotProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStashSnapshotProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stashSnapshotProfileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStashSnapshotProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stashSnapshotProfileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stashSnapshotProfileId"}}}]}]}}]} as unknown as DocumentNode<DeleteStashSnapshotProfileMutation, DeleteStashSnapshotProfileMutationVariables>;
export const StashSnapshotProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StashSnapshotProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"snapshotProfileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stashSnapshotProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"snapshotProfileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"snapshotProfileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"league"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"public"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"poeStashTabIds"}},{"kind":"Field","name":{"kind":"Name","value":"valuationTargetPValue"}},{"kind":"Field","name":{"kind":"Name","value":"valuationStockInfluence"}},{"kind":"Field","name":{"kind":"Name","value":"automaticSnapshotIntervalSeconds"}}]}}]}}]} as unknown as DocumentNode<StashSnapshotProfileQuery, StashSnapshotProfileQueryVariables>;
export const StashSnapshotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StashSnapshots"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stashSnapshotProfileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stashSnapshots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stashSnapshotProfileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stashSnapshotProfileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"league"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"snapshotProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"totalValueChaos"}},{"kind":"Field","name":{"kind":"Name","value":"divineChaosValue"}},{"kind":"Field","name":{"kind":"Name","value":"exaltChaosValue"}}]}}]}}]} as unknown as DocumentNode<StashSnapshotsQuery, StashSnapshotsQueryVariables>;
export const TakeSnapshotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TakeSnapshot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stashSnapshotProfileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"takeSnapshot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stashSnapshotProfileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stashSnapshotProfileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<TakeSnapshotMutation, TakeSnapshotMutationVariables>;
export const StashSnapshotProfilesViewProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StashSnapshotProfilesViewProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stashSnapshotProfiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"league"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"public"}},{"kind":"Field","name":{"kind":"Name","value":"poeStashTabIds"}},{"kind":"Field","name":{"kind":"Name","value":"valuationTargetPValue"}},{"kind":"Field","name":{"kind":"Name","value":"valuationStockInfluence"}},{"kind":"Field","name":{"kind":"Name","value":"automaticSnapshotIntervalSeconds"}}]}}]}}]} as unknown as DocumentNode<StashSnapshotProfilesViewProfileQuery, StashSnapshotProfilesViewProfileQueryVariables>;
export const UpdateStashsnapshotProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStashsnapshotProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"update"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StashSnapshotProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStashsnapshotProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"update"},"value":{"kind":"Variable","name":{"kind":"Name","value":"update"}}}]}]}}]} as unknown as DocumentNode<UpdateStashsnapshotProfileMutation, UpdateStashsnapshotProfileMutationVariables>;
export const TakeDeatachedSnapshotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TakeDeatachedSnapshot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DetachedStashSnapshotInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"takeDeatachedSnapshot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"league"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"snapshotProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"totalValueChaos"}},{"kind":"Field","name":{"kind":"Name","value":"exaltChaosValue"}},{"kind":"Field","name":{"kind":"Name","value":"divineChaosValue"}}]}}]}}]} as unknown as DocumentNode<TakeDeatachedSnapshotMutation, TakeDeatachedSnapshotMutationVariables>;