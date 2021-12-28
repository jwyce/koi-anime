import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export enum AgeRating {
  /** General Audiences */
  G = 'G',
  /** Parental Guidance Suggested */
  Pg = 'PG',
  /** Restricted */
  R = 'R',
  /** Explicit */
  R18 = 'R18'
}

export type Anime = {
  __typename?: 'Anime';
  ageRating: AgeRating;
  ageRatingGuide: Scalars['String'];
  apiID: Scalars['Int'];
  canonicalTitle: Scalars['String'];
  coverLinkOriginal: Scalars['String'];
  createdAt: Scalars['String'];
  endDate: Scalars['DateTime'];
  englishTitle: Scalars['String'];
  episodeCount: Scalars['Int'];
  id: Scalars['Int'];
  japaneseTitle: Scalars['String'];
  nextRelease: Scalars['DateTime'];
  nsfw: Scalars['Boolean'];
  posterLinkOriginal: Scalars['String'];
  posterLinkSmall: Scalars['String'];
  romajiTitle: Scalars['String'];
  slug: Scalars['String'];
  songs: Array<Song>;
  startDate: Scalars['DateTime'];
  status: Status;
  studios: Array<Scalars['String']>;
  subtype: AnimeSubtype;
  synopsis: Scalars['String'];
  tba: Scalars['String'];
  updatedAt: Scalars['String'];
  youtubeVideoId: Scalars['String'];
};

export enum AnimeSubtype {
  Movie = 'MOVIE',
  /** Original Net Animation */
  Ona = 'ONA',
  /** Original Video Animation */
  Ova = 'OVA',
  Special = 'SPECIAL',
  Tv = 'TV'
}

export type Character = {
  __typename?: 'Character';
  animeAPIID: Scalars['Int'];
  animeID: Scalars['Int'];
  apiID: Scalars['Int'];
  canonicalName: Scalars['String'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  englishName: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['Int'];
  imageOriginal: Scalars['String'];
  japaneseName: Scalars['String'];
  malID: Scalars['Int'];
  slug: Scalars['String'];
  updatedAt: Scalars['String'];
};

export enum Direction {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type List = {
  __typename?: 'List';
  anime?: Maybe<Anime>;
  createdAt: Scalars['String'];
  currentChapter: Scalars['Int'];
  currentEpisode: Scalars['Int'];
  currentVolume: Scalars['Int'];
  id: Scalars['Int'];
  manga?: Maybe<Manga>;
  mediaType: Media;
  resourceSlug: Scalars['String'];
  status: ListStatus;
  updatedAt: Scalars['String'];
  userID: Scalars['Int'];
};

export type ListFilterInput = {
  cursor?: Maybe<Scalars['Int']>;
  direction?: Maybe<Direction>;
  limit: Scalars['Int'];
  media?: Maybe<Media>;
  sort?: Maybe<SortBy>;
  status?: Maybe<ListStatus>;
  title?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export enum ListStatus {
  Completed = 'COMPLETED',
  Current = 'CURRENT',
  Dropped = 'DROPPED',
  OnHold = 'ON_HOLD',
  Planned = 'PLANNED'
}

export type Manga = {
  __typename?: 'Manga';
  ageRating: AgeRating;
  ageRatingGuide: Scalars['String'];
  apiID: Scalars['Int'];
  canonicalTitle: Scalars['String'];
  chapterCount: Scalars['Int'];
  coverLinkOriginal: Scalars['String'];
  createdAt: Scalars['String'];
  endDate: Scalars['DateTime'];
  englishTitle: Scalars['String'];
  id: Scalars['Int'];
  japaneseTitle: Scalars['String'];
  nextRelease: Scalars['DateTime'];
  posterLinkOriginal: Scalars['String'];
  posterLinkSmall: Scalars['String'];
  romajiTitle: Scalars['String'];
  serialization: Scalars['String'];
  slug: Scalars['String'];
  startDate: Scalars['DateTime'];
  status: Status;
  subtype: MangaSubtype;
  synopsis: Scalars['String'];
  tba: Scalars['String'];
  updatedAt: Scalars['String'];
  volumeCount: Scalars['Int'];
};

export enum MangaSubtype {
  Doujin = 'DOUJIN',
  Manga = 'MANGA',
  Manhua = 'MANHUA',
  Manhwa = 'MANHWA',
  Novel = 'NOVEL',
  /** Original English-Language */
  Oel = 'OEL',
  Oneshot = 'ONESHOT'
}

export enum Media {
  Anime = 'ANIME',
  Manga = 'MANGA'
}

export type Mutation = {
  __typename?: 'Mutation';
  addUpdateMyList: List;
  changePassword: UserResponse;
  confirmEmail: Scalars['Boolean'];
  deleteAccount: Scalars['Boolean'];
  deleteListEntry: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  resetPassword: UserResponse;
  sendConfirmation: Scalars['Boolean'];
  updatePreferences: UserResponse;
};


export type MutationAddUpdateMyListArgs = {
  options: UpdateListInput;
};


export type MutationChangePasswordArgs = {
  confirmPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String'];
};


export type MutationDeleteListEntryArgs = {
  slug: Scalars['String'];
  type: Media;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationResetPasswordArgs = {
  confirmPassword: Scalars['String'];
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSendConfirmationArgs = {
  email: Scalars['String'];
};


export type MutationUpdatePreferencesArgs = {
  options: PreferencesInput;
};

export type PaginatedAnimeResponse = {
  __typename?: 'PaginatedAnimeResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Anime>;
  nextCursor: Scalars['Int'];
};

export type PaginatedListResponse = {
  __typename?: 'PaginatedListResponse';
  hasMore: Scalars['Boolean'];
  items: Array<List>;
  nextCursor: Scalars['Int'];
};

export type PaginatedMangaResponse = {
  __typename?: 'PaginatedMangaResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Manga>;
  nextCursor: Scalars['Int'];
};

export type PreferencesInput = {
  email?: Maybe<Scalars['String']>;
  profileColor: ProfileColor;
  profileIcon: ProfileIcon;
  showNSFW: Scalars['Boolean'];
  titlePreference: TitlePreference;
  username?: Maybe<Scalars['String']>;
};

export enum ProfileColor {
  /** #869EFF */
  Blue = 'BLUE',
  /** #EB79FA */
  Pink = 'PINK',
  /** #555B8C */
  Purple = 'PURPLE',
  /** #ff6250 */
  Redorange = 'REDORANGE',
  /** #FF8691 */
  Salmon = 'SALMON',
  /** #00C7B4 */
  Teal = 'TEAL'
}

export enum ProfileIcon {
  Cat = 'CAT',
  Dog = 'DOG',
  Dragon = 'DRAGON',
  Fox = 'FOX',
  Frog = 'FROG',
  Goat = 'GOAT',
  Koi = 'KOI',
  Monkey = 'MONKEY',
  Pig = 'PIG',
  Rabbit = 'RABBIT',
  Rat = 'RAT',
  Rooster = 'ROOSTER',
  Seahorse = 'SEAHORSE',
  Snake = 'SNAKE',
  Tiger = 'TIGER',
  Turtle = 'TURTLE'
}

export type Query = {
  __typename?: 'Query';
  anime?: Maybe<Anime>;
  animeography: Array<Anime>;
  character: Character;
  charactersForAnime: Array<Character>;
  kitsuSearchAnime: PaginatedAnimeResponse;
  kitsuSearchManga: PaginatedMangaResponse;
  manga?: Maybe<Manga>;
  me?: Maybe<User>;
  myListEntryStatus?: Maybe<List>;
  songsForAnime: Array<Song>;
  user: User;
  userList: PaginatedListResponse;
  users: Array<User>;
};


export type QueryAnimeArgs = {
  slug: Scalars['String'];
};


export type QueryAnimeographyArgs = {
  characterSlug: Scalars['String'];
};


export type QueryCharacterArgs = {
  slug: Scalars['String'];
};


export type QueryCharactersForAnimeArgs = {
  id: Scalars['Int'];
};


export type QueryKitsuSearchAnimeArgs = {
  cursor: Scalars['Int'];
  filter?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryKitsuSearchMangaArgs = {
  cursor: Scalars['Int'];
  filter?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryMangaArgs = {
  slug: Scalars['String'];
};


export type QueryMyListEntryStatusArgs = {
  slug: Scalars['String'];
  type: Media;
};


export type QuerySongsForAnimeArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  username: Scalars['String'];
};


export type QueryUserListArgs = {
  options: ListFilterInput;
};

export type RegisterInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export enum ResourceType {
  Anime = 'ANIME',
  EdSong = 'ED_SONG',
  FCharacter = 'F_CHARACTER',
  Manga = 'MANGA',
  MCharacter = 'M_CHARACTER',
  OpSong = 'OP_SONG'
}

export type Song = {
  __typename?: 'Song';
  animeAPIID: Scalars['Int'];
  animeID: Scalars['Int'];
  artist: Scalars['String'];
  createdAt: Scalars['String'];
  fullTitle: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  slug: Scalars['String'];
  songType: SongType;
  updatedAt: Scalars['String'];
};

export enum SongType {
  /** Anime Ending */
  Ed = 'ED',
  /** Anime Opening */
  Op = 'OP'
}

export enum SortBy {
  Added = 'ADDED',
  Length = 'LENGTH',
  Progress = 'PROGRESS',
  Title = 'TITLE',
  Updated = 'UPDATED'
}

export enum Status {
  Current = 'CURRENT',
  Finished = 'FINISHED',
  Tba = 'TBA',
  Unreleased = 'UNRELEASED',
  Upcoming = 'UPCOMING'
}

export enum TitlePreference {
  Canonical = 'CANONICAL',
  English = 'ENGLISH',
  Japanese = 'JAPANESE',
  Romanized = 'ROMANIZED'
}

export type UpdateListInput = {
  chapterCount?: Maybe<Scalars['Int']>;
  episodeCount?: Maybe<Scalars['Int']>;
  slug: Scalars['String'];
  status?: Maybe<ListStatus>;
  type: Media;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  isConfirmed: Scalars['Boolean'];
  lockoutEnd: Scalars['DateTime'];
  profileColor: ProfileColor;
  profileIcon: ProfileIcon;
  showNSFW: Scalars['Boolean'];
  titlePreference: TitlePreference;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type Vote = {
  __typename?: 'Vote';
  createdAt: Scalars['String'];
  resourceType: ResourceType;
  updatedAt: Scalars['String'];
  userID: Scalars['Int'];
  votedAgainst: Scalars['String'];
  votedFor: Scalars['String'];
};

export type DefaultAnimeFragment = { __typename?: 'Anime', id: number, apiID: number, slug: string, subtype: AnimeSubtype, synopsis: string, englishTitle: string, romajiTitle: string, japaneseTitle: string, canonicalTitle: string, startDate: any, endDate: any, tba: string, ageRating: AgeRating, status: Status, posterLinkSmall: string };

export type DefaultErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type DefaultListFragment = { __typename?: 'List', resourceSlug: string, mediaType: Media, currentEpisode: number, currentChapter: number, status: ListStatus };

export type DefaultMangaFragment = { __typename?: 'Manga', id: number, apiID: number, slug: string, subtype: MangaSubtype, synopsis: string, englishTitle: string, romajiTitle: string, japaneseTitle: string, canonicalTitle: string, startDate: any, endDate: any, tba: string, ageRating: AgeRating, status: Status, posterLinkSmall: string };

export type DefaultSongFragment = { __typename?: 'Song', name: string, artist: string, songType: SongType };

export type DefaultUserFragment = { __typename?: 'User', email: string, isConfirmed: boolean, showNSFW: boolean, id: number, username: string, profileIcon: ProfileIcon, profileColor: ProfileColor, titlePreference: TitlePreference };

export type DefaultUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', email: string, isConfirmed: boolean, showNSFW: boolean, id: number, username: string, profileIcon: ProfileIcon, profileColor: ProfileColor, titlePreference: TitlePreference } | null | undefined };

export type PublicUserFragment = { __typename?: 'User', id: number, username: string, profileIcon: ProfileIcon, profileColor: ProfileColor, titlePreference: TitlePreference };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', email: string, isConfirmed: boolean, showNSFW: boolean, id: number, username: string, profileIcon: ProfileIcon, profileColor: ProfileColor, titlePreference: TitlePreference } | null | undefined } };

export type ConfirmEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmEmailMutation = { __typename?: 'Mutation', confirmEmail: boolean };

export type DeleteAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: boolean };

export type SendConfirmationMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendConfirmationMutation = { __typename?: 'Mutation', sendConfirmation: boolean };

export type UpdatePreferencesMutationVariables = Exact<{
  options: PreferencesInput;
}>;


export type UpdatePreferencesMutation = { __typename?: 'Mutation', updatePreferences: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', email: string, isConfirmed: boolean, showNSFW: boolean, id: number, username: string, profileIcon: ProfileIcon, profileColor: ProfileColor, titlePreference: TitlePreference } | null | undefined } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', email: string, isConfirmed: boolean, showNSFW: boolean, id: number, username: string, profileIcon: ProfileIcon, profileColor: ProfileColor, titlePreference: TitlePreference } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', email: string, isConfirmed: boolean, showNSFW: boolean, id: number, username: string, profileIcon: ProfileIcon, profileColor: ProfileColor, titlePreference: TitlePreference } | null | undefined } };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', email: string, isConfirmed: boolean, showNSFW: boolean, id: number, username: string, profileIcon: ProfileIcon, profileColor: ProfileColor, titlePreference: TitlePreference } | null | undefined } };

export type AddUpdateMyListEntryMutationVariables = Exact<{
  options: UpdateListInput;
}>;


export type AddUpdateMyListEntryMutation = { __typename?: 'Mutation', addUpdateMyList: { __typename?: 'List', resourceSlug: string, mediaType: Media, currentEpisode: number, currentChapter: number, status: ListStatus } };

export type DeleteListEntryMutationVariables = Exact<{
  type: Media;
  slug: Scalars['String'];
}>;


export type DeleteListEntryMutation = { __typename?: 'Mutation', deleteListEntry: boolean };

export type AnimeQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type AnimeQuery = { __typename?: 'Query', anime?: { __typename?: 'Anime', ageRatingGuide: string, posterLinkOriginal: string, coverLinkOriginal: string, studios: Array<string>, episodeCount: number, youtubeVideoId: string, id: number, apiID: number, slug: string, subtype: AnimeSubtype, synopsis: string, englishTitle: string, romajiTitle: string, japaneseTitle: string, canonicalTitle: string, startDate: any, endDate: any, tba: string, ageRating: AgeRating, status: Status, posterLinkSmall: string, songs: Array<{ __typename?: 'Song', name: string, artist: string, songType: SongType }> } | null | undefined };

export type AnimeCharactersQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type AnimeCharactersQuery = { __typename?: 'Query', charactersForAnime: Array<{ __typename?: 'Character', id: number, slug: string, englishName: string, japaneseName: string, canonicalName: string, imageOriginal: string }> };

export type SongsForAnimeQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SongsForAnimeQuery = { __typename?: 'Query', songsForAnime: Array<{ __typename?: 'Song', name: string, artist: string, songType: SongType }> };

export type SearchAnimeQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor: Scalars['Int'];
  filter?: Maybe<Scalars['String']>;
}>;


export type SearchAnimeQuery = { __typename?: 'Query', kitsuSearchAnime: { __typename?: 'PaginatedAnimeResponse', hasMore: boolean, nextCursor: number, items: Array<{ __typename?: 'Anime', id: number, apiID: number, slug: string, subtype: AnimeSubtype, synopsis: string, englishTitle: string, romajiTitle: string, japaneseTitle: string, canonicalTitle: string, startDate: any, endDate: any, tba: string, ageRating: AgeRating, status: Status, posterLinkSmall: string }> } };

export type AnimeographyQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type AnimeographyQuery = { __typename?: 'Query', animeography: Array<{ __typename?: 'Anime', id: number, apiID: number, slug: string, subtype: AnimeSubtype, synopsis: string, englishTitle: string, romajiTitle: string, japaneseTitle: string, canonicalTitle: string, startDate: any, endDate: any, tba: string, ageRating: AgeRating, status: Status, posterLinkSmall: string }> };

export type CharacterQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type CharacterQuery = { __typename?: 'Query', character: { __typename?: 'Character', id: number, slug: string, englishName: string, japaneseName: string, canonicalName: string, gender: string, description: string, imageOriginal: string } };

export type MyListEntryStatusQueryVariables = Exact<{
  slug: Scalars['String'];
  type: Media;
}>;


export type MyListEntryStatusQuery = { __typename?: 'Query', myListEntryStatus?: { __typename?: 'List', status: ListStatus, resourceSlug: string } | null | undefined };

export type UserAnimeListQueryVariables = Exact<{
  options: ListFilterInput;
}>;


export type UserAnimeListQuery = { __typename?: 'Query', userList: { __typename?: 'PaginatedListResponse', hasMore: boolean, nextCursor: number, items: Array<{ __typename?: 'List', resourceSlug: string, status: ListStatus, currentEpisode: number, anime?: { __typename?: 'Anime', id: number, apiID: number, slug: string, subtype: AnimeSubtype, synopsis: string, englishTitle: string, romajiTitle: string, japaneseTitle: string, canonicalTitle: string, startDate: any, endDate: any, tba: string, ageRating: AgeRating, status: Status, posterLinkSmall: string } | null | undefined }> } };

export type UserMangaListQueryVariables = Exact<{
  options: ListFilterInput;
}>;


export type UserMangaListQuery = { __typename?: 'Query', userList: { __typename?: 'PaginatedListResponse', hasMore: boolean, nextCursor: number, items: Array<{ __typename?: 'List', resourceSlug: string, status: ListStatus, currentEpisode: number, manga?: { __typename?: 'Manga', id: number, apiID: number, slug: string, subtype: MangaSubtype, synopsis: string, englishTitle: string, romajiTitle: string, japaneseTitle: string, canonicalTitle: string, startDate: any, endDate: any, tba: string, ageRating: AgeRating, status: Status, posterLinkSmall: string } | null | undefined }> } };

export type MangaQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type MangaQuery = { __typename?: 'Query', manga?: { __typename?: 'Manga', ageRatingGuide: string, posterLinkOriginal: string, coverLinkOriginal: string, serialization: string, volumeCount: number, chapterCount: number, id: number, apiID: number, slug: string, subtype: MangaSubtype, synopsis: string, englishTitle: string, romajiTitle: string, japaneseTitle: string, canonicalTitle: string, startDate: any, endDate: any, tba: string, ageRating: AgeRating, status: Status, posterLinkSmall: string } | null | undefined };

export type SearchMangaQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor: Scalars['Int'];
  filter?: Maybe<Scalars['String']>;
}>;


export type SearchMangaQuery = { __typename?: 'Query', kitsuSearchManga: { __typename?: 'PaginatedMangaResponse', hasMore: boolean, nextCursor: number, items: Array<{ __typename?: 'Manga', id: number, apiID: number, slug: string, subtype: MangaSubtype, synopsis: string, englishTitle: string, romajiTitle: string, japaneseTitle: string, canonicalTitle: string, startDate: any, endDate: any, tba: string, ageRating: AgeRating, status: Status, posterLinkSmall: string }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', email: string, isConfirmed: boolean, showNSFW: boolean, id: number, username: string, profileIcon: ProfileIcon, profileColor: ProfileColor, titlePreference: TitlePreference } | null | undefined };

export type UserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, username: string, profileIcon: ProfileIcon, profileColor: ProfileColor, titlePreference: TitlePreference } };

export const DefaultAnimeFragmentDoc = gql`
    fragment DefaultAnime on Anime {
  id
  apiID
  slug
  subtype
  synopsis
  englishTitle
  romajiTitle
  japaneseTitle
  canonicalTitle
  startDate
  endDate
  tba
  ageRating
  status
  posterLinkSmall
}
    `;
export const DefaultListFragmentDoc = gql`
    fragment DefaultList on List {
  resourceSlug
  mediaType
  currentEpisode
  currentChapter
  status
}
    `;
export const DefaultMangaFragmentDoc = gql`
    fragment DefaultManga on Manga {
  id
  apiID
  slug
  subtype
  synopsis
  englishTitle
  romajiTitle
  japaneseTitle
  canonicalTitle
  startDate
  endDate
  tba
  ageRating
  status
  posterLinkSmall
}
    `;
export const DefaultSongFragmentDoc = gql`
    fragment DefaultSong on Song {
  name
  artist
  songType
}
    `;
export const DefaultErrorFragmentDoc = gql`
    fragment DefaultError on FieldError {
  field
  message
}
    `;
export const PublicUserFragmentDoc = gql`
    fragment PublicUser on User {
  id
  username
  profileIcon
  profileColor
  titlePreference
}
    `;
export const DefaultUserFragmentDoc = gql`
    fragment DefaultUser on User {
  ...PublicUser
  email
  isConfirmed
  showNSFW
}
    ${PublicUserFragmentDoc}`;
export const DefaultUserResponseFragmentDoc = gql`
    fragment DefaultUserResponse on UserResponse {
  errors {
    ...DefaultError
  }
  user {
    ...DefaultUser
  }
}
    ${DefaultErrorFragmentDoc}
${DefaultUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $confirmPassword: String!) {
  changePassword(newPassword: $newPassword, confirmPassword: $confirmPassword) {
    ...DefaultUserResponse
  }
}
    ${DefaultUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ConfirmEmailDocument = gql`
    mutation ConfirmEmail($token: String!) {
  confirmEmail(token: $token)
}
    `;
export type ConfirmEmailMutationFn = Apollo.MutationFunction<ConfirmEmailMutation, ConfirmEmailMutationVariables>;

/**
 * __useConfirmEmailMutation__
 *
 * To run a mutation, you first call `useConfirmEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmEmailMutation, { data, loading, error }] = useConfirmEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmEmailMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmEmailMutation, ConfirmEmailMutationVariables>(ConfirmEmailDocument, options);
      }
export type ConfirmEmailMutationHookResult = ReturnType<typeof useConfirmEmailMutation>;
export type ConfirmEmailMutationResult = Apollo.MutationResult<ConfirmEmailMutation>;
export type ConfirmEmailMutationOptions = Apollo.BaseMutationOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>;
export const DeleteAccountDocument = gql`
    mutation DeleteAccount {
  deleteAccount
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const SendConfirmationDocument = gql`
    mutation SendConfirmation($email: String!) {
  sendConfirmation(email: $email)
}
    `;
export type SendConfirmationMutationFn = Apollo.MutationFunction<SendConfirmationMutation, SendConfirmationMutationVariables>;

/**
 * __useSendConfirmationMutation__
 *
 * To run a mutation, you first call `useSendConfirmationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendConfirmationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendConfirmationMutation, { data, loading, error }] = useSendConfirmationMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendConfirmationMutation(baseOptions?: Apollo.MutationHookOptions<SendConfirmationMutation, SendConfirmationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendConfirmationMutation, SendConfirmationMutationVariables>(SendConfirmationDocument, options);
      }
export type SendConfirmationMutationHookResult = ReturnType<typeof useSendConfirmationMutation>;
export type SendConfirmationMutationResult = Apollo.MutationResult<SendConfirmationMutation>;
export type SendConfirmationMutationOptions = Apollo.BaseMutationOptions<SendConfirmationMutation, SendConfirmationMutationVariables>;
export const UpdatePreferencesDocument = gql`
    mutation UpdatePreferences($options: PreferencesInput!) {
  updatePreferences(options: $options) {
    ...DefaultUserResponse
  }
}
    ${DefaultUserResponseFragmentDoc}`;
