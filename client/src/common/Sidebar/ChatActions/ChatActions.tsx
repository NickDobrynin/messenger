import styled from 'styled-components';
import {useState, useRef, useEffect, ChangeEvent, KeyboardEvent} from 'react';
import {useMutation} from '@apollo/client';
import CREATE_CHAT from '../../../apollo/api/createChat';
import GET_CHATS from '../../../apollo/api/getChats';
import {Chat} from '../../../../types';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: .6rem;
  }
`;

const Title = styled.h4`
  font-size: 1.2rem;
  line-height: 1;
  letter-spacing: -1px;
`;

const Button = styled.button`
  height: 1.25rem;
  width: 1.25rem;
  background-color: #6E00FF;
  color: #fff;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color .3s ease;

  &:hover, &:focus {
    background-color: #5a00cf;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  border: 2px solid #6E00FF;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  padding: .3rem .5rem;
`;

const ErrorMessage = styled.div`
  color: #f52525;
  font-size: .8rem;
`;

interface IChats {
  getChats: Chat[]
}

const ChatActions = () => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [createChat] = useMutation(CREATE_CHAT, {
    update(cache, {data: {createChat}}) {
      const chats = cache.readQuery<IChats>({query: GET_CHATS})!.getChats;
      cache.writeQuery({
        query: GET_CHATS,
        data: {
          getChats: [...chats, createChat]
        }
      })
    }
  });

  useEffect(() => {
    showInput && inputRef?.current?.focus();
  }, [showInput]);

  const showInputHandler = () => {
    setShowInput(true);
  };
  const hideInputHandler = () => {
    setShowInput(false);
    setInputValue('');
    setErrorMessage('');
  };
  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const sendInputHandler = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      try {
        await createChat({
          variables: {
            to: inputValue
          }
        });
        hideInputHandler();
      } catch (e) {
        if (e instanceof Error) {
          setErrorMessage(e.message);
        }
      }
    }
    if (event.key === 'Escape') hideInputHandler();
  };

  return (
    <Wrapper>
      {
        showInput
          ? (
            <Column>
              <Input value={inputValue} onChange={inputChangeHandler} ref={inputRef} type="text"
                     onBlur={hideInputHandler}
                     onKeyDown={sendInputHandler}/>
              <ErrorMessage>{errorMessage && errorMessage}</ErrorMessage>
            </Column>
          )
          : (
            <>
              <Title>Чаты</Title>
              <Button onClick={showInputHandler} aria-label="Добавить чат" title="Добавить чат">+</Button>
            </>
          )
      }
    </Wrapper>
  );
};

export default ChatActions;