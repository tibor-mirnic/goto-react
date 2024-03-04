import { FC, useCallback } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { ModuleOneModuleContextProvider } from '../context';
import { MoLandingPage } from './landing';
import { MoFeatureOnePage } from './feature-one';

export const ModuleOneController: FC<{ userId: string }> = ({ userId }) => {
  const navigate = useNavigate();

  const navigateToFeatureOne = useCallback(() => {
    navigate('feature-one');
  }, [navigate]);
  const navigateToFeatureTwo = useCallback(() => {}, []);

  return (
    <ModuleOneModuleContextProvider
      userId={userId}
      featureOneName="Feature One"
      featureTwoName="Feature Two"
      navigateToFeatureOne={navigateToFeatureOne}
      navigateToFeatureTwo={navigateToFeatureTwo}
    >
      <Routes>
        <Route path="/" element={<MoLandingPage />} />
        <Route path="feature-one" element={<MoFeatureOnePage />} />

        <Route path="*" element={<div>Page Not Found!</div>} />
      </Routes>
    </ModuleOneModuleContextProvider>
  );
};
