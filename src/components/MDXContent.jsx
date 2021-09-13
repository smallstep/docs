import React, { useContext } from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { DocContext } from '../context';

const MDXContent = ({ path }) => {
  const { doc, content } = useContext(DocContext);

  return (
    <MDXRenderer>
      {(content[`${doc.slug}/${path}`] || content[`default/${path}`]).body}
    </MDXRenderer>
  );
};

export default MDXContent;
