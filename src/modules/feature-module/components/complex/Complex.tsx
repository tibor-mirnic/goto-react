import React, { createContext, FC, useContext, useEffect, useReducer } from 'react';

import { Context, IContextAction, IReducerContext } from 'src/common/core-ui/';

import { FeatureModuleReducerContext } from '../../FeatureModule';
import { getComplexModel } from '../../api/complex';
import { IComplexProps } from '../../models/components/complex/props';
import { ComplexActions } from '../../models/components/complex/actions';
import { IComplexState } from '../../models/components/complex/state';
import { ChildOne } from './ChildOne';


export const ComplexReducerContext = createContext<IReducerContext<ComplexActions> | null>(null);
export const ComplexStateContext = createContext<IComplexState | null>(null);

export const Complex: FC<IComplexProps> = props => {
  const moduleReducer = useContext(FeatureModuleReducerContext);

  const initialState: IComplexState = {
    id: props.id,
    name: 'Complex Component',
    age: 20
  };

  const reducer = (state : IComplexState, action: IContextAction<ComplexActions>) => {
    return {
      ...state
    };
  }

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
    <Context<IComplexState, ComplexActions>
      reducerContext={ComplexReducerContext}
      reducer={reducer}
      stateContext={ComplexStateContext}
      state={initialState}>
        <ChildOne />
    </Context>
  );
};
