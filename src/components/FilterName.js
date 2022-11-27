import { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FilterName() {
  const { values: { filterName, setFilterName } } = useContext(StarWarsContext);

  return (
    <div>
      <label htmlFor="name-filter">
        <input
          placeholder="Procure pelo nome do planeta"
          type="text"
          data-testid="name-filter"
          value={ filterName }
          onChange={ ({ target }) => setFilterName(target.value) }
          id="name-filter"
        />
      </label>
    </div>
  );
}

export default FilterName;
