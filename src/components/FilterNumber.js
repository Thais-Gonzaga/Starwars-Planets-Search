import { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const options1 = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
const options2 = ['maior que', 'menor que', 'igual a'];

function FilterNumber() {
  const { contex: { selectColunm, setSelectColunm,
    setFilterNumber, filterNumber } } = useContext(StarWarsContext);

  const { column, value, comparison } = selectColunm;
  const filterOpt = options1
    .filter((e) => !filterNumber.some(({ column: c }) => c === e));

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
              ({ ...current, column: target.value, index: filterNumber.length + 1 })))
          }
        >
          {filterOpt.map((option) => <option key={ option }>{option}</option>)}
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
            index: 0,
          });
        } }
        data-testid="button-filter"
      >
        FILTRAR
      </button>

      <ol>
        {filterNumber.map((
          { column: col, comparison: comp, value: val },
          index,
        ) => (

          <li
            key={ index }
            data-testid="filter"
            id={ index }
          >
            {`${col} ${comp} ${val}`}

            <button
              type="button"
              onClick={ ({ target: { id } }) => {
                const num = 0;
                const newFilter = filterNumber.filter((e) => (
                  +e.index === num ? +e.index !== num : +e.index !== +id + 1));
                setFilterNumber(newFilter);
              } }
              id={ index }
            >
              X
            </button>
          </li>

        ))}
      </ol>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => {
          setFilterNumber([]);
        } }
      >
        Remover todas filtragens
      </button>
    </div>
  );
}

export default FilterNumber;
