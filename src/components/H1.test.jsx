/* eslint-disable react/jsx-curly-brace-presence */

import React from 'react';
import { Heading } from '@smallstep/step-ui';

import { mount } from '../../testing/utils';
import H1 from './H1';

jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/foo/bar',
  }),
}));

it('should add an id to the heading for deep links', () => {
  const wrapper = mount(<H1>{`Updating your CA's configuration`}</H1>);

  const heading = wrapper.find(Heading);
  expect(heading).toHaveProp('id', 'updating-your-cas-configuration');
});
