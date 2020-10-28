import React, { useState, MouseEvent } from 'react';

import { createAxios } from 'src/common/axios';

import { FeatureModule } from 'src/modules/feature-module';

createAxios({
  applicationId: 'goto-react',
  accessTokenFactory: async axios => {
    try {
      const response = await axios.get({
        resourcePath: '/users',
        skipAuthorization: true
      });

      return 'goto-react';
    }
    catch (error) {
      throw error;
    }
  }
});

const App = () => {
  const apiUrl = process.env.REACT_APP_API_URL as string;
  const [isFeatureModuleVisible, setIsFeatureModuleVisible] = useState(false);

  const handleClick = (event: MouseEvent) => {
    setIsFeatureModuleVisible(!isFeatureModuleVisible);
  }

  return (
    <div>
      <button onClick={handleClick}>Show/Hide FeatureModule</button>
      <br />
      { isFeatureModuleVisible && <FeatureModule apiUrl={apiUrl} /> }
    </div>
  );
}

export default App;