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
  listedAtTimestamp: Scalars['DateTime'];
  listedValue: Scalars['Float'];
  quantity: Scalars['Float'];
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

export type LivePricingKeySummaryConfig = {
  itemGroupHashStrings: Array<Scalars['String']>;
  league: Scalars['String'];
};

export type LivePricingSimpleConfig = {
  itemGroupHashString: Scalars['String'];
  league: Scalars['String'];
  listingPercent?: InputMaybe<Scalars['Float']>;
  quantity: Scalars['Float'];
};

export type LivePricingSimpleResult = {
  __typename?: 'LivePricingSimpleResult';
  allListingsLength: Scalars['Float'];
  stockValuation: LivePricingValuation;
  valuation: LivePricingValuation;
};

export type LivePricingSummary = {
  __typename?: 'LivePricingSummary';
  entries: Array<LivePricingSummaryEntry>;
};

export type LivePricingSummaryEntry = {
  __typename?: 'LivePricingSummaryEntry';
  icon: Scalars['String'];
  itemGroupHashString: Scalars['String'];
  itemGroupKey: Scalars['String'];
  stockValue?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

export type LivePricingValuation = {
  __typename?: 'LivePricingValuation';
  listingPercent: Scalars['Float'];
  quantity: Scalars['Float'];
  validListings: Array<ItemGroupListing>;
  validListingsLength: Scalars['Float'];
  value: Scalars['Float'];
  valueIndex: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteCustomLadderGroup: Scalars['Boolean'];
  deleteStashViewValueSnapshotSeries: Scalars['Boolean'];
  deleteTftOneClickMessage: Scalars['Boolean'];
  exchangeAuthCode: Scalars['String'];
  loginAs: Scalars['String'];
  refreshPoeCharacters: Scalars['Boolean'];
  routeChange: Scalars['Boolean'];
  stashViewOneClickMessage: Scalars['String'];
  stashViewOneClickPost: Scalars['Boolean'];
  stashViewSnapshot: Scalars['String'];
  takeCharacterSnapshot: Scalars['Boolean'];
  updateCustomLadderGroup: CustomLadderGroup;
  updateDiscordCode: Scalars['Boolean'];
  updatePatreonCode: Scalars['Boolean'];
  updateStashViewAutomaticSnapshotSettings: Scalars['Boolean'];
};


export type MutationDeleteCustomLadderGroupArgs = {
  groupId: Scalars['String'];
};


export type MutationDeleteTftOneClickMessageArgs = {
  messageId: Scalars['String'];
};


export type MutationExchangeAuthCodeArgs = {
  authCode: Scalars['String'];
};


export type MutationLoginAsArgs = {
  userId: Scalars['String'];
};


export type MutationRouteChangeArgs = {
  path: Scalars['String'];
  pathname: Scalars['String'];
};


export type MutationStashViewOneClickMessageArgs = {
  input: StashViewSettings;
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


export type MutationUpdateCustomLadderGroupArgs = {
  group: CustomLadderGroupInput;
};


export type MutationUpdateDiscordCodeArgs = {
  code: Scalars['String'];
};


export type MutationUpdatePatreonCodeArgs = {
  code: Scalars['String'];
};


export type MutationUpdateStashViewAutomaticSnapshotSettingsArgs = {
  input: StashViewAutomaticSnapshotSettingsInput;
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
  itemGroupInfo: Scalars['Boolean'];
  itemGroupTags: Array<Scalars['String']>;
  itemGroupValueChaos: Scalars['Float'];
  itemGroupValueTimeseriesSearch: ItemGroupValueTimeseriesResult;
  leagueActvityTimeseries: GenericAggregation;
  leagues: Array<PoeLeague>;
  livePriceSimple: LivePricingSimpleResult;
  livePricingSummary: LivePricingSummary;
  myProfile: UserProfile;
  passiveTree: PassiveTreeResponse;
  poeCharacters: Array<PoeCharacter>;
  poestackStats: Scalars['JSON'];
  profileByPoeProfileName: UserProfile;
  stashTabs: Array<PoeStashTab>;
  stashViewAutomaticSnapshotSettings: StashViewAutomaticSnapshotSettings;
  stashViewItemSummary: StashViewStashSummary;
  stashViewJobStat: StashViewJob;
  stashViewValueSnapshotSeries: Array<StashViewValueSnapshotSeries>;
  tftLiveListingSearch: Array<TftLiveListing>;
  tftLiveListings: Array<TftLiveListing>;
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


export type QueryLivePriceSimpleArgs = {
  config: LivePricingSimpleConfig;
};


export type QueryLivePricingSummaryArgs = {
  config: LivePricingKeySummaryConfig;
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


export type QueryStashTabsArgs = {
  forcePull?: InputMaybe<Scalars['Boolean']>;
  league: Scalars['String'];
};


export type QueryStashViewAutomaticSnapshotSettingsArgs = {
  league: Scalars['String'];
};


export type QueryStashViewJobStatArgs = {
  jobId: Scalars['String'];
};


export type QueryStashViewValueSnapshotSeriesArgs = {
  league: Scalars['String'];
};


export type QueryTftLiveListingSearchArgs = {
  search: TftLiveListingSearch;
};

export type StashViewAutomaticSnapshotSettings = {
  __typename?: 'StashViewAutomaticSnapshotSettings';
  durationBetweenSnapshotsSeconds: Scalars['Float'];
  league: Scalars['String'];
  nextSnapshotTimestamp: Scalars['DateTime'];
  stashIds: Array<Scalars['String']>;
  userId: Scalars['String'];
};

export type StashViewAutomaticSnapshotSettingsInput = {
  durationBetweenSnapshotsSeconds: Scalars['Float'];
  league: Scalars['String'];
  stashIds: Array<Scalars['String']>;
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
  rateLimitEndTimestamp?: Maybe<Scalars['DateTime']>;
  status: Scalars['String'];
  timestamp: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type StashViewSettings = {
  chaosToDivRate: Scalars['Float'];
  checkedTabIds: Array<Scalars['String']>;
  checkedTags?: InputMaybe<Array<Scalars['String']>>;
  excludedItemGroupIds: Array<Scalars['String']>;
  exporterListedValueMultipler: Scalars['Float'];
  filterCheckedTabs: Scalars['Boolean'];
  ign?: InputMaybe<Scalars['String']>;
  itemGroupValueOverrides: Scalars['JSONObject'];
  league: Scalars['String'];
  minItemQuantity?: InputMaybe<Scalars['Float']>;
  minItemStackValue?: InputMaybe<Scalars['Float']>;
  minItemValue?: InputMaybe<Scalars['Float']>;
  searchString?: InputMaybe<Scalars['String']>;
  selectedExporter?: InputMaybe<Scalars['String']>;
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

export type StashViewValueSnapshotSeries = {
  __typename?: 'StashViewValueSnapshotSeries';
  stashId: Scalars['String'];
  timestamps: Array<Scalars['DateTime']>;
  values: Array<Scalars['Float']>;
};

export type TftLiveListing = {
  __typename?: 'TftLiveListing';
  body: Scalars['String'];
  channelId: Scalars['String'];
  delistedAtTimestamp?: Maybe<Scalars['DateTime']>;
  messageId: Scalars['String'];
  properties: Scalars['JSONObject'];
  tag: Scalars['String'];
  updatedAtTimestamp: Scalars['DateTime'];
  userDiscordDisplayRole?: Maybe<Scalars['String']>;
  userDiscordDisplayRoleColor?: Maybe<Scalars['String']>;
  userDiscordHighestRole?: Maybe<Scalars['String']>;
  userDiscordId: Scalars['String'];
  userDiscordName: Scalars['String'];
};

export type TftLiveListingSearch = {
  propertyFilterGroups: Array<TftLiveListingSearchPropertyGroup>;
  tag: Scalars['String'];
};

export type TftLiveListingSearchProperty = {
  key: Scalars['String'];
  type?: Scalars['String'];
  value: Scalars['String'];
};

export type TftLiveListingSearchPropertyGroup = {
  filters: Array<TftLiveListingSearchProperty>;
  type?: Scalars['String'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  createdAtTimestamp?: Maybe<Scalars['DateTime']>;
  discordUserId?: Maybe<Scalars['String']>;
  discordUsername?: Maybe<Scalars['String']>;
  lastConnectedTimestamp?: Maybe<Scalars['DateTime']>;
  oAuthTokenUpdatedAtTimestamp?: Maybe<Scalars['DateTime']>;
  opaqueKey?: Maybe<Scalars['String']>;
  patreonTier?: Maybe<Scalars['String']>;
  patreonUserId?: Maybe<Scalars['String']>;
  poeProfileName: Scalars['String'];
  roles: Array<Scalars['String']>;
  userId: Scalars['String'];
};

export type CurrenyValuePullDivAndExQueryVariables = Exact<{
  key: Scalars['String'];
  key2: Scalars['String'];
  league: Scalars['String'];
}>;


export type CurrenyValuePullDivAndExQuery = { __typename?: 'Query', div: number, ex: number };

export type GetAllItemGroupTagsQueryVariables = Exact<{
  league: Scalars['String'];
}>;


export type GetAllItemGroupTagsQuery = { __typename?: 'Query', itemGroupTags: Array<string> };

export type StashViewOneClickPostMutationVariables = Exact<{
  input: StashViewSettings;
}>;


export type StashViewOneClickPostMutation = { __typename?: 'Mutation', stashViewOneClickPost: boolean };

export type StashViewOneClickMessageMutationVariables = Exact<{
  input: StashViewSettings;
}>;


export type StashViewOneClickMessageMutation = { __typename?: 'Mutation', stashViewOneClickMessage: string };

export type LivePriceSimpleQueryVariables = Exact<{
  config: LivePricingSimpleConfig;
}>;


export type LivePriceSimpleQuery = { __typename?: 'Query', livePriceSimple: { __typename?: 'LivePricingSimpleResult', allListingsLength: number, stockValuation: { __typename?: 'LivePricingValuation', value: number }, valuation: { __typename?: 'LivePricingValuation', value: number, validListings: Array<{ __typename?: 'ItemGroupListing', listedAtTimestamp: any, quantity: number, listedValue: number }> } } };

export type FilterableTimeTableTimeseriesSearchQueryVariables = Exact<{
  search: ItemGroupValueTimeseriesSearchInput;
}>;


export type FilterableTimeTableTimeseriesSearchQuery = { __typename?: 'Query', itemGroupValueTimeseriesSearch: { __typename?: 'ItemGroupValueTimeseriesResult', results: Array<{ __typename?: 'ItemGroupValueTimeseries', series: Array<{ __typename?: 'ItemGroupValueTimeseriesGroupSeries', type: string, entries: Array<{ __typename?: 'ItemGroupValueTimeseriesGroupEntry', timestamp: any, value: number }> }>, itemGroup: { __typename?: 'ItemGroup', hashString: string } }> } };

export type TakeStashViewSanpshotMutationVariables = Exact<{
  input: StashViewSnapshotInput;
}>;


export type TakeStashViewSanpshotMutation = { __typename?: 'Mutation', stashViewSnapshot: string };

export type StashViewJobStatQueryVariables = Exact<{
  jobId: Scalars['String'];
}>;


export type StashViewJobStatQuery = { __typename?: 'Query', stashViewJobStat: { __typename?: 'StashViewJob', id: string, userId: string, status: string, timestamp: any, rateLimitEndTimestamp?: any | null } };

export type TftFiveWayLiveListingsQueryVariables = Exact<{ [key: string]: never; }>;


export type TftFiveWayLiveListingsQuery = { __typename?: 'Query', tftLiveListings: Array<{ __typename?: 'TftLiveListing', messageId: string, userDiscordId: string, userDiscordName: string, userDiscordDisplayRole?: string | null, userDiscordDisplayRoleColor?: string | null, userDiscordHighestRole?: string | null, updatedAtTimestamp: any, body: string, properties: any }> };

export type TftLiveListingSearchQueryVariables = Exact<{
  search: TftLiveListingSearch;
}>;


export type TftLiveListingSearchQuery = { __typename?: 'Query', tftLiveListingSearch: Array<{ __typename?: 'TftLiveListing', channelId: string, messageId: string, userDiscordId: string, userDiscordName: string, userDiscordDisplayRole?: string | null, userDiscordHighestRole?: string | null, userDiscordDisplayRoleColor?: string | null, updatedAtTimestamp: any, delistedAtTimestamp?: any | null, tag: string, properties: any }> };

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

export type ExchangeAuthCodeMutationVariables = Exact<{
  authCode: Scalars['String'];
}>;


export type ExchangeAuthCodeMutation = { __typename?: 'Mutation', exchangeAuthCode: string };

export type MyProfileQueryVariables = Exact<{
  forcePull?: InputMaybe<Scalars['Boolean']>;
}>;


export type MyProfileQuery = { __typename?: 'Query', checkTftMembership: boolean, myProfile: { __typename?: 'UserProfile', userId: string, poeProfileName: string, patreonUserId?: string | null, patreonTier?: string | null, oAuthTokenUpdatedAtTimestamp?: any | null, lastConnectedTimestamp?: any | null, discordUsername?: string | null, discordUserId?: string | null, createdAtTimestamp?: any | null, roles: Array<string>, opaqueKey?: string | null } };

export type RouteChangeMutationVariables = Exact<{
  path: Scalars['String'];
  pathname: Scalars['String'];
}>;


export type RouteChangeMutation = { __typename?: 'Mutation', routeChange: boolean };

export type LoginAsMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type LoginAsMutation = { __typename?: 'Mutation', loginAs: string };

export type UpdateDiscordCodeMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type UpdateDiscordCodeMutation = { __typename?: 'Mutation', updateDiscordCode: boolean };

export type PoestackStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type PoestackStatsQuery = { __typename?: 'Query', poestackStats: any };

export type UpdatePatreonCodeMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type UpdatePatreonCodeMutation = { __typename?: 'Mutation', updatePatreonCode: boolean };

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


export const CurrenyValuePullDivAndExDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrenyValuePullDivAndEx"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key2"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"league"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"div"},"name":{"kind":"Name","value":"itemGroupValueChaos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}},{"kind":"Argument","name":{"kind":"Name","value":"league"},"value":{"kind":"Variable","name":{"kind":"Name","value":"league"}}}]},{"kind":"Field","alias":{"kind":"Name","value":"ex"},"name":{"kind":"Name","value":"itemGroupValueChaos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key2"}}},{"kind":"Argument","name":{"kind":"Name","value":"league"},"value":{"kind":"Variable","name":{"kind":"Name","value":"league"}}}]}]}}]} as unknown as DocumentNode<CurrenyValuePullDivAndExQuery, CurrenyValuePullDivAndExQueryVariables>;
export const GetAllItemGroupTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllItemGroupTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"league"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemGroupTags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"league"},"value":{"kind":"Variable","name":{"kind":"Name","value":"league"}}}]}]}}]} as unknown as DocumentNode<GetAllItemGroupTagsQuery, GetAllItemGroupTagsQueryVariables>;
export const StashViewOneClickPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StashViewOneClickPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StashViewSettings"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stashViewOneClickPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<StashViewOneClickPostMutation, StashViewOneClickPostMutationVariables>;
export const StashViewOneClickMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StashViewOneClickMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StashViewSettings"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stashViewOneClickMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<StashViewOneClickMessageMutation, StashViewOneClickMessageMutationVariables>;
export const LivePriceSimpleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LivePriceSimple"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"config"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LivePricingSimpleConfig"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"livePriceSimple"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"config"},"value":{"kind":"Variable","name":{"kind":"Name","value":"config"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allListingsLength"}},{"kind":"Field","name":{"kind":"Name","value":"stockValuation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"valuation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"validListings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listedAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"listedValue"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LivePriceSimpleQuery, LivePriceSimpleQueryVariables>;
export const FilterableTimeTableTimeseriesSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FilterableTimeTableTimeseriesSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ItemGroupValueTimeseriesSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemGroupValueTimeseriesSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"itemGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hashString"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FilterableTimeTableTimeseriesSearchQuery, FilterableTimeTableTimeseriesSearchQueryVariables>;
export const TakeStashViewSanpshotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TakeStashViewSanpshot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StashViewSnapshotInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stashViewSnapshot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<TakeStashViewSanpshotMutation, TakeStashViewSanpshotMutationVariables>;
export const StashViewJobStatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StashViewJobStat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stashViewJobStat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"rateLimitEndTimestamp"}}]}}]}}]} as unknown as DocumentNode<StashViewJobStatQuery, StashViewJobStatQueryVariables>;
export const TftFiveWayLiveListingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TftFiveWayLiveListings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tftLiveListings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"userDiscordId"}},{"kind":"Field","name":{"kind":"Name","value":"userDiscordName"}},{"kind":"Field","name":{"kind":"Name","value":"userDiscordDisplayRole"}},{"kind":"Field","name":{"kind":"Name","value":"userDiscordDisplayRoleColor"}},{"kind":"Field","name":{"kind":"Name","value":"userDiscordHighestRole"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"properties"}}]}}]}}]} as unknown as DocumentNode<TftFiveWayLiveListingsQuery, TftFiveWayLiveListingsQueryVariables>;
export const TftLiveListingSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TftLiveListingSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TftLiveListingSearch"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tftLiveListingSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"userDiscordId"}},{"kind":"Field","name":{"kind":"Name","value":"userDiscordName"}},{"kind":"Field","name":{"kind":"Name","value":"userDiscordDisplayRole"}},{"kind":"Field","name":{"kind":"Name","value":"userDiscordHighestRole"}},{"kind":"Field","name":{"kind":"Name","value":"userDiscordDisplayRoleColor"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"delistedAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"properties"}}]}}]}}]} as unknown as DocumentNode<TftLiveListingSearchQuery, TftLiveListingSearchQueryVariables>;
export const TftOneClickMessageHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TftOneClickMessageHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tftOneClickMessageHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"exportType"}},{"kind":"Field","name":{"kind":"Name","value":"exportSubType"}},{"kind":"Field","name":{"kind":"Name","value":"rateLimitExpires"}}]}}]}}]} as unknown as DocumentNode<TftOneClickMessageHistoryQuery, TftOneClickMessageHistoryQueryVariables>;
export const DeleteTftOneClickMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTftOneClickMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTftOneClickMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"messageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}}}]}]}}]} as unknown as DocumentNode<DeleteTftOneClickMessageMutation, DeleteTftOneClickMessageMutationVariables>;
export const PassiveAtlasTreeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PassiveAtlasTree"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"passiveTreeVersion"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"atlasTree"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"passiveTreeVersion"},"value":{"kind":"Variable","name":{"kind":"Name","value":"passiveTreeVersion"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"constants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minX"}},{"kind":"Field","name":{"kind":"Name","value":"minY"}},{"kind":"Field","name":{"kind":"Name","value":"maxX"}},{"kind":"Field","name":{"kind":"Name","value":"maxY"}},{"kind":"Field","name":{"kind":"Name","value":"skillsPerOrbit"}},{"kind":"Field","name":{"kind":"Name","value":"orbitRadii"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodeMap"}},{"kind":"Field","name":{"kind":"Name","value":"connectionMap"}}]}}]}}]} as unknown as DocumentNode<PassiveAtlasTreeQuery, PassiveAtlasTreeQueryVariables>;
export const PassiveTreeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PassiveTree"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"passiveTreeVersion"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"passiveTree"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"passiveTreeVersion"},"value":{"kind":"Variable","name":{"kind":"Name","value":"passiveTreeVersion"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"constants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minX"}},{"kind":"Field","name":{"kind":"Name","value":"minY"}},{"kind":"Field","name":{"kind":"Name","value":"maxX"}},{"kind":"Field","name":{"kind":"Name","value":"maxY"}},{"kind":"Field","name":{"kind":"Name","value":"skillsPerOrbit"}},{"kind":"Field","name":{"kind":"Name","value":"orbitRadii"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodeMap"}},{"kind":"Field","name":{"kind":"Name","value":"connectionMap"}}]}}]}}]} as unknown as DocumentNode<PassiveTreeQuery, PassiveTreeQueryVariables>;
export const StashTabsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StashTabs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"league"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"forcePull"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stashTabs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"league"},"value":{"kind":"Variable","name":{"kind":"Name","value":"league"}}},{"kind":"Argument","name":{"kind":"Name","value":"forcePull"},"value":{"kind":"Variable","name":{"kind":"Name","value":"forcePull"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"league"}},{"kind":"Field","name":{"kind":"Name","value":"parent"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"flatIndex"}}]}}]}}]} as unknown as DocumentNode<StashTabsQuery, StashTabsQueryVariables>;
export const StashViewValueSnapshotSeriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StashViewValueSnapshotSeries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"league"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stashViewValueSnapshotSeries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"league"},"value":{"kind":"Variable","name":{"kind":"Name","value":"league"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stashId"}},{"kind":"Field","name":{"kind":"Name","value":"values"}},{"kind":"Field","name":{"kind":"Name","value":"timestamps"}}]}}]}}]} as unknown as DocumentNode<StashViewValueSnapshotSeriesQuery, StashViewValueSnapshotSeriesQueryVariables>;
export const CurrenyValuePullDivDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrenyValuePullDiv"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"league"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"div"},"name":{"kind":"Name","value":"itemGroupValueChaos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}},{"kind":"Argument","name":{"kind":"Name","value":"league"},"value":{"kind":"Variable","name":{"kind":"Name","value":"league"}}}]}]}}]} as unknown as DocumentNode<CurrenyValuePullDivQuery, CurrenyValuePullDivQueryVariables>;
export const ExchangeAuthCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ExchangeAuthCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exchangeAuthCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"authCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}}}]}]}}]} as unknown as DocumentNode<ExchangeAuthCodeMutation, ExchangeAuthCodeMutationVariables>;
export const MyProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"forcePull"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"poeProfileName"}},{"kind":"Field","name":{"kind":"Name","value":"patreonUserId"}},{"kind":"Field","name":{"kind":"Name","value":"patreonTier"}},{"kind":"Field","name":{"kind":"Name","value":"oAuthTokenUpdatedAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"lastConnectedTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"discordUsername"}},{"kind":"Field","name":{"kind":"Name","value":"discordUserId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAtTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"opaqueKey"}}]}},{"kind":"Field","name":{"kind":"Name","value":"checkTftMembership"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"forcePull"},"value":{"kind":"Variable","name":{"kind":"Name","value":"forcePull"}}}]}]}}]} as unknown as DocumentNode<MyProfileQuery, MyProfileQueryVariables>;
export const RouteChangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RouteChange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"path"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pathname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"routeChange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"path"},"value":{"kind":"Variable","name":{"kind":"Name","value":"path"}}},{"kind":"Argument","name":{"kind":"Name","value":"pathname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pathname"}}}]}]}}]} as unknown as DocumentNode<RouteChangeMutation, RouteChangeMutationVariables>;
export const LoginAsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginAs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginAs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<LoginAsMutation, LoginAsMutationVariables>;
export const UpdateDiscordCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDiscordCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDiscordCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<UpdateDiscordCodeMutation, UpdateDiscordCodeMutationVariables>;
export const PoestackStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PoestackStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"poestackStats"}}]}}]} as unknown as DocumentNode<PoestackStatsQuery, PoestackStatsQueryVariables>;
export const UpdatePatreonCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePatreonCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePatreonCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<UpdatePatreonCodeMutation, UpdatePatreonCodeMutationVariables>;
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