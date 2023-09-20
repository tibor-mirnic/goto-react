import { render } from '@testing-library/react';

import { Common } from './Common';

describe('Common', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Common />);
    expect(baseElement).toBeTruthy();
  });
});
