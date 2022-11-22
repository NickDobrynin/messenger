import styled from 'styled-components';

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
const Message = styled.div`
  display: flex;
  font-size: .9rem;
  align-items: center;
  flex: 0 0 2rem;
  background-color: #E7E7E7;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  padding: 0 1rem;
  margin-bottom: 1rem;
`;
const UserMessage = styled.div`
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
  padding: 0 1rem;
  margin-bottom: 1rem;
`;

const ChatBody = () => (
  <Wrapper>
    <Message>Hey There!</Message>
    <Message>How are you?</Message>
    <UserMessage>Hello!</UserMessage>
  </Wrapper>
);

export default ChatBody;