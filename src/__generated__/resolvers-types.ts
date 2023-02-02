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
  JSONObject: any;
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


export type MutationTakeSnapshotArgs = {
  stashSnapshotProfileId: Scalars['String'];
};


export type MutationUpdateStashsnapshotProfileArgs = {
  update: StashSnapshotProfileInput;
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
  globalSearch: GlobalSearchResponse;
  itemGroupTags: Array<Scalars['String']>;
  itemGroupValueChaos: Scalars['Float'];
  itemGroupValueTimeseriesSearch: ItemGroupValueTimeseriesResult;
  myProfile: UserProfile;
  stashSnapshot: StashSnapshot;
  stashSnapshotItemGroupSummaries: StashSnapshotItemGroupSummarySearchResponse;
  stashSnapshotItemGroupSummariesAggregation: StashSnapshotItemGroupSummarySearchAggregationResponse;
  stashSnapshotProfile: StashSnapshotProfile;
  stashSnapshotProfiles: Array<StashSnapshotProfile>;
  stashSnapshots: Array<StashSnapshot>;
  stashTabs: Array<PoeStashTab>;
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
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
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
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  Mutation: ResolverTypeWrapper<{}>;
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
  DateTime: Scalars['DateTime'];
  Float: Scalars['Float'];
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
  JSONObject: Scalars['JSONObject'];
  Mutation: {};
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

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

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

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  deleteSnapshots?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteSnapshotsArgs, 'stashSnapshotIds'>>;
  deleteStashSnapshotProfile?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteStashSnapshotProfileArgs, 'stashSnapshotProfileId'>>;
  exchangeAuthCode?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationExchangeAuthCodeArgs, 'authCode'>>;
  exportStashSnapshot?: Resolver<ResolversTypes['StashSnapshotExport'], ParentType, ContextType, RequireFields<MutationExportStashSnapshotArgs, 'input'>>;
  takeSnapshot?: Resolver<ResolversTypes['StashSnapshot'], ParentType, ContextType, RequireFields<MutationTakeSnapshotArgs, 'stashSnapshotProfileId'>>;
  updateStashsnapshotProfile?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateStashsnapshotProfileArgs, 'update'>>;
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
  globalSearch?: Resolver<ResolversTypes['GlobalSearchResponse'], ParentType, ContextType, RequireFields<QueryGlobalSearchArgs, 'search'>>;
  itemGroupTags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryItemGroupTagsArgs, 'league'>>;
  itemGroupValueChaos?: Resolver<ResolversTypes['Float'], ParentType, ContextType, RequireFields<QueryItemGroupValueChaosArgs, 'key' | 'league'>>;
  itemGroupValueTimeseriesSearch?: Resolver<ResolversTypes['ItemGroupValueTimeseriesResult'], ParentType, ContextType, RequireFields<QueryItemGroupValueTimeseriesSearchArgs, 'search'>>;
  myProfile?: Resolver<ResolversTypes['UserProfile'], ParentType, ContextType>;
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
  DateTime?: GraphQLScalarType;
  GlobalSearchResponse?: GlobalSearchResponseResolvers<ContextType>;
  GlobalSearchResponseEntry?: GlobalSearchResponseEntryResolvers<ContextType>;
  GqlStashSnapshotExportInput?: GqlStashSnapshotExportInputResolvers<ContextType>;
  ItemGroup?: ItemGroupResolvers<ContextType>;
  ItemGroupValueTimeseries?: ItemGroupValueTimeseriesResolvers<ContextType>;
  ItemGroupValueTimeseriesGroupEntry?: ItemGroupValueTimeseriesGroupEntryResolvers<ContextType>;
  ItemGroupValueTimeseriesGroupSeries?: ItemGroupValueTimeseriesGroupSeriesResolvers<ContextType>;
  ItemGroupValueTimeseriesResult?: ItemGroupValueTimeseriesResultResolvers<ContextType>;
  JSONObject?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
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

