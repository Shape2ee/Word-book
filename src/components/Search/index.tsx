import React, { useRef,useEffect, useState } from 'react';
import $ from './search.module.scss'
import Button from '@components/Button';
import Icon from '@components/Icon';
import { useAppSelector } from '@hooks/reduxHooks';

interface SearchProps {
  value: string
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onClick: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Search = ({ value, onSubmit, onClick, onChange }: SearchProps) => {
  
  return (
    <div className={$.search_container}>
      <form onSubmit={onSubmit} className={$.search_form}>
        <input type="text" name="search" value={value} onChange={onChange} placeholder='검색어를 입력해주세요.' />
        <Button>
          <Icon kinds={'search'}/>
        </Button>
      </form>
      {value && <div onClick={onClick}>취소</div>}
    </div>
  );
};

export default Search;