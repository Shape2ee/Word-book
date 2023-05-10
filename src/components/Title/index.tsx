import React from 'react';
import $ from './title.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind($)

const Title = ({ text, center }: { text: string, center?: boolean }) => {
  return (
    <h2 className={cx('title', { center })}>
      {text}
    </h2>
  );
};

export default Title;