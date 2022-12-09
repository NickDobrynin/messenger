import styled from 'styled-components';
import {UserActions, ChatList, Search} from '../../common/Sidebar';
import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import GET_USER from '../../apollo/api/getUser';

const Wrapper = styled.div`
  display: flex;
  flex: 0 0 30%;
  min-width: 25rem;
  margin-right: 1.5rem;
`;

const UserPanel = styled.div`
  flex: 1 0 auto;
  max-height: 100vh;
  overflow-y: scroll;
  padding: 0 .5rem;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const UserName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: .5rem;
  padding-left: .5rem;
`;

interface IProps {
  onLogout: () => void
  setActiveChat: (chatName: string | null) => void
}

const Sidebar: React.FC<IProps> = ({onLogout, setActiveChat}) => {
  const user = useQuery(GET_USER);
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <Wrapper>
      <UserActions onLogout={onLogout}/>
      <UserPanel>
        <Search inputValue={inputValue} setInputValue={setInputValue}/>
        <UserName>{user && `Привет, ${user?.data?.getUser?.username}`}</UserName>
        <ChatList inputValue={inputValue} setActiveChat={setActiveChat}/>
      </UserPanel>
    </Wrapper>
  )
}

export default Sidebar;