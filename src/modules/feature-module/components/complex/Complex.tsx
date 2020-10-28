import React, { FC, useState, useContext } from 'react';

import { useWithCancelation } from 'src/common/axios';
import { useErrorHandler } from 'src/common/errors';

import { FeatureModuleStateContext } from '../../FeatureModule';

import { useComplexApi } from '../../hooks/complex.api';
import { IComplexProps } from '../../models/components/complex/props';
import { IComplexState } from '../../models/components/complex/state';
import { ChildOne } from './ChildOne';
import { ChildTwo } from './ChildTwo';

export const Complex: FC<IComplexProps> = props => {
  const { handleError } = useErrorHandler();
  
  const moduleState = useContext(FeatureModuleStateContext);
  const { getComplexModel } = useComplexApi(moduleState.apiUrl);

  const initialState: IComplexState = {
    id: props.id,
    name: 'Complex Component',
    age: 20
  };
  const [state, setState] = useState(initialState);
  
  const onNameChanged = (name: string) => {
    setState(prev => ({
      ...prev,
      name
    }));
  }

  const onAgeChanged = (age: number) => {
    setState(prev => ({
      ...prev,
      age
    }));
  }

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
        handleError(error);
      }
    };

    getModel(mounted);
  }, [props.id]);

  return (
    <div>
      <ChildOne
        name={state.name}
        onNameChange={onNameChanged}
      />
      <ChildTwo
        age={state.age}
        onAgeChange={onAgeChanged}
      />
    </div>
  );
};
