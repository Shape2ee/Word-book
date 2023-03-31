import React, { useState } from 'react';
import $ from './checkbox.module.scss'
import Icon from '@components/Icon';

const Checkbox = ({ id }: {id: number}) => {
  const [isChecked, setChecked] = useState<string>('noneChecked')

  return (
    <label className={$.checkbox}>
      <input type={'checkbox'} />
      <Icon kinds={isChecked}/>
    </label>
  );
};

export default Checkbox;