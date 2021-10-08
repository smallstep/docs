/* eslint-disable react/jsx-curly-brace-presence */

import React from 'react';
import { Heading } from '@smallstep/step-ui';

import { mount } from '../../testing/utils';
import H3 from './H3';

jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/foo/bar',
  }),
}));

it('should add an id to the heading for deep links', () => {
  const wrapper = mount(<H3>{`Updating your CA's configuration`}</H3>);

  const heading = wrapper.find(Heading);
  expect(heading).toHaveProp('id', 'updating-your-cas-configuration');
});
