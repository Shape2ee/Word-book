import React from 'react';
import $ from './wordItem.module.scss'
import Checkbox from '@components/Checkbox';
import Button from '@components/Button';
import Icon from '@components/Icon';

interface WordItem {
  id: number
  word: string
  text: string
  example: string
  timetamp: number
  isEdit: boolean
}

const WordItem = ({ id, word, text, example, timetamp, isEdit }: WordItem) => {
  return (
    <div className={$.word_item}>
      {isEdit && <Checkbox id={id} />}
      <div className={$.item_card}>
        <h3 className={$.title}>{word}</h3>
        <p className={$.meaning}>{text}</p>
        <em>{example}</em>
        <div className={$.date}>
          <Icon kinds='date'/>
          <p>
            Date: {
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
    </div>
  );
};

export default WordItem;