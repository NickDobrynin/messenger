import styled from 'styled-components';
import {Chat} from '../../../../types';
import React, {useEffect, useRef} from 'react';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: auto -1.6rem 0;
  padding: 1rem 1.6rem 0;
  overflow-y: auto;

  &::-webkit-scrollbar {
    position: absolute;
    width: 5px;

  }

  &::-webkit-scrollbar-thumb {
    background: #E7E7E7;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
`;
const ReceivedMessage = styled.div`
  position: relative;
  display: flex;
  font-size: .9rem;
  align-items: center;
  flex: 0 0 2rem;
  background-color: #E7E7E7;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  padding: .4rem 3rem .4rem 1rem;
  margin-bottom: 1rem;
`;
const SentMessage = styled.div`
  position: relative;
  display: flex;
  font-size: .9rem;
  align-items: center;
  align-self: flex-end;
  flex: 0 0 2rem;
  color: #fff;
  background-color: #6E00FF;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  padding: .4rem 3rem .4rem 1rem;
  margin-bottom: 1rem;
`;
const MessageTime = styled.div`
  position: absolute;
  font-size: .6rem;
  bottom: .2rem;
  right: .7rem;
`;

interface IChatBody {
  chat: Chat | null
  user: string
}

const ChatBody: React.FC<IChatBody> = ({chat, user}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [chat])

  return (
    <Wrapper ref={ref}>
      {chat?.messages?.map((message) => {
        const date = new Date(message.date);
        const time = `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
        if (message.from !== user) {
          return (
            <ReceivedMessage key={message.id}>
              {message.message}
              <MessageTime>{time}</MessageTime>
            </ReceivedMessage>
          );
        } else {
          return (
            <SentMessage key={message.id}>
              {message.message}
              <MessageTime>{time}</MessageTime>
            </SentMessage>
          );
        }
      })}
    </Wrapper>
  );
};

export default ChatBody;