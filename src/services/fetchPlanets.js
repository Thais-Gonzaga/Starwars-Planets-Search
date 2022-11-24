const fetchPlanets = async () => {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const fetchApi = await fetch(url);
  const date = await fetchApi.json();
  return date;
};

export default fetchPlanets;
