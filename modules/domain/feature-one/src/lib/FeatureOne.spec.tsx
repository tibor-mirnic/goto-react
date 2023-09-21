import { render } from '@testing-library/react';

import { FeatureOne } from './FeatureOne';

describe('FeatureOne', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeatureOne />);
    expect(baseElement).toBeTruthy();
  });
});
