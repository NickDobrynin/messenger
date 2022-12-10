import styled from 'styled-components';
import {ChatHeader, ChatInput} from '../../common/Chat';
import ChatBody from '../../common/Chat/ChatBody/ChatBody';
import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import GET_USER from '../../apollo/api/getUser';
import {Chat} from '../../../types';
import GET_CHATS from '../../apollo/api/getChats';

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

interface IChatContainer {
  activeChat: string | null;
}

const ChatContainer: React.FC<IChatContainer> = ({activeChat}) => {
  const user = useQuery(GET_USER);
  const [chat, setChat] = useState<Chat>();
  const chats = useQuery(GET_CHATS, {nextFetchPolicy: 'no-cache'});

  useEffect(() => {
    if (chats?.data?.getChats.length) {
      const [chatData] = chats?.data?.getChats.filter((chat: Chat) => {
        return chat.members.some((member) => member === activeChat);
      });
      setChat(chatData);
    }
  }, [activeChat, chats]);

  return chat
    ? (
      <Wrapper>
        <ChatHeader name={activeChat}/>
        <ChatBody chat={chat} user={user && user?.data?.getUser?.username}/>
        <ChatInput chatId={chat!.id && chat!.id} to={activeChat}/>
      </Wrapper>
    )
    : (
      <Wrapper>
        <TipMessage>Выберите чат для начала переписки</TipMessage>
      </Wrapper>
    );
};

export default ChatContainer;