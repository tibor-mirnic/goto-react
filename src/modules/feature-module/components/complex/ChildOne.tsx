import React, { FC, useContext, useState } from 'react';

import { ComplexReducerContext, ComplexStateContext } from './Complex';

export const ChildOne: FC = props => {
  const complexReducer = useContext(ComplexReducerContext);
  const complexState = useContext(ComplexStateContext);

  // because setState works as in redux
  const [name, setName] = useState(complexState?.name);

  return (
    <div>
      <input type="text"
        value={name}
        onChange={(evt) => {
          setName((prev) => {
            if (prev) {
              console.log('prev')
            }

            return evt.target.value;
          });
        }} />
    </div>
  );
};
