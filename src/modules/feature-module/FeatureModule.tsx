import React, { FC, createContext } from 'react';

import { Context, IReducerContext, IContextAction } from 'src/common/core-ui';

import { IFeatureModuleProps } from './models/components/feature-module/props';
import { FeatureModuleActions } from './models/components/feature-module/actions';
import { IFeatureModuleState } from './models/components/feature-module/state';
import { Simple } from './components/Simple';
import { Complex } from './components/complex/Complex';

export const FeatureModuleReducerContext = createContext<IReducerContext<FeatureModuleActions> | null>(null);
export const FeatureModuleStateContext = createContext<IFeatureModuleState | null>(null);

export const FeatureModule: FC<IFeatureModuleProps> = props => {

  const initialState: IFeatureModuleState = {
    apiUrl: props.apiUrl
  };

  const reducer = (state : IFeatureModuleState, action: IContextAction<FeatureModuleActions>) => {
    return {
      ...state
    };
  }

  return (
    <Context<IFeatureModuleState, FeatureModuleActions>
      reducerContext={FeatureModuleReducerContext}
      stateContext={FeatureModuleStateContext}
      state={initialState}
      reducer={reducer}>
        <Simple />
        <Complex id="complex-id"/>
    </Context>
  );
}