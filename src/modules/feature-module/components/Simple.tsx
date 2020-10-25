import React, { FC, useContext } from 'react';

import { FeatureModuleStateContext } from '../FeatureModule';

export interface ISimpleProps {};

export const Simple: FC<ISimpleProps> = props => {
  const moduleState = useContext(FeatureModuleStateContext);

  return (
    <div>{moduleState?.apiUrl}</div>
  );
};
