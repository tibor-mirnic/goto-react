import React, { FC, createContext, useState } from 'react';

import { useEvent, Events } from 'src/common/events';

import { IFeatureModuleProps } from './models/components/feature-module/props';
import { IFeatureModuleState } from './models/components/feature-module/state';
import { Simple } from './components/Simple';
import { Complex } from './components/complex/Complex';

export const FeatureModuleStateContext = createContext<IFeatureModuleState>({} as any);

export const FeatureModule: FC<IFeatureModuleProps> = props => {

  const initialState: IFeatureModuleState = {
    apiUrl: props.apiUrl
  };

  const [state, setState] = useState(initialState);

  useEvent<string>(Events.ON_ERROR, event => {
    console.log(event.name);
    console.log(event.data);
  });

  useEvent<any>('simple-onClick', event => {
    console.log(event.name);
    console.log(event.data);
  });

  return (
    <FeatureModuleStateContext.Provider value={state}>
      <Simple />
      <Complex id="1"/>
    </FeatureModuleStateContext.Provider>
  );
}