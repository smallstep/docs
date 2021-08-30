import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { Code, NotebookIcon } from '@smallstep/step-ui';

import ContentLink from './ContentLink';

// TODO port contents.yaml
const contents = {};

const Contents = ({ product }) => {
  if (contents[product].length === 0) {
    return null;
  }

  return (
    <Box mt={4}>
      {contents[product].map(({ title: pageTitle, path }) => (
        <ContentLink key={path} icon={<NotebookIcon />} href={path}>
          {pageTitle
            .split('`')
            .map((chunk, i) =>
              i % 2 === 0 ? chunk : <Code key={chunk}>{chunk}</Code>
            )}
        </ContentLink>
      ))}
    </Box>
  );
};

Contents.propTypes = {
  product: PropTypes.string.isRequired,
};

export default Contents;
