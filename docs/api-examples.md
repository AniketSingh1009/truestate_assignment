# API Examples

## Base URL
```
Local: http://localhost:5000/api
Production: https://your-backend.onrender.com/api
```

## Endpoints

### 1. Get Sales Data
`GET /api/sales`

#### Basic Request
```bash
curl "http://localhost:5000/api/sales?page=1&pageSize=10"
```

#### Response
```json
{
  "data": [
    {
      "customerId": "C001",
      "customerName": "John Doe",
      "phoneNumber": "+1234567890",
      "gender": "Male",
      "age": 35,
      "customerRegion": "North",
      "customerType": "Regular",
      "productId": "P001",
      "productName": "Laptop",
      "brand": "Dell",
      "productCategory": "Electronics",
      "tags": "tech, portable",
      "quantity": 2,
      "pricePerUnit": 999.99,
      "discountPercentage": 10,
      "totalAmount": 1999.98,
      "finalAmount": 1799.98,
      "date": "2024-01-15",
      "paymentMethod": "Credit Card",
      "orderStatus": "Completed",
      "deliveryType": "Home Delivery",
      "storeId": "S001",
      "storeLocation": "New York",
      "salespersonId": "SP001",
      "employeeName": "Jane Smith"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### 2. Get Filter Options
`GET /api/sales/filters`

#### Request
```bash
curl "http://localhost:5000/api/sales/filters"
```

#### Response
```json
{
  "regions": ["North", "South", "East", "West"],
  "genders": ["Male", "Female"],
  "categories": ["Electronics", "Clothing", "Food", "Books"],
  "tags": ["tech", "portable", "fashion", "organic", "bestseller"],
  "paymentMethods": ["Credit Card", "Cash", "Debit Card", "UPI"]
}
```

## Query Parameters

### Search
Search by customer name or phone number.

```bash
# Search by name
curl "http://localhost:5000/api/sales?search=john&page=1"

# Search by phone
curl "http://localhost:5000/api/sales?search=1234567890&page=1"

# Search with spaces (URL encoded)
curl "http://localhost:5000/api/sales?search=john%20doe&page=1"
```

### Filters

#### Single Filter
```bash
# Filter by region
curl "http://localhost:5000/api/sales?regions=North&page=1"

# Filter by gender
curl "http://localhost:5000/api/sales?genders=Male&page=1"

# Filter by category
curl "http://localhost:5000/api/sales?categories=Electronics&page=1"

# Filter by payment method
curl "http://localhost:5000/api/sales?paymentMethods=Credit%20Card&page=1"
```

#### Multiple Values (Same Filter)
```bash
# Multiple regions
curl "http://localhost:5000/api/sales?regions=North,South&page=1"

# Multiple genders
curl "http://localhost:5000/api/sales?genders=Male,Female&page=1"

# Multiple categories
curl "http://localhost:5000/api/sales?categories=Electronics,Clothing&page=1"
```

#### Age Range
```bash
# Min age only
curl "http://localhost:5000/api/sales?ageMin=25&page=1"

# Max age only
curl "http://localhost:5000/api/sales?ageMax=50&page=1"

# Age range
curl "http://localhost:5000/api/sales?ageMin=25&ageMax=50&page=1"
```

#### Date Range
```bash
# From date only
curl "http://localhost:5000/api/sales?dateFrom=2024-01-01&page=1"

# To date only
curl "http://localhost:5000/api/sales?dateTo=2024-12-31&page=1"

# Date range
curl "http://localhost:5000/api/sales?dateFrom=2024-01-01&dateTo=2024-12-31&page=1"
```

#### Tags
```bash
# Single tag
curl "http://localhost:5000/api/sales?tags=tech&page=1"

# Multiple tags
curl "http://localhost:5000/api/sales?tags=tech,portable&page=1"
```

### Sorting

```bash
# Sort by date (newest first)
curl "http://localhost:5000/api/sales?sortBy=date&sortOrder=desc&page=1"

# Sort by date (oldest first)
curl "http://localhost:5000/api/sales?sortBy=date&sortOrder=asc&page=1"

# Sort by quantity (high to low)
curl "http://localhost:5000/api/sales?sortBy=quantity&sortOrder=desc&page=1"

# Sort by quantity (low to high)
curl "http://localhost:5000/api/sales?sortBy=quantity&sortOrder=asc&page=1"

