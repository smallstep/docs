import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { CodeBlock as SuiCodeBlock } from '@smallstep/step-ui';

const useStyles = makeStyles((theme) => ({
  pre: {
    backgroundColor: theme.palette.background.secondary,
    padding: theme.spacing(2),
    overflow: 'auto',
  },
  code: {
    fontFamily: 'Cousine, monospace, monospace',
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.body1.fontWeight,
  },
}));

const CodeBlock = ({ mt, mb, children, ...props }) => {
  const classes = useStyles();

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
        <pre className={classes.pre}>
          <code className={classes.code}>{children}</code>
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
  mb: 4,
};

export default CodeBlock;
