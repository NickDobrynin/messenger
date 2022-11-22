import styled from 'styled-components';
import React, {useState} from 'react';

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

const ChatInput = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (inputValue.trim()) {
        console.log(inputValue.trim());
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