# Sort by customer name (A-Z)
curl "http://localhost:5000/api/sales?sortBy=customerName&sortOrder=asc&page=1"

# Sort by customer name (Z-A)
curl "http://localhost:5000/api/sales?sortBy=customerName&sortOrder=desc&page=1"
```

### Pagination

```bash
# First page
curl "http://localhost:5000/api/sales?page=1&pageSize=10"

# Second page
curl "http://localhost:5000/api/sales?page=2&pageSize=10"

# Custom page size
curl "http://localhost:5000/api/sales?page=1&pageSize=20"
```

## Combined Examples

### Search + Filter
```bash
curl "http://localhost:5000/api/sales?search=john&regions=North&page=1"
```

### Search + Filter + Sort
```bash
curl "http://localhost:5000/api/sales?search=john&regions=North&sortBy=date&sortOrder=desc&page=1"
```

### Multiple Filters
```bash
curl "http://localhost:5000/api/sales?regions=North,South&genders=Male&categories=Electronics&page=1"
```

### Complete Query
```bash
curl "http://localhost:5000/api/sales?search=john&regions=North&genders=Male&ageMin=25&ageMax=50&categories=Electronics&tags=tech&paymentMethods=Credit%20Card&dateFrom=2024-01-01&dateTo=2024-12-31&sortBy=date&sortOrder=desc&page=1&pageSize=10"
```

## JavaScript/Axios Examples

### Basic Fetch
```javascript
import axios from 'axios';

const fetchSales = async () => {
  const response = await axios.get('http://localhost:5000/api/sales', {
    params: {
      page: 1,
      pageSize: 10
    }
  });
  console.log(response.data);
};
```

### With Search
```javascript
const searchSales = async (searchTerm) => {
  const response = await axios.get('http://localhost:5000/api/sales', {
    params: {
      search: searchTerm,
      page: 1,
      pageSize: 10
    }
  });
  return response.data;
};
```

### With Filters
```javascript
const filterSales = async (filters) => {
  const response = await axios.get('http://localhost:5000/api/sales', {
    params: {
      regions: filters.regions.join(','),
      genders: filters.genders.join(','),
      ageMin: filters.ageMin,
      ageMax: filters.ageMax,
      page: 1,
      pageSize: 10
    }
  });
  return response.data;
};
```

### Complete Example
```javascript
const fetchSalesData = async (params) => {
  const queryParams = {
    search: params.search || '',
    regions: params.regions?.join(',') || '',
    genders: params.genders?.join(',') || '',
    ageMin: params.ageMin || '',
    ageMax: params.ageMax || '',
    categories: params.categories?.join(',') || '',
    tags: params.tags?.join(',') || '',
    paymentMethods: params.paymentMethods?.join(',') || '',
    dateFrom: params.dateFrom || '',
    dateTo: params.dateTo || '',
    sortBy: params.sortBy || 'date',
    sortOrder: params.sortOrder || 'desc',
    page: params.page || 1,
    pageSize: params.pageSize || 10
  };

  const response = await axios.get('http://localhost:5000/api/sales', {
    params: queryParams
  });

  return response.data;
};
```

## Testing with Postman

### Setup
1. Create new request
2. Method: GET
3. URL: `http://localhost:5000/api/sales`

### Add Query Parameters
| Key | Value | Description |
|-----|-------|-------------|
| search | john | Search term |
| regions | North,South | Comma-separated |
| genders | Male | Single value |
| ageMin | 25 | Number |
| ageMax | 50 | Number |
| categories | Electronics | Single value |
| tags | tech,portable | Comma-separated |
| paymentMethods | Credit Card | Single value |
| dateFrom | 2024-01-01 | Date format |
| dateTo | 2024-12-31 | Date format |
| sortBy | date | Field name |
| sortOrder | desc | asc or desc |
| page | 1 | Number |
| pageSize | 10 | Number |

### Expected Response
- Status: 200 OK
- Body: JSON with data and pagination

## Error Responses

### 500 Internal Server Error
```json
{
  "error": "Error message here"
}
```

### Common Errors
- CSV file not found
- Invalid query parameters
- Server error

## Rate Limiting
Currently no rate limiting implemented. For production, consider adding:
- Rate limiting middleware
- Request throttling
- API key authentication

## CORS
Configured to allow:
- Local development: `http://localhost:3000`, `http://localhost:5173`
- Production: Set via `FRONTEND_URL` environment variable
