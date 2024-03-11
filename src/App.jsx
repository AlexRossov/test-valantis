import React, { useEffect, useState } from 'react';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';
import Filter from './components/Filter';
import { fetchData, filterUniqueIdProducts } from './utils';

const App = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 50;
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDataItems();
  }, [currentPage]);

  const fetchDataItems = async () => {
    try {
      setFilteredProducts([]);
      const idsResponse = await fetchData('get_ids', {});
      const allIds = Array.from(new Set(idsResponse));

      const totalPagesCount = Math.ceil(allIds.length / productsPerPage);
      setTotalPages(totalPagesCount);
      const startIdx = (currentPage - 1) * productsPerPage;
      const endIdx = currentPage * productsPerPage;
      const pageIds = allIds.slice(startIdx, endIdx);

      const itemsResponse = await fetchData('get_items', { ids: pageIds });
      const uniqItems = filterUniqueIdProducts(itemsResponse);
      setFilteredProducts(uniqItems);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.response ? error.response.data : 'Unknown error');
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const retryFetchDataItems = () => { fetchDataItems() };

  return (
    <div>
      <h1>Product List</h1>
      {error && (
        <div>
          <p>Error: {error.message}</p>
          <button onClick={retryFetchDataItems}>Retry</button>
        </div>
      )}
      {!error && (
        <div>
          <Filter setFilteredProducts={setFilteredProducts} />
          <ProductList products={filteredProducts} />
          <Pagination totalPages={totalPages} currentPage={currentPage} paginate={paginate} />
        </div>
      )}
    </div>
  );
};

export default App;
