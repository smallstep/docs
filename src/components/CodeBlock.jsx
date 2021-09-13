import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useTheme } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import { CodeBlock as SuiCodeBlock } from '@smallstep/step-ui';

const CodeBlock = ({ mt, mb, children, ...props }) => {
  const theme = useTheme();

  if (typeof children === 'string') {
    return (
      <Box mt={mt} mb={mb}>
        <SuiCodeBlock {...props}>{children}</SuiCodeBlock>
      </Box>
    );
  }

  const { className, nocopy, children: innerChildren } = children.props;
  const language = className ? className.slice(9) : undefined;

  if (language === 'raw') {
    return (
      <Box mt={mt} mb={mb}>
        <pre
          css={css`
            background-color: ${theme.palette.background.secondary};
            padding: ${theme.spacing(2)}px;
            overflow: auto;

            code {
              font-family: Cousine, monospace, monospace;
              font-size: ${theme.typography.body1.fontSize};
              font-weight: ${theme.typography.body1.fontWeight};
            }
          `}
        >
          <code>{children}</code>
        </pre>
      </Box>
    );
  }

  return (
    <Box mt={mt} mb={mb}>
      <SuiCodeBlock
        {...{
          ...props,
          language,
          autoCopy: !nocopy,
        }}
      >
        {innerChildren}
      </SuiCodeBlock>
    </Box>
  );
};

CodeBlock.GrammarProvider = SuiCodeBlock.GrammarProvider;

CodeBlock.propTypes = {
  mt: PropTypes.number,
  mb: PropTypes.number,
  children: PropTypes.node.isRequired,
};

CodeBlock.defaultProps = {
  mt: 2,
  mb: 2,
};

export default CodeBlock;
