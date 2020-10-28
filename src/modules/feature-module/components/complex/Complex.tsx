import React, { FC, createContext, useState, useEffect, useContext } from 'react';

import { useWithCancelation } from 'src/common/axios';

import { FeatureModuleStateContext } from '../../FeatureModule';

import { useComplexApi } from '../../hooks/complex.api';
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
  const moduleState = useContext(FeatureModuleStateContext);
  const { getComplexModel } = useComplexApi(moduleState.apiUrl);
  
  useWithCancelation((mounted, cancelationToken) => {
    const getModel = async (mounted: boolean): Promise<void> => {
      try {
        const response = await getComplexModel({
          id: props.id
        }, cancelationToken);
        
        if (mounted) {
          console.log(response);
        }
      }
      catch (error) {
        // moduleReducer?.dispatch({
        //   action: 'ERROR',
        //   payload: error
        // })
      }
    };

    getModel(mounted);
  }, [props.id]);

  return (
    <ComplexStateContext.Provider value={state}>
      <ChildOne />
    </ComplexStateContext.Provider>
  );
};