export type UpdatePreferencesMutationFn = Apollo.MutationFunction<UpdatePreferencesMutation, UpdatePreferencesMutationVariables>;

/**
 * __useUpdatePreferencesMutation__
 *
 * To run a mutation, you first call `useUpdatePreferencesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePreferencesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePreferencesMutation, { data, loading, error }] = useUpdatePreferencesMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUpdatePreferencesMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePreferencesMutation, UpdatePreferencesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePreferencesMutation, UpdatePreferencesMutationVariables>(UpdatePreferencesDocument, options);
      }
export type UpdatePreferencesMutationHookResult = ReturnType<typeof useUpdatePreferencesMutation>;
export type UpdatePreferencesMutationResult = Apollo.MutationResult<UpdatePreferencesMutation>;
export type UpdatePreferencesMutationOptions = Apollo.BaseMutationOptions<UpdatePreferencesMutation, UpdatePreferencesMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...DefaultUserResponse
  }
}
    ${DefaultUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options) {
    ...DefaultUserResponse
  }
}
    ${DefaultUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $newPassword: String!, $confirmPassword: String!) {
  resetPassword(
    token: $token
    newPassword: $newPassword
    confirmPassword: $confirmPassword
  ) {
    ...DefaultUserResponse
  }
}
    ${DefaultUserResponseFragmentDoc}`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *      confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const AddUpdateMyListEntryDocument = gql`
    mutation AddUpdateMyListEntry($options: UpdateListInput!) {
  addUpdateMyList(options: $options) {
    ...DefaultList
  }
}
    ${DefaultListFragmentDoc}`;
export type AddUpdateMyListEntryMutationFn = Apollo.MutationFunction<AddUpdateMyListEntryMutation, AddUpdateMyListEntryMutationVariables>;

/**
 * __useAddUpdateMyListEntryMutation__
 *
 * To run a mutation, you first call `useAddUpdateMyListEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUpdateMyListEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUpdateMyListEntryMutation, { data, loading, error }] = useAddUpdateMyListEntryMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useAddUpdateMyListEntryMutation(baseOptions?: Apollo.MutationHookOptions<AddUpdateMyListEntryMutation, AddUpdateMyListEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUpdateMyListEntryMutation, AddUpdateMyListEntryMutationVariables>(AddUpdateMyListEntryDocument, options);
      }
export type AddUpdateMyListEntryMutationHookResult = ReturnType<typeof useAddUpdateMyListEntryMutation>;
export type AddUpdateMyListEntryMutationResult = Apollo.MutationResult<AddUpdateMyListEntryMutation>;
export type AddUpdateMyListEntryMutationOptions = Apollo.BaseMutationOptions<AddUpdateMyListEntryMutation, AddUpdateMyListEntryMutationVariables>;
export const DeleteListEntryDocument = gql`
    mutation DeleteListEntry($type: Media!, $slug: String!) {
  deleteListEntry(type: $type, slug: $slug)
}
    `;
export type DeleteListEntryMutationFn = Apollo.MutationFunction<DeleteListEntryMutation, DeleteListEntryMutationVariables>;

/**
 * __useDeleteListEntryMutation__
 *
 * To run a mutation, you first call `useDeleteListEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteListEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteListEntryMutation, { data, loading, error }] = useDeleteListEntryMutation({
 *   variables: {
 *      type: // value for 'type'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useDeleteListEntryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteListEntryMutation, DeleteListEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteListEntryMutation, DeleteListEntryMutationVariables>(DeleteListEntryDocument, options);
      }
export type DeleteListEntryMutationHookResult = ReturnType<typeof useDeleteListEntryMutation>;
export type DeleteListEntryMutationResult = Apollo.MutationResult<DeleteListEntryMutation>;
export type DeleteListEntryMutationOptions = Apollo.BaseMutationOptions<DeleteListEntryMutation, DeleteListEntryMutationVariables>;
export const AnimeDocument = gql`
    query Anime($slug: String!) {
  anime(slug: $slug) {
    ...DefaultAnime
    ageRatingGuide
    posterLinkOriginal
    coverLinkOriginal
    studios
    episodeCount
    youtubeVideoId
    songs {
      ...DefaultSong
    }
  }
}
    ${DefaultAnimeFragmentDoc}
${DefaultSongFragmentDoc}`;

/**
 * __useAnimeQuery__
 *
 * To run a query within a React component, call `useAnimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnimeQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useAnimeQuery(baseOptions: Apollo.QueryHookOptions<AnimeQuery, AnimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AnimeQuery, AnimeQueryVariables>(AnimeDocument, options);
      }
export function useAnimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnimeQuery, AnimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AnimeQuery, AnimeQueryVariables>(AnimeDocument, options);
        }
export type AnimeQueryHookResult = ReturnType<typeof useAnimeQuery>;
export type AnimeLazyQueryHookResult = ReturnType<typeof useAnimeLazyQuery>;
export type AnimeQueryResult = Apollo.QueryResult<AnimeQuery, AnimeQueryVariables>;
export const AnimeCharactersDocument = gql`
    query AnimeCharacters($id: Int!) {
  charactersForAnime(id: $id) {
    id
    slug
    englishName
    japaneseName
    canonicalName
    imageOriginal
  }
}
    `;

/**
 * __useAnimeCharactersQuery__
 *
 * To run a query within a React component, call `useAnimeCharactersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnimeCharactersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnimeCharactersQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAnimeCharactersQuery(baseOptions: Apollo.QueryHookOptions<AnimeCharactersQuery, AnimeCharactersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AnimeCharactersQuery, AnimeCharactersQueryVariables>(AnimeCharactersDocument, options);
      }
export function useAnimeCharactersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnimeCharactersQuery, AnimeCharactersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AnimeCharactersQuery, AnimeCharactersQueryVariables>(AnimeCharactersDocument, options);
        }
export type AnimeCharactersQueryHookResult = ReturnType<typeof useAnimeCharactersQuery>;
export type AnimeCharactersLazyQueryHookResult = ReturnType<typeof useAnimeCharactersLazyQuery>;
export type AnimeCharactersQueryResult = Apollo.QueryResult<AnimeCharactersQuery, AnimeCharactersQueryVariables>;
export const SongsForAnimeDocument = gql`
    query SongsForAnime($id: Int!) {
  songsForAnime(id: $id) {
    ...DefaultSong
  }
}
    ${DefaultSongFragmentDoc}`;

/**
 * __useSongsForAnimeQuery__
 *
 * To run a query within a React component, call `useSongsForAnimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useSongsForAnimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSongsForAnimeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSongsForAnimeQuery(baseOptions: Apollo.QueryHookOptions<SongsForAnimeQuery, SongsForAnimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SongsForAnimeQuery, SongsForAnimeQueryVariables>(SongsForAnimeDocument, options);
      }
export function useSongsForAnimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SongsForAnimeQuery, SongsForAnimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SongsForAnimeQuery, SongsForAnimeQueryVariables>(SongsForAnimeDocument, options);
        }
export type SongsForAnimeQueryHookResult = ReturnType<typeof useSongsForAnimeQuery>;
export type SongsForAnimeLazyQueryHookResult = ReturnType<typeof useSongsForAnimeLazyQuery>;
export type SongsForAnimeQueryResult = Apollo.QueryResult<SongsForAnimeQuery, SongsForAnimeQueryVariables>;
export const SearchAnimeDocument = gql`
    query SearchAnime($limit: Int!, $cursor: Int!, $filter: String) {
  kitsuSearchAnime(limit: $limit, cursor: $cursor, filter: $filter) {
    items {
      ...DefaultAnime
    }
    hasMore
    nextCursor
  }
}
    ${DefaultAnimeFragmentDoc}`;

/**
 * __useSearchAnimeQuery__
 *
 * To run a query within a React component, call `useSearchAnimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchAnimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchAnimeQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useSearchAnimeQuery(baseOptions: Apollo.QueryHookOptions<SearchAnimeQuery, SearchAnimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchAnimeQuery, SearchAnimeQueryVariables>(SearchAnimeDocument, options);
      }
export function useSearchAnimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchAnimeQuery, SearchAnimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchAnimeQuery, SearchAnimeQueryVariables>(SearchAnimeDocument, options);
        }
export type SearchAnimeQueryHookResult = ReturnType<typeof useSearchAnimeQuery>;
export type SearchAnimeLazyQueryHookResult = ReturnType<typeof useSearchAnimeLazyQuery>;
export type SearchAnimeQueryResult = Apollo.QueryResult<SearchAnimeQuery, SearchAnimeQueryVariables>;
export const AnimeographyDocument = gql`
    query Animeography($characterSlug: String!) {
  animeography(characterSlug: $characterSlug) {
    ...DefaultAnime
  }
}
    ${DefaultAnimeFragmentDoc}`;

/**
 * __useAnimeographyQuery__
 *
 * To run a query within a React component, call `useAnimeographyQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnimeographyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnimeographyQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function useAnimeographyQuery(baseOptions: Apollo.QueryHookOptions<AnimeographyQuery, AnimeographyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AnimeographyQuery, AnimeographyQueryVariables>(AnimeographyDocument, options);
      }
export function useAnimeographyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnimeographyQuery, AnimeographyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AnimeographyQuery, AnimeographyQueryVariables>(AnimeographyDocument, options);
        }
export type AnimeographyQueryHookResult = ReturnType<typeof useAnimeographyQuery>;
export type AnimeographyLazyQueryHookResult = ReturnType<typeof useAnimeographyLazyQuery>;
export type AnimeographyQueryResult = Apollo.QueryResult<AnimeographyQuery, AnimeographyQueryVariables>;
export const CharacterDocument = gql`
    query Character($slug: String!) {
  character(slug: $slug) {
    id
    slug
    englishName
    japaneseName
    canonicalName
    gender
    description
    imageOriginal
  }
}
    `;

/**
 * __useCharacterQuery__
 *
 * To run a query within a React component, call `useCharacterQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharacterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharacterQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useCharacterQuery(baseOptions: Apollo.QueryHookOptions<CharacterQuery, CharacterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharacterQuery, CharacterQueryVariables>(CharacterDocument, options);
      }
export function useCharacterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharacterQuery, CharacterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharacterQuery, CharacterQueryVariables>(CharacterDocument, options);
        }
export type CharacterQueryHookResult = ReturnType<typeof useCharacterQuery>;
export type CharacterLazyQueryHookResult = ReturnType<typeof useCharacterLazyQuery>;
export type CharacterQueryResult = Apollo.QueryResult<CharacterQuery, CharacterQueryVariables>;
export const MyListEntryStatusDocument = gql`
    query MyListEntryStatus($slug: String!, $type: Media!) {
  myListEntryStatus(slug: $slug, type: $type) {
    status
    resourceSlug
  }
}
    `;

/**
 * __useMyListEntryStatusQuery__
 *
 * To run a query within a React component, call `useMyListEntryStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyListEntryStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyListEntryStatusQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useMyListEntryStatusQuery(baseOptions: Apollo.QueryHookOptions<MyListEntryStatusQuery, MyListEntryStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyListEntryStatusQuery, MyListEntryStatusQueryVariables>(MyListEntryStatusDocument, options);
      }
export function useMyListEntryStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyListEntryStatusQuery, MyListEntryStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyListEntryStatusQuery, MyListEntryStatusQueryVariables>(MyListEntryStatusDocument, options);
        }
export type MyListEntryStatusQueryHookResult = ReturnType<typeof useMyListEntryStatusQuery>;
export type MyListEntryStatusLazyQueryHookResult = ReturnType<typeof useMyListEntryStatusLazyQuery>;
export type MyListEntryStatusQueryResult = Apollo.QueryResult<MyListEntryStatusQuery, MyListEntryStatusQueryVariables>;
export const UserAnimeListDocument = gql`
    query UserAnimeList($options: ListFilterInput!) {
  userList(options: $options) {
    items {
      resourceSlug
      status
      currentEpisode
      anime {
        ...DefaultAnime
      }
    }
    hasMore
    nextCursor
  }
}
    ${DefaultAnimeFragmentDoc}`;

/**
 * __useUserAnimeListQuery__
 *
 * To run a query within a React component, call `useUserAnimeListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserAnimeListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserAnimeListQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUserAnimeListQuery(baseOptions: Apollo.QueryHookOptions<UserAnimeListQuery, UserAnimeListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserAnimeListQuery, UserAnimeListQueryVariables>(UserAnimeListDocument, options);
      }
export function useUserAnimeListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserAnimeListQuery, UserAnimeListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserAnimeListQuery, UserAnimeListQueryVariables>(UserAnimeListDocument, options);
        }
export type UserAnimeListQueryHookResult = ReturnType<typeof useUserAnimeListQuery>;
export type UserAnimeListLazyQueryHookResult = ReturnType<typeof useUserAnimeListLazyQuery>;
export type UserAnimeListQueryResult = Apollo.QueryResult<UserAnimeListQuery, UserAnimeListQueryVariables>;
export const UserMangaListDocument = gql`
    query UserMangaList($options: ListFilterInput!) {
  userList(options: $options) {
    items {
      resourceSlug
      status
      currentEpisode
      manga {
        ...DefaultManga
      }
    }
    hasMore
    nextCursor
  }
}
    ${DefaultMangaFragmentDoc}`;

/**
 * __useUserMangaListQuery__
 *
 * To run a query within a React component, call `useUserMangaListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserMangaListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserMangaListQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUserMangaListQuery(baseOptions: Apollo.QueryHookOptions<UserMangaListQuery, UserMangaListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserMangaListQuery, UserMangaListQueryVariables>(UserMangaListDocument, options);
      }
export function useUserMangaListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserMangaListQuery, UserMangaListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserMangaListQuery, UserMangaListQueryVariables>(UserMangaListDocument, options);
        }
export type UserMangaListQueryHookResult = ReturnType<typeof useUserMangaListQuery>;
export type UserMangaListLazyQueryHookResult = ReturnType<typeof useUserMangaListLazyQuery>;
export type UserMangaListQueryResult = Apollo.QueryResult<UserMangaListQuery, UserMangaListQueryVariables>;
export const MangaDocument = gql`
    query Manga($slug: String!) {
  manga(slug: $slug) {
    ...DefaultManga
    ageRatingGuide
    posterLinkOriginal
    coverLinkOriginal
    serialization
    volumeCount
    chapterCount
  }
}
    ${DefaultMangaFragmentDoc}`;

/**
 * __useMangaQuery__
 *
 * To run a query within a React component, call `useMangaQuery` and pass it any options that fit your needs.
 * When your component renders, `useMangaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMangaQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useMangaQuery(baseOptions: Apollo.QueryHookOptions<MangaQuery, MangaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MangaQuery, MangaQueryVariables>(MangaDocument, options);
      }
export function useMangaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MangaQuery, MangaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MangaQuery, MangaQueryVariables>(MangaDocument, options);
        }
export type MangaQueryHookResult = ReturnType<typeof useMangaQuery>;
export type MangaLazyQueryHookResult = ReturnType<typeof useMangaLazyQuery>;
export type MangaQueryResult = Apollo.QueryResult<MangaQuery, MangaQueryVariables>;
export const SearchMangaDocument = gql`
    query SearchManga($limit: Int!, $cursor: Int!, $filter: String) {
  kitsuSearchManga(limit: $limit, cursor: $cursor, filter: $filter) {
    items {
      ...DefaultManga
    }
    hasMore
    nextCursor
  }
}
    ${DefaultMangaFragmentDoc}`;

/**
 * __useSearchMangaQuery__
 *
 * To run a query within a React component, call `useSearchMangaQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchMangaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchMangaQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useSearchMangaQuery(baseOptions: Apollo.QueryHookOptions<SearchMangaQuery, SearchMangaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchMangaQuery, SearchMangaQueryVariables>(SearchMangaDocument, options);
      }
export function useSearchMangaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchMangaQuery, SearchMangaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchMangaQuery, SearchMangaQueryVariables>(SearchMangaDocument, options);
        }
export type SearchMangaQueryHookResult = ReturnType<typeof useSearchMangaQuery>;
export type SearchMangaLazyQueryHookResult = ReturnType<typeof useSearchMangaLazyQuery>;
export type SearchMangaQueryResult = Apollo.QueryResult<SearchMangaQuery, SearchMangaQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...DefaultUser
  }
}
    ${DefaultUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserDocument = gql`
    query User($username: String!) {
  user(username: $username) {
    ...PublicUser
  }
}
    ${PublicUserFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;