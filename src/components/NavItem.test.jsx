import React from 'react';
import { NavItem as SuiNavItem } from '@smallstep/step-ui';

import { mount } from '../../testing/utils';
import NavSubItem from './NavSubItem';
import NavItem from './NavItem';

jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/docs/step-cli',
  }),
}));

it('should render text', () => {
  const wrapper = mount(<NavItem href="http://example.com" text="Example" />);
  expect(wrapper.text()).toEqual('Example');
});

it('should make active when visiting href', () => {
  let wrapper = mount(<NavItem href="/docs/step-cli" text="step CLI" />);
  let item = wrapper.find(SuiNavItem);
  expect(item).toHaveProp('active', true);

  wrapper = mount(<NavItem href="/docs/step-ca" text="step-ca" />);
  item = wrapper.find(SuiNavItem);
  expect(item).toHaveProp('active', false);
});

it('should nest children', () => {
  const wrapper = mount(
    <NavItem href="http://example.com" text="Example">
      <NavSubItem test-ref="NavItemTest-sub-item" href="/docs" text="Docs" />
    </NavItem>
  );

  const item = wrapper.testRef(NavSubItem, 'NavItemTest-sub-item');
  expect(item).toExist();
});
