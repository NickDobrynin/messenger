import React, {useState} from 'react';
import styled from 'styled-components';
import {Sidebar} from '../Sidebar';
import {Chat} from '../Chat';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {SignIn} from '../SignIn';
import {SignUp} from '../SignUp';

const AppWrapper = styled.main`
  display: flex;
  width: 100%;
  height: 100vh;
  padding: 1.5rem 1.8rem;
`;

function App() {
  const [auth, setAuth] = useState<boolean>(true);

  const onLogout = () => setAuth(false);

  return (
    <AppWrapper>
      <BrowserRouter>
        <Routes>
          {!auth && <Route path="/" element={<Navigate to="/sign-in" replace />} />}
          <Route path="/" element={[<Sidebar key={1} onLogout={onLogout} />, <Chat key={2} />]}/>
          <Route path="/sign-in" element={<SignIn />}/>
          <Route path="/sign-up" element={<SignUp />}/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
