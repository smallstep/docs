import { useContext } from 'react';

import { PageContext } from '../context';

const PageConfig = ({ children }) => {
  const value = useContext(PageContext);
  return children(value);
};

export default PageConfig;
