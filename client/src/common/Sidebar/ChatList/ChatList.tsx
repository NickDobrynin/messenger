import styled from 'styled-components';
import {ChatItem, ChatActions} from '../index';
import {gql} from 'graphql-tag';
import {useQuery, useApolloClient} from '@apollo/client';
import {Chat} from '../../../../types';

const Wrapper = styled.div`
  background-color: #fff;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  box-shadow: 0 4px 5px 2px rgba(121, 197, 239, 0.38);
  padding: .9rem 1rem;
`;

const GET_USER = gql`
    query getUser {
        getUser {
            username
        }
    }
`;

const GET_CHATS = gql`
    query {
        getChats {
            id
            members
            messages {
                id
                date
                from
                message
            }
        }
    }
`;

const ChatList = () => {
  const user = useQuery(GET_USER);
  const chats = useQuery(GET_CHATS);

  return (
    <Wrapper>
      <ChatActions />
      {
        chats && user && chats?.data?.getChats?.map((chat: Chat, index: number) => {
          const name = chat.members.filter((member) => {
            return member !== user?.data?.getUser?.username;
          })
          return <ChatItem key={index} name={name[0]} message={chat?.messages[chat.messages.length - 1]?.message} />
        })
      }
    </Wrapper>
  );
};

export default ChatList;