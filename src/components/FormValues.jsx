import { useLocation } from '@reach/router';
import queryString from 'query-string';

export const FormValues = ({ children }) => {
  const { search } = useLocation();
  const query = queryString.parse(search);
  return children(query);
};

export default FormValues;
