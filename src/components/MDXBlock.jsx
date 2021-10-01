import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { DocContext } from '../context';

const MDXBlock = (props) => {
  const { show, path } = props;

  const { doc, provisioner, deployment, content } = useContext(DocContext);

  let blockContent = content[`default/${path}`];

  const docContent = content[`${doc.slug}/${path}`];
  if (!props.default && docContent) {
    blockContent = docContent;
  }

  return (
    <div style={{ display: show ? 'block' : 'none' }}>
      <MDXRenderer doc={doc} page={{ provisioner, deployment }}>
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
