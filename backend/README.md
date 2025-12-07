# Backend - Retail Sales Management System

## Setup

1. Install dependencies:
```bash
npm install
```

2. Place the CSV file at `backend/data/sales_data.csv`

3. Start the server:
```bash
npm run dev
```

## API Endpoints

### GET /api/sales
Returns paginated, filtered, and sorted sales data.

Query Parameters:
- `search` - Search by customer name or phone
- `regions` - Comma-separated regions
- `genders` - Comma-separated genders
- `ageMin`, `ageMax` - Age range
- `categories` - Comma-separated product categories
- `tags` - Comma-separated tags
- `paymentMethods` - Comma-separated payment methods
- `dateFrom`, `dateTo` - Date range
- `sortBy` - Field to sort by (date, quantity, customerName)
- `sortOrder` - asc or desc
- `page` - Page number
- `pageSize` - Items per page

### GET /api/sales/filters
Returns available filter options.
