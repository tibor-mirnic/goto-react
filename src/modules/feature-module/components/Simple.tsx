import React, { FC, useCallback, useContext } from 'react';

import { usePublish } from 'src/common/events';

import { FeatureModuleStateContext } from '../FeatureModule';

export interface ISimpleProps {};

export const Simple: FC<ISimpleProps> = props => {
  const moduleState = useContext(FeatureModuleStateContext);
  const { publish } = usePublish();

  const handleClick = useCallback(() => {
    publish<any>('simple-onClick', {
      someString: 'some',
      someNumber: 22
    })
  }, [publish]);

  return (
    <div>
      <div>{moduleState?.apiUrl}</div>
      <button
        type="button"
        onClick={handleClick}
      >
        Simple onClick
      </button>
    </div>
  );
};
