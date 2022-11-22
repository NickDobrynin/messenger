import styled from 'styled-components';
import {ChatHeader, ChatInput} from '../../common/Chat';
import ChatBody from '../../common/Chat/ChatBody/ChatBody';

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

const Chat = () => {
  return (
    <Wrapper>
      <ChatHeader name="Sam" />
      <ChatBody />
      <ChatInput />
    </Wrapper>
  );
};

export default Chat;