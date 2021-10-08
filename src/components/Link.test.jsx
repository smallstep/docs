import React from 'react';
import { Link as SuiLink } from '@smallstep/step-ui';

import { mount } from '../../testing/utils';
import UiLink from '../../ui/components/Link';
import Link from './Link';

it('should not use link component for external links', () => {
  let wrapper = mount(<Link href="http://example.com">Click me</Link>);
  let link = wrapper.find(UiLink);
  expect(link).not.toExist();

  wrapper = mount(<Link href="https://example.com">Click me</Link>);
  link = wrapper.find(UiLink);
  expect(link).not.toExist();

  wrapper = mount(<Link href="mailto:foo@smallstep.com">Click me</Link>);
  link = wrapper.find(UiLink);
  expect(link).not.toExist();
});

it('should use link component for internal links', () => {
  const wrapper = mount(<Link href="/docs">Click me</Link>);
  const link = wrapper.find(UiLink);
  expect(link).toExist();
});

it('should pass href for external links', () => {
  const wrapper = mount(<Link href="http://example.com">Click me</Link>);
  const link = wrapper.find(SuiLink);
  expect(link).toHaveProp('href', 'http://example.com');
});

it('should pass href for internal links', () => {
  const wrapper = mount(<Link href="/docs">Click me</Link>);
  const link = wrapper.find(UiLink);
  expect(link).toHaveProp('href', '/docs');
});
