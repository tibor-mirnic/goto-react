import React, { createContext, FC, useContext, useEffect, useReducer } from 'react';

import { FeatureModuleStateContext, FeatureModuleReducerContext } from '../../index';

import { getComplexModel } from '../../api/complex';
import { ChildOne } from './ChildOne';

export interface IComplexProps {
  id: string;
};

export const ComplexReducerContext = createContext({
  dispatch: null
});

export const Complex: FC<IComplexProps> = props => {
  const moduleState = useContext(FeatureModuleStateContext);
  const moduleReducer = useContext(FeatureModuleReducerContext);

  const [state, dispatch] = useReducer(() => {}, {});

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
        moduleReducer?.dispatch({
          action: 'ERROR',
          payload: error
        })
      }
    };

    getUser();

    return () => {
      didUnmount = true;
    }

  }, [props.id]);

  return (
    <ComplexReducerContext.Provider value={{dispatch}}>
      <div>{moduleState?.apiUrl}</div>
      <ChildOne />
    </ComplexReducerContext.Provider>
  );
};
