import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { DocContext } from '../context';

const MDXBlock = ({ show, path }) => {
  const { doc, provisioner, deployment, content } = useContext(DocContext);

  return (
    <div style={{ display: show ? 'block' : 'none' }}>
      <MDXRenderer doc={doc} page={{ provisioner, deployment }}>
        {(content[`${doc.slug}/${path}`] || content[`default/${path}`]).body}
      </MDXRenderer>
    </div>
  );
};

MDXBlock.propTypes = {
  show: PropTypes.bool,
};

MDXBlock.defaultProps = {
  show: true,
};

export default MDXBlock;
