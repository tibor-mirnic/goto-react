import React, { FC, useCallback, useContext } from 'react';

import { usePublish } from 'src/common/events';

import { FeatureModuleStateContext } from '../FeatureModule';
import { ISimpleProps } from '../models/components/simple.props';
import { SimpleEvent } from '../models/enum/simple-event';

export const Simple: FC<ISimpleProps> = props => {
  const moduleState = useContext(FeatureModuleStateContext);
  const { publish } = usePublish();

  const handleClick = () => {
    publish<string>(SimpleEvent.SIMPLE_ON_CLICK, 'Simple button clicked');
  };

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
