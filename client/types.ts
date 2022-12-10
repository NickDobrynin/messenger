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
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  user: User;
};

export type Chat = {
  __typename?: 'Chat';
  id: Scalars['ID'];
  members: Array<Scalars['String']>;
  messages: Array<Message>;
};

export type Message = {
  __typename?: 'Message';
  chatId: Scalars['String'];
  date: Scalars['String'];
  from: Scalars['String'];
  id: Scalars['ID'];
  message: Scalars['String'];
  to: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat: Chat;
  sendMessage: Chat;
  signIn: SignInResponse;
  signUp: SignUpResponse;
};


export type MutationCreateChatArgs = {
  to: Scalars['String'];
};


export type MutationSendMessageArgs = {
  chatId: Scalars['String'];
  message: Scalars['String'];
  to: Scalars['String'];
};


export type MutationSignInArgs = {
  signInInput: SignInInput;
};


export type MutationSignUpArgs = {
  signUpInput: SignUpInput;
};

export type Query = {
  __typename?: 'Query';
  auth: AuthResponse;
  getChats: Array<Chat>;
  getUser: User;
};

export type SignInInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  access_token: Scalars['String'];
  user: User;
};

export type SignUpInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  access_token: Scalars['String'];
  user: User;
};

export type Subscription = {
  __typename?: 'Subscription';
  subscribeChats: Chat;
};


export type SubscriptionSubscribeChatsArgs = {
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
};
