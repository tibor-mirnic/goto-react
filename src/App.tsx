import React, { useState, MouseEvent } from 'react';

import { FeatureModule } from 'src/modules/feature-module';

/*
  import axiosAsync from 'src/common/axios-asunc';

  axiosAsync.configure({
    // ccc
  })
*/

const App = () => {

  const [isFeatureModuleVisible, setIsFeatureModuleVisible] = useState(false);

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    setIsFeatureModuleVisible(!isFeatureModuleVisible);
  }

  return (
    <div>
      <button onClick={handleClick}>Show/Hide FeatureModule</button>
      <br />
      { isFeatureModuleVisible && <FeatureModule apiUrl='/api/feature-module' /> }
    </div>
  );
}

export default App;