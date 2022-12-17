import { useLocation } from 'react-router-dom';

export default function getQueryParam({ category }) {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  return params.get(category);
}
