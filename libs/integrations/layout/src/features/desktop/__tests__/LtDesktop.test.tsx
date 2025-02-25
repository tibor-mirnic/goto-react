import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { mockHttpClientInstance } from '@infrastructure/common/moq';
import { mockCommonServices, mockSharedServices } from '../../../__moqs__';
import { LtDesktop } from '../LtDesktop';

describe('component:LtDesktop', () => {
  const navigateToModule = vi.fn();

  beforeEach(() => {
    mockHttpClientInstance();
    mockCommonServices();
    mockSharedServices({
      navigationMock: {
        navigateToModule
      }
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('should render component', () => {
    const { container } = render(<LtDesktop />);

    const modulesDropdown = screen.getByRole('combobox');
    expect(modulesDropdown).toBeVisible();

    const loggedUser = container.querySelector('.lt-layout-header-user');
    expect(loggedUser).toBeVisible();

    const help = screen.getByText('Log Out');
    expect(help).toBeVisible();

    const content = container.querySelector('.lt-layout-content');
    expect(content).toBeVisible();

    const footer = container.querySelector('.lt-layout-footer');
    expect(footer).toBeVisible();
  });

  it('should change current module', async () => {
    render(<LtDesktop />);

    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getAllByRole('option', {
        name: 'Test Module Two'
      })
    );

    expect(navigateToModule).toHaveBeenCalledTimes(1);
    expect(navigateToModule).toHaveBeenCalledWith('test-module-two');
  });
});
