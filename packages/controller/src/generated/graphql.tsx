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
  coverLinkSmall: Scalars['String'];
  createdAt: Scalars['String'];
  endDate: Scalars['String'];
  englishTitle: Scalars['String'];
  episodeCount: Scalars['Int'];
  id: Scalars['Int'];
  japaneseTitle: Scalars['String'];
  nsfw: Scalars['Boolean'];
  posterLinkOriginal: Scalars['String'];
  posterLinkSmall: Scalars['String'];
  romajiTitle: Scalars['String'];
  slug: Scalars['String'];
  startDate: Scalars['String'];
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

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type List = {
  __typename?: 'List';
  createdAt: Scalars['String'];
  currentChapter: Scalars['Int'];
  currentEpisode: Scalars['Int'];
  currentVolume: Scalars['Int'];
  resourceID: Scalars['Int'];
  resourceType: ResourceType;
  status: ListStatus;
  updatedAt: Scalars['String'];
  userID: Scalars['Int'];
};

export enum ListStatus {
  Completed = 'COMPLETED',
  Dropped = 'DROPPED',
  OnHold = 'ON_HOLD',
  WantToWatch = 'WANT_TO_WATCH',
  Watching = 'WATCHING'
}

export type Manga = {
  __typename?: 'Manga';
  ageRating: AgeRating;
  ageRatingGuide: Scalars['String'];
  apiID: Scalars['Int'];
  canonicalTitle: Scalars['String'];
  chapterCount: Scalars['Int'];
  coverLinkOriginal: Scalars['String'];
  coverLinkSmall: Scalars['String'];
  createdAt: Scalars['String'];
  endDate: Scalars['String'];
  englishTitle: Scalars['String'];
  id: Scalars['Int'];
  japaneseTitle: Scalars['String'];
  posterLinkOriginal: Scalars['String'];
  posterLinkSmall: Scalars['String'];
  romajiTitle: Scalars['String'];
  serialization: Scalars['String'];
  slug: Scalars['String'];
  startDate: Scalars['String'];
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

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
};


export type MutationChangePasswordArgs = {
  confirmPassword: Scalars['String'];
  newPassword: Scalars['String'];
  token: Scalars['String'];
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
  me?: Maybe<User>;
};

export type Ranking = {
  __typename?: 'Ranking';
  createdAt: Scalars['String'];
  matchupKey: Scalars['String'];
  resourceType: ResourceType;
  updatedAt: Scalars['String'];
  userID: Scalars['Int'];
  votedResourceID: Scalars['Int'];
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
  apiID: Scalars['Int'];
  artist: Scalars['String'];
  createdAt: Scalars['String'];
  fullTitle: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  slug: Scalars['String'];
  songType: Scalars['String'];
  updatedAt: Scalars['String'];
};

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

export type DefaultErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type DefaultUserFragment = { __typename?: 'User', id: number, username: string, email: string, profileIcon: ProfileIcon, profileColor: ProfileColor, titlePreference: TitlePreference, showNSFW: boolean };

export type DefaultUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, email: string, profileIcon: ProfileIcon, profileColor: ProfileColor, titlePreference: TitlePreference, showNSFW: boolean } | null | undefined };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, email: string, profileIcon: ProfileIcon, profileColor: ProfileColor, titlePreference: TitlePreference, showNSFW: boolean } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, email: string, profileIcon: ProfileIcon, profileColor: ProfileColor, titlePreference: TitlePreference, showNSFW: boolean } | null | undefined } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, email: string, profileIcon: ProfileIcon, profileColor: ProfileColor, titlePreference: TitlePreference, showNSFW: boolean } | null | undefined };

export const DefaultErrorFragmentDoc = gql`
    fragment DefaultError on FieldError {
  field
  message
}
    `;
export const DefaultUserFragmentDoc = gql`
    fragment DefaultUser on User {
  id
  username
  email
  profileIcon
  profileColor
  titlePreference
  showNSFW
}
    `;
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