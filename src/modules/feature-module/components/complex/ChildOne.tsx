import React, { FC } from 'react';

import { IChildOneProps } from '../../models/components/complex/props';

export const ChildOne: FC<IChildOneProps> = props => {
  return (
    <label>
      Name:&nbsp;
      <input type="text"
        value={props.name}
        onChange={evt => {
          props.onNameChange(evt.target.value);
        }} />
    </label>
  );
};
