import React from 'react';
import './App.css';
import FilterName from './components/FilterName';
import FilterNumber from './components/FilterNumber';
import Order from './components/Order';
import Table from './components/Table';

function App() {
  return (
    <div>
      <FilterName />
      <FilterNumber />
      <Order />
      <Table />
    </div>
  );
}

export default App;
