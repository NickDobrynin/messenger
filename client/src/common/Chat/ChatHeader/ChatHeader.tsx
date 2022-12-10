import styled from 'styled-components';
import noAvatar from '../../../assets/icons/no-avatar.jpg';
import React from 'react';

const Wrapper = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  padding-bottom: 1.2rem;
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    height: 1px;
    width: 100%;
    background-color: #B4ABABA8;
  }
`;
const ChatIcon = styled.div`
  width: 3rem;
  height: 3rem;
  overflow: hidden;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
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
  font-size: 1.2rem;
  font-weight: 700;
`;

interface IProps {
  name: string | null;
}

const ChatHeader: React.FC<IProps> = ({name}) => (
  <Wrapper>
    <ChatIcon><Image src={noAvatar}/></ChatIcon>
    <ChatInfo>
      <ChatName>{name}</ChatName>
    </ChatInfo>
  </Wrapper>
)

export default ChatHeader;