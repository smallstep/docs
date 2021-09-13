import React, { useContext } from 'react';

import { DocContext } from '../context';

const DocConfig = ({ children }) => {
  const { doc } = useContext(DocContext);
  return children(doc);
};

export default DocConfig;
