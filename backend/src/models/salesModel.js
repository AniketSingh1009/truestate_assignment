import pool from '../config/database.js';

export const getSalesFromDB = async (filters, sortBy, sortOrder, page, pageSize) => {
  let query = 'SELECT * FROM sales WHERE 1=1';
  const params = [];
  let paramCount = 1;

  // Search filter
  if (filters.search) {
    query += ` AND (LOWER(customer_name) LIKE $${paramCount} OR LOWER(phone_number) LIKE $${paramCount})`;
    params.push(`%${filters.search.toLowerCase()}%`);
    paramCount++;
  }

  // Region filter
  if (filters.regions && filters.regions.length > 0) {
    const regionList = Array.isArray(filters.regions) ? filters.regions : filters.regions.split(',');
    query += ` AND customer_region = ANY($${paramCount})`;
    params.push(regionList);
    paramCount++;
  }

  // Gender filter
  if (filters.genders && filters.genders.length > 0) {
    const genderList = Array.isArray(filters.genders) ? filters.genders : filters.genders.split(',');
    query += ` AND gender = ANY($${paramCount})`;
    params.push(genderList);
    paramCount++;
  }

  // Age range filter
  if (filters.ageMin !== null && filters.ageMin !== '') {
    query += ` AND age >= $${paramCount}`;
    params.push(parseInt(filters.ageMin));
    paramCount++;
  }

  if (filters.ageMax !== null && filters.ageMax !== '') {
    query += ` AND age <= $${paramCount}`;
    params.push(parseInt(filters.ageMax));
    paramCount++;
  }

  // Category filter
  if (filters.categories && filters.categories.length > 0) {
    const categoryList = Array.isArray(filters.categories) ? filters.categories : filters.categories.split(',');
    query += ` AND product_category = ANY($${paramCount})`;
    params.push(categoryList);
    paramCount++;
  }

  // Tags filter
  if (filters.tags && filters.tags.length > 0) {
    const tagList = Array.isArray(filters.tags) ? filters.tags : filters.tags.split(',');
    const tagConditions = tagList.map(() => {
      const condition = `tags ILIKE $${paramCount}`;
      paramCount++;
      return condition;
    }).join(' OR ');
    query += ` AND (${tagConditions})`;
    tagList.forEach(tag => params.push(`%${tag}%`));
  }

  // Payment method filter
  if (filters.paymentMethods && filters.paymentMethods.length > 0) {
    const methodList = Array.isArray(filters.paymentMethods) ? filters.paymentMethods : filters.paymentMethods.split(',');
    query += ` AND payment_method = ANY($${paramCount})`;
    params.push(methodList);
    paramCount++;
  }

  // Date range filter
  if (filters.dateFrom) {
    query += ` AND date >= $${paramCount}`;
    params.push(filters.dateFrom);
    paramCount++;
  }

  if (filters.dateTo) {
    query += ` AND date <= $${paramCount}`;
    params.push(filters.dateTo);
    paramCount++;
  }

  // Get total count before pagination
  const countQuery = query.replace('SELECT *', 'SELECT COUNT(*)');
  const countResult = await pool.query(countQuery, params);
  const total = parseInt(countResult.rows[0].count);

  // Sorting
  const sortColumn = sortBy === 'customerName' ? 'customer_name' : sortBy;
  query += ` ORDER BY ${sortColumn} ${sortOrder.toUpperCase()}`;

  // Pagination
  const offset = (page - 1) * pageSize;
  query += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
  params.push(pageSize, offset);

  // Execute query
  const result = await pool.query(query, params);

  return {
    data: result.rows.map(row => ({
      customerId: row.customer_id,
      customerName: row.customer_name,
      phoneNumber: row.phone_number,
      gender: row.gender,
      age: row.age,
      customerRegion: row.customer_region,
      customerType: row.customer_type,
      productId: row.product_id,
      productName: row.product_name,
      brand: row.brand,
      productCategory: row.product_category,
      tags: row.tags,
      quantity: parseInt(row.quantity) || 0,
      pricePerUnit: parseFloat(row.price_per_unit) || 0,
      discountPercentage: parseFloat(row.discount_percentage) || 0,
      totalAmount: parseFloat(row.total_amount) || 0,
      finalAmount: parseFloat(row.final_amount) || 0,
      date: row.date,
      paymentMethod: row.payment_method,
      orderStatus: row.order_status,
      deliveryType: row.delivery_type,
      storeId: row.store_id,
      storeLocation: row.store_location,
      salespersonId: row.salesperson_id,
      employeeName: row.employee_name
    })),
    total,
    totalPages: Math.ceil(total / pageSize)
  };
};

export const getFilterOptionsFromDB = async () => {
  const queries = {
    regions: 'SELECT DISTINCT customer_region FROM sales WHERE customer_region IS NOT NULL ORDER BY customer_region',
    genders: 'SELECT DISTINCT gender FROM sales WHERE gender IS NOT NULL ORDER BY gender',
    categories: 'SELECT DISTINCT product_category FROM sales WHERE product_category IS NOT NULL ORDER BY product_category',
    paymentMethods: 'SELECT DISTINCT payment_method FROM sales WHERE payment_method IS NOT NULL ORDER BY payment_method'
  };

  const [regions, genders, categories, paymentMethods] = await Promise.all([
    pool.query(queries.regions),
    pool.query(queries.genders),
    pool.query(queries.categories),
    pool.query(queries.paymentMethods)
  ]);

  // Get unique tags
  const tagsResult = await pool.query('SELECT DISTINCT tags FROM sales WHERE tags IS NOT NULL');
  const allTags = tagsResult.rows.flatMap(row => 
    row.tags ? row.tags.split(',').map(t => t.trim()) : []
  );
  const uniqueTags = [...new Set(allTags)].filter(Boolean).sort();

  return {
    regions: regions.rows.map(r => r.customer_region),
    genders: genders.rows.map(r => r.gender),
    categories: categories.rows.map(r => r.product_category),
    tags: uniqueTags,
    paymentMethods: paymentMethods.rows.map(r => r.payment_method)
  };
};
