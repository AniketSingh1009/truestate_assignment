# Architecture Document

## Backend Architecture

### Overview
The backend follows a layered MVC architecture with clear separation of concerns. Built with Node.js and Express, it uses PostgreSQL for data persistence and provides RESTful API endpoints.

### Structure
```
backend/src/
├── config/          # Database connection configuration
├── controllers/     # HTTP request handlers
├── models/          # Database query logic
├── routes/          # API route definitions
├── scripts/         # Database migration and seeding
└── utils/           # Helper functions (CORS config)
```

### Components

#### Database Layer (`config/database.js`)
- PostgreSQL connection pool using `pg` library
- SSL-enabled connection to Neon DB
- Connection error handling and logging
- Automatic reconnection on failure

#### Models Layer (`models/salesModel.js`)
- `getSalesFromDB()`: Executes parameterized SQL queries with filters, sorting, and pagination
- `getFilterOptionsFromDB()`: Retrieves distinct values for filter dropdowns
- Uses prepared statements to prevent SQL injection
- Implements efficient indexing strategy

#### Controllers Layer (`controllers/salesController.js`)
- `getSales()`: Parses request parameters, calls model, formats response
- `getFilterOptions()`: Returns cached filter options for performance
- Input validation and error handling
- Response formatting with pagination metadata

#### Routes Layer (`routes/sales.js`)
- Maps HTTP endpoints to controller methods
- RESTful route structure
- Middleware integration

#### Scripts
- `migrate.js`: Creates database tables and indexes
- `seedDatabase.js`: Imports CSV data in batches

### Data Flow
```
Client Request
    ↓
Express Router
    ↓
Controller (parse params)
    ↓
Model (SQL query with filters/sort/pagination)
    ↓
PostgreSQL Database
    ↓
Model (format results)
    ↓
Controller (add metadata)
    ↓
JSON Response
```

### Database Schema

#### Sales Table
- 25 columns covering customer, product, sales, and operational data
- Indexes on: customer_name, phone_number, customer_region, gender, product_category, payment_method, date
- SERIAL primary key for unique identification
- Appropriate data types (VARCHAR, INTEGER, DECIMAL, DATE)

### Key Design Decisions

1. **Database-First Approach**: All filtering, sorting, and pagination at database level for performance
2. **Parameterized Queries**: Prevents SQL injection, enables query plan caching
3. **Connection Pooling**: Handles concurrent requests efficiently
4. **Filter Caching**: Filter options cached in memory after first request
5. **Batch Insertion**: CSV data imported in batches of 100 for speed

## Frontend Architecture

### Overview
React-based single-page application using functional components and hooks for state management. Built with Vite for fast development and optimized production builds.

### Structure
```
frontend/src/
├── components/      # Reusable UI components
├── services/        # API communication layer
├── hooks/           # Custom React hooks
├── styles/          # CSS stylesheets
└── App.jsx          # Root component
```

### Components

#### App.jsx (Root Component)
- Global state management using useState
- Coordinates data fetching and updates
- Manages search, filter, sort, and pagination state
- Implements loading states and error handling

#### SearchBar
- Controlled input component
- Triggers parent state update on change
- Placeholder text for user guidance

#### FilterBar
- Multi-select dropdown components for categorical filters
- Single-select dropdowns for range filters
- Click-outside detection to close dropdowns
- Visual feedback for selected items

#### SummaryCards
- Displays aggregated statistics (total units, amount, discount)
- Real-time calculation from current page data
- Currency formatting for Indian Rupee

#### SalesTable
- Renders paginated data in table format
- Displays all 25 data fields
- Responsive horizontal scrolling
- Currency formatting

#### Pagination
- Numbered page navigation with ellipsis
- Previous/Next buttons with disabled states
- Page information display

#### LoadingSkeleton
- Animated placeholder during initial load
- Improves perceived performance
- Matches actual content structure

### Custom Hooks

#### useDebounce
- Delays search execution by 300ms
- Reduces unnecessary API calls
- Improves performance and user experience

### Services

