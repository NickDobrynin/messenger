import styled from 'styled-components';
import logoutIcon from '../../../assets/icons/logout-icon.svg';
import noAvatar from '../../../assets/icons/no-avatar.jpg';
import React from 'react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 4.5rem;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to bottom, #6E00FF, #46039e);
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  border-radius: 25px;
  padding: 1.3rem 0;
  margin-right: 1.5rem;
`;

const Avatar = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const Button = styled.button`
  width: 2rem;
  height: 2rem;
  background: transparent url(${logoutIcon}) center no-repeat;
  background-size: cover;
  cursor: pointer;
  transition: transform .3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

interface IProps {
  onLogout: () => void;
}

const UserActions: React.FC<IProps> = ({onLogout}) => {
  return (
    <Wrapper>
      <Avatar>
        <Image src={noAvatar} alt="avatar"></Image>
      </Avatar>
      <Button type="button" title="Выйти" onClick={onLogout}/>
    </Wrapper>
  )
}

export default UserActions;