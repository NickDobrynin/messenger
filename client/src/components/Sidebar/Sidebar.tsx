import styled from 'styled-components';
import {UserActions, ChatList, Search} from '../../common/Sidebar';
import React from 'react';
import {Navigate} from 'react-router-dom';

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

interface IProps {
  onLogout: () => void;
}

const Sidebar: React.FC<IProps> = ({onLogout}) => {
  return (
    <Wrapper>
      <UserActions onLogout={onLogout}/>
      <UserPanel>
        <Search />
        <ChatList />
      </UserPanel>
    </Wrapper>
  )
}

export default Sidebar;