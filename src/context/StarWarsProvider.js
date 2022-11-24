import { useEffect, useState } from 'react';
import { node } from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchPlanets from '../services/fetchPlanets';

function StarWarsProvider({ children }) {
  const [responseApi, setResponseApi] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const { results } = await fetchPlanets();
      setResponseApi({ results });
    };
    fetchApi();
  }, []);

  return (
    <StarWarsContext.Provider
      value={
        { responseApi }
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
