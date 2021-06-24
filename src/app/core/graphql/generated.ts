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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};



export type AccessTokenType = {
  __typename?: 'AccessTokenType';
  accessToken: Scalars['String'];
};

export type CreatedRecurringReservationType = {
  __typename?: 'CreatedRecurringReservationType';
  recurringId: Scalars['ID'];
  count: Scalars['Float'];
};

export enum CustomerRole {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER'
}

export type CustomerType = {
  __typename?: 'CustomerType';
  id: Scalars['ID'];
  name: Scalars['String'];
  role: CustomerRole;
  user: UserType;
};


export type InvitationType = {
  __typename?: 'InvitationType';
  id: Scalars['ID'];
  expiresAt: Scalars['DateTime'];
  inviter: CustomerType;
  emailAddress: Scalars['String'];
  isActive: Scalars['Boolean'];
  isCompleted: Scalars['Boolean'];
  isRedeemable: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
};

export type InvitationTypeEdge = {
  __typename?: 'InvitationTypeEdge';
  node: InvitationType;
  cursor: Scalars['String'];
};

export type LoginType = {
  __typename?: 'LoginType';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: UserType;
};

export type MessageType = {
  __typename?: 'MessageType';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginType;
  register: MessageType;
  logout: MessageType;
  confirmEmailAddress: MessageType;
  sendEmailConfirmation: MessageType;
  resetPassword: MessageType;
  changePasswordUsingToken: MessageType;
  sendInvitation: InvitationType;
  updateInvitation: InvitationType;
  createReservation: ReservationType;
  createRecurringReservation: CreatedRecurringReservationType;
  updateReservation: ReservationType;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
  invitationToken: Scalars['String'];
};


export type MutationLogoutArgs = {
  refreshToken?: Maybe<Scalars['String']>;
};


export type MutationConfirmEmailAddressArgs = {
  token: Scalars['String'];
};


export type MutationSendEmailConfirmationArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordUsingTokenArgs = {
  passwordResetToken: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
};


export type MutationSendInvitationArgs = {
  emailAddress: Scalars['String'];
};


export type MutationUpdateInvitationArgs = {
  id: Scalars['ID'];
  expiresAt?: Maybe<Scalars['DateTime']>;
  emailAddress?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  isCompleted?: Maybe<Scalars['Boolean']>;
  isRedeemable?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateReservationArgs = {
  name: Scalars['String'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  locations: ReservationLocationsInput;
};


export type MutationCreateRecurringReservationArgs = {
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  locations: ReservationLocationsInput;
  includedDates?: Maybe<Array<Scalars['DateTime']>>;
  excludedDates?: Maybe<Array<Scalars['DateTime']>>;
  recurrence?: Maybe<Recurrence>;
  timePeriod?: Maybe<TimePeriod>;
  name: Scalars['String'];
};


export type MutationUpdateReservationArgs = {
  id: Scalars['ID'];
  updatedProperties: UpdatedProperties;
  connectedUpdates?: Maybe<Array<Scalars['ID']>>;
};

export type PageInfoType = {
  __typename?: 'PageInfoType';
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
};

export type PageType = {
  __typename?: 'PageType';
  edges: Array<InvitationTypeEdge>;
  totalCount: Scalars['Float'];
  pageInfo: PageInfoType;
};

export type Query = {
  __typename?: 'Query';
  renewAccessToken: AccessTokenType;
  currentUser: UserType;
  invitations: PageType;
  invitation: InvitationType;
  reservation: ReservationType;
  areTimesAvailable: Array<TimeProposalAvailability>;
  isRecurringTimeAvailable: RecurringTimeAvailabilityType;
  reservations: Array<ReservationType>;
  recurringReservations: Array<ReservationType>;
};


export type QueryRenewAccessTokenArgs = {
  refreshToken?: Maybe<Scalars['String']>;
};


export type QueryInvitationsArgs = {
  first: Scalars['Float'];
  after?: Maybe<Scalars['String']>;
};


export type QueryInvitationArgs = {
  id: Scalars['ID'];
};


export type QueryReservationArgs = {
  id: Scalars['ID'];
};


export type QueryAreTimesAvailableArgs = {
  timeProposals: Array<TimeProposalInput>;
};


export type QueryIsRecurringTimeAvailableArgs = {
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  locations: ReservationLocationsInput;
  includedDates?: Maybe<Array<Scalars['DateTime']>>;
  excludedDates?: Maybe<Array<Scalars['DateTime']>>;
  recurrence?: Maybe<Recurrence>;
  timePeriod?: Maybe<TimePeriod>;
};


export type QueryReservationsArgs = {
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
};


export type QueryRecurringReservationsArgs = {
  recurringId: Scalars['ID'];
  futureOnly?: Maybe<Scalars['Boolean']>;
};

export enum Recurrence {
  Weekly = 'WEEKLY',
  Monthly = 'MONTHLY'
}

export type RecurringTimeAvailabilityType = {
  __typename?: 'RecurringTimeAvailabilityType';
  availableTimes: Array<Scalars['DateTime']>;
  unavailableTimes: Array<Scalars['DateTime']>;
};

export type ReservationLocationsInput = {
  tableTennis?: Maybe<Scalars['Boolean']>;
  badminton?: Maybe<Scalars['Boolean']>;
};

export type ReservationLocationsType = {
  __typename?: 'ReservationLocationsType';
  tableTennis: Scalars['Boolean'];
  badminton: Scalars['Boolean'];
};

export type ReservationType = {
  __typename?: 'ReservationType';
  id: Scalars['ID'];
  recurringId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  isActive: Scalars['Boolean'];
  customer: CustomerType;
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  locations: ReservationLocationsType;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export enum TimePeriod {
  HalfYear = 'HALF_YEAR',
  CurrentYear = 'CURRENT_YEAR'
}

export type TimeProposalAvailability = {
  __typename?: 'TimeProposalAvailability';
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  locations: ReservationLocationsType;
  isAvailable: Scalars['Boolean'];
};

export type TimeProposalInput = {
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  locations: ReservationLocationsInput;
  excludedReservation?: Maybe<Scalars['ID']>;
};

export type UpdatedProperties = {
  name?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  locations?: Maybe<ReservationLocationsInput>;
};

export type UserType = {
  __typename?: 'UserType';
  id: Scalars['ID'];
  email: Scalars['String'];
  isEmailConfirmed: Scalars['Boolean'];
  customer: CustomerType;
};

export type ChangePasswordUsingTokenMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
}>;


export type ChangePasswordUsingTokenMutation = (
  { __typename?: 'Mutation' }
  & { changePasswordUsingToken: (
    { __typename?: 'MessageType' }
    & Pick<MessageType, 'message'>
  ) }
);

export type ConfirmEmailAddressMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmEmailAddressMutation = (
  { __typename?: 'Mutation' }
  & { confirmEmailAddress: (
    { __typename?: 'MessageType' }
    & Pick<MessageType, 'message'>
  ) }
);

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: (
    { __typename?: 'MessageType' }
    & Pick<MessageType, 'message'>
  ) }
);

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser: (
    { __typename?: 'UserType' }
    & Pick<UserType, 'id' | 'email' | 'isEmailConfirmed'>
    & { customer: (
      { __typename?: 'CustomerType' }
      & Pick<CustomerType, 'id' | 'name' | 'role'>
    ) }
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginType' }
    & Pick<LoginType, 'accessToken'>
    & { user: (
      { __typename?: 'UserType' }
      & Pick<UserType, 'id' | 'email' | 'isEmailConfirmed'>
      & { customer: (
        { __typename?: 'CustomerType' }
        & Pick<CustomerType, 'id' | 'name' | 'role'>
      ) }
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout: (
    { __typename?: 'MessageType' }
    & Pick<MessageType, 'message'>
  ) }
);

export type RefreshAccessTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshAccessTokenQuery = (
  { __typename?: 'Query' }
  & { renewAccessToken: (
    { __typename?: 'AccessTokenType' }
    & Pick<AccessTokenType, 'accessToken'>
  ) }
);

export type GetReservationsQueryVariables = Exact<{
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
}>;


export type GetReservationsQuery = (
  { __typename?: 'Query' }
  & { reservations: Array<(
    { __typename?: 'ReservationType' }
    & Pick<ReservationType, 'id' | 'recurringId' | 'name' | 'isActive' | 'startTime' | 'endTime'>
    & { locations: (
      { __typename?: 'ReservationLocationsType' }
      & Pick<ReservationLocationsType, 'tableTennis' | 'badminton'>
    ) }
  )> }
);

export type AreTimesAvailableQueryVariables = Exact<{
  timeProposals: Array<TimeProposalInput> | TimeProposalInput;
}>;


export type AreTimesAvailableQuery = (
  { __typename?: 'Query' }
  & { areTimesAvailable: Array<(
    { __typename?: 'TimeProposalAvailability' }
    & Pick<TimeProposalAvailability, 'startTime' | 'endTime' | 'isAvailable'>
    & { locations: (
      { __typename?: 'ReservationLocationsType' }
      & Pick<ReservationLocationsType, 'tableTennis' | 'badminton'>
    ) }
  )> }
);

export type GetReservationQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetReservationQuery = (
  { __typename?: 'Query' }
  & { reservation: (
    { __typename?: 'ReservationType' }
    & Pick<ReservationType, 'id' | 'recurringId' | 'name' | 'isActive' | 'startTime' | 'endTime' | 'createdAt' | 'updatedAt'>
    & { locations: (
      { __typename?: 'ReservationLocationsType' }
      & Pick<ReservationLocationsType, 'tableTennis' | 'badminton'>
    ), customer: (
      { __typename?: 'CustomerType' }
      & Pick<CustomerType, 'id' | 'name'>
    ) }
  ) }
);

export type CreateRecurringReservationMutationVariables = Exact<{
  name: Scalars['String'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  includedDates?: Maybe<Array<Scalars['DateTime']> | Scalars['DateTime']>;
  excludedDates?: Maybe<Array<Scalars['DateTime']> | Scalars['DateTime']>;
  locations: ReservationLocationsInput;
  recurrence: Recurrence;
  timePeriod: TimePeriod;
}>;


export type CreateRecurringReservationMutation = (
  { __typename?: 'Mutation' }
  & { createRecurringReservation: (
    { __typename?: 'CreatedRecurringReservationType' }
    & Pick<CreatedRecurringReservationType, 'count' | 'recurringId'>
  ) }
);

export type CreateReservationMutationVariables = Exact<{
  name: Scalars['String'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  locations: ReservationLocationsInput;
}>;


export type CreateReservationMutation = (
  { __typename?: 'Mutation' }
  & { createReservation: (
    { __typename?: 'ReservationType' }
    & Pick<ReservationType, 'id' | 'name' | 'isActive' | 'startTime'>
    & { locations: (
      { __typename?: 'ReservationLocationsType' }
      & Pick<ReservationLocationsType, 'tableTennis' | 'badminton'>
    ) }
  ) }
);

export type IsRecurringTimeAvailableQueryVariables = Exact<{
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  includedDates?: Maybe<Array<Scalars['DateTime']> | Scalars['DateTime']>;
  excludedDates?: Maybe<Array<Scalars['DateTime']> | Scalars['DateTime']>;
  locations: ReservationLocationsInput;
  recurrence: Recurrence;
  timePeriod: TimePeriod;
}>;


export type IsRecurringTimeAvailableQuery = (
  { __typename?: 'Query' }
  & { isRecurringTimeAvailable: (
    { __typename?: 'RecurringTimeAvailabilityType' }
    & Pick<RecurringTimeAvailabilityType, 'availableTimes' | 'unavailableTimes'>
  ) }
);

export type GetInvitationQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetInvitationQuery = (
  { __typename?: 'Query' }
  & { invitation: (
    { __typename?: 'InvitationType' }
    & Pick<InvitationType, 'id' | 'emailAddress' | 'expiresAt' | 'isActive' | 'isCompleted' | 'isRedeemable' | 'createdAt'>
    & { inviter: (
      { __typename?: 'CustomerType' }
      & Pick<CustomerType, 'id' | 'name'>
    ) }
  ) }
);

export type UpdateInvitationMutationVariables = Exact<{
  id: Scalars['ID'];
  expiresAt?: Maybe<Scalars['DateTime']>;
  isActive?: Maybe<Scalars['Boolean']>;
  emailAddress?: Maybe<Scalars['String']>;
}>;


export type UpdateInvitationMutation = (
  { __typename?: 'Mutation' }
  & { updateInvitation: (
    { __typename?: 'InvitationType' }
    & Pick<InvitationType, 'id'>
  ) }
);

export type GetInvitationsQueryVariables = Exact<{
  first: Scalars['Float'];
  after?: Maybe<Scalars['String']>;
}>;


export type GetInvitationsQuery = (
  { __typename?: 'Query' }
  & { invitations: (
    { __typename?: 'PageType' }
    & { edges: Array<(
      { __typename?: 'InvitationTypeEdge' }
      & { node: (
        { __typename?: 'InvitationType' }
        & Pick<InvitationType, 'id' | 'emailAddress' | 'isRedeemable' | 'isCompleted' | 'expiresAt'>
      ) }
    )>, pageInfo: (
      { __typename?: 'PageInfoType' }
      & Pick<PageInfoType, 'endCursor' | 'hasNextPage'>
    ) }
  ) }
);

export type SendInvitationMutationVariables = Exact<{
  emailAddress: Scalars['String'];
}>;


export type SendInvitationMutation = (
  { __typename?: 'Mutation' }
  & { sendInvitation: (
    { __typename?: 'InvitationType' }
    & Pick<InvitationType, 'id'>
  ) }
);

export type GetRelatedReservationsQueryVariables = Exact<{
  recurringId: Scalars['ID'];
}>;


export type GetRelatedReservationsQuery = (
  { __typename?: 'Query' }
  & { recurringReservations: Array<(
    { __typename?: 'ReservationType' }
    & Pick<ReservationType, 'id' | 'name' | 'startTime' | 'endTime'>
    & { locations: (
      { __typename?: 'ReservationLocationsType' }
      & Pick<ReservationLocationsType, 'badminton' | 'tableTennis'>
    ) }
  )> }
);

export type UpdateReservationMutationVariables = Exact<{
  id: Scalars['ID'];
  updatedProperties: UpdatedProperties;
  connectedUpdates?: Maybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type UpdateReservationMutation = (
  { __typename?: 'Mutation' }
  & { updateReservation: (
    { __typename?: 'ReservationType' }
    & Pick<ReservationType, 'id' | 'name'>
  ) }
);

export const ChangePasswordUsingTokenDocument = gql`
    mutation changePasswordUsingToken($token: String!, $password: String!, $passwordConfirm: String!) {
  changePasswordUsingToken(
    passwordResetToken: $token
    password: $password
    passwordConfirm: $passwordConfirm
  ) {
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ChangePasswordUsingTokenGQL extends Apollo.Mutation<ChangePasswordUsingTokenMutation, ChangePasswordUsingTokenMutationVariables> {
    document = ChangePasswordUsingTokenDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ConfirmEmailAddressDocument = gql`
    mutation confirmEmailAddress($token: String!) {
  confirmEmailAddress(token: $token) {
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ConfirmEmailAddressGQL extends Apollo.Mutation<ConfirmEmailAddressMutation, ConfirmEmailAddressMutationVariables> {
    document = ConfirmEmailAddressDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ResetPasswordDocument = gql`
    mutation resetPassword($email: String!) {
  resetPassword(email: $email) {
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ResetPasswordGQL extends Apollo.Mutation<ResetPasswordMutation, ResetPasswordMutationVariables> {
    document = ResetPasswordDocument;
    
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
  renewAccessToken {
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
export const AreTimesAvailableDocument = gql`
    query areTimesAvailable($timeProposals: [TimeProposalInput!]!) {
  areTimesAvailable(timeProposals: $timeProposals) {
    startTime
    endTime
    locations {
      tableTennis
      badminton
    }
    isAvailable
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AreTimesAvailableGQL extends Apollo.Query<AreTimesAvailableQuery, AreTimesAvailableQueryVariables> {
    document = AreTimesAvailableDocument;
    
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
      id
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
export const CreateRecurringReservationDocument = gql`
    mutation createRecurringReservation($name: String!, $startTime: DateTime!, $endTime: DateTime!, $includedDates: [DateTime!], $excludedDates: [DateTime!], $locations: ReservationLocationsInput!, $recurrence: Recurrence!, $timePeriod: TimePeriod!) {
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
    mutation createReservation($name: String!, $startTime: DateTime!, $endTime: DateTime!, $locations: ReservationLocationsInput!) {
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
    query isRecurringTimeAvailable($startTime: DateTime!, $endTime: DateTime!, $includedDates: [DateTime!], $excludedDates: [DateTime!], $locations: ReservationLocationsInput!, $recurrence: Recurrence!, $timePeriod: TimePeriod!) {
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
export const GetInvitationDocument = gql`
    query getInvitation($id: ID!) {
  invitation(id: $id) {
    id
    emailAddress
    expiresAt
    inviter {
      id
      name
    }
    isActive
    isCompleted
    isRedeemable
    createdAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetInvitationGQL extends Apollo.Query<GetInvitationQuery, GetInvitationQueryVariables> {
    document = GetInvitationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateInvitationDocument = gql`
    mutation updateInvitation($id: ID!, $expiresAt: DateTime, $isActive: Boolean, $emailAddress: String) {
  updateInvitation(
    id: $id
    expiresAt: $expiresAt
    isActive: $isActive
    emailAddress: $emailAddress
  ) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateInvitationGQL extends Apollo.Mutation<UpdateInvitationMutation, UpdateInvitationMutationVariables> {
    document = UpdateInvitationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetInvitationsDocument = gql`
    query getInvitations($first: Float!, $after: String) {
  invitations(first: $first, after: $after) {
    edges {
      node {
        id
        emailAddress
        isRedeemable
        isCompleted
        expiresAt
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetInvitationsGQL extends Apollo.Query<GetInvitationsQuery, GetInvitationsQueryVariables> {
    document = GetInvitationsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SendInvitationDocument = gql`
    mutation sendInvitation($emailAddress: String!) {
  sendInvitation(emailAddress: $emailAddress) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SendInvitationGQL extends Apollo.Mutation<SendInvitationMutation, SendInvitationMutationVariables> {
    document = SendInvitationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetRelatedReservationsDocument = gql`
    query getRelatedReservations($recurringId: ID!) {
  recurringReservations(recurringId: $recurringId, futureOnly: true) {
    id
    name
    startTime
    endTime
    locations {
      badminton
      tableTennis
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetRelatedReservationsGQL extends Apollo.Query<GetRelatedReservationsQuery, GetRelatedReservationsQueryVariables> {
    document = GetRelatedReservationsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateReservationDocument = gql`
    mutation updateReservation($id: ID!, $updatedProperties: UpdatedProperties!, $connectedUpdates: [ID!]) {
  updateReservation(
    id: $id
    updatedProperties: $updatedProperties
    connectedUpdates: $connectedUpdates
  ) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateReservationGQL extends Apollo.Mutation<UpdateReservationMutation, UpdateReservationMutationVariables> {
    document = UpdateReservationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }