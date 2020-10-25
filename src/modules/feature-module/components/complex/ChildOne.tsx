import React, { FC, useContext, useState } from 'react';

import { ComplexReducerContext } from './Complex';

export interface IChildOneProps {};

export const ChildOne: FC<IChildOneProps> = props => {
  const complexReducer = useContext(ComplexReducerContext);
  const complexState: { model: { name: string }} = useContext(ComplexReducerContext);

  // because setState works as in redux
  const [name, setName] = useState(complexState.model.name);

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
