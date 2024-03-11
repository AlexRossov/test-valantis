import React, { useState } from 'react';
import { filterUniqueIdProducts, fetchData } from '../utils';

const Filter = ({ setFilteredProducts }) => {
  const [filterParam, setFilterParam] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleFilter = async () => {
    try {
      setFilteredProducts([]);

      const filters = {};
      if (filterParam && filterValue) {
        filterParam === 'price'
          ? filters[filterParam] = parseFloat(filterValue)
          : filters[filterParam] = filterValue;

        const response = await fetchData('filter', filters);
        const idFilteredItems = Array.from(new Set(response));

        const itemsResponse = await fetchData('get_items', { ids: idFilteredItems });
        const filteredItems = filterUniqueIdProducts(itemsResponse);

        setFilteredProducts(filteredItems);
      }
    } catch (error) {
      console.error('Error filtering products:', error);
    }
  };

  return (
    <div>
      <h2>Filter</h2>
      <div className="wrap-select">
        <select
          value={filterParam} onChange={
          (e) => setFilterParam(e.target.value)
        }>
          <option value="">Select Filter</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="brand">Brand</option>
        </select>
      </div>
      {filterParam && (
        <input
          className='inputFilter'
          type='text'
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder={`Enter ${filterParam}`}
        />
      )}
      <button disabled={!filterParam} onClick={() => {
        handleFilter()
      }}>Apply Filter
      </button>
    </div>
  );
};

export default Filter;
