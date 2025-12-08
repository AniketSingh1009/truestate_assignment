# Architecture Document

## Backend Architecture

### Overview
The backend is built with Node.js and Express, following a layered architecture pattern with clear separation of concerns.

### Structure
```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── routes/          # API route definitions
│   ├── models/          # Data models (if needed)
│   └── utils/           # Helper functions
```

### Components

#### Controllers (`salesController.js`)
- Handle HTTP requests and responses
- Parse query parameters
- Delegate business logic to services
- Return formatted responses

#### Services
- `dataLoader.js`: Loads and parses CSV data into memory
- `salesService.js`: Contains core business logic for filtering, sorting, and pagination

#### Routes (`sales.js`)
- Define API endpoints
- Map routes to controller methods

### Data Flow
1. Client sends request → Express router
2. Router → Controller
3. Controller → Service layer (filter → sort → paginate)
4. Service → Controller → Client response

## Frontend Architecture

### Overview
React-based SPA using Vite for build tooling, following component-based architecture with hooks for state management.

### Structure
```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── services/        # API communication
│   ├── hooks/           # Custom React hooks
│   ├── styles/          # CSS files
│   └── App.jsx          # Main application component
```

### Components

#### App.jsx
- Root component managing global state
- Coordinates data fetching and state updates
- Handles search, filter, sort, and pagination state

#### SearchBar
- Controlled input for search functionality
- Triggers parent state update on change

#### FilterPanel
- Multi-select checkboxes for categorical filters
- Range inputs for age and date filters
- Clear all functionality

#### SortDropdown
- Dropdown for selecting sort field and order
- Combines field and order into single selection

#### SalesTable
- Displays paginated sales data in table format
- Responsive design

#### Pagination
- Navigation controls for pages
- Displays current page info

### Custom Hooks

#### useDebounce
- Delays search execution to reduce API calls
- 300ms delay for optimal UX

### Services

#### api.js
- Centralized API communication using axios
- Builds query parameters from state
- Handles request/response formatting

## Data Flow

### Search Flow
1. User types → SearchBar updates local state
2. useDebounce delays execution
3. Debounced value triggers useEffect
4. API call with search parameter
5. Results update table

### Filter Flow
1. User selects filter → FilterPanel updates state
2. State change triggers useEffect
3. API call with filter parameters
4. Page resets to 1
5. Results update table

### Sort Flow
1. User selects sort option → SortDropdown updates state
2. State change triggers useEffect
3. API call with sort parameters
4. Page resets to 1
5. Results update table

### Pagination Flow
1. User clicks Next/Previous → Page state updates
2. State change triggers useEffect
3. API call with new page number
4. Results update table
5. Maintains search, filter, and sort state

## Module Responsibilities

### Backend

#### salesController
- Request validation
- Parameter parsing
- Response formatting
- Error handling

#### salesService
- Filter logic: Multi-field filtering with AND logic
- Sort logic: Field-based sorting with order control
- Pagination logic: Slice data and calculate metadata

#### dataLoader
- CSV parsing
- Data transformation
- In-memory caching

### Frontend

#### App
- Global state management
- API orchestration
- Component coordination

#### Components
- Isolated UI concerns
- Prop-based communication
- Event handling

#### Services
- API abstraction
- Request formatting
- Error handling

## Design Decisions

### Backend
- In-memory data storage for fast access
- Functional approach for filter/sort/paginate
- Stateless API design
- Query parameter-based filtering

### Frontend
- Single source of truth in App component
- Debounced search for performance
- Controlled components for predictable state
- Separation of concerns (UI vs logic)

## Performance Considerations

- Debounced search reduces API calls
- In-memory data for fast filtering
- Pagination limits data transfer
- Efficient array operations in services
- Minimal re-renders with proper state management
