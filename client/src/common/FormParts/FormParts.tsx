import styled, {keyframes} from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: .7rem;
  letter-spacing: -1px;
`;

export const Label = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  flex: 0 0 2.5rem;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  outline: none;
  border: 2px solid transparent;
  box-shadow: 0 4px 5px 2px rgba(121, 197, 239, 0.38);
  padding: 0 1rem;
  transition: border-color .3s ease;

  &:focus {
    border-color: #6E00FF;
  }
`;

const showError = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Error = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  color: #f52525;
  font-size: .9rem;
  margin-top: .3rem;
  &.entering {
    animation: ${showError} .5s forwards;
  }
  &.entered {
    opacity: 1;
    transform: scale(1);
  }
  &.exiting {
    animation: ${showError} .5s reverse;
  }
  &.exited {
    opacity: 0;
    transform: scale(0);
  }
`;

export const ServerError = styled.p`
  color: #f52525;
`;

export const Button = styled.button`
  height: 2.5rem;
  text-transform: uppercase;
  font-weight: 600;
  background-color: #6E00FF;
  color: #fff;
  cursor: pointer;
  -webkit-border-radius: 1.25rem;
  -moz-border-radius: 1.25rem;
  border-radius: 1.25rem;
  transition: background-color .3s ease;
  margin-bottom: 1rem;

  &:hover {
    background-color: #46039e;
  }

  &:disabled {
    opacity: .6;
    cursor: not-allowed;
  }
`;

export const Text = styled.div`
  font-size: .9rem;

  & > a {
    text-decoration: underline;
    text-decoration-color: transparent;
    font-size: .9rem;
    color: dodgerblue;
    transition: text-decoration-color .3s ease;

    &:hover {
      text-decoration-color: dodgerblue;
    }
  }
`;