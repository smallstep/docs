import React from 'react';
import { NavSubItem as SuiNavSubItem, Code } from '@smallstep/step-ui';

import { mount } from '../../testing/utils';
import NavSubItem from './NavSubItem';

jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/docs/step-cli',
  }),
}));

it('should render text', () => {
  const wrapper = mount(
    <NavSubItem href="http://example.com" text="Example" />
  );
  expect(wrapper.text()).toEqual('Example');
});

it('should make active when visiting href', () => {
  let wrapper = mount(<NavSubItem href="/docs/step-cli" text="step CLI" />);
  let item = wrapper.find(SuiNavSubItem);
  expect(item).toHaveProp('active', true);

  wrapper = mount(<NavSubItem href="/docs/step-ca" text="step-ca" />);
  item = wrapper.find(SuiNavSubItem);
  expect(item).toHaveProp('active', false);
});

it('should support code backticks', () => {
  const wrapper = mount(
    <NavSubItem href="http://example.com" text="Example with `step`" />
  );
  const code = wrapper.find(Code);
  expect(code.text()).toEqual('step');
});
