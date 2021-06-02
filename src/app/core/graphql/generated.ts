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

export type ConfirmEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmEmailMutation = (
  { __typename?: 'Mutation' }
  & { confirmEmail: (
    { __typename?: 'MessageResponseDto' }
    & Pick<MessageResponseDto, 'message'>
  ) }
);

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
      & { customer?: Maybe<(
        { __typename?: 'GraphQLCustomer' }
        & Pick<GraphQlCustomer, 'id' | 'name' | 'role'>
      )> }
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout: (
    { __typename?: 'MessageResponseDto' }
    & Pick<MessageResponseDto, 'message'>
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

export type GetReservationQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetReservationQuery = (
  { __typename?: 'Query' }
  & { reservation: (
    { __typename?: 'GraphQLReservation' }
    & Pick<GraphQlReservation, 'id' | 'recurringId' | 'name' | 'isActive' | 'startTime' | 'endTime' | 'createdAt' | 'updatedAt'>
    & { locations: (
      { __typename?: 'GraphQLReservationLocationOutput' }
      & Pick<GraphQlReservationLocationOutput, 'tableTennis' | 'badminton'>
    ), customer: (
      { __typename?: 'GraphQLCustomer' }
      & Pick<GraphQlCustomer, 'name'>
    ) }
  ) }
);

export type GetReservationsQueryVariables = Exact<{
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
}>;


export type GetReservationsQuery = (
  { __typename?: 'Query' }
  & { reservations: Array<(
    { __typename?: 'GraphQLReservation' }
    & Pick<GraphQlReservation, 'id' | 'recurringId' | 'name' | 'isActive' | 'startTime' | 'endTime'>
    & { locations: (
      { __typename?: 'GraphQLReservationLocationOutput' }
      & Pick<GraphQlReservationLocationOutput, 'tableTennis' | 'badminton'>
    ) }
  )> }
);

export type CreateRecurringReservationMutationVariables = Exact<{
  name: Scalars['String'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  includedDates?: Maybe<Array<Scalars['DateTime']> | Scalars['DateTime']>;
  excludedDates?: Maybe<Array<Scalars['DateTime']> | Scalars['DateTime']>;
  locations: GraphQlReservationLocationInput;
  recurrence: Recurrence;
  timePeriod: TimePeriod;
}>;


export type CreateRecurringReservationMutation = (
  { __typename?: 'Mutation' }
  & { createRecurringReservation: (
    { __typename?: 'CreateRecurringReservationResponseDto' }
    & Pick<CreateRecurringReservationResponseDto, 'count' | 'recurringId'>
  ) }
);

export type CreateReservationMutationVariables = Exact<{
  name: Scalars['String'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  locations: GraphQlReservationLocationInput;
}>;


export type CreateReservationMutation = (
  { __typename?: 'Mutation' }
  & { createReservation: (
    { __typename?: 'GraphQLReservation' }
    & Pick<GraphQlReservation, 'id' | 'name' | 'isActive' | 'startTime'>
    & { locations: (
      { __typename?: 'GraphQLReservationLocationOutput' }
      & Pick<GraphQlReservationLocationOutput, 'tableTennis' | 'badminton'>
    ) }
  ) }
);

export type IsRecurringTimeAvailableQueryVariables = Exact<{
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  includedDates?: Maybe<Array<Scalars['DateTime']> | Scalars['DateTime']>;
  excludedDates?: Maybe<Array<Scalars['DateTime']> | Scalars['DateTime']>;
  locations: GraphQlReservationLocationInput;
  recurrence: Recurrence;
  timePeriod: TimePeriod;
}>;


export type IsRecurringTimeAvailableQuery = (
  { __typename?: 'Query' }
  & { isRecurringTimeAvailable: (
    { __typename?: 'IsRecurringTimeAvailableResponseDto' }
    & Pick<IsRecurringTimeAvailableResponseDto, 'availableTimes' | 'unavailableTimes'>
  ) }
);

export type IsTimeAvailableQueryVariables = Exact<{
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  locations: GraphQlReservationLocationInput;
}>;


export type IsTimeAvailableQuery = (
  { __typename?: 'Query' }
  & { isTimeAvailable: (
    { __typename?: 'IsTimeAvailableResponseDto' }
    & Pick<IsTimeAvailableResponseDto, 'isTimeAvailable'>
  ) }
);

export const ConfirmEmailDocument = gql`
    mutation confirmEmail($token: String!) {
  confirmEmail(token: $token) {
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ConfirmEmailGQL extends Apollo.Mutation<ConfirmEmailMutation, ConfirmEmailMutationVariables> {
    document = ConfirmEmailDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
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
      customer {
        id
        name
        role
      }
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
export const LogoutDocument = gql`
    mutation logout {
  logout {
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LogoutGQL extends Apollo.Mutation<LogoutMutation, LogoutMutationVariables> {
    document = LogoutDocument;
    
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
export const GetReservationDocument = gql`
    query getReservation($id: ID!) {
  reservation(id: $id) {
    id
    recurringId
    name
    isActive
    startTime
    endTime
    locations {
      tableTennis
      badminton
    }
    createdAt
    updatedAt
    customer {
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetReservationGQL extends Apollo.Query<GetReservationQuery, GetReservationQueryVariables> {
    document = GetReservationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetReservationsDocument = gql`
    query getReservations($startDate: DateTime!, $endDate: DateTime!) {
  reservations(startDate: $startDate, endDate: $endDate) {
    id
    recurringId
    name
    isActive
    startTime
    endTime
    locations {
      tableTennis
      badminton
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetReservationsGQL extends Apollo.Query<GetReservationsQuery, GetReservationsQueryVariables> {
    document = GetReservationsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateRecurringReservationDocument = gql`
    mutation createRecurringReservation($name: String!, $startTime: DateTime!, $endTime: DateTime!, $includedDates: [DateTime!], $excludedDates: [DateTime!], $locations: GraphQLReservationLocationInput!, $recurrence: Recurrence!, $timePeriod: TimePeriod!) {
  createRecurringReservation(
    name: $name
    startTime: $startTime
    endTime: $endTime
    includedDates: $includedDates
    excludedDates: $excludedDates
    locations: $locations
    recurrence: $recurrence
    timePeriod: $timePeriod
  ) {
    count
    recurringId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateRecurringReservationGQL extends Apollo.Mutation<CreateRecurringReservationMutation, CreateRecurringReservationMutationVariables> {
    document = CreateRecurringReservationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateReservationDocument = gql`
    mutation createReservation($name: String!, $startTime: DateTime!, $endTime: DateTime!, $locations: GraphQLReservationLocationInput!) {
  createReservation(
    name: $name
    startTime: $startTime
    endTime: $endTime
    locations: $locations
  ) {
    id
    name
    isActive
    startTime
    locations {
      tableTennis
      badminton
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateReservationGQL extends Apollo.Mutation<CreateReservationMutation, CreateReservationMutationVariables> {
    document = CreateReservationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const IsRecurringTimeAvailableDocument = gql`
    query isRecurringTimeAvailable($startTime: DateTime!, $endTime: DateTime!, $includedDates: [DateTime!], $excludedDates: [DateTime!], $locations: GraphQLReservationLocationInput!, $recurrence: Recurrence!, $timePeriod: TimePeriod!) {
  isRecurringTimeAvailable(
    startTime: $startTime
    endTime: $endTime
    includedDates: $includedDates
    excludedDates: $excludedDates
    locations: $locations
    recurrence: $recurrence
    timePeriod: $timePeriod
  ) {
    availableTimes
    unavailableTimes
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class IsRecurringTimeAvailableGQL extends Apollo.Query<IsRecurringTimeAvailableQuery, IsRecurringTimeAvailableQueryVariables> {
    document = IsRecurringTimeAvailableDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const IsTimeAvailableDocument = gql`
    query isTimeAvailable($startTime: DateTime!, $endTime: DateTime!, $locations: GraphQLReservationLocationInput!) {
  isTimeAvailable(startTime: $startTime, endTime: $endTime, locations: $locations) {
    isTimeAvailable
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class IsTimeAvailableGQL extends Apollo.Query<IsTimeAvailableQuery, IsTimeAvailableQueryVariables> {
    document = IsTimeAvailableDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }