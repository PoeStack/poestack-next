import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  DateTime: any;
  JSON: any;
  JSONObject: any;
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
  snapshotId: Scalars['String'];
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
  poeCharacter?: Maybe<PoeCharacter>;
  timestamp: Scalars['DateTime'];
};

export type CharacterSnapshotItem = {
  __typename?: 'CharacterSnapshotItem';
  baseType?: Maybe<Scalars['String']>;
  corrupted?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  explicitMods: Array<Scalars['String']>;
  flavourText: Array<Scalars['String']>;
  frameType: Scalars['Float'];
  gemColor?: Maybe<Scalars['String']>;
  h: Scalars['Float'];
  icon: Scalars['String'];
  id: Scalars['String'];
  ilvl: Scalars['Float'];
  inventoryId?: Maybe<Scalars['String']>;
  itemGroupHashString?: Maybe<Scalars['String']>;
  itemId?: Maybe<Scalars['String']>;
  mainSkill?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  properties: Array<Scalars['JSON']>;
  requirements: Array<Scalars['JSON']>;
  snapshotId: Scalars['String'];
  socket?: Maybe<Scalars['Float']>;
  socketedInId?: Maybe<Scalars['String']>;
  sockets: Array<Scalars['JSON']>;
  support?: Maybe<Scalars['Boolean']>;
  typeLine?: Maybe<Scalars['String']>;
  utilityMods: Array<Scalars['String']>;
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
  snapshotId: Scalars['String'];
  spellBlockChance?: Maybe<Scalars['Float']>;
  str?: Maybe<Scalars['Float']>;
  supression?: Maybe<Scalars['Float']>;
  totalDpsWithIgnite?: Maybe<Scalars['Float']>;
};

export type CharacterSnapshotSearch = {
  excludedKeyStoneNames?: InputMaybe<Array<Scalars['String']>>;
  includedKeyStoneNames?: InputMaybe<Array<Scalars['String']>>;
  league: Scalars['String'];
};

export type CharacterSnapshotSearchAggregationsResponse = {
  __typename?: 'CharacterSnapshotSearchAggregationsResponse';
  characterClassAggregation?: Maybe<GenericAggregation>;
  keystoneAggregation?: Maybe<GenericAggregation>;
  mainSkillAggreagtion?: Maybe<GenericAggregation>;
};

export type CharacterSnapshotSearchResponse = {
  __typename?: 'CharacterSnapshotSearchResponse';
  hasMore: Scalars['Boolean'];
  snapshots: Array<CharacterSnapshot>;
};

export type GenericAggregation = {
  __typename?: 'GenericAggregation';
  values: Array<GenericIntKeyValue>;
};

