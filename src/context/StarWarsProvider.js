import { useEffect, useMemo, useState } from 'react';
import { node } from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchPlanets from '../services/fetchPlanets';
// import starwarReponse from '../starwarReponse';

function StarWarsProvider({ children }) {
  const [responseApi, setResponseApi] = useState([]);
  const [responseOriginal, setResponseOriginal] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [selectColunm, setSelectColunm] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
    index: 0,
  });
  const [selectOrder, setSelectOrder] = useState({
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });
  const [filterNumber, setFilterNumber] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const { results } = await fetchPlanets();
      // const { results } = starwarReponse;
      setResponseApi({ results });
      setResponseOriginal(results);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    if (!responseOriginal.length) return;
    const { column, sort } = selectOrder.order;
    const num = -1;
    console.log('select', selectOrder.order);
    const results = [...responseOriginal]
      .sort((a, b) => (sort === 'ASC' ? a[column] - b[column] : b[column] - a[column]))
      .sort((a, b) => (b[column] === 'unknown' ? num : 0));
    setResponseApi({ results });
  }, [selectOrder, responseOriginal]);

  const contex = useMemo(() => (
    {
      selectOrder,
      setSelectOrder,
      filterName,
      setFilterName,
      selectColunm,
      setSelectColunm,
      filterNumber,
      setFilterNumber,
    }
  ), [filterName, selectColunm, filterNumber, selectOrder]);

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
