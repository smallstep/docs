/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import Box from '@material-ui/core/Box';
import { CodeBlock as UiCodeBlock } from '@smallstep/step-ui';

import { mount } from '../../testing/utils';
import CodeBlock from './CodeBlock';

it('should render code block text', () => {
  const wrapper = mount(<CodeBlock>{`const foo = 'bar';`}</CodeBlock>);
  expect(wrapper.find('code').text()).toEqual("const foo = 'bar';");
});

it('should render code block text in docs', () => {
  const wrapper = mount(
    <CodeBlock>
      <code className="language-javascript">{`const foo = 'bar';`}</code>
    </CodeBlock>
  );
  expect(wrapper.find('code').text()).toEqual("const foo = 'bar';");
});

it('should automatically enable copy for strings when rendered in docs', () => {
  const wrapper = mount(
    <CodeBlock>
      <code className="language-javascript">{`const foo = 'bar';`}</code>
    </CodeBlock>
  );

  const codeBox = wrapper.testRef(Box, 'CodeBlock-code-box');
  codeBox.simulate('mouseenter');
  const copyBox = wrapper.testRef(Box, 'CodeBlock-copy-box');
  expect(copyBox).toHaveProp('visibility', 'visible');
});

it('should disable copy for strings when specified in code fence', () => {
  const wrapper = mount(
    <CodeBlock>
      <code nocopy className="language-javascript">{`const foo = 'bar';`}</code>
    </CodeBlock>
  );

  const codeBox = wrapper.testRef(Box, 'CodeBlock-code-box');
  codeBox.simulate('mouseenter');
  const copyBox = wrapper.testRef(Box, 'CodeBlock-copy-box');
  expect(copyBox).toHaveProp('visibility', 'hidden');
});

it('should parse language name from code block fences', () => {
  const wrapper = mount(
    <CodeBlock>
      <code className="language-javascript">{`const foo = 'bar';`}</code>
    </CodeBlock>
  );

  const block = wrapper.testRef(UiCodeBlock, 'DocsCodeBlock-ui-code-block');
  expect(block).toHaveProp('language', 'javascript');
});
