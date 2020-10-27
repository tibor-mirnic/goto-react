import React, { useState, MouseEvent } from 'react';

import { EventContext } from 'src/common/event-context';
import { createAxios , useAxios } from 'src/common/axios';

import { FeatureModule } from 'src/modules/feature-module';
import { userErrorHandler } from 'src/common/errors';

const accessTokenFactory = async (): Promise<string> => {
  try {
    // const token = await Promise.resolve('goto-react');
    // return token;
    throw new Error();
  }
  catch (error) {
    throw error;
  }
}

createAxios({
  applicationId: 'goto-react',
  accessTokenFactory
});

const App = () => {
  const [isFeatureModuleVisible, setIsFeatureModuleVisible] = useState(false);
  const { get } = useAxios();

  const handleClick = (event: MouseEvent) => {
    
    get({
      resourcePath: 'vectors/initial'
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      const errorEvent = userErrorHandler(error);
      console.log(errorEvent);
    });

    setIsFeatureModuleVisible(!isFeatureModuleVisible);
  }

  return (
    <EventContext>
      <button onClick={handleClick}>Show/Hide FeatureModule</button>
      <br />
      { isFeatureModuleVisible && <FeatureModule apiUrl='/api/feature-module' /> }
    </EventContext>
  );
}

export default App;