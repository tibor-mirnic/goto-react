import React, { FC } from 'react';

import { IChildTwoProps } from '../../models/components/complex/props';

export const ChildTwo: FC<IChildTwoProps> = props => {
  return (
    <label>
      Age:&nbsp;
      <input type="text"
        value={props.age}
        onChange={evt => {
          let newAge = Number.parseInt(evt.target.value, 10);

          if (Number.isNaN(newAge)) {
            newAge = 0;
          }
          
          props.onAgeChange(newAge);
        }} />
    </label>
  );
};
