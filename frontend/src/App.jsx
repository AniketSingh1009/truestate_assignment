import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import SummaryCards from './components/SummaryCards';
import SalesTable from './components/SalesTable';
import Pagination from './components/Pagination';
import LoadingSkeleton from './components/LoadingSkeleton';
import { fetchSales, fetchFilterOptions } from './services/api';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [sales, setSales] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [pagination, setPagination] = useState({});
  
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    regions: '',
    genders: '',
    ageMin: '',
    ageMax: '',
    categories: '',
    tags: '',
    paymentMethods: '',
    dateFrom: '',
    dateTo: ''
  });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const initializeApp = async () => {
      await Promise.all([loadFilterOptions(), loadSales()]);
      setInitialLoad(false);
    };
    initializeApp();
  }, []);

  useEffect(() => {
    if (!initialLoad) {
      loadSales();
    }
  }, [debouncedSearch, filters, sortBy, sortOrder, page]);

  const loadFilterOptions = async () => {
    try {
      const options = await fetchFilterOptions();
      setFilterOptions(options);
    } catch (error) {
      console.error('Failed to load filter options:', error);
    }
  };

  const loadSales = async () => {
    setLoading(true);
    try {
      const params = {
        search: debouncedSearch,
        sortBy,
        sortOrder,
        page,
        pageSize: 10
      };

      // Add filters only if they have values
      if (filters.regions) params.regions = filters.regions;
      if (filters.genders) params.genders = filters.genders;
      if (filters.ageMin) params.ageMin = filters.ageMin;
      if (filters.ageMax) params.ageMax = filters.ageMax;
      if (filters.categories) params.categories = filters.categories;
      if (filters.tags) params.tags = filters.tags;
      if (filters.paymentMethods) params.paymentMethods = filters.paymentMethods;
      if (filters.dateFrom) params.dateFrom = filters.dateFrom;
      if (filters.dateTo) params.dateTo = filters.dateTo;

      const response = await fetchSales(params);
      setSales(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to load sales:', error);
      setSales([]);
      setPagination({});
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setPage(1);
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setPage(1);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleRefresh = () => {
    setFilters({
      regions: '',
      genders: '',
      ageMin: '',
      ageMax: '',
      categories: '',
      tags: '',
      paymentMethods: '',
      dateFrom: '',
      dateTo: ''
    });
    setSearch('');
    setPage(1);
  };

  // Calculate summary stats
  const totalUnits = sales.reduce((sum, sale) => sum + (sale.quantity || 0), 0);
  const totalAmount = sales.reduce((sum, sale) => sum + (sale.totalAmount || 0), 0);
  const totalDiscount = sales.reduce((sum, sale) => sum + ((sale.totalAmount - sale.finalAmount) || 0), 0);

  return (
    <div className="app">
      <header className="header">
        <h1>Sales Management System</h1>
      </header>
      
      <div className="container">
        <div className="top-controls">
          <SearchBar value={search} onChange={handleSearchChange} />
        </div>

        <FilterBar 
          filters={filters}
          filterOptions={filterOptions}
          onChange={handleFilterChange}
          onRefresh={handleRefresh}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />

        {initialLoad ? (
          <LoadingSkeleton />
        ) : (
          <>
            <SummaryCards 
              totalUnits={totalUnits}
              totalAmount={totalAmount}
              totalDiscount={totalDiscount}
              recordCount={sales.length}
            />

            <div className="main fade-in">
              {loading && !initialLoad ? (
                <div className="loading">Loading...</div>
              ) : sales.length === 0 ? (
                <div className="no-results">No results found</div>
              ) : (
                <>
                  <SalesTable sales={sales} />
                  <Pagination 
                    page={pagination.page}
                    totalPages={pagination.totalPages}
                    total={pagination.total}
                    onPageChange={setPage}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
