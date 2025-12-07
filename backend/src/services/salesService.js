export const filterSales = (data, filters) => {
  return data.filter(sale => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const nameMatch = sale.customerName?.toLowerCase().includes(searchLower);
      const phoneMatch = sale.phoneNumber?.toLowerCase().includes(searchLower);
      if (!nameMatch && !phoneMatch) return false;
    }

    if (filters.regions && filters.regions.length > 0) {
      const regionList = Array.isArray(filters.regions) ? filters.regions : filters.regions.split(',');
      if (!regionList.includes(sale.customerRegion)) return false;
    }

    if (filters.genders && filters.genders.length > 0) {
      const genderList = Array.isArray(filters.genders) ? filters.genders : filters.genders.split(',');
      if (!genderList.includes(sale.gender)) return false;
    }

    if (filters.ageMin !== null && filters.ageMin !== '' && sale.age < filters.ageMin) {
      return false;
    }

    if (filters.ageMax !== null && filters.ageMax !== '' && sale.age > filters.ageMax) {
      return false;
    }

    if (filters.categories && filters.categories.length > 0) {
      const categoryList = Array.isArray(filters.categories) ? filters.categories : filters.categories.split(',');
      if (!categoryList.includes(sale.productCategory)) return false;
    }

    if (filters.tags && filters.tags.length > 0) {
      const filterTagList = Array.isArray(filters.tags) ? filters.tags : filters.tags.split(',');
      const saleTags = sale.tags ? sale.tags.split(',').map(t => t.trim()) : [];
      const hasTag = filterTagList.some(tag => saleTags.includes(tag));
      if (!hasTag) return false;
    }

    if (filters.paymentMethods && filters.paymentMethods.length > 0) {
      const methodList = Array.isArray(filters.paymentMethods) ? filters.paymentMethods : filters.paymentMethods.split(',');
      if (!methodList.includes(sale.paymentMethod)) return false;
    }

    if (filters.dateFrom) {
      const saleDate = new Date(sale.date);
      const fromDate = new Date(filters.dateFrom);
      if (saleDate < fromDate) return false;
    }

    if (filters.dateTo) {
      const saleDate = new Date(sale.date);
      const toDate = new Date(filters.dateTo);
      if (saleDate > toDate) return false;
    }

    return true;
  });
};

export const sortSales = (data, sortBy, sortOrder) => {
  const sorted = [...data];
  
  sorted.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'date':
        comparison = new Date(a.date) - new Date(b.date);
        break;
      case 'quantity':
        comparison = a.quantity - b.quantity;
        break;
      case 'customerName':
        comparison = (a.customerName || '').localeCompare(b.customerName || '');
        break;
      default:
        comparison = 0;
    }

    return sortOrder === 'desc' ? -comparison : comparison;
  });

  return sorted;
};

export const paginateSales = (data, page, pageSize) => {
  const total = data.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    data: data.slice(start, end),
    page,
    pageSize,
    total,
    totalPages
  };
};
