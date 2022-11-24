import { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { responseApi } = useContext(StarWarsContext);
  const { results } = responseApi;
  if (!results) return;
  const titles = results.map((data) => Object.keys(data))[0]
    .filter((e) => e !== 'residents');

  return (
    <table>
      <thead>
        <tr>
          {titles.map((title) => (
            <th key={ title }>
              { title }
            </th>))}
        </tr>
      </thead>
      <tbody>
        {results.map((data) => (
          <tr key={ data.name }>
            {titles.map((title) => (
              <td key={ data[title] }>
                {data[title]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>

    </table>
  );
}

export default Table;
