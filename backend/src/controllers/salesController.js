import { loadSalesData } from '../services/dataLoader.js';
import { filterSales, sortSales, paginateSales } from '../services/salesService.js';

let salesData = [];
let isDataLoaded = false;
let loadingPromise = null;

const ensureDataLoaded = async () => {
  if (isDataLoaded) return;
  if (loadingPromise) return loadingPromise;
  
  loadingPromise = loadSalesData().then(data => {
    salesData = data;
    isDataLoaded = true;
    console.log(`✓ Data loaded: ${salesData.length} records`);
    return data;
  });
  
  return loadingPromise;
};

// Start loading immediately
ensureDataLoaded();

export const getSales = async (req, res) => {
  await ensureDataLoaded();
  try {
    const {
      search = '',
      regions = '',
      genders = '',
      ageMin = '',
      ageMax = '',
      categories = '',
      tags = '',
      paymentMethods = '',
      dateFrom = '',
      dateTo = '',
      sortBy = 'date',
      sortOrder = 'desc',
      page = '1',
      pageSize = '10'
    } = req.query;

    const filters = {
      search,
      regions,
      genders,
      ageMin: ageMin ? parseInt(ageMin) : null,
      ageMax: ageMax ? parseInt(ageMax) : null,
      categories,
      tags,
      paymentMethods,
      dateFrom,
      dateTo
    };

    let filtered = filterSales(salesData, filters);
    let sorted = sortSales(filtered, sortBy, sortOrder);
    let paginated = paginateSales(sorted, parseInt(page), parseInt(pageSize));

    res.json({
      data: paginated.data,
      pagination: {
        page: paginated.page,
        pageSize: paginated.pageSize,
        total: paginated.total,
        totalPages: paginated.totalPages
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

let cachedFilterOptions = null;

export const getFilterOptions = async (req, res) => {
  await ensureDataLoaded();
  
  try {
    // Return cached options if available
    if (cachedFilterOptions) {
      return res.json(cachedFilterOptions);
    }

    // Calculate and cache filter options
    const regions = [...new Set(salesData.map(s => s.customerRegion))].filter(Boolean).sort();
    const genders = [...new Set(salesData.map(s => s.gender))].filter(Boolean).sort();
    const categories = [...new Set(salesData.map(s => s.productCategory))].filter(Boolean).sort();
    const paymentMethods = [...new Set(salesData.map(s => s.paymentMethod))].filter(Boolean).sort();
    
    const allTags = salesData.flatMap(s => s.tags ? s.tags.split(',').map(t => t.trim()) : []);
    const tags = [...new Set(allTags)].filter(Boolean).sort();

    cachedFilterOptions = {
      regions,
      genders,
      categories,
      tags,
      paymentMethods
    };

    res.json(cachedFilterOptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
