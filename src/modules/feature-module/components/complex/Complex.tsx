import React, { FC, createContext, useState, useEffect } from 'react';

import { getComplexModel } from '../../api/complex';
import { IComplexProps } from '../../models/components/complex/props';
import { IComplexState } from '../../models/components/complex/state';
import { ChildOne } from './ChildOne';

export const ComplexStateContext = createContext<IComplexState | null>(null);

export const Complex: FC<IComplexProps> = props => {

  const initialState: IComplexState = {
    id: props.id,
    name: 'Complex Component',
    age: 20
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    let didUnmount = false;

    const getUser = async (): Promise<void> => {
      try {
        const response = await getComplexModel({
          id: props.id
        });
        
        if (!didUnmount) {
        // setModel(response.model);
        }
      }
      catch (error) {
        // moduleReducer?.dispatch({
        //   action: 'ERROR',
        //   payload: error
        // })
      }
    };

    getUser();

    return () => {
      didUnmount = true;
    }

  }, [props.id]);

  return (
    <ComplexStateContext.Provider value={state}>
      <ChildOne />
    </ComplexStateContext.Provider>
  );
};
