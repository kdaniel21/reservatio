import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};



export type ChangePasswordUsingTokenInputDto = {
  passwordResetToken: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
};

export type CreateRecurringReservationResponseDto = {
  __typename?: 'CreateRecurringReservationResponseDto';
  count: Scalars['Float'];
  recurringId: Scalars['String'];
};


export type GraphQlCustomer = {
  __typename?: 'GraphQLCustomer';
  id: Scalars['ID'];
  user: GraphQlUser;
  name: Scalars['String'];
  role: Role;
};

export type GraphQlReservation = {
  __typename?: 'GraphQLReservation';
  id: Scalars['ID'];
  recurringId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  isActive: Scalars['Boolean'];
  customer: GraphQlCustomer;
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  locations: GraphQlReservationLocationOutput;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type GraphQlReservationLocationInput = {
  tableTennis?: Maybe<Scalars['Boolean']>;
  badminton?: Maybe<Scalars['Boolean']>;
};

export type GraphQlReservationLocationOutput = {
  __typename?: 'GraphQLReservationLocationOutput';
  tableTennis: Scalars['Boolean'];
  badminton: Scalars['Boolean'];
};

export type GraphQlUser = {
  __typename?: 'GraphQLUser';
  id: Scalars['String'];
  email: Scalars['String'];
  isEmailConfirmed: Scalars['Boolean'];
  customer?: Maybe<GraphQlCustomer>;
};

export type HealthCheckResponse = {
  __typename?: 'HealthCheckResponse';
  name: Scalars['String'];
  status: Scalars['String'];
  version: Scalars['String'];
  currentTime: Scalars['DateTime'];
};

export type IsRecurringTimeAvailableResponseDto = {
  __typename?: 'IsRecurringTimeAvailableResponseDto';
  availableTimes: Array<Scalars['DateTime']>;
  unavailableTimes: Array<Scalars['DateTime']>;
};

export type IsTimeAvailableResponseDto = {
  __typename?: 'IsTimeAvailableResponseDto';
  isTimeAvailable: Scalars['Boolean'];
};

/** Login mutation result. */
export type LoginResponseDto = {
  __typename?: 'LoginResponseDto';
  user: GraphQlUser;
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type MessageResponseDto = {
  __typename?: 'MessageResponseDto';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createRecurringReservation: CreateRecurringReservationResponseDto;
  createReservation: GraphQlReservation;
  changePasswordUsingToken: MessageResponseDto;
  confirmEmail: MessageResponseDto;
  login: LoginResponseDto;
  logout: MessageResponseDto;
  register: RegisterResponseDto;
  resetPassword: MessageResponseDto;
  sendEmailConfirmation: MessageResponseDto;
};


export type MutationCreateRecurringReservationArgs = {
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  includedDates?: Maybe<Array<Scalars['DateTime']>>;
  excludedDates?: Maybe<Array<Scalars['DateTime']>>;
  locations: GraphQlReservationLocationInput;
  recurrence?: Maybe<Recurrence>;
  timePeriod?: Maybe<TimePeriod>;
  name: Scalars['String'];
};


export type MutationCreateReservationArgs = {
  name: Scalars['String'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  locations: GraphQlReservationLocationInput;
};


export type MutationChangePasswordUsingTokenArgs = {
  params: ChangePasswordUsingTokenInputDto;
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLogoutArgs = {
  refreshToken?: Maybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  params: RegisterInputDto;
};


export type MutationResetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationSendEmailConfirmationArgs = {
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  status: HealthCheckResponse;
  reservation: GraphQlReservation;
  reservations: Array<GraphQlReservation>;
  isRecurringTimeAvailable: IsRecurringTimeAvailableResponseDto;
  isTimeAvailable: IsTimeAvailableResponseDto;
  currentUser: GraphQlUser;
  refreshAccessToken: RefreshAccessTokenResponseDto;
};


export type QueryReservationArgs = {
  id: Scalars['ID'];
};


export type QueryReservationsArgs = {
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
};


export type QueryIsRecurringTimeAvailableArgs = {
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  includedDates?: Maybe<Array<Scalars['DateTime']>>;
  excludedDates?: Maybe<Array<Scalars['DateTime']>>;
  locations: GraphQlReservationLocationInput;
  recurrence?: Maybe<Recurrence>;
  timePeriod?: Maybe<TimePeriod>;
};


export type QueryIsTimeAvailableArgs = {
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  locations: GraphQlReservationLocationInput;
};


export type QueryRefreshAccessTokenArgs = {
  refreshToken?: Maybe<Scalars['String']>;
};

export enum Recurrence {
  Weekly = 'Weekly',
  Monthly = 'Monthly'
}

export type RefreshAccessTokenResponseDto = {
  __typename?: 'RefreshAccessTokenResponseDto';
  accessToken: Scalars['String'];
};

export type RegisterInputDto = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
};

export type RegisterResponseDto = {
  __typename?: 'RegisterResponseDto';
  user: GraphQlUser;
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export enum Role {
  Admin = 'Admin',
  Customer = 'Customer'
}

export enum TimePeriod {
  HalfYear = 'HalfYear',
  CurrentYear = 'CurrentYear'
}

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser: (
    { __typename?: 'GraphQLUser' }
    & Pick<GraphQlUser, 'id' | 'email' | 'isEmailConfirmed'>
    & { customer?: Maybe<(
      { __typename?: 'GraphQLCustomer' }
      & Pick<GraphQlCustomer, 'id' | 'name' | 'role'>
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponseDto' }
    & Pick<LoginResponseDto, 'accessToken'>
    & { user: (
      { __typename?: 'GraphQLUser' }
      & Pick<GraphQlUser, 'id' | 'email' | 'isEmailConfirmed'>
    ) }
  ) }
);

export type RefreshAccessTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshAccessTokenQuery = (
  { __typename?: 'Query' }
  & { refreshAccessToken: (
    { __typename?: 'RefreshAccessTokenResponseDto' }
    & Pick<RefreshAccessTokenResponseDto, 'accessToken'>
  ) }
);

export const GetCurrentUserDocument = gql`
    query getCurrentUser {
  currentUser {
    id
    email
    isEmailConfirmed
    customer {
      id
      name
      role
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCurrentUserGQL extends Apollo.Query<GetCurrentUserQuery, GetCurrentUserQueryVariables> {
    document = GetCurrentUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      email
      isEmailConfirmed
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RefreshAccessTokenDocument = gql`
    query refreshAccessToken {
  refreshAccessToken {
    accessToken
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RefreshAccessTokenGQL extends Apollo.Query<RefreshAccessTokenQuery, RefreshAccessTokenQueryVariables> {
    document = RefreshAccessTokenDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }