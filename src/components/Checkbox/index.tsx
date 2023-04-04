import React from 'react';
import $ from './checkbox.module.scss'
import Icon from '@components/Icon';

interface CheckboxProps {
  id: string,
  isChecked: boolean,
  onChecked: (id: string, isChecked: boolean) => void
}

const Checkbox = ({ id, isChecked, onChecked }: CheckboxProps) => {
  const handleOnChange = (e: any) => {
    onChecked(id, e.target.checked)
  }
  return (
    <div className={$.checkbox}>
      <input type={'checkbox'} id={id} checked={isChecked} onChange={handleOnChange} />
      <Icon kinds={isChecked ? 'checked' : 'noneChecked'}/>
    </div>
    // <label className={$.checkbox}>
    //   <input type={'checkbox'} id={id} />
    //   <Icon kinds={isChecked}/>
    // </label>
  );
};

export default Checkbox;