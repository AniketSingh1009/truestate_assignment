# Data Structure Documentation

## Sales Record Schema

Each sales record contains the following fields:

### Customer Information
| Field | Type | Description | Example |
|-------|------|-------------|---------|
| customerId | String | Unique customer identifier | "C001" |
| customerName | String | Full name of customer | "John Doe" |
| phoneNumber | String | Contact phone number | "+1234567890" |
| gender | String | Customer gender | "Male", "Female" |
| age | Number | Customer age | 35 |
| customerRegion | String | Geographic region | "North", "South", "East", "West" |
| customerType | String | Customer classification | "Regular", "Premium" |

### Product Information
| Field | Type | Description | Example |
|-------|------|-------------|---------|
| productId | String | Unique product identifier | "P001" |
| productName | String | Name of product | "Laptop" |
| brand | String | Product brand | "Dell" |
| productCategory | String | Product category | "Electronics" |
| tags | String | Comma-separated tags | "tech, portable" |

### Sales Information
| Field | Type | Description | Example |
|-------|------|-------------|---------|
| quantity | Number | Number of units sold | 2 |
| pricePerUnit | Number | Price per single unit | 999.99 |
| discountPercentage | Number | Discount applied (%) | 10 |
| totalAmount | Number | Amount before discount | 1999.98 |
| finalAmount | Number | Amount after discount | 1799.98 |

### Operational Information
| Field | Type | Description | Example |
|-------|------|-------------|---------|
| date | String | Transaction date | "2024-01-15" |
| paymentMethod | String | Payment type | "Credit Card", "Cash" |
| orderStatus | String | Current order status | "Completed", "Pending" |
| deliveryType | String | Delivery method | "Home Delivery", "Pickup" |
| storeId | String | Store identifier | "S001" |
| storeLocation | String | Store address/location | "New York" |
| salespersonId | String | Salesperson identifier | "SP001" |
| employeeName | String | Salesperson name | "Jane Smith" |

## API Response Structure

### Sales List Response
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

### Filter Options Response
```json
{
  "regions": ["North", "South", "East", "West"],
  "genders": ["Male", "Female"],
  "categories": ["Electronics", "Clothing", "Food"],
  "tags": ["tech", "portable", "fashion", "organic"],
  "paymentMethods": ["Credit Card", "Cash", "Debit Card"]
}
```

## Query Parameters

### Search
- `search` (string): Search term for customer name or phone

### Filters
- `regions` (string): Comma-separated regions
- `genders` (string): Comma-separated genders
- `ageMin` (number): Minimum age
- `ageMax` (number): Maximum age
- `categories` (string): Comma-separated categories
- `tags` (string): Comma-separated tags
- `paymentMethods` (string): Comma-separated payment methods
- `dateFrom` (string): Start date (YYYY-MM-DD)
- `dateTo` (string): End date (YYYY-MM-DD)

### Sorting
- `sortBy` (string): Field to sort by (date, quantity, customerName)
- `sortOrder` (string): Sort direction (asc, desc)

### Pagination
- `page` (number): Page number (default: 1)
- `pageSize` (number): Items per page (default: 10)
