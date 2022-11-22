import styled from 'styled-components';
import {ChatItem} from '../index';

const Wrapper = styled.div`
  background-color: #fff;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  box-shadow: 0 4px 5px 2px rgba(121, 197, 239, 0.38);
  padding: .9rem 1rem;
`;

const Title = styled.h4`
  font-size: 1.2rem;
  line-height: 1;
  letter-spacing: -1px;
  &:not(:last-child) {
    margin-bottom: .6rem;
  }
`;

const ChatList = () => {
  return (
    <Wrapper>
      <Title>Чаты</Title>
      <ChatItem name="Anil" message="Hahahaha!"/>
      <ChatItem name="Sam" message="Hello"/>
    </Wrapper>
  );
};

export default ChatList;