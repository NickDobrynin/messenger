import styled from 'styled-components';
import {UserActions, ChatList, Search} from '../../common/Sidebar';
import React, {useEffect, useState} from 'react';
import {useApolloClient, useQuery, useSubscription} from '@apollo/client';
import GET_USER from '../../apollo/api/getUser';
import SUBSCRIBE_CHATS from '../../apollo/api/subscribeChats';
import GET_CHATS from '../../apollo/api/getChats';
import {Chat} from '../../../types';

const Wrapper = styled.div`
  display: flex;
  flex: 0 0 30%;
  min-width: 25rem;
  margin-right: 1.5rem;
`;

const UserPanel = styled.div`
  flex: 1 0 auto;
  max-height: 100vh;
  overflow-y: scroll;
  padding: 0 .5rem;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const UserName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: .5rem;
  padding-left: .5rem;
`;

interface IChats {
  getChats: Chat[]
}
interface IProps {
  onLogout: () => void
  setActiveChat: (chatName: string | null) => void
}

const Sidebar: React.FC<IProps> = ({onLogout, setActiveChat}) => {
  const client = useApolloClient();
  const user = useQuery(GET_USER);
  const subscription = useSubscription(SUBSCRIBE_CHATS, {
    variables: {
      username: user?.data?.getUser?.username
    },
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    const currentChats = client.readQuery<IChats>({query: GET_CHATS})?.getChats;
    currentChats && subscription.data && client.writeQuery({
      query: GET_CHATS,
      data: {
        getChats: [subscription?.data?.subscribeChats, ...currentChats.map((chat: Chat) => {
          if (chat.id === subscription?.data?.subscribeChats.id) return subscription?.data?.subscribeChats;
          else return chat;
        })]
      }
    })
  }, [subscription]);
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <Wrapper>
      <UserActions onLogout={onLogout}/>
      <UserPanel>
        <Search inputValue={inputValue} setInputValue={setInputValue}/>
        <UserName>{user && `Привет, ${user?.data?.getUser?.username}`}</UserName>
        <ChatList inputValue={inputValue} setActiveChat={setActiveChat}/>
      </UserPanel>
    </Wrapper>
  )
}

export default Sidebar;