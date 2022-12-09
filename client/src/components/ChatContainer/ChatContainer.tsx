import styled from 'styled-components';
import {ChatHeader, ChatInput} from '../../common/Chat';
import ChatBody from '../../common/Chat/ChatBody/ChatBody';
import React, {useEffect, useState} from 'react';
import {useApolloClient, useQuery} from '@apollo/client';
import GET_CHATS from '../../apollo/api/getChats';
import {Chat} from '../../../types';
import GET_USER from '../../apollo/api/getUser';
import {log} from 'util';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  height: 100%;
  background-color: #fff;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  box-shadow: 0 4px 5px 2px rgba(121, 197, 239, 0.38);
  padding: 1.2rem 1.8rem;
  overflow: hidden;
`;

const TipMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

interface IChats {
  getChats: Chat[];
}

interface IChatContainer {
  activeChat: string | null;
}

const ChatContainer: React.FC<IChatContainer> = ({activeChat}) => {
  const client = useApolloClient();
  const user = useQuery(GET_USER);
  const [chat, setChat] = useState<Chat | null>(null);
  useEffect(() => {
    let chats = [] as Chat[];
    client.query({
      query: GET_CHATS,
    }).then(result => {
      chats = [...result.data.getChats];

      if (chats) {
        const [chat] = chats.filter((chat: Chat) => {
          return chat.members.some((member) => member === activeChat);
        });
        setChat(chat);
      }
    })
  }, [activeChat]);

  let name;
  if (user && chat) {
    [name] = chat.members.filter((member: string) => member !== user.data.getUser.username);
  }
  return chat
    ? (
      <Wrapper>
        <ChatHeader name={name as string}/>
        <ChatBody messages={chat && chat.messages} user={user && user.data.getUser.username}/>
        <ChatInput chatId={chat && chat.id} to={name as string}/>
      </Wrapper>
    )
    : (
      <Wrapper>
        <TipMessage>Выберите чат для начала переписки</TipMessage>
      </Wrapper>
    );
};

export default ChatContainer;