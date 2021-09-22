import { useContext } from 'react';

import { DocContext } from '../context';

const PageConfig = ({ children }) => {
  const { provisioner, deployment } = useContext(DocContext);
  return children({ provisioner, deployment });
};

export default PageConfig;
