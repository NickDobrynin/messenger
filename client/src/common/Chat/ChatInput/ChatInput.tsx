import styled from 'styled-components';
import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import SEND_MESSAGE from '../../../apollo/api/sendMessage';
import {Chat} from '../../../../types';
import GET_CHATS from '../../../apollo/api/getChats';

const Input = styled.input`
  width: 100%;
  flex: 0 0 2.5rem;
  background-color: #E7E7E7;
  outline: none;
  border: 2px solid transparent;
  -webkit-border-radius: 1.25rem;
  -moz-border-radius: 1.25rem;
  border-radius: 1.25rem;
  transition: border-color .3s ease;
  padding: 0 1rem;

  &:focus {
    border-color: #6E00FF;
  }
`;

interface IChats {
  getChats: Chat[]
}
interface IChatInput {
  chatId: string | undefined
  to: string | null
}

const ChatInput: React.FC<IChatInput> = ({chatId, to}) => {
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [inputValue, setInputValue] = useState<string>('');
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (inputValue.trim()) {
        await sendMessage({
          variables: {
            message: inputValue,
            to,
            chatId
          },
          update: (cache, {data: {sendMessage}}) => {
            const currentChats = cache.readQuery<IChats>({query: GET_CHATS})!.getChats;
            cache.writeQuery({
              query: GET_CHATS,
              data: {
                getChats: [...currentChats.map((chat: Chat) => {
                  if (chat.id === sendMessage.id) return sendMessage;
                  else return chat;
                })]
              },
            })
          },
        });
        setInputValue('');
      }
    }
  };

  return (
    <Input
      type="text"
      placeholder="Сообщение..."
      value={inputValue}
      onChange={onInputChange}
      onKeyUp={onSubmit}
    />
  );
};

export default ChatInput;