import React, { useState } from 'react';
import $ from './checkbox.module.scss'
import Icon from '@components/Icon';

const Checkbox = ({ id }: {id: string}) => {
  const [isChecked, setChecked] = useState<string>('noneChecked')

  return (
    <div className={$.checkbox}>
      <input type={'checkbox'} id={id} />
      <Icon kinds={isChecked}/>
    </div>
    // <label className={$.checkbox}>
    //   <input type={'checkbox'} id={id} />
    //   <Icon kinds={isChecked}/>
    // </label>
  );
};

export default Checkbox;