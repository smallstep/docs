/* eslint-disable react/jsx-curly-brace-presence */

import React from 'react';
import { Heading } from '@smallstep/step-ui';

import { mount } from '../../testing/utils';
import H2 from './H2';

jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/foo/bar',
  }),
}));

it('should add an id to the heading for deep links', () => {
  const wrapper = mount(<H2>{`Updating your CA's configuration`}</H2>);

  const heading = wrapper.find(Heading);
  expect(heading).toHaveProp('id', 'updating-your-cas-configuration');
});
