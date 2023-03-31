import React from 'react';
import $ from './checkbox.module.scss'

const Checkbox = ({ id }: {id: number}) => {
  return (
    <label className={$.checkbox}>
      <input type={'checkbox'} />
    </label>
  );
};

export default Checkbox;