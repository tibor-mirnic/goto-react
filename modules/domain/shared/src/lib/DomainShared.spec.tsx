import { render } from '@testing-library/react';

import { DomainShared } from './DomainShared';

describe('DomainShared', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DomainShared />);
    expect(baseElement).toBeTruthy();
  });
});
