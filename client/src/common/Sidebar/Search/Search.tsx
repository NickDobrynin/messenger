import styled from 'styled-components';
import searchIcon from '../../../assets/icons/search-icon.svg';
import React from 'react';

const SearchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 2.5rem;
  margin-bottom: 1rem;
  &:after {
    position: absolute;
    content: "";
    top: 50%;
    transform: translateY(-50%);
    left: 1rem;
    width: 1.2rem;
    height: 1.2rem;
    background: url(${searchIcon}) no-repeat center;
    background-size: contain;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 1rem;
  outline: none;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  border: 2px solid transparent;
  box-shadow: 0 4px 5px 2px rgba(121, 197, 239, 0.38);
  padding: 0 1rem 0 2.9rem;
  transition: border-color .3s ease;
  &:focus {
    border-color: #6E00FF;
  }
`;

interface ISearch {
  inputValue: string
  setInputValue: (value: string) => void
}

const Search: React.FC<ISearch> = ({inputValue, setInputValue}) => {
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <SearchLabel>
      <SearchInput type="text" placeholder="Поиск" value={inputValue} onChange={onInputChange}/>
    </SearchLabel>
  );
}

export default Search;