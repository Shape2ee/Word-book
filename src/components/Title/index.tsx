import React from 'react';
import $ from './title.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind($)

const Title = ({ text }: { text: string }) => {
  return (
    <h2 className={cx('title')}>
      {text}
    </h2>
  );
};

export default Title;