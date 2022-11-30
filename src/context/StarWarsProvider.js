import { useEffect, useMemo, useState } from 'react';
import { node } from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchPlanets from '../services/fetchPlanets';
// import starwarReponse from '../starwar-response.json';

function StarWarsProvider({ children }) {
  const [responseApi, setResponseApi] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [selectColunm, setSelectColunm] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
    index: 0,
  });
  const [filterNumber, setFilterNumber] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const { results } = await fetchPlanets();
      setResponseApi({ results });
    };
    fetchApi();
  }, []);

  const contex = useMemo(() => (
    {
      filterName,
      setFilterName,
      selectColunm,
      setSelectColunm,
      filterNumber,
      setFilterNumber }
  ), [filterName, selectColunm, filterNumber]);

  return (
    <StarWarsContext.Provider
      value={
        { responseApi, contex }
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
