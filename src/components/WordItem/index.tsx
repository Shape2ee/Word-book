import React, { useState } from 'react';
import $ from './wordItem.module.scss'
import classNames from 'classnames/bind';
import Checkbox from '@components/Checkbox';
import Button from '@components/Button';
import Icon from '@components/Icon';

const cx = classNames.bind($)

interface WordItem {
  id: string
  word: string
  text: string
  example: string
  timetamp: number
  isEdit: boolean
  checkedList: string[]
  onChecked: (id: string, isChecked: boolean) => void
}

const WordItem = ({ id, word, text, example, timetamp, isEdit, checkedList, onChecked }: WordItem) => {
  return (
    <li className={$.word_item}>
      <label>
        {isEdit && <Checkbox id={id} isChecked={checkedList.includes(id) ? true : false} onChecked={onChecked} />}
        <div className={cx('item_card', { isEdit })}>
          <h3 className={$.title}>{word}</h3>
          <p className={$.meaning}>{text}</p>
          <em>{example}</em>
          <div className={$.date}>
            <Icon kinds='date'/>
            <p>
              {
                new Date(timetamp).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })
              }
            </p>
          </div>
        </div>
      </label>
    </li>
  );
};

export default WordItem;