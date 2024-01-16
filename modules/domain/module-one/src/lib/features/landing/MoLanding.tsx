import { FC } from 'react';
import { useModuleOneModuleContext } from '../../context';

export const MoLanding: FC = () => {
  const { navigateToFeatureOne, navigateToFeatureTwo } = useModuleOneModuleContext();

  return (
    <div className="mo-landing">
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
