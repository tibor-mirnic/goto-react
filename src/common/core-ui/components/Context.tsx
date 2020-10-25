import React, { PropsWithChildren, useReducer } from 'react';

import { EnumType } from '../models/enum/enum-type';
import { IContextProps } from '../models/components/context/props';

export const Context = <T, A extends typeof EnumType>(props: PropsWithChildren<IContextProps<T, A>>) => {

  const [state, dispatch] = useReducer(props.reducer, props.state);

  return (
    <props.reducerContext.Provider value={{dispatch}}>
      <props.stateContext.Provider value={state}>
        { props.children }
      </props.stateContext.Provider>
    </props.reducerContext.Provider>
  );
};