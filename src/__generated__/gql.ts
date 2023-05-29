/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n      mutation StashViewOneClickPost($input: StashViewSettings!) {\n        stashViewOneClickPost(input: $input)\n      }\n    ": types.StashViewOneClickPostDocument,
    "\n      mutation StashViewOneClickMessage($input: StashViewSettings!) {\n        stashViewOneClickMessage(input: $input)\n      }\n    ": types.StashViewOneClickMessageDocument,
    "\n      query LivePriceSimple($config: LivePricingSimpleConfig!) {\n        livePriceSimple(config: $config) {\n          allListingsLength\n          stockValuation {\n            value\n          }\n          valuation {\n            value\n            validListings {\n              listedAtTimestamp\n              quantity\n              listedValue\n            }\n          }\n        }\n      }\n    ": types.LivePriceSimpleDocument,
    "\n      query LivePricingHistories($config: LivePricingHistoryConfig!) {\n        livePricingHistory(config: $config) {\n          results {\n            itemGroup {\n              hashString\n            }\n            series {\n              type\n              stockRangeStartInclusive\n              entries {\n                timestamp\n                value\n              }\n            }\n          }\n        }\n      }\n    ": types.LivePricingHistoriesDocument,
    "\n    mutation TakeStashViewSanpshot($input: StashViewSnapshotInput!) {\n      stashViewSnapshot(input: $input)\n    }\n  ": types.TakeStashViewSanpshotDocument,
    "\n      query StashViewJobStat($jobId: String!) {\n        stashViewJobStat(jobId: $jobId) {\n          id\n          userId\n          status\n          timestamp\n          rateLimitEndTimestamp\n        }\n      }\n    ": types.StashViewJobStatDocument,
    "\n      mutation StashViewUpdateSnapshotRecord(\n        $input: StashViewSnapshotRecordUpdateInput!\n      ) {\n        stashViewUpdateSnapshotRecord(input: $input)\n      }\n    ": types.StashViewUpdateSnapshotRecordDocument,
    "\n    mutation UpdatePreferenceListingPercent($listingPercent: Float!) {\n      updatePreferenceListingPercent(listingPercent: $listingPercent)\n    }\n  ": types.UpdatePreferenceListingPercentDocument,
    "\n      query TftFiveWayLiveListings {\n        tftLiveListings {\n          messageId\n          userDiscordId\n          userDiscordName\n          userDiscordDisplayRole\n          userDiscordDisplayRoleColor\n          userDiscordHighestRole\n          updatedAtTimestamp\n          body\n          properties\n        }\n      }\n    ": types.TftFiveWayLiveListingsDocument,
    "\n      query TftLiveListingSearch($search: TftLiveListingSearch!) {\n        tftLiveListingSearch(search: $search) {\n          channelId\n          messageId\n          userDiscordId\n          userDiscordName\n          userDiscordDisplayRole\n          userDiscordHighestRole\n          userDiscordDisplayRoleColor\n          updatedAtTimestamp\n          delistedAtTimestamp\n          tag\n          properties\n        }\n      }\n    ": types.TftLiveListingSearchDocument,
    "\n      query TftOneClickMessageHistory {\n        tftOneClickMessageHistory {\n          messageId\n          channelId\n          userId\n          timestamp\n          exportType\n          exportSubType\n          rateLimitExpires\n        }\n      }\n    ": types.TftOneClickMessageHistoryDocument,
    "\n      mutation DeleteTftOneClickMessage($messageId: String!) {\n        deleteTftOneClickMessage(messageId: $messageId)\n      }\n    ": types.DeleteTftOneClickMessageDocument,
    "\n  query PassiveAtlasTree($passiveTreeVersion: String!) {\n    atlasTree(passiveTreeVersion: $passiveTreeVersion) {\n      constants {\n        minX\n        minY\n        maxX\n        maxY\n        skillsPerOrbit\n        orbitRadii\n      }\n      nodeMap\n      connectionMap\n    }\n  }\n": types.PassiveAtlasTreeDocument,
    "\n  query PassiveTree($passiveTreeVersion: String!) {\n    passiveTree(passiveTreeVersion: $passiveTreeVersion) {\n      constants {\n        minX\n        minY\n        maxX\n        maxY\n        skillsPerOrbit\n        orbitRadii\n      }\n      nodeMap\n      connectionMap\n    }\n  }\n": types.PassiveTreeDocument,
    "\n      query LivePriceDivConvSimple($config: LivePricingSimpleConfig!) {\n        livePriceSimple(config: $config) {\n          valuation {\n            value\n          }\n        }\n      }\n    ": types.LivePriceDivConvSimpleDocument,
    "\n      query LivePricingHistoriesDivs($config: LivePricingHistoryConfig!) {\n        livePricingHistory(config: $config) {\n          results {\n            series {\n              type\n              stockRangeStartInclusive\n              entries {\n                timestamp\n                value\n              }\n            }\n          }\n        }\n      }\n    ": types.LivePricingHistoriesDivsDocument,
    "\n      query StashViewSnapshotRecords($league: String!) {\n        stashViewSnapshotRecords(league: $league) {\n          timestamp\n          favorited\n          name\n          fixedValue\n          lpValue\n          lpStockValue\n        }\n      }\n    ": types.StashViewSnapshotRecordsDocument,
    "\n      query StashViewValueSnapshotSeries($league: String!) {\n        stashViewValueSnapshotSeries(league: $league) {\n          stashId\n          values\n          timestamps\n        }\n      }\n    ": types.StashViewValueSnapshotSeriesDocument,
    "\n      mutation StashViewRefreshTabs($league: String!) {\n        stashViewRefreshTabs(league: $league)\n      }\n    ": types.StashViewRefreshTabsDocument,
    "\n      mutation ExchangeAuthCode($authCode: String!) {\n        exchangeAuthCode(authCode: $authCode)\n      }\n    ": types.ExchangeAuthCodeDocument,
    "\n      query MyProfile($forcePull: Boolean) {\n        myProfile {\n          userId\n          poeProfileName\n          patreonUserId\n          patreonTier\n          oAuthTokenUpdatedAtTimestamp\n          lastConnectedTimestamp\n          discordUsername\n          discordUserId\n          createdAtTimestamp\n          roles\n          preferences\n          opaqueKey\n        }\n        checkTftMembership(forcePull: $forcePull)\n        myNotifications {\n          id\n          timestamp\n          userId\n          type\n          title\n          body\n          href\n        }\n      }\n    ": types.MyProfileDocument,
    "\n    mutation RouteChange($path: String!, $pathname: String!) {\n      routeChange(path: $path, pathname: $pathname)\n    }\n  ": types.RouteChangeDocument,
    "\n      mutation LoginAs($userId: String!) {\n        loginAs(userId: $userId)\n      }\n    ": types.LoginAsDocument,
    "\n      mutation UpdateDiscordCode($code: String!) {\n        updateDiscordCode(code: $code)\n      }\n    ": types.UpdateDiscordCodeDocument,
    "\n      query CompassEvPrices($search: LivePricingSummarySearch!) {\n        livePricingSummarySearch(search: $search) {\n          entries {\n            itemGroup {\n              hashString\n            }\n            valuation {\n              value\n            }\n            stockValuation {\n              value\n            }\n          }\n        }\n      }\n    ": types.CompassEvPricesDocument,
    "\n    query PoestackStats {\n      poestackStats\n    }\n  ": types.PoestackStatsDocument,
    "\n      mutation UpdatePatreonCode($code: String!) {\n        updatePatreonCode(code: $code)\n      }\n    ": types.UpdatePatreonCodeDocument,
    "\n      query AtlasPassiveTreeSnapshotPopularityAggregation(\n        $search: AtlasPassiveSnapshotSearch!\n      ) {\n        atlasPassiveTreeSnapshotPopularityAggregation(search: $search) {\n          values {\n            key\n            value\n          }\n        }\n      }\n    ": types.AtlasPassiveTreeSnapshotPopularityAggregationDocument,
    "\n      query AtlasTree($passiveTreeVersion: String!) {\n        atlasTree(passiveTreeVersion: $passiveTreeVersion) {\n          nodeMap\n        }\n      }\n    ": types.AtlasTreeDocument,
    "\n  query SingleCharacterCharacterSnapshotsSearch($snapshotId: String!) {\n    characterSnapshot(snapshotId: $snapshotId) {\n      id\n      characterId\n      timestamp\n      characterClass\n      league\n      experience\n      level\n      mainSkillKey\n      current\n      poeCharacter {\n        id\n        userId\n        name\n        createdAtTimestamp\n        lastSnapshotTimestamp\n      }\n      characterPassivesSnapshot {\n        banditChoice\n        pantheonMajor\n        pantheonMinor\n        hashes\n        hashesEx\n        jewelData\n        masteryEffects\n      }\n      characterSnapshotItems {\n        itemId\n        inventoryId\n        socketedInId\n        baseType\n        typeLine\n        name\n        ilvl\n        explicitMods\n        utilityMods\n        properties\n        requirements\n        sockets\n        frameType\n        description\n        icon\n        w\n        h\n        crucible\n        corrupted\n        support\n        socket\n        gemColor\n        mainSkill\n        itemGroupHashString\n        craftedMods\n        implicitMods\n        fracturedMods\n        enchantMods\n        valueChaos\n      }\n      characterSnapshotPobStats {\n        accuracy\n        armour\n        blockChance\n        spellBlockChance\n        chaosResist\n        coldResist\n        dex\n        energyShield\n        fireResist\n        int\n        life\n        lightningResist\n        mana\n        str\n        evasion\n        supression\n        totalDpsWithIgnite\n        pobCode\n      }\n    }\n  }\n": types.SingleCharacterCharacterSnapshotsSearchDocument,
    "\n      query CharacterSnapshotRecords($characterId: String!) {\n        characterSnapshotRecords(characterId: $characterId) {\n          id\n          characterId\n          timestamp\n          experience\n          level\n        }\n      }\n    ": types.CharacterSnapshotRecordsDocument,
    "\n      mutation CharacterTakeCharacterSnapshot($characterId: String!) {\n        takeCharacterSnapshot(characterId: $characterId)\n      }\n    ": types.CharacterTakeCharacterSnapshotDocument,
    "\n      query CustomLadderGroup($groupId: String!) {\n        customLadderGroup(groupId: $groupId) {\n          id\n          name\n          ownerUserId\n          createdAtTimestamp\n          members {\n            poeProfileName\n            userId\n          }\n        }\n      }\n    ": types.CustomLadderGroupDocument,
    "\n  query CharactersPoeCharacters($userId: String!) {\n    poeCharacters(userId: $userId) {\n      id\n      userId\n      name\n      lastLeague\n      createdAtTimestamp\n      lastSnapshotTimestamp\n    }\n  }\n": types.CharactersPoeCharactersDocument,
    "\n  query PullCharacterSnapshotsQuery($search: CharacterSnapshotSearch!) {\n    characterSnapshotsSearch(search: $search) {\n      snapshots {\n        name\n        level\n        characterClass\n        mainSkillKey\n        characterId\n        snapshotId\n        league\n        totalValueDivine\n      }\n    }\n  }\n": types.PullCharacterSnapshotsQueryDocument,
    "\n      query AtlasPassiveSnapshotsByUser($userId: String!) {\n        atlasPassiveSnapshotsByUser(userId: $userId) {\n          results {\n            league\n            userId\n            systemSnapshotTimestamp\n            createdAtTimestamp\n            hashes\n            source\n          }\n        }\n      }\n    ": types.AtlasPassiveSnapshotsByUserDocument,
    "\n      mutation RefreshPoeCharacters {\n        refreshPoeCharacters\n      }\n    ": types.RefreshPoeCharactersDocument,
    "\n      query ViewGroupsCustomLadderGroupsByOwner($ownerId: String!) {\n        customLadderGroupsByOwner(ownerId: $ownerId) {\n          id\n          ownerUserId\n          name\n          createdAtTimestamp\n          members {\n            userId\n            poeProfileName\n          }\n        }\n      }\n    ": types.ViewGroupsCustomLadderGroupsByOwnerDocument,
    "\n      mutation DeleteCustomLadderGroup($groupId: String!) {\n        deleteCustomLadderGroup(groupId: $groupId)\n      }\n    ": types.DeleteCustomLadderGroupDocument,
    "\n      query ProfileByPeoProfileName($poeProfileName: String!) {\n        profileByPoeProfileName(poeProfileName: $poeProfileName) {\n          userId\n          poeProfileName\n        }\n      }\n    ": types.ProfileByPeoProfileNameDocument,
    "\n      mutation Mutation($group: CustomLadderGroupInput!) {\n        updateCustomLadderGroup(group: $group) {\n          id\n          ownerUserId\n          name\n          createdAtTimestamp\n          members {\n            userId\n            poeProfileName\n          }\n        }\n      }\n    ": types.MutationDocument,
    "\n      query Query($search: LivePricingSummarySearch!) {\n        livePricingSummarySearch(search: $search) {\n          entries {\n            itemGroup {\n              hashString\n              key\n              properties\n              icon\n              displayName\n            }\n            valuation {\n              value\n              validListingsLength\n            }\n            stockValuation {\n              listingPercent\n              value\n              validListingsLength\n            }\n          }\n        }\n      }\n    ": types.QueryDocument,
    "\n      query LivePricingHistory($config: LivePricingHistoryConfig!) {\n        livePricingHistory(config: $config) {\n          results {\n            itemGroup {\n              hashString\n              key\n              tag\n              properties\n              baseType\n              icon\n              inventoryMaxStackSize\n              displayName\n              createdAtTimestamp\n            }\n            series {\n              type\n              stockRangeStartInclusive\n              entries {\n                timestamp\n                value\n              }\n            }\n          }\n        }\n      }\n    ": types.LivePricingHistoryDocument,
    "\n        query StashViewValueSnapshotSeries($league: String!) {\n          stashViewValueSnapshotSeries(league: $league) {\n            stashId\n            values\n            timestamps\n          }\n        }\n      ": types.StashViewValueSnapshotSeriesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      mutation StashViewOneClickPost($input: StashViewSettings!) {\n        stashViewOneClickPost(input: $input)\n      }\n    "): (typeof documents)["\n      mutation StashViewOneClickPost($input: StashViewSettings!) {\n        stashViewOneClickPost(input: $input)\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      mutation StashViewOneClickMessage($input: StashViewSettings!) {\n        stashViewOneClickMessage(input: $input)\n      }\n    "): (typeof documents)["\n      mutation StashViewOneClickMessage($input: StashViewSettings!) {\n        stashViewOneClickMessage(input: $input)\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query LivePriceSimple($config: LivePricingSimpleConfig!) {\n        livePriceSimple(config: $config) {\n          allListingsLength\n          stockValuation {\n            value\n          }\n          valuation {\n            value\n            validListings {\n              listedAtTimestamp\n              quantity\n              listedValue\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query LivePriceSimple($config: LivePricingSimpleConfig!) {\n        livePriceSimple(config: $config) {\n          allListingsLength\n          stockValuation {\n            value\n          }\n          valuation {\n            value\n            validListings {\n              listedAtTimestamp\n              quantity\n              listedValue\n            }\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query LivePricingHistories($config: LivePricingHistoryConfig!) {\n        livePricingHistory(config: $config) {\n          results {\n            itemGroup {\n              hashString\n            }\n            series {\n              type\n              stockRangeStartInclusive\n              entries {\n                timestamp\n                value\n              }\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query LivePricingHistories($config: LivePricingHistoryConfig!) {\n        livePricingHistory(config: $config) {\n          results {\n            itemGroup {\n              hashString\n            }\n            series {\n              type\n              stockRangeStartInclusive\n              entries {\n                timestamp\n                value\n              }\n            }\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation TakeStashViewSanpshot($input: StashViewSnapshotInput!) {\n      stashViewSnapshot(input: $input)\n    }\n  "): (typeof documents)["\n    mutation TakeStashViewSanpshot($input: StashViewSnapshotInput!) {\n      stashViewSnapshot(input: $input)\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query StashViewJobStat($jobId: String!) {\n        stashViewJobStat(jobId: $jobId) {\n          id\n          userId\n          status\n          timestamp\n          rateLimitEndTimestamp\n        }\n      }\n    "): (typeof documents)["\n      query StashViewJobStat($jobId: String!) {\n        stashViewJobStat(jobId: $jobId) {\n          id\n          userId\n          status\n          timestamp\n          rateLimitEndTimestamp\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      mutation StashViewUpdateSnapshotRecord(\n        $input: StashViewSnapshotRecordUpdateInput!\n      ) {\n        stashViewUpdateSnapshotRecord(input: $input)\n      }\n    "): (typeof documents)["\n      mutation StashViewUpdateSnapshotRecord(\n        $input: StashViewSnapshotRecordUpdateInput!\n      ) {\n        stashViewUpdateSnapshotRecord(input: $input)\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdatePreferenceListingPercent($listingPercent: Float!) {\n      updatePreferenceListingPercent(listingPercent: $listingPercent)\n    }\n  "): (typeof documents)["\n    mutation UpdatePreferenceListingPercent($listingPercent: Float!) {\n      updatePreferenceListingPercent(listingPercent: $listingPercent)\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query TftFiveWayLiveListings {\n        tftLiveListings {\n          messageId\n          userDiscordId\n          userDiscordName\n          userDiscordDisplayRole\n          userDiscordDisplayRoleColor\n          userDiscordHighestRole\n          updatedAtTimestamp\n          body\n          properties\n        }\n      }\n    "): (typeof documents)["\n      query TftFiveWayLiveListings {\n        tftLiveListings {\n          messageId\n          userDiscordId\n          userDiscordName\n          userDiscordDisplayRole\n          userDiscordDisplayRoleColor\n          userDiscordHighestRole\n          updatedAtTimestamp\n          body\n          properties\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query TftLiveListingSearch($search: TftLiveListingSearch!) {\n        tftLiveListingSearch(search: $search) {\n          channelId\n          messageId\n          userDiscordId\n          userDiscordName\n          userDiscordDisplayRole\n          userDiscordHighestRole\n          userDiscordDisplayRoleColor\n          updatedAtTimestamp\n          delistedAtTimestamp\n          tag\n          properties\n        }\n      }\n    "): (typeof documents)["\n      query TftLiveListingSearch($search: TftLiveListingSearch!) {\n        tftLiveListingSearch(search: $search) {\n          channelId\n          messageId\n          userDiscordId\n          userDiscordName\n          userDiscordDisplayRole\n          userDiscordHighestRole\n          userDiscordDisplayRoleColor\n          updatedAtTimestamp\n          delistedAtTimestamp\n          tag\n          properties\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query TftOneClickMessageHistory {\n        tftOneClickMessageHistory {\n          messageId\n          channelId\n          userId\n          timestamp\n          exportType\n          exportSubType\n          rateLimitExpires\n        }\n      }\n    "): (typeof documents)["\n      query TftOneClickMessageHistory {\n        tftOneClickMessageHistory {\n          messageId\n          channelId\n          userId\n          timestamp\n          exportType\n          exportSubType\n          rateLimitExpires\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      mutation DeleteTftOneClickMessage($messageId: String!) {\n        deleteTftOneClickMessage(messageId: $messageId)\n      }\n    "): (typeof documents)["\n      mutation DeleteTftOneClickMessage($messageId: String!) {\n        deleteTftOneClickMessage(messageId: $messageId)\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PassiveAtlasTree($passiveTreeVersion: String!) {\n    atlasTree(passiveTreeVersion: $passiveTreeVersion) {\n      constants {\n        minX\n        minY\n        maxX\n        maxY\n        skillsPerOrbit\n        orbitRadii\n      }\n      nodeMap\n      connectionMap\n    }\n  }\n"): (typeof documents)["\n  query PassiveAtlasTree($passiveTreeVersion: String!) {\n    atlasTree(passiveTreeVersion: $passiveTreeVersion) {\n      constants {\n        minX\n        minY\n        maxX\n        maxY\n        skillsPerOrbit\n        orbitRadii\n      }\n      nodeMap\n      connectionMap\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PassiveTree($passiveTreeVersion: String!) {\n    passiveTree(passiveTreeVersion: $passiveTreeVersion) {\n      constants {\n        minX\n        minY\n        maxX\n        maxY\n        skillsPerOrbit\n        orbitRadii\n      }\n      nodeMap\n      connectionMap\n    }\n  }\n"): (typeof documents)["\n  query PassiveTree($passiveTreeVersion: String!) {\n    passiveTree(passiveTreeVersion: $passiveTreeVersion) {\n      constants {\n        minX\n        minY\n        maxX\n        maxY\n        skillsPerOrbit\n        orbitRadii\n      }\n      nodeMap\n      connectionMap\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query LivePriceDivConvSimple($config: LivePricingSimpleConfig!) {\n        livePriceSimple(config: $config) {\n          valuation {\n            value\n          }\n        }\n      }\n    "): (typeof documents)["\n      query LivePriceDivConvSimple($config: LivePricingSimpleConfig!) {\n        livePriceSimple(config: $config) {\n          valuation {\n            value\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query LivePricingHistoriesDivs($config: LivePricingHistoryConfig!) {\n        livePricingHistory(config: $config) {\n          results {\n            series {\n              type\n              stockRangeStartInclusive\n              entries {\n                timestamp\n                value\n              }\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query LivePricingHistoriesDivs($config: LivePricingHistoryConfig!) {\n        livePricingHistory(config: $config) {\n          results {\n            series {\n              type\n              stockRangeStartInclusive\n              entries {\n                timestamp\n                value\n              }\n            }\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query StashViewSnapshotRecords($league: String!) {\n        stashViewSnapshotRecords(league: $league) {\n          timestamp\n          favorited\n          name\n          fixedValue\n          lpValue\n          lpStockValue\n        }\n      }\n    "): (typeof documents)["\n      query StashViewSnapshotRecords($league: String!) {\n        stashViewSnapshotRecords(league: $league) {\n          timestamp\n          favorited\n          name\n          fixedValue\n          lpValue\n          lpStockValue\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query StashViewValueSnapshotSeries($league: String!) {\n        stashViewValueSnapshotSeries(league: $league) {\n          stashId\n          values\n          timestamps\n        }\n      }\n    "): (typeof documents)["\n      query StashViewValueSnapshotSeries($league: String!) {\n        stashViewValueSnapshotSeries(league: $league) {\n          stashId\n          values\n          timestamps\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      mutation StashViewRefreshTabs($league: String!) {\n        stashViewRefreshTabs(league: $league)\n      }\n    "): (typeof documents)["\n      mutation StashViewRefreshTabs($league: String!) {\n        stashViewRefreshTabs(league: $league)\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      mutation ExchangeAuthCode($authCode: String!) {\n        exchangeAuthCode(authCode: $authCode)\n      }\n    "): (typeof documents)["\n      mutation ExchangeAuthCode($authCode: String!) {\n        exchangeAuthCode(authCode: $authCode)\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query MyProfile($forcePull: Boolean) {\n        myProfile {\n          userId\n          poeProfileName\n          patreonUserId\n          patreonTier\n          oAuthTokenUpdatedAtTimestamp\n          lastConnectedTimestamp\n          discordUsername\n          discordUserId\n          createdAtTimestamp\n          roles\n          preferences\n          opaqueKey\n        }\n        checkTftMembership(forcePull: $forcePull)\n        myNotifications {\n          id\n          timestamp\n          userId\n          type\n          title\n          body\n          href\n        }\n      }\n    "): (typeof documents)["\n      query MyProfile($forcePull: Boolean) {\n        myProfile {\n          userId\n          poeProfileName\n          patreonUserId\n          patreonTier\n          oAuthTokenUpdatedAtTimestamp\n          lastConnectedTimestamp\n          discordUsername\n          discordUserId\n          createdAtTimestamp\n          roles\n          preferences\n          opaqueKey\n        }\n        checkTftMembership(forcePull: $forcePull)\n        myNotifications {\n          id\n          timestamp\n          userId\n          type\n          title\n          body\n          href\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation RouteChange($path: String!, $pathname: String!) {\n      routeChange(path: $path, pathname: $pathname)\n    }\n  "): (typeof documents)["\n    mutation RouteChange($path: String!, $pathname: String!) {\n      routeChange(path: $path, pathname: $pathname)\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      mutation LoginAs($userId: String!) {\n        loginAs(userId: $userId)\n      }\n    "): (typeof documents)["\n      mutation LoginAs($userId: String!) {\n        loginAs(userId: $userId)\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      mutation UpdateDiscordCode($code: String!) {\n        updateDiscordCode(code: $code)\n      }\n    "): (typeof documents)["\n      mutation UpdateDiscordCode($code: String!) {\n        updateDiscordCode(code: $code)\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query CompassEvPrices($search: LivePricingSummarySearch!) {\n        livePricingSummarySearch(search: $search) {\n          entries {\n            itemGroup {\n              hashString\n            }\n            valuation {\n              value\n            }\n            stockValuation {\n              value\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query CompassEvPrices($search: LivePricingSummarySearch!) {\n        livePricingSummarySearch(search: $search) {\n          entries {\n            itemGroup {\n              hashString\n            }\n            valuation {\n              value\n            }\n            stockValuation {\n              value\n            }\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query PoestackStats {\n      poestackStats\n    }\n  "): (typeof documents)["\n    query PoestackStats {\n      poestackStats\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      mutation UpdatePatreonCode($code: String!) {\n        updatePatreonCode(code: $code)\n      }\n    "): (typeof documents)["\n      mutation UpdatePatreonCode($code: String!) {\n        updatePatreonCode(code: $code)\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query AtlasPassiveTreeSnapshotPopularityAggregation(\n        $search: AtlasPassiveSnapshotSearch!\n      ) {\n        atlasPassiveTreeSnapshotPopularityAggregation(search: $search) {\n          values {\n            key\n            value\n          }\n        }\n      }\n    "): (typeof documents)["\n      query AtlasPassiveTreeSnapshotPopularityAggregation(\n        $search: AtlasPassiveSnapshotSearch!\n      ) {\n        atlasPassiveTreeSnapshotPopularityAggregation(search: $search) {\n          values {\n            key\n            value\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query AtlasTree($passiveTreeVersion: String!) {\n        atlasTree(passiveTreeVersion: $passiveTreeVersion) {\n          nodeMap\n        }\n      }\n    "): (typeof documents)["\n      query AtlasTree($passiveTreeVersion: String!) {\n        atlasTree(passiveTreeVersion: $passiveTreeVersion) {\n          nodeMap\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SingleCharacterCharacterSnapshotsSearch($snapshotId: String!) {\n    characterSnapshot(snapshotId: $snapshotId) {\n      id\n      characterId\n      timestamp\n      characterClass\n      league\n      experience\n      level\n      mainSkillKey\n      current\n      poeCharacter {\n        id\n        userId\n        name\n        createdAtTimestamp\n        lastSnapshotTimestamp\n      }\n      characterPassivesSnapshot {\n        banditChoice\n        pantheonMajor\n        pantheonMinor\n        hashes\n        hashesEx\n        jewelData\n        masteryEffects\n      }\n      characterSnapshotItems {\n        itemId\n        inventoryId\n        socketedInId\n        baseType\n        typeLine\n        name\n        ilvl\n        explicitMods\n        utilityMods\n        properties\n        requirements\n        sockets\n        frameType\n        description\n        icon\n        w\n        h\n        crucible\n        corrupted\n        support\n        socket\n        gemColor\n        mainSkill\n        itemGroupHashString\n        craftedMods\n        implicitMods\n        fracturedMods\n        enchantMods\n        valueChaos\n      }\n      characterSnapshotPobStats {\n        accuracy\n        armour\n        blockChance\n        spellBlockChance\n        chaosResist\n        coldResist\n        dex\n        energyShield\n        fireResist\n        int\n        life\n        lightningResist\n        mana\n        str\n        evasion\n        supression\n        totalDpsWithIgnite\n        pobCode\n      }\n    }\n  }\n"): (typeof documents)["\n  query SingleCharacterCharacterSnapshotsSearch($snapshotId: String!) {\n    characterSnapshot(snapshotId: $snapshotId) {\n      id\n      characterId\n      timestamp\n      characterClass\n      league\n      experience\n      level\n      mainSkillKey\n      current\n      poeCharacter {\n        id\n        userId\n        name\n        createdAtTimestamp\n        lastSnapshotTimestamp\n      }\n      characterPassivesSnapshot {\n        banditChoice\n        pantheonMajor\n        pantheonMinor\n        hashes\n        hashesEx\n        jewelData\n        masteryEffects\n      }\n      characterSnapshotItems {\n        itemId\n        inventoryId\n        socketedInId\n        baseType\n        typeLine\n        name\n        ilvl\n        explicitMods\n        utilityMods\n        properties\n        requirements\n        sockets\n        frameType\n        description\n        icon\n        w\n        h\n        crucible\n        corrupted\n        support\n        socket\n        gemColor\n        mainSkill\n        itemGroupHashString\n        craftedMods\n        implicitMods\n        fracturedMods\n        enchantMods\n        valueChaos\n      }\n      characterSnapshotPobStats {\n        accuracy\n        armour\n        blockChance\n        spellBlockChance\n        chaosResist\n        coldResist\n        dex\n        energyShield\n        fireResist\n        int\n        life\n        lightningResist\n        mana\n        str\n        evasion\n        supression\n        totalDpsWithIgnite\n        pobCode\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query CharacterSnapshotRecords($characterId: String!) {\n        characterSnapshotRecords(characterId: $characterId) {\n          id\n          characterId\n          timestamp\n          experience\n          level\n        }\n      }\n    "): (typeof documents)["\n      query CharacterSnapshotRecords($characterId: String!) {\n        characterSnapshotRecords(characterId: $characterId) {\n          id\n          characterId\n          timestamp\n          experience\n          level\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      mutation CharacterTakeCharacterSnapshot($characterId: String!) {\n        takeCharacterSnapshot(characterId: $characterId)\n      }\n    "): (typeof documents)["\n      mutation CharacterTakeCharacterSnapshot($characterId: String!) {\n        takeCharacterSnapshot(characterId: $characterId)\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query CustomLadderGroup($groupId: String!) {\n        customLadderGroup(groupId: $groupId) {\n          id\n          name\n          ownerUserId\n          createdAtTimestamp\n          members {\n            poeProfileName\n            userId\n          }\n        }\n      }\n    "): (typeof documents)["\n      query CustomLadderGroup($groupId: String!) {\n        customLadderGroup(groupId: $groupId) {\n          id\n          name\n          ownerUserId\n          createdAtTimestamp\n          members {\n            poeProfileName\n            userId\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CharactersPoeCharacters($userId: String!) {\n    poeCharacters(userId: $userId) {\n      id\n      userId\n      name\n      lastLeague\n      createdAtTimestamp\n      lastSnapshotTimestamp\n    }\n  }\n"): (typeof documents)["\n  query CharactersPoeCharacters($userId: String!) {\n    poeCharacters(userId: $userId) {\n      id\n      userId\n      name\n      lastLeague\n      createdAtTimestamp\n      lastSnapshotTimestamp\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PullCharacterSnapshotsQuery($search: CharacterSnapshotSearch!) {\n    characterSnapshotsSearch(search: $search) {\n      snapshots {\n        name\n        level\n        characterClass\n        mainSkillKey\n        characterId\n        snapshotId\n        league\n        totalValueDivine\n      }\n    }\n  }\n"): (typeof documents)["\n  query PullCharacterSnapshotsQuery($search: CharacterSnapshotSearch!) {\n    characterSnapshotsSearch(search: $search) {\n      snapshots {\n        name\n        level\n        characterClass\n        mainSkillKey\n        characterId\n        snapshotId\n        league\n        totalValueDivine\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query AtlasPassiveSnapshotsByUser($userId: String!) {\n        atlasPassiveSnapshotsByUser(userId: $userId) {\n          results {\n            league\n            userId\n            systemSnapshotTimestamp\n            createdAtTimestamp\n            hashes\n            source\n          }\n        }\n      }\n    "): (typeof documents)["\n      query AtlasPassiveSnapshotsByUser($userId: String!) {\n        atlasPassiveSnapshotsByUser(userId: $userId) {\n          results {\n            league\n            userId\n            systemSnapshotTimestamp\n            createdAtTimestamp\n            hashes\n            source\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      mutation RefreshPoeCharacters {\n        refreshPoeCharacters\n      }\n    "): (typeof documents)["\n      mutation RefreshPoeCharacters {\n        refreshPoeCharacters\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query ViewGroupsCustomLadderGroupsByOwner($ownerId: String!) {\n        customLadderGroupsByOwner(ownerId: $ownerId) {\n          id\n          ownerUserId\n          name\n          createdAtTimestamp\n          members {\n            userId\n            poeProfileName\n          }\n        }\n      }\n    "): (typeof documents)["\n      query ViewGroupsCustomLadderGroupsByOwner($ownerId: String!) {\n        customLadderGroupsByOwner(ownerId: $ownerId) {\n          id\n          ownerUserId\n          name\n          createdAtTimestamp\n          members {\n            userId\n            poeProfileName\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      mutation DeleteCustomLadderGroup($groupId: String!) {\n        deleteCustomLadderGroup(groupId: $groupId)\n      }\n    "): (typeof documents)["\n      mutation DeleteCustomLadderGroup($groupId: String!) {\n        deleteCustomLadderGroup(groupId: $groupId)\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query ProfileByPeoProfileName($poeProfileName: String!) {\n        profileByPoeProfileName(poeProfileName: $poeProfileName) {\n          userId\n          poeProfileName\n        }\n      }\n    "): (typeof documents)["\n      query ProfileByPeoProfileName($poeProfileName: String!) {\n        profileByPoeProfileName(poeProfileName: $poeProfileName) {\n          userId\n          poeProfileName\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      mutation Mutation($group: CustomLadderGroupInput!) {\n        updateCustomLadderGroup(group: $group) {\n          id\n          ownerUserId\n          name\n          createdAtTimestamp\n          members {\n            userId\n            poeProfileName\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation Mutation($group: CustomLadderGroupInput!) {\n        updateCustomLadderGroup(group: $group) {\n          id\n          ownerUserId\n          name\n          createdAtTimestamp\n          members {\n            userId\n            poeProfileName\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query Query($search: LivePricingSummarySearch!) {\n        livePricingSummarySearch(search: $search) {\n          entries {\n            itemGroup {\n              hashString\n              key\n              properties\n              icon\n              displayName\n            }\n            valuation {\n              value\n              validListingsLength\n            }\n            stockValuation {\n              listingPercent\n              value\n              validListingsLength\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query Query($search: LivePricingSummarySearch!) {\n        livePricingSummarySearch(search: $search) {\n          entries {\n            itemGroup {\n              hashString\n              key\n              properties\n              icon\n              displayName\n            }\n            valuation {\n              value\n              validListingsLength\n            }\n            stockValuation {\n              listingPercent\n              value\n              validListingsLength\n            }\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query LivePricingHistory($config: LivePricingHistoryConfig!) {\n        livePricingHistory(config: $config) {\n          results {\n            itemGroup {\n              hashString\n              key\n              tag\n              properties\n              baseType\n              icon\n              inventoryMaxStackSize\n              displayName\n              createdAtTimestamp\n            }\n            series {\n              type\n              stockRangeStartInclusive\n              entries {\n                timestamp\n                value\n              }\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query LivePricingHistory($config: LivePricingHistoryConfig!) {\n        livePricingHistory(config: $config) {\n          results {\n            itemGroup {\n              hashString\n              key\n              tag\n              properties\n              baseType\n              icon\n              inventoryMaxStackSize\n              displayName\n              createdAtTimestamp\n            }\n            series {\n              type\n              stockRangeStartInclusive\n              entries {\n                timestamp\n                value\n              }\n            }\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        query StashViewValueSnapshotSeries($league: String!) {\n          stashViewValueSnapshotSeries(league: $league) {\n            stashId\n            values\n            timestamps\n          }\n        }\n      "): (typeof documents)["\n        query StashViewValueSnapshotSeries($league: String!) {\n          stashViewValueSnapshotSeries(league: $league) {\n            stashId\n            values\n            timestamps\n          }\n        }\n      "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;