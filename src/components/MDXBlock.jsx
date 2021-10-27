import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { PztContext } from '../context';

const MDXBlock = (props) => {
  const { show, path } = props;

  const { pzt, provisioner, deployment, content } = useContext(PztContext);

  let blockContent = content[`default/${path}`];

  const pztContent = content[`${pzt.slug}/${path}`];
  if (!props.default && pztContent) {
    blockContent = pztContent;
  }

  return (
    <div style={{ display: show ? 'block' : 'none' }}>
      <MDXRenderer pzt={pzt} page={{ provisioner, deployment }}>
        {blockContent.body}
      </MDXRenderer>
    </div>
  );
};

MDXBlock.propTypes = {
  default: PropTypes.bool,
  show: PropTypes.bool,
};

MDXBlock.defaultProps = {
  default: false,
  show: true,
};

export default MDXBlock;
