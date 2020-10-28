import React, { FC, createContext, useState } from 'react';

import { useEvent } from 'src/common/events';

import { IFeatureModuleProps } from './models/components/feature-module/props';
import { IFeatureModuleState } from './models/components/feature-module/state';
import { Simple } from './components/Simple';
import { Complex } from './components/complex/Complex';
import { SimpleEvent } from './models/enum/simple-event';

export const FeatureModuleStateContext = createContext<IFeatureModuleState>({} as any);

export const FeatureModule: FC<IFeatureModuleProps> = props => {
  const initialState: IFeatureModuleState = {
    apiUrl: props.apiUrl
  };
  const [state] = useState(initialState);

  useEvent<string>(SimpleEvent.SIMPLE_ON_CLICK, event => {
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