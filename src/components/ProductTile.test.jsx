import React from 'react';
import Box from '@material-ui/core/Box';
import { StepCliIcon, Heading } from '@smallstep/step-ui';

import { mount } from '../../testing/utils';
import ProductTile from './ProductTile';

it('should render text', () => {
  const wrapper = mount(
    <ProductTile icon={<StepCliIcon />} href="/docs/step-cli" title="step CLI">
      A CLI for your steps
    </ProductTile>
  );

  expect(wrapper.text()).toEqual(expect.stringContaining('step CLI'));
  expect(wrapper.text()).toEqual(
    expect.stringContaining('A CLI for your steps')
  );
});

it('should render appropriate colors', () => {
  let wrapper = mount(
    <ProductTile icon={<StepCliIcon />} href="/docs/step-cli" title="step CLI">
      A CLI for your steps
    </ProductTile>
  );

  let icon = wrapper.testRef(Box, 'ProductTile-icon');
  expect(icon).toHaveProp('color', 'text.secondary');

  let heading = wrapper.find(Heading);
  expect(heading).toHaveProp('color', 'secondary');

  wrapper = mount(
    <ProductTile
      icon={<StepCliIcon />}
      href="/docs/step-cli"
      title="step CLI"
      color="blue"
    >
      A CLI for your steps
    </ProductTile>
  );

  icon = wrapper.testRef(Box, 'ProductTile-icon');
  expect(icon).toHaveProp('color', 'text.blue');

  heading = wrapper.find(Heading);
  expect(heading).toHaveProp('color', 'blue');
});
