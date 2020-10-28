import React, { useState, MouseEvent, useRef } from 'react';

import { createAxios } from 'src/common/axios';
import { ErrorBase, ErrorHandlerEvent } from 'src/common/errors';
import { useEvent } from './common/events';

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
  const errorElementRef = useRef<HTMLDivElement>(null);

  useEvent<ErrorBase>(ErrorHandlerEvent.ERROR_HANDLER_USER, event => {
    if (errorElementRef.current) {
      errorElementRef.current.innerText = event.data.message;
    }

    setTimeout(() => {
      if (errorElementRef.current) {
        errorElementRef.current.innerText = '';
      };
    }, 3000);
  });

  const handleClick = (event: MouseEvent) => {
    setIsFeatureModuleVisible(!isFeatureModuleVisible);
  }

  return (
    <div>
      <div ref={errorElementRef}></div>
      <button onClick={handleClick}>Show/Hide FeatureModule</button>
      <br />
      { isFeatureModuleVisible && <FeatureModule apiUrl={apiUrl} /> }
    </div>
  );
}

export default App;