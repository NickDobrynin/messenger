import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Sidebar} from '../Sidebar';
import {Chat} from '../Chat';
import {Routes, Route, Navigate} from 'react-router-dom';
import {SignIn} from '../SignIn';
import {SignUp} from '../SignUp';
import {gql} from 'graphql-tag';
import {useApolloClient} from '@apollo/client';

const AppWrapper = styled.main`
  display: flex;
  width: 100%;
  height: 100vh;
  padding: 1.5rem 1.8rem;
`;

const GET_AUTH = gql`
    query {
        auth {
            user {
                id
            }
        }
    }
`;

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const client = useApolloClient();
  useEffect(() => {
    if (localStorage.getItem('token') && !isAuth) {
      client.query({
        query: GET_AUTH,
        fetchPolicy: 'network-only'
      }).then(result => {
        if (result.data.auth) setIsAuth(true);
      }).finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const onLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    client.resetStore();
  }

  if (isLoading) return <div>Loading</div>;
  return (
    <AppWrapper>
      <Routes>
        {!isAuth && <Route path="/" element={<Navigate to="/sign-in" replace />} />}
        <Route path="/" element={[<Sidebar key={1} onLogout={onLogout}/>, <Chat key={2}/>]}/>
        <Route path="/sign-in" element={<SignIn isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
        <Route path="/sign-up" element={<SignUp isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </AppWrapper>
  );
}

export default App;
