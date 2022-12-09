import styled from 'styled-components';
import noAvatar from '../../../assets/icons/no-avatar.jpg';
import React from 'react';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  -webkit-border-radius: 1.25rem;
  -moz-border-radius: 1.25rem;
  border-radius: 1.25rem;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  &:not(:last-child) {
    &:after {
      position: absolute;
      content: "";
      width: 100%;
      height: 1px;
      bottom: -10px;
      background-color: #B4ABABA8;
    }
  }

  &:hover {
    .chat-name {
      text-decoration-color: #000;
    }
  }
`;

const ChatIcon = styled.div`
  width: 2rem;
  height: 2rem;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;
const ChatInfo = styled.div``;
const ChatName = styled.div`
  font-size: .9rem;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: text-decoration-color .3s ease;
`;
const Message = styled.div`
  font-size: .7rem;
`;

interface IProps {
  name: string
  message: string
  setActiveChat: (chatName: string | null) => void
}

const ChatItem: React.FC<IProps> = ({name, message, setActiveChat}) => {
  const setChatHandler = () => {
    setActiveChat(name);
  }
  return (
    <Wrapper onClick={setChatHandler}>
      <ChatIcon><Image src={noAvatar}/></ChatIcon>
      <ChatInfo>
        <ChatName className="chat-name">{name}</ChatName>
        <Message>{message}</Message>
      </ChatInfo>
    </Wrapper>
  )
}

export default ChatItem;