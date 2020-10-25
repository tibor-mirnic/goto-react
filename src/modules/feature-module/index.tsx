import React, { createContext, FC, useReducer, Dispatch } from 'react';

import { Simple } from './components/Simple';
import { IFeatureModuleProps } from './models/feature-module-props';

interface IFeatureModuleState {
  apiUrl: string;
}

interface IModuleAction {
  action: string;
  payload: any;
}

interface IFeatureModuleReducer {
  dispatch: Dispatch<IModuleAction>;
}

export const FeatureModuleStateContext = createContext<IFeatureModuleState | null>(null);
export const FeatureModuleReducerContext = createContext<IFeatureModuleReducer | null>(null);

export const FeatureModule: FC<IFeatureModuleProps> = props => {

  const initialState: IFeatureModuleState = {
    apiUrl: props.apiUrl
  };

  const reducer = (state : IFeatureModuleState, action: IModuleAction) => {
    return {
      ...state
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FeatureModuleReducerContext.Provider value={{dispatch}}>
      <FeatureModuleStateContext.Provider value={state}>
        <Simple />
      </FeatureModuleStateContext.Provider>
    </FeatureModuleReducerContext.Provider>
  );
}