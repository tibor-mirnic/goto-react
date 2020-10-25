import React from 'react';

import { FeatureModule } from 'src/modules/feature-module';

/*
  import axiosAsync from 'src/common/axios-asunc';

  axiosAsync.configure({
    // ccc
  })
*/

function App() {
  return (
    <FeatureModule apiUrl='/api/feature-module' />
  );
}

export default App;
