import { getSalesFromDB, getFilterOptionsFromDB } from '../models/salesModel.js';

let cachedFilterOptions = null;

export const getSales = async (req, res) => {
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

    const result = await getSalesFromDB(
      filters,
      sortBy,
      sortOrder,
      parseInt(page),
      parseInt(pageSize)
    );

    res.json({
      data: result.data,
      pagination: {
        page: parseInt(page),
        pageSize: parseInt(pageSize),
        total: result.total,
        totalPages: result.totalPages
      }
    });
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getFilterOptions = async (req, res) => {
  try {
    // Return cached options if available
    if (cachedFilterOptions) {
      return res.json(cachedFilterOptions);
    }

    // Fetch and cache filter options
    cachedFilterOptions = await getFilterOptionsFromDB();
    res.json(cachedFilterOptions);
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({ error: error.message });
  }
};
