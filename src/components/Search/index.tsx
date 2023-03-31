import React, { useRef } from 'react';
import $ from './search.module.scss'
import Button from '@components/Button';
import Icon from '@components/Icon';

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    console.log(formData.get('search'))

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className={$.search_form}>
      <input type="text" name="search" ref={inputRef} placeholder='검색어를 입력해주세요.' />
      <Button>
        <Icon kinds={'search'}/>
      </Button>
    </form>
  );
};

export default Search;