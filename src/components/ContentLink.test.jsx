import React from 'react';
import Link from 'next/link';
import { ContentLink as SuiContentLink } from '@smallstep/step-ui';

import { mount } from '../../testing/utils';
import ContentLink from './ContentLink';

it('should not use link component for external links', () => {
  let wrapper = mount(
    <ContentLink href="http://example.com">Click me</ContentLink>
  );
  let link = wrapper.find(Link);
  expect(link).not.toExist();

  wrapper = mount(
    <ContentLink href="https://example.com">Click me</ContentLink>
  );
  link = wrapper.find(Link);
  expect(link).not.toExist();

  wrapper = mount(
    <ContentLink href="mailto:foo@smallstep.com">Click me</ContentLink>
  );
  link = wrapper.find(Link);
  expect(link).not.toExist();
});

it('should use link component for internal links', () => {
  const wrapper = mount(<ContentLink href="/docs">Click me</ContentLink>);
  const link = wrapper.find(Link);
  expect(link).toExist();
});

it('should pass href for external links', () => {
  const wrapper = mount(
    <ContentLink href="http://example.com">Click me</ContentLink>
  );
  const link = wrapper.find(SuiContentLink);
  expect(link).toHaveProp('href', 'http://example.com');
});

it('should pass href for internal links', () => {
  const wrapper = mount(<ContentLink href="/docs">Click me</ContentLink>);
  const link = wrapper.find(Link);
  expect(link).toHaveProp('href', '/docs');
});
