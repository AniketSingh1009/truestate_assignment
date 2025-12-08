# Data Flow Documentation

## Application Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         USER                                 │
│                    (Web Browser)                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  App.jsx (State Management)                          │  │
│  │  - search, filters, sortBy, sortOrder, page          │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│  ┌──────────────────────┼────────────────────────────────┐ │
│  │  Components          │                                 │ │
│  │  ├─ SearchBar        │                                 │ │
│  │  ├─ FilterPanel      │                                 │ │
│  │  ├─ SortDropdown     │                                 │ │
│  │  ├─ SalesTable       │                                 │ │
│  │  └─ Pagination       │                                 │ │
│  └──────────────────────┼────────────────────────────────┘ │
│                         │                                    │
│  ┌──────────────────────▼────────────────────────────────┐ │
│  │  services/api.js                                       │ │
│  │  - fetchSales(params)                                  │ │
│  │  - fetchFilterOptions()                                │ │
│  └──────────────────────┬────────────────────────────────┘ │
└─────────────────────────┼────────────────────────────────────┘
                          │
                          │ HTTP Request
                          │ GET /api/sales?search=...&filters=...
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Express)                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  routes/sales.js                                      │  │
│  │  - GET /api/sales                                     │  │
│  │  - GET /api/sales/filters                            │  │
│  └──────────────────────┬───────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  controllers/salesController.js                       │  │
│  │  - getSales(req, res)                                 │  │
│  │  - getFilterOptions(req, res)                         │  │
│  │  - Parse query parameters                             │  │
│  └──────────────────────┬───────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  services/salesService.js                             │  │
│  │  1. filterSales(data, filters)                        │  │
│  │  2. sortSales(filtered, sortBy, sortOrder)            │  │
│  │  3. paginateSales(sorted, page, pageSize)             │  │
│  └──────────────────────┬───────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  In-Memory Data (from CSV)                            │  │
│  │  Loaded by: services/dataLoader.js                    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Request Flow Example

### Scenario: User searches for "John" and filters by "North" region

```
1. USER INTERACTION
   ├─ User types "John" in SearchBar
   └─ User selects "North" in FilterPanel

2. FRONTEND STATE UPDATE
   ├─ search = "John"
   ├─ filters.regions = ["North"]
   └─ page = 1 (reset)

3. DEBOUNCING (300ms)
   └─ useDebounce hook delays API call

4. API CALL
   GET /api/sales?search=John&regions=North&page=1&pageSize=10&sortBy=date&sortOrder=desc

5. BACKEND PROCESSING
   ├─ Route: /api/sales → salesController.getSales()
   ├─ Parse params: { search: "John", regions: ["North"], ... }
   ├─ Filter: Keep only records matching "John" AND "North"
   ├─ Sort: By date descending
   └─ Paginate: Return first 10 records

6. RESPONSE
   {
     "data": [...10 records...],
     "pagination": {
       "page": 1,
       "pageSize": 10,
       "total": 45,
       "totalPages": 5
     }
   }

7. FRONTEND UPDATE
   ├─ Update sales state with data
   ├─ Update pagination state
   └─ Re-render SalesTable and Pagination
```

## State Management Flow

### Frontend State (App.jsx)

```javascript
State Variables:
├─ sales: []              // Current page data
├─ filterOptions: {}      // Available filter values
├─ loading: false         // Loading indicator
├─ pagination: {}         // Page info
├─ search: ""             // Search term
├─ filters: {             // Active filters
│   ├─ regions: []
│   ├─ genders: []
│   ├─ ageMin: ""
│   ├─ ageMax: ""
│   ├─ categories: []
│   ├─ tags: []
│   ├─ paymentMethods: []
│   ├─ dateFrom: ""
│   └─ dateTo: ""
│  }
├─ sortBy: "date"         // Sort field
├─ sortOrder: "desc"      // Sort direction
└─ page: 1                // Current page

Effects:
├─ useEffect(() => loadFilterOptions(), [])
└─ useEffect(() => loadSales(), [debouncedSearch, filters, sortBy, sortOrder, page])
```

## Data Processing Pipeline

### Backend Processing Order

```
Raw CSV Data (10,000+ records)
         │
         ▼
┌─────────────────────┐
│  1. FILTER          │
│  Apply all filters  │
│  Result: ~500 recs  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  2. SORT            │
│  Order by field     │
│  Result: ~500 recs  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  3. PAGINATE        │
│  Slice page data    │
│  Result: 10 records │
└──────────┬──────────┘
           │
           ▼
    Return to Client
```

## Component Communication

### Parent-Child Data Flow

```
App.jsx (Parent)
  │
  ├─ Props to SearchBar
  │   ├─ value: search
  │   └─ onChange: handleSearchChange
  │
  ├─ Props to FilterPanel
  │   ├─ filters: filters
  │   ├─ filterOptions: filterOptions
  │   └─ onChange: handleFilterChange
  │
  ├─ Props to SortDropdown
  │   ├─ sortBy: sortBy
  │   ├─ sortOrder: sortOrder
  │   └─ onChange: handleSortChange
  │
  ├─ Props to SalesTable
  │   └─ sales: sales
  │
  └─ Props to Pagination
      ├─ page: pagination.page
      ├─ totalPages: pagination.totalPages
      ├─ total: pagination.total
      └─ onPageChange: setPage
```

## API Request/Response Flow

### Request Structure

```
GET /api/sales
Query Parameters:
  ?search=John
  &regions=North,South
  &genders=Male
  &ageMin=25
  &ageMax=50
  &categories=Electronics
  &tags=tech,portable
  &paymentMethods=Credit Card
  &dateFrom=2024-01-01
  &dateTo=2024-12-31
  &sortBy=date
  &sortOrder=desc
  &page=1
  &pageSize=10
```

### Response Structure

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
      "productName": "Laptop",
      "productCategory": "Electronics",
      "quantity": 2,
      "finalAmount": 1799.98,
      "date": "2024-01-15",
      "paymentMethod": "Credit Card",
      "orderStatus": "Completed"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

## Error Handling Flow

```
Error Occurs
     │
     ├─ Backend Error
     │   ├─ CSV not found → Return empty array
     │   ├─ Parse error → Log and continue
     │   └─ Server error → Return 500 status
     │
     └─ Frontend Error
         ├─ Network error → Show error message
         ├─ Invalid response → Log to console
         └─ Timeout → Retry or show message
```

## Performance Optimizations

### Frontend
```
User Types → Debounce (300ms) → API Call
  └─ Prevents excessive API calls
  └─ Improves performance

State Change → useEffect → Single API Call
  └─ Combines all parameters
  └─ Reduces network requests
```

### Backend
```
CSV Load → Parse Once → Store in Memory
  └─ Fast subsequent requests
  └─ No repeated file I/O

Filter → Sort → Paginate
  └─ Process in order
  └─ Return only needed data (10 records)
```

## Deployment Data Flow

```
Production Environment:

User Browser
     │
     ▼
Frontend (Vercel)
     │
     │ HTTPS Request
     │
     ▼
Backend (Render)
     │
     ▼
In-Memory Data
(CSV loaded on startup)
```
