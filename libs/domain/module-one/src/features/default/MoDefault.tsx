import { FC } from 'react';
import { useModuleOneModuleContext } from '../../context';

export const MoDefault: FC = () => {
  const { navigateToFeatureOne, navigateToFeatureTwo } = useModuleOneModuleContext();

  return (
    <div className="mo-default">
      <button type="button" onClick={navigateToFeatureOne}>
        Navigate to Feature One
      </button>
      <br />
      <button type="button" onClick={navigateToFeatureTwo}>
        Navigate to Feature Two
      </button>
    </div>
  );
};
