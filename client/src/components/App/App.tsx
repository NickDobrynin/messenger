import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Sidebar} from '../Sidebar';
import {ChatContainer} from '../ChatContainer';
import {Routes, Route, Navigate} from 'react-router-dom';
import {SignIn} from '../SignIn';
import {SignUp} from '../SignUp';
import {useApolloClient} from '@apollo/client';
import GET_AUTH from '../../apollo/api/getAuth';
import {Preloader} from '../Preloader';

const AppWrapper = styled.main`
  display: flex;
  width: 100%;
  height: 100vh;
  padding: 1.5rem 1.8rem;
`;

function App() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const client = useApolloClient();

  useEffect(() => {
    if (localStorage.getItem('token') && !isAuth) {
      client.query({
        query: GET_AUTH,
      }).then(result => {
        if (result.data.auth) setIsAuth(true);
      }).finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const onLogout = async () => {
    localStorage.clear();
    setIsAuth(false);
    client.resetStore();
  };

  if (isLoading) return <Preloader />;
  return (
    <AppWrapper>
      <Routes>
        {!isAuth && <Route path="/" element={<Navigate to="/sign-in" replace/>}/>}
        <Route path="/" element={[<Sidebar key={1} onLogout={onLogout} setActiveChat={setActiveChat}/>, <ChatContainer key={2} activeChat={activeChat}/>]}/>
        <Route path="/sign-in" element={<SignIn isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
        <Route path="/sign-up" element={<SignUp isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </AppWrapper>
  );
}

export default App;
