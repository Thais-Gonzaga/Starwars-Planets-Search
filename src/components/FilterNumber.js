import { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const options1 = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
const options2 = ['maior que', 'menor que', 'igual a'];

function FilterNumber() {
  const { values: { selectColunm, setSelectColunm,
    setFilterNumber, filterNumber } } = useContext(StarWarsContext);

  const { column, value, comparison } = selectColunm;

  return (
    <div>
      <label htmlFor="column-filter">
        Coluna:
        <select
          id="column-filter"
          value={ column }
          data-testid="column-filter"
          onChange={
            ({ target }) => setSelectColunm((current) => (
              ({ ...current, column: target.value })))
          }
        >
          {options1.map((option) => <option key={ option }>{option}</option>)}
        </select>
      </label>

      <label htmlFor="comparison-filter">
        Operador:
        <select
          id="comparison-filter"
          value={ comparison }
          data-testid="comparison-filter"
          onChange={
            ({ target }) => setSelectColunm((current) => (
              ({ ...current, comparison: target.value })))
          }
        >
          {options2.map((operator) => <option key={ operator }>{operator}</option>)}
        </select>
      </label>

      <label htmlFor="value-filter">
        <input
          type="number"
          data-testid="value-filter"
          value={ value }
          onChange={
            ({ target }) => setSelectColunm((current) => (
              ({ ...current, value: target.value })))
          }
          id="value-filter"
        />
      </label>
      <button
        type="button"
        onClick={ () => {
          setFilterNumber((current) => (
            ([...current, selectColunm])
          ));
          setSelectColunm({
            column: 'population',
            comparison: 'maior que',
            value: 0,
          });
        } }
        data-testid="button-filter"
      >
        FILTRAR
      </button>
      <ul>
        {filterNumber.map((
          { column: col, comparison: comp, value: val },
          index,
        ) => (
          <div key={ index }>
            <li>{`${col} ${comp} ${val}`}</li>
            <button
              type="button"
            >
              Excluir
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default FilterNumber;
