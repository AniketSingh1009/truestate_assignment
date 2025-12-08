# Testing Guide

## Manual Testing Checklist

### Search Functionality
- [ ] Search by customer name (case-insensitive)
- [ ] Search by phone number
- [ ] Search with partial matches
- [ ] Search with no results
- [ ] Search persists with filters
- [ ] Search persists with sorting
- [ ] Debouncing works (300ms delay)

### Filter Functionality

#### Single Filters
- [ ] Filter by customer region
- [ ] Filter by gender
- [ ] Filter by age range (min only)
- [ ] Filter by age range (max only)
- [ ] Filter by age range (min and max)
- [ ] Filter by product category
- [ ] Filter by tags
- [ ] Filter by payment method
- [ ] Filter by date range

#### Multiple Filters
- [ ] Combine region + gender
- [ ] Combine category + payment method
- [ ] Combine age range + date range
- [ ] Apply all filters simultaneously
- [ ] Clear all filters

#### Edge Cases
- [ ] Invalid age range (min > max)
- [ ] Future dates
- [ ] No results with filters
- [ ] Conflicting filters

### Sorting Functionality
- [ ] Sort by date (newest first)
- [ ] Sort by date (oldest first)
- [ ] Sort by quantity (high to low)
- [ ] Sort by quantity (low to high)
- [ ] Sort by customer name (A-Z)
- [ ] Sort by customer name (Z-A)
- [ ] Sorting with active search
- [ ] Sorting with active filters
- [ ] Page resets to 1 on sort change

### Pagination Functionality
- [ ] Navigate to next page
- [ ] Navigate to previous page
- [ ] Previous disabled on page 1
- [ ] Next disabled on last page
- [ ] Page info displays correctly
- [ ] Total records count accurate
- [ ] Pagination with search
- [ ] Pagination with filters
- [ ] Pagination with sorting

### Combined Scenarios
- [ ] Search + Filter + Sort + Paginate
- [ ] Change search while on page 2
- [ ] Change filter while on page 3
- [ ] Change sort while on page 2
- [ ] Clear filters while on page 2

### UI/UX Testing
- [ ] Loading state displays
- [ ] No results message displays
- [ ] Table is responsive
- [ ] Filters are scrollable
- [ ] All buttons are clickable
- [ ] Inputs accept valid data
- [ ] Clear all button works

### Performance Testing
- [ ] Initial load time < 2s
- [ ] Search response < 500ms
- [ ] Filter response < 500ms
- [ ] Sort response < 500ms
- [ ] Page change < 500ms
- [ ] No memory leaks
- [ ] Smooth scrolling

### Error Handling
- [ ] Backend offline
- [ ] Invalid API response
- [ ] Network timeout
- [ ] Missing CSV file
- [ ] Malformed CSV data

## API Testing

### Using curl

#### Get Sales Data
```bash
curl "http://localhost:5000/api/sales?page=1&pageSize=10"
```

#### Search
```bash
curl "http://localhost:5000/api/sales?search=john&page=1"
```

#### Filter by Region
```bash
curl "http://localhost:5000/api/sales?regions=North,South&page=1"
```

#### Sort by Quantity
```bash
curl "http://localhost:5000/api/sales?sortBy=quantity&sortOrder=desc&page=1"
```

#### Get Filter Options
```bash
curl "http://localhost:5000/api/sales/filters"
```

### Using Postman/Thunder Client

1. Import collection with base URL: `http://localhost:5000/api`
2. Test each endpoint with various parameters
3. Verify response structure
4. Check status codes

## Automated Testing (Future Enhancement)

### Backend Tests
- Unit tests for filter logic
- Unit tests for sort logic
- Unit tests for pagination logic
- Integration tests for API endpoints

### Frontend Tests
- Component unit tests
- Hook tests (useDebounce)
- Integration tests for user flows
- E2E tests with Cypress/Playwright
