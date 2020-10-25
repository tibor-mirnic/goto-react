import React, { FC, useContext, useState } from 'react';

import { ComplexReducerContext, ComplexStateContext } from './Complex';

export const ChildTwo: FC = props => {
  const complexReducer = useContext(ComplexReducerContext);
  const complexState = useContext(ComplexStateContext);

  // because setState works as in redux
  const [age, setAge] = useState(complexState?.age);

  return (
    <div>
      <input type="text"
        value={age}
        onChange={(evt) => {
          setAge((prev) => {
            if (prev) {
              console.log('prev')
            }

            return Number.parseInt(evt.target.value, 10);
          });
        }} />
    </div>
  );
};
