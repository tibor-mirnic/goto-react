import { render } from '@testing-library/react';

import { DomainFeatureTwo } from './DomainFeatureTwo';

describe('DomainFeatureTwo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DomainFeatureTwo />);
    expect(baseElement).toBeTruthy();
  });
});