#### api.js
- Centralized API client using Axios
- Base URL configuration from environment
- Query parameter building
- Error handling

### State Management

#### Global State (App.jsx)
```javascript
{
  sales: [],              // Current page data
  filterOptions: {},      // Available filter values
  loading: boolean,       // Loading indicator
  initialLoad: boolean,   // First load flag
  pagination: {},         // Page metadata
  search: string,         // Search term
  filters: {              // Active filters
    regions, genders, ageMin, ageMax,
    categories, tags, paymentMethods,
    dateFrom, dateTo
  },
  sortBy: string,         // Sort field
  sortOrder: string,      // Sort direction
  page: number            // Current page
}
```

### Data Flow

```
User Interaction
    ↓
Component Event Handler
    ↓
State Update (useState)
    ↓
useEffect Trigger
    ↓
API Call (services/api.js)
    ↓
Backend Response
    ↓
State Update
    ↓
Component Re-render
```

### Key Design Decisions

1. **Debounced Search**: Prevents excessive API calls during typing
2. **Parallel Loading**: Filter options and initial data load simultaneously
3. **Loading Skeleton**: Better perceived performance than blank screen
4. **Single-Select Filters**: Simplified UX, easier to understand
5. **State Preservation**: All filters/search/sort maintained across pagination

## Data Flow

### Complete Request Flow

1. **User Action**: Types search, selects filter, changes sort, or navigates pages
2. **State Update**: React updates relevant state variable
3. **Effect Trigger**: useEffect detects state change
4. **API Request**: Axios sends GET request with query parameters
5. **Backend Processing**:
   - Controller parses parameters
   - Model builds SQL query
   - Database executes query with indexes
   - Results formatted and returned
6. **Frontend Update**: State updated with new data
7. **UI Re-render**: Components display updated information

### Query Parameter Flow

```
Frontend State → Query String → Backend Controller → SQL WHERE/ORDER/LIMIT
```

Example:
```
search=John&regions=North&sortBy=date&sortOrder=desc&page=1
    ↓
WHERE (customer_name LIKE '%john%') 
  AND customer_region = ANY('{North}')
ORDER BY date DESC
LIMIT 10 OFFSET 0
```

## Folder Structure

### Backend
- `config/`: Environment-specific configurations
- `controllers/`: Business logic and request handling
- `models/`: Data access layer
- `routes/`: API endpoint definitions
- `scripts/`: Database setup and maintenance
- `utils/`: Shared utilities

### Frontend
- `components/`: Reusable UI elements
- `services/`: External API communication
- `hooks/`: Custom React hooks
- `styles/`: CSS stylesheets
- `public/`: Static assets

## Module Responsibilities

### Backend Modules

#### salesController
- Request validation
- Parameter parsing and type conversion
- Response formatting with pagination metadata
- Error handling and logging

#### salesModel
- SQL query construction with parameterized inputs
- Database connection management
- Result set transformation
- Filter option extraction

#### database
- Connection pool initialization
- SSL configuration
- Error event handling
- Connection lifecycle management

### Frontend Modules

#### App
- Global state orchestration
- API call coordination
- Loading state management
- Error boundary

#### Components
- Isolated UI concerns
- Prop-based communication
- Event handling
- Local state when needed

#### Services
- API abstraction
- Request/response transformation
- Error handling
- Base URL management

## Performance Optimizations

### Backend
- Database indexes on frequently queried columns
- Connection pooling for concurrent requests
- Parameterized queries for plan caching
- Batch operations for data import
- Filter option caching

### Frontend
- Debounced search (300ms)
- Parallel data loading
- Loading skeleton for perceived performance
- Minimal re-renders with proper state management
- Code splitting with Vite

## Security Considerations

- Parameterized SQL queries prevent injection
- CORS configuration restricts origins
- Environment variables for sensitive data
- SSL-required database connections
- Input validation on backend

## Scalability

- Database indexes support large datasets
- Connection pooling handles concurrent users
- Stateless API design enables horizontal scaling
- Client-side pagination reduces data transfer
- Efficient SQL queries minimize database load
