import styled from 'styled-components';
import {ChatItem, ChatActions} from '../index';
import {useQuery} from '@apollo/client';
import {Chat} from '../../../../types';
import GET_USER from '../../../apollo/api/getUser';
import GET_CHATS from '../../../apollo/api/getChats';
import React, {useEffect, useState} from 'react';

const Wrapper = styled.div`
  background-color: #fff;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  box-shadow: 0 4px 5px 2px rgba(121, 197, 239, 0.38);
  padding: .9rem 1rem;
`;

interface IChatList {
  inputValue: string;
  setActiveChat: (chatName: string | null) => void
}

const ChatList: React.FC<IChatList> = ({inputValue, setActiveChat}) => {
  const user = useQuery(GET_USER);
  const chats = useQuery(GET_CHATS, {nextFetchPolicy: 'no-cache'});
  const [chatData, setChatData] = useState<Chat[] | null>(null);

  useEffect(() => {
    if (chats?.data?.getChats) setChatData(chats.data.getChats);
  }, [chats]);

  const filterChats = (chats: Chat[], search: string) => {
    if (!search.trim()) return chats;
    return chats?.filter((chat) => {
      const [chatName] = chat.members.filter((member) => {
        return member !== user?.data?.getUser?.username;
      });
      return chatName.indexOf(search) >= 0;
    });
  };

  return (
    <Wrapper>
      <ChatActions/>
      {
        chatData && user && filterChats(chatData, inputValue)?.map((chat: Chat, index: number) => {
          const [name] = chat.members.filter((member) => {
            return member !== user?.data?.getUser?.username;
          });
          return <ChatItem
            key={index}
            name={name}
            setActiveChat={setActiveChat}
            message={chat?.messages[chat.messages.length - 1]?.message}/>;
        })
      }
    </Wrapper>
  );
};

export default ChatList;