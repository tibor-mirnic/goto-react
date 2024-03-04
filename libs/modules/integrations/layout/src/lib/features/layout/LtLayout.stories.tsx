/* eslint-disable import/no-extraneous-dependencies */
import type { Meta, StoryObj } from '@storybook/react';

import { getSharedServicesFactory } from 'domain-shared';
import { getSharedServicesMock } from '@domain/shared-moq';
import { FC, PropsWithChildren } from 'react';
import { LtLayout } from './LtLayout';

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
    <LtLayout />
  </SharedServices>
);
DocsCmp.displayName = 'LtLayout';

const meta: Meta<typeof LtLayout> = {
  component: DocsCmp,
  excludeStories: ['DocsCmp'],
  title: 'Modules/Integrations/Layout/Features/Layout/LtLayout'
};
export default meta;

type Story = StoryObj<typeof LtLayout>;

export const Default: Story = {};
