import { useEffect, useMemo, useState } from 'react';
import { node } from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchPlanets from '../services/fetchPlanets';

function StarWarsProvider({ children }) {
  const [responseApi, setResponseApi] = useState([]);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    const fetchApi = async () => {
      const { results } = await fetchPlanets();
      setResponseApi({ results });
    };
    fetchApi();
  }, []);

  const values = useMemo(() => (
    { responseApi, filterName, setFilterName }
  ), [responseApi, filterName]);

  return (
    <StarWarsContext.Provider
      value={
        { values }
      }
    >
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: node.isRequired,
};

export default StarWarsProvider;