export type GenericIntKeyValue = {
  __typename?: 'GenericIntKeyValue';
  key: Scalars['String'];
  value: Scalars['Float'];
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

export type GqlStashSnapshotExportInput = {
  __typename?: 'GqlStashSnapshotExportInput';
  absoluteMinValueChaos: Scalars['Float'];
  alwaysPriceInChaos: Scalars['Boolean'];
  exportType: Scalars['String'];
  ign: Scalars['String'];
  itemGroupValueOverrides: Array<StashSnapshotExportItemValueOverride>;
  listedValueMultiplier: Scalars['Float'];
  maxStackSizeSetting: Scalars['String'];
  save: Scalars['Boolean'];
  search: StashSnapshotItemGroupSummarySearch;
  stashIndexOffset: Scalars['Float'];
  visualDecimalPrecision: Scalars['Float'];
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
  league: Scalars['String'];
  properties: Array<Scalars['JSONObject']>;
  tag: Scalars['String'];
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
  itemGroupSearch: ItemGroupSearchInput;
  seriesTypes: Array<Scalars['String']>;
  stockStartingRanges: Array<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteSnapshots: Scalars['Boolean'];
  deleteStashSnapshotProfile: Scalars['Boolean'];
  exchangeAuthCode: Scalars['String'];
  exportStashSnapshot: StashSnapshotExport;
  refreshPoeCharacters: Scalars['Boolean'];
  takeCharacterSnapshot: Scalars['Boolean'];
  takeSnapshot: StashSnapshot;
  updateStashsnapshotProfile: Scalars['Boolean'];
};


export type MutationDeleteSnapshotsArgs = {
  stashSnapshotIds: Array<Scalars['String']>;
};


export type MutationDeleteStashSnapshotProfileArgs = {
  stashSnapshotProfileId: Scalars['String'];
};


export type MutationExchangeAuthCodeArgs = {
  authCode: Scalars['String'];
};


export type MutationExportStashSnapshotArgs = {
  input: StashSnapshotExportInput;
};


export type MutationTakeCharacterSnapshotArgs = {
  characterId: Scalars['String'];
};


export type MutationTakeSnapshotArgs = {
  stashSnapshotProfileId: Scalars['String'];
};


export type MutationUpdateStashsnapshotProfileArgs = {
  update: StashSnapshotProfileInput;
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
  lastSnapshotTimestamp?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  userId: Scalars['String'];
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
  characterSnapshot: CharacterSnapshot;
  characterSnapshots: Array<CharacterSnapshot>;
  characterSnapshotsSearch: CharacterSnapshotSearchResponse;
  characterSnapshotsSearchAggregations: CharacterSnapshotSearchAggregationsResponse;
  globalSearch: GlobalSearchResponse;
  itemGroupTags: Array<Scalars['String']>;
  itemGroupValueChaos: Scalars['Float'];
  itemGroupValueTimeseriesSearch: ItemGroupValueTimeseriesResult;
  myProfile: UserProfile;
  passiveTree: PassiveTreeResponse;
  poeCharacters: Array<PoeCharacter>;
  stashSnapshot: StashSnapshot;
  stashSnapshotItemGroupSummaries: StashSnapshotItemGroupSummarySearchResponse;
  stashSnapshotItemGroupSummariesAggregation: StashSnapshotItemGroupSummarySearchAggregationResponse;
  stashSnapshotProfile: StashSnapshotProfile;
  stashSnapshotProfiles: Array<StashSnapshotProfile>;
  stashSnapshots: Array<StashSnapshot>;
  stashTabs: Array<PoeStashTab>;
};


export type QueryCharacterSnapshotArgs = {
  characterId: Scalars['String'];
  snapshotId: Scalars['String'];
};


export type QueryCharacterSnapshotsArgs = {
  characterId: Scalars['String'];
};


export type QueryCharacterSnapshotsSearchArgs = {
  search: CharacterSnapshotSearch;
};


export type QueryCharacterSnapshotsSearchAggregationsArgs = {
  search: CharacterSnapshotSearch;
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


export type QueryPassiveTreeArgs = {
  passiveTreeVersion: Scalars['String'];
};


export type QueryPoeCharactersArgs = {
  league: Scalars['String'];
  userId: Scalars['String'];
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

export type StashLocation = {
  __typename?: 'StashLocation';
  flatIndex: Scalars['Float'];
  index: Scalars['Float'];
  name: Scalars['String'];
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
  snapshotProfileId: Scalars['String'];
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
  input: GqlStashSnapshotExportInput;
  itemGroupSummaries: Array<StashSnapshotItemGroupSummary>;
  totalValueChaos: Scalars['Float'];
  userId: Scalars['String'];
};

export type StashSnapshotExportInput = {
  absoluteMinValueChaos: Scalars['Float'];
  alwaysPriceInChaos: Scalars['Boolean'];
  exportType: Scalars['String'];
  ign: Scalars['String'];
  itemGroupValueOverrides: Array<StashSnapshotExportItemValueOverrideInput>;
  listedValueMultiplier: Scalars['Float'];
  maxStackSizeSetting: Scalars['String'];
  save: Scalars['Boolean'];
  search: StashSnapshotItemGroupSummarySearchInput;
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
  profileId: Scalars['String'];
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
  profileId: Scalars['String'];
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
  lastSnapshotTimestamp?: Maybe<Scalars['DateTime']>;
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

export type UserProfile = {
  __typename?: 'UserProfile';
  createdAtTimestamp: Scalars['DateTime'];
  lastConnectedTimestamp: Scalars['DateTime'];
  oAuthTokenUpdatedAtTimestamp: Scalars['DateTime'];
  poeProfileName: Scalars['String'];
  userId: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CharacterPassivesSnapshot: ResolverTypeWrapper<CharacterPassivesSnapshot>;
  CharacterSnapshot: ResolverTypeWrapper<CharacterSnapshot>;
  CharacterSnapshotItem: ResolverTypeWrapper<CharacterSnapshotItem>;
  CharacterSnapshotPobStats: ResolverTypeWrapper<CharacterSnapshotPobStats>;
  CharacterSnapshotSearch: CharacterSnapshotSearch;
  CharacterSnapshotSearchAggregationsResponse: ResolverTypeWrapper<CharacterSnapshotSearchAggregationsResponse>;
  CharacterSnapshotSearchResponse: ResolverTypeWrapper<CharacterSnapshotSearchResponse>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GenericAggregation: ResolverTypeWrapper<GenericAggregation>;
  GenericIntKeyValue: ResolverTypeWrapper<GenericIntKeyValue>;
  GlobalSearch: GlobalSearch;
  GlobalSearchResponse: ResolverTypeWrapper<GlobalSearchResponse>;
  GlobalSearchResponseEntry: ResolverTypeWrapper<GlobalSearchResponseEntry>;
  GqlStashSnapshotExportInput: ResolverTypeWrapper<GqlStashSnapshotExportInput>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ItemGroup: ResolverTypeWrapper<ItemGroup>;
  ItemGroupSearchInput: ItemGroupSearchInput;
  ItemGroupValueTimeseries: ResolverTypeWrapper<ItemGroupValueTimeseries>;
  ItemGroupValueTimeseriesGroupEntry: ResolverTypeWrapper<ItemGroupValueTimeseriesGroupEntry>;
  ItemGroupValueTimeseriesGroupSeries: ResolverTypeWrapper<ItemGroupValueTimeseriesGroupSeries>;
  ItemGroupValueTimeseriesResult: ResolverTypeWrapper<ItemGroupValueTimeseriesResult>;
  ItemGroupValueTimeseriesSearchInput: ItemGroupValueTimeseriesSearchInput;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  Mutation: ResolverTypeWrapper<{}>;
  PassiveTreeConnection: ResolverTypeWrapper<PassiveTreeConnection>;
  PassiveTreeConstants: ResolverTypeWrapper<PassiveTreeConstants>;
  PassiveTreeNode: ResolverTypeWrapper<PassiveTreeNode>;
  PassiveTreeResponse: ResolverTypeWrapper<PassiveTreeResponse>;
  PoeCharacter: ResolverTypeWrapper<PoeCharacter>;
  PoeStashTab: ResolverTypeWrapper<PoeStashTab>;
  Query: ResolverTypeWrapper<{}>;
  StashLocation: ResolverTypeWrapper<StashLocation>;
  StashSnapshot: ResolverTypeWrapper<StashSnapshot>;
  StashSnapshotExport: ResolverTypeWrapper<StashSnapshotExport>;
  StashSnapshotExportInput: StashSnapshotExportInput;
  StashSnapshotExportItemValueOverride: ResolverTypeWrapper<StashSnapshotExportItemValueOverride>;
  StashSnapshotExportItemValueOverrideInput: StashSnapshotExportItemValueOverrideInput;
  StashSnapshotItemGroupSearchSummaryAggregationEntry: ResolverTypeWrapper<StashSnapshotItemGroupSearchSummaryAggregationEntry>;
  StashSnapshotItemGroupSummary: ResolverTypeWrapper<StashSnapshotItemGroupSummary>;
  StashSnapshotItemGroupSummarySearch: ResolverTypeWrapper<StashSnapshotItemGroupSummarySearch>;
  StashSnapshotItemGroupSummarySearchAggregationResponse: ResolverTypeWrapper<StashSnapshotItemGroupSummarySearchAggregationResponse>;
  StashSnapshotItemGroupSummarySearchInput: StashSnapshotItemGroupSummarySearchInput;
  StashSnapshotItemGroupSummarySearchResponse: ResolverTypeWrapper<StashSnapshotItemGroupSummarySearchResponse>;
  StashSnapshotProfile: ResolverTypeWrapper<StashSnapshotProfile>;
  StashSnapshotProfileInput: StashSnapshotProfileInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  UserProfile: ResolverTypeWrapper<UserProfile>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigInt: Scalars['BigInt'];
  Boolean: Scalars['Boolean'];
  CharacterPassivesSnapshot: CharacterPassivesSnapshot;
  CharacterSnapshot: CharacterSnapshot;
  CharacterSnapshotItem: CharacterSnapshotItem;
  CharacterSnapshotPobStats: CharacterSnapshotPobStats;
  CharacterSnapshotSearch: CharacterSnapshotSearch;
  CharacterSnapshotSearchAggregationsResponse: CharacterSnapshotSearchAggregationsResponse;
  CharacterSnapshotSearchResponse: CharacterSnapshotSearchResponse;
  DateTime: Scalars['DateTime'];
  Float: Scalars['Float'];
  GenericAggregation: GenericAggregation;
  GenericIntKeyValue: GenericIntKeyValue;
  GlobalSearch: GlobalSearch;
  GlobalSearchResponse: GlobalSearchResponse;
  GlobalSearchResponseEntry: GlobalSearchResponseEntry;
  GqlStashSnapshotExportInput: GqlStashSnapshotExportInput;
  Int: Scalars['Int'];
  ItemGroup: ItemGroup;
  ItemGroupSearchInput: ItemGroupSearchInput;
  ItemGroupValueTimeseries: ItemGroupValueTimeseries;
  ItemGroupValueTimeseriesGroupEntry: ItemGroupValueTimeseriesGroupEntry;
  ItemGroupValueTimeseriesGroupSeries: ItemGroupValueTimeseriesGroupSeries;
  ItemGroupValueTimeseriesResult: ItemGroupValueTimeseriesResult;
  ItemGroupValueTimeseriesSearchInput: ItemGroupValueTimeseriesSearchInput;
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  Mutation: {};
  PassiveTreeConnection: PassiveTreeConnection;
  PassiveTreeConstants: PassiveTreeConstants;
  PassiveTreeNode: PassiveTreeNode;
  PassiveTreeResponse: PassiveTreeResponse;
  PoeCharacter: PoeCharacter;
  PoeStashTab: PoeStashTab;
  Query: {};
  StashLocation: StashLocation;
  StashSnapshot: StashSnapshot;
  StashSnapshotExport: StashSnapshotExport;
  StashSnapshotExportInput: StashSnapshotExportInput;
  StashSnapshotExportItemValueOverride: StashSnapshotExportItemValueOverride;
  StashSnapshotExportItemValueOverrideInput: StashSnapshotExportItemValueOverrideInput;
  StashSnapshotItemGroupSearchSummaryAggregationEntry: StashSnapshotItemGroupSearchSummaryAggregationEntry;
  StashSnapshotItemGroupSummary: StashSnapshotItemGroupSummary;
  StashSnapshotItemGroupSummarySearch: StashSnapshotItemGroupSummarySearch;
  StashSnapshotItemGroupSummarySearchAggregationResponse: StashSnapshotItemGroupSummarySearchAggregationResponse;
  StashSnapshotItemGroupSummarySearchInput: StashSnapshotItemGroupSummarySearchInput;
  StashSnapshotItemGroupSummarySearchResponse: StashSnapshotItemGroupSummarySearchResponse;
  StashSnapshotProfile: StashSnapshotProfile;
  StashSnapshotProfileInput: StashSnapshotProfileInput;
  String: Scalars['String'];
  UserProfile: UserProfile;
}>;

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type CharacterPassivesSnapshotResolvers<ContextType = any, ParentType extends ResolversParentTypes['CharacterPassivesSnapshot'] = ResolversParentTypes['CharacterPassivesSnapshot']> = ResolversObject<{
  banditChoice?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hashes?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  hashesEx?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  jewelData?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  masteryEffects?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  pantheonMajor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pantheonMinor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  snapshotId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CharacterSnapshotResolvers<ContextType = any, ParentType extends ResolversParentTypes['CharacterSnapshot'] = ResolversParentTypes['CharacterSnapshot']> = ResolversObject<{
  characterClass?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  characterId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  characterPassivesSnapshot?: Resolver<Maybe<ResolversTypes['CharacterPassivesSnapshot']>, ParentType, ContextType>;
  characterSnapshotItems?: Resolver<Maybe<Array<ResolversTypes['CharacterSnapshotItem']>>, ParentType, ContextType>;
  characterSnapshotPobStats?: Resolver<Maybe<ResolversTypes['CharacterSnapshotPobStats']>, ParentType, ContextType>;
  current?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  experience?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  league?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  poeCharacter?: Resolver<Maybe<ResolversTypes['PoeCharacter']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CharacterSnapshotItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['CharacterSnapshotItem'] = ResolversParentTypes['CharacterSnapshotItem']> = ResolversObject<{
  baseType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  corrupted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  explicitMods?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  flavourText?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  frameType?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  gemColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  h?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ilvl?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  inventoryId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  itemGroupHashString?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  itemId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mainSkill?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  properties?: Resolver<Array<ResolversTypes['JSON']>, ParentType, ContextType>;
  requirements?: Resolver<Array<ResolversTypes['JSON']>, ParentType, ContextType>;
  snapshotId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  socket?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  socketedInId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sockets?: Resolver<Array<ResolversTypes['JSON']>, ParentType, ContextType>;
  support?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  typeLine?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  utilityMods?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  w?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CharacterSnapshotPobStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CharacterSnapshotPobStats'] = ResolversParentTypes['CharacterSnapshotPobStats']> = ResolversObject<{
  accuracy?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  armour?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  blockChance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  chaosResist?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  coldResist?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  dex?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  energyShield?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  evasion?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  fireResist?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  int?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  life?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  lightningResist?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  mana?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  pobCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  snapshotId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  spellBlockChance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  str?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  supression?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalDpsWithIgnite?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CharacterSnapshotSearchAggregationsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CharacterSnapshotSearchAggregationsResponse'] = ResolversParentTypes['CharacterSnapshotSearchAggregationsResponse']> = ResolversObject<{
  characterClassAggregation?: Resolver<Maybe<ResolversTypes['GenericAggregation']>, ParentType, ContextType>;
  keystoneAggregation?: Resolver<Maybe<ResolversTypes['GenericAggregation']>, ParentType, ContextType>;
  mainSkillAggreagtion?: Resolver<Maybe<ResolversTypes['GenericAggregation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CharacterSnapshotSearchResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CharacterSnapshotSearchResponse'] = ResolversParentTypes['CharacterSnapshotSearchResponse']> = ResolversObject<{
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  snapshots?: Resolver<Array<ResolversTypes['CharacterSnapshot']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GenericAggregationResolvers<ContextType = any, ParentType extends ResolversParentTypes['GenericAggregation'] = ResolversParentTypes['GenericAggregation']> = ResolversObject<{
  values?: Resolver<Array<ResolversTypes['GenericIntKeyValue']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GenericIntKeyValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['GenericIntKeyValue'] = ResolversParentTypes['GenericIntKeyValue']> = ResolversObject<{
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GlobalSearchResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GlobalSearchResponse'] = ResolversParentTypes['GlobalSearchResponse']> = ResolversObject<{
  results?: Resolver<Array<ResolversTypes['GlobalSearchResponseEntry']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GlobalSearchResponseEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['GlobalSearchResponseEntry'] = ResolversParentTypes['GlobalSearchResponseEntry']> = ResolversObject<{
  display?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  group?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  target?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GqlStashSnapshotExportInputResolvers<ContextType = any, ParentType extends ResolversParentTypes['GqlStashSnapshotExportInput'] = ResolversParentTypes['GqlStashSnapshotExportInput']> = ResolversObject<{
  absoluteMinValueChaos?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  alwaysPriceInChaos?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  exportType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ign?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  itemGroupValueOverrides?: Resolver<Array<ResolversTypes['StashSnapshotExportItemValueOverride']>, ParentType, ContextType>;
  listedValueMultiplier?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  maxStackSizeSetting?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  save?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  search?: Resolver<ResolversTypes['StashSnapshotItemGroupSummarySearch'], ParentType, ContextType>;
  stashIndexOffset?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  visualDecimalPrecision?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ItemGroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['ItemGroup'] = ResolversParentTypes['ItemGroup']> = ResolversObject<{
  baseType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAtTimestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hashString?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  inventoryMaxStackSize?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  league?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  properties?: Resolver<Array<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  tag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ItemGroupValueTimeseriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ItemGroupValueTimeseries'] = ResolversParentTypes['ItemGroupValueTimeseries']> = ResolversObject<{
  itemGroup?: Resolver<ResolversTypes['ItemGroup'], ParentType, ContextType>;
  series?: Resolver<Array<ResolversTypes['ItemGroupValueTimeseriesGroupSeries']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ItemGroupValueTimeseriesGroupEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ItemGroupValueTimeseriesGroupEntry'] = ResolversParentTypes['ItemGroupValueTimeseriesGroupEntry']> = ResolversObject<{
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ItemGroupValueTimeseriesGroupSeriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ItemGroupValueTimeseriesGroupSeries'] = ResolversParentTypes['ItemGroupValueTimeseriesGroupSeries']> = ResolversObject<{
  entries?: Resolver<Array<ResolversTypes['ItemGroupValueTimeseriesGroupEntry']>, ParentType, ContextType>;
  stockRangeStartInclusive?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ItemGroupValueTimeseriesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ItemGroupValueTimeseriesResult'] = ResolversParentTypes['ItemGroupValueTimeseriesResult']> = ResolversObject<{
  results?: Resolver<Array<ResolversTypes['ItemGroupValueTimeseries']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  deleteSnapshots?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteSnapshotsArgs, 'stashSnapshotIds'>>;
  deleteStashSnapshotProfile?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteStashSnapshotProfileArgs, 'stashSnapshotProfileId'>>;
  exchangeAuthCode?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationExchangeAuthCodeArgs, 'authCode'>>;
  exportStashSnapshot?: Resolver<ResolversTypes['StashSnapshotExport'], ParentType, ContextType, RequireFields<MutationExportStashSnapshotArgs, 'input'>>;
  refreshPoeCharacters?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  takeCharacterSnapshot?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationTakeCharacterSnapshotArgs, 'characterId'>>;
  takeSnapshot?: Resolver<ResolversTypes['StashSnapshot'], ParentType, ContextType, RequireFields<MutationTakeSnapshotArgs, 'stashSnapshotProfileId'>>;
  updateStashsnapshotProfile?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateStashsnapshotProfileArgs, 'update'>>;
}>;

export type PassiveTreeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PassiveTreeConnection'] = ResolversParentTypes['PassiveTreeConnection']> = ResolversObject<{
  curved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  fromNode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  toNode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PassiveTreeConstantsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PassiveTreeConstants'] = ResolversParentTypes['PassiveTreeConstants']> = ResolversObject<{
  maxX?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  maxY?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  minX?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  minY?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  orbitRadii?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  skillsPerOrbit?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PassiveTreeNodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PassiveTreeNode'] = ResolversParentTypes['PassiveTreeNode']> = ResolversObject<{
  activeEffectImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  activeIcon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ascendancyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  flavourText?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  group?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  in?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  inactiveIcon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isJewelSocket?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isKeystone?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isMastery?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isMultipleChoiceOption?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isNotable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  masteryEffects?: Resolver<Maybe<Array<ResolversTypes['JSON']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orbit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  orbitIndex?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  out?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  recipe?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  reminderText?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  stats?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  x?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  y?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PassiveTreeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PassiveTreeResponse'] = ResolversParentTypes['PassiveTreeResponse']> = ResolversObject<{
  allConnections?: Resolver<Maybe<Array<ResolversTypes['PassiveTreeConnection']>>, ParentType, ContextType>;
  allNodes?: Resolver<Maybe<Array<ResolversTypes['PassiveTreeNode']>>, ParentType, ContextType>;
  connectionMap?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  constants?: Resolver<ResolversTypes['PassiveTreeConstants'], ParentType, ContextType>;
  nodeMap?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PoeCharacterResolvers<ContextType = any, ParentType extends ResolversParentTypes['PoeCharacter'] = ResolversParentTypes['PoeCharacter']> = ResolversObject<{
  createdAtTimestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastSnapshotTimestamp?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PoeStashTabResolvers<ContextType = any, ParentType extends ResolversParentTypes['PoeStashTab'] = ResolversParentTypes['PoeStashTab']> = ResolversObject<{
  flatIndex?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  league?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  characterSnapshot?: Resolver<ResolversTypes['CharacterSnapshot'], ParentType, ContextType, RequireFields<QueryCharacterSnapshotArgs, 'characterId' | 'snapshotId'>>;
  characterSnapshots?: Resolver<Array<ResolversTypes['CharacterSnapshot']>, ParentType, ContextType, RequireFields<QueryCharacterSnapshotsArgs, 'characterId'>>;
  characterSnapshotsSearch?: Resolver<ResolversTypes['CharacterSnapshotSearchResponse'], ParentType, ContextType, RequireFields<QueryCharacterSnapshotsSearchArgs, 'search'>>;
  characterSnapshotsSearchAggregations?: Resolver<ResolversTypes['CharacterSnapshotSearchAggregationsResponse'], ParentType, ContextType, RequireFields<QueryCharacterSnapshotsSearchAggregationsArgs, 'search'>>;
  globalSearch?: Resolver<ResolversTypes['GlobalSearchResponse'], ParentType, ContextType, RequireFields<QueryGlobalSearchArgs, 'search'>>;
  itemGroupTags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryItemGroupTagsArgs, 'league'>>;
  itemGroupValueChaos?: Resolver<ResolversTypes['Float'], ParentType, ContextType, RequireFields<QueryItemGroupValueChaosArgs, 'key' | 'league'>>;
  itemGroupValueTimeseriesSearch?: Resolver<ResolversTypes['ItemGroupValueTimeseriesResult'], ParentType, ContextType, RequireFields<QueryItemGroupValueTimeseriesSearchArgs, 'search'>>;
  myProfile?: Resolver<ResolversTypes['UserProfile'], ParentType, ContextType>;
  passiveTree?: Resolver<ResolversTypes['PassiveTreeResponse'], ParentType, ContextType, RequireFields<QueryPassiveTreeArgs, 'passiveTreeVersion'>>;
  poeCharacters?: Resolver<Array<ResolversTypes['PoeCharacter']>, ParentType, ContextType, RequireFields<QueryPoeCharactersArgs, 'league' | 'userId'>>;
  stashSnapshot?: Resolver<ResolversTypes['StashSnapshot'], ParentType, ContextType, RequireFields<QueryStashSnapshotArgs, 'stashSnapshotId' | 'stashSnapshotProfileId'>>;
  stashSnapshotItemGroupSummaries?: Resolver<ResolversTypes['StashSnapshotItemGroupSummarySearchResponse'], ParentType, ContextType, RequireFields<QueryStashSnapshotItemGroupSummariesArgs, 'search'>>;
  stashSnapshotItemGroupSummariesAggregation?: Resolver<ResolversTypes['StashSnapshotItemGroupSummarySearchAggregationResponse'], ParentType, ContextType, RequireFields<QueryStashSnapshotItemGroupSummariesAggregationArgs, 'aggregation' | 'search'>>;
  stashSnapshotProfile?: Resolver<ResolversTypes['StashSnapshotProfile'], ParentType, ContextType, RequireFields<QueryStashSnapshotProfileArgs, 'snapshotProfileId'>>;
  stashSnapshotProfiles?: Resolver<Array<ResolversTypes['StashSnapshotProfile']>, ParentType, ContextType>;
  stashSnapshots?: Resolver<Array<ResolversTypes['StashSnapshot']>, ParentType, ContextType, RequireFields<QueryStashSnapshotsArgs, 'stashSnapshotProfileId'>>;
  stashTabs?: Resolver<Array<ResolversTypes['PoeStashTab']>, ParentType, ContextType, RequireFields<QueryStashTabsArgs, 'league'>>;
}>;

export type StashLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['StashLocation'] = ResolversParentTypes['StashLocation']> = ResolversObject<{
  flatIndex?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tabId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  x?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  y?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StashSnapshotResolvers<ContextType = any, ParentType extends ResolversParentTypes['StashSnapshot'] = ResolversParentTypes['StashSnapshot']> = ResolversObject<{
  createdAtTimestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  divineChaosValue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  exaltChaosValue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  league?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  snapshotProfileId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  totalValueChaos?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StashSnapshotExportResolvers<ContextType = any, ParentType extends ResolversParentTypes['StashSnapshotExport'] = ResolversParentTypes['StashSnapshotExport']> = ResolversObject<{
  createdAtTimestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  divineChaosValue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  exportRaw?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  input?: Resolver<ResolversTypes['GqlStashSnapshotExportInput'], ParentType, ContextType>;
  itemGroupSummaries?: Resolver<Array<ResolversTypes['StashSnapshotItemGroupSummary']>, ParentType, ContextType>;
  totalValueChaos?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StashSnapshotExportItemValueOverrideResolvers<ContextType = any, ParentType extends ResolversParentTypes['StashSnapshotExportItemValueOverride'] = ResolversParentTypes['StashSnapshotExportItemValueOverride']> = ResolversObject<{
  itemGroupHashString?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueChaos?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StashSnapshotItemGroupSearchSummaryAggregationEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['StashSnapshotItemGroupSearchSummaryAggregationEntry'] = ResolversParentTypes['StashSnapshotItemGroupSearchSummaryAggregationEntry']> = ResolversObject<{
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  matches?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StashSnapshotItemGroupSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['StashSnapshotItemGroupSummary'] = ResolversParentTypes['StashSnapshotItemGroupSummary']> = ResolversObject<{
  createdAtTimestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  itemGroup?: Resolver<Maybe<ResolversTypes['ItemGroup']>, ParentType, ContextType>;
  itemGroupHashString?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  stashLocations?: Resolver<Array<ResolversTypes['StashLocation']>, ParentType, ContextType>;
  stashSnapshot?: Resolver<Maybe<ResolversTypes['StashSnapshot']>, ParentType, ContextType>;
  stashSnapshotId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalValueChaos?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueChaos?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StashSnapshotItemGroupSummarySearchResolvers<ContextType = any, ParentType extends ResolversParentTypes['StashSnapshotItemGroupSummarySearch'] = ResolversParentTypes['StashSnapshotItemGroupSummarySearch']> = ResolversObject<{
  excludedItemGroupHashStrings?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  keys?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  limit?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  minTotalValueChaos?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  minValueChaos?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  searchstring?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  skip?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  snapshotId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sortDirection?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sortKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StashSnapshotItemGroupSummarySearchAggregationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['StashSnapshotItemGroupSummarySearchAggregationResponse'] = ResolversParentTypes['StashSnapshotItemGroupSummarySearchAggregationResponse']> = ResolversObject<{
  entries?: Resolver<Array<ResolversTypes['StashSnapshotItemGroupSearchSummaryAggregationEntry']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StashSnapshotItemGroupSummarySearchResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['StashSnapshotItemGroupSummarySearchResponse'] = ResolversParentTypes['StashSnapshotItemGroupSummarySearchResponse']> = ResolversObject<{
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  itemGroupSummaries?: Resolver<Array<ResolversTypes['StashSnapshotItemGroupSummary']>, ParentType, ContextType>;
  totalValueChaos?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StashSnapshotProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['StashSnapshotProfile'] = ResolversParentTypes['StashSnapshotProfile']> = ResolversObject<{
  automaticSnapshotIntervalSeconds?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAtTimestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastSnapshotTimestamp?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  league?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  poeStashTabIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  public?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valuationStockInfluence?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valuationTargetPValue?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProfile'] = ResolversParentTypes['UserProfile']> = ResolversObject<{
  createdAtTimestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  lastConnectedTimestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  oAuthTokenUpdatedAtTimestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  poeProfileName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  BigInt?: GraphQLScalarType;
  CharacterPassivesSnapshot?: CharacterPassivesSnapshotResolvers<ContextType>;
  CharacterSnapshot?: CharacterSnapshotResolvers<ContextType>;
  CharacterSnapshotItem?: CharacterSnapshotItemResolvers<ContextType>;
  CharacterSnapshotPobStats?: CharacterSnapshotPobStatsResolvers<ContextType>;
  CharacterSnapshotSearchAggregationsResponse?: CharacterSnapshotSearchAggregationsResponseResolvers<ContextType>;
  CharacterSnapshotSearchResponse?: CharacterSnapshotSearchResponseResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  GenericAggregation?: GenericAggregationResolvers<ContextType>;
  GenericIntKeyValue?: GenericIntKeyValueResolvers<ContextType>;
  GlobalSearchResponse?: GlobalSearchResponseResolvers<ContextType>;
  GlobalSearchResponseEntry?: GlobalSearchResponseEntryResolvers<ContextType>;
  GqlStashSnapshotExportInput?: GqlStashSnapshotExportInputResolvers<ContextType>;
  ItemGroup?: ItemGroupResolvers<ContextType>;
  ItemGroupValueTimeseries?: ItemGroupValueTimeseriesResolvers<ContextType>;
  ItemGroupValueTimeseriesGroupEntry?: ItemGroupValueTimeseriesGroupEntryResolvers<ContextType>;
  ItemGroupValueTimeseriesGroupSeries?: ItemGroupValueTimeseriesGroupSeriesResolvers<ContextType>;
  ItemGroupValueTimeseriesResult?: ItemGroupValueTimeseriesResultResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  PassiveTreeConnection?: PassiveTreeConnectionResolvers<ContextType>;
  PassiveTreeConstants?: PassiveTreeConstantsResolvers<ContextType>;
  PassiveTreeNode?: PassiveTreeNodeResolvers<ContextType>;
  PassiveTreeResponse?: PassiveTreeResponseResolvers<ContextType>;
  PoeCharacter?: PoeCharacterResolvers<ContextType>;
  PoeStashTab?: PoeStashTabResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  StashLocation?: StashLocationResolvers<ContextType>;
  StashSnapshot?: StashSnapshotResolvers<ContextType>;
  StashSnapshotExport?: StashSnapshotExportResolvers<ContextType>;
  StashSnapshotExportItemValueOverride?: StashSnapshotExportItemValueOverrideResolvers<ContextType>;
  StashSnapshotItemGroupSearchSummaryAggregationEntry?: StashSnapshotItemGroupSearchSummaryAggregationEntryResolvers<ContextType>;
  StashSnapshotItemGroupSummary?: StashSnapshotItemGroupSummaryResolvers<ContextType>;
  StashSnapshotItemGroupSummarySearch?: StashSnapshotItemGroupSummarySearchResolvers<ContextType>;
  StashSnapshotItemGroupSummarySearchAggregationResponse?: StashSnapshotItemGroupSummarySearchAggregationResponseResolvers<ContextType>;
  StashSnapshotItemGroupSummarySearchResponse?: StashSnapshotItemGroupSummarySearchResponseResolvers<ContextType>;
  StashSnapshotProfile?: StashSnapshotProfileResolvers<ContextType>;
  UserProfile?: UserProfileResolvers<ContextType>;
}>;

