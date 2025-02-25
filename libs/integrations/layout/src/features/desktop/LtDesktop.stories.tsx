import type { Meta, StoryObj } from '@storybook/react';

import { getSharedServicesFactory } from '@domain/shared';
import { getSharedServicesMock } from '@domain/shared/moq';
import { FC, PropsWithChildren } from 'react';
import { LtDesktop } from './LtDesktop';

const { SharedServices, NavigationContext, SecurityContext } = getSharedServicesFactory();
const mockedSharedServices = getSharedServicesMock();

const NavProvider: FC<PropsWithChildren> = ({ children }) => (
  <NavigationContext.Provider value={mockedSharedServices.navigation}>{children}</NavigationContext.Provider>
);

const SecProvider: FC<PropsWithChildren> = ({ children }) => (
  <SecurityContext.Provider value={mockedSharedServices.security}>{children}</SecurityContext.Provider>
);

// required for Storybook's auto-generated prop types
export const DocsCmp = () => (
  <SharedServices navigationContextProvider={NavProvider} securityContextProvider={SecProvider}>
    <LtDesktop />
  </SharedServices>
);
DocsCmp.displayName = 'LtDesktop';

const meta: Meta<typeof LtDesktop> = {
  component: DocsCmp,
  excludeStories: ['DocsCmp'],
  title: 'Modules/Integrations/Layout/Features/Desktop/LtDesktop'
};
// eslint-disable-next-line import/no-default-export
export default meta;

type Story = StoryObj<typeof LtDesktop>;

export const Default: Story = {};
