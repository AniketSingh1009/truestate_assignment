# Retail Sales Management System

A full-stack application for managing and analyzing retail sales data with advanced search, filtering, sorting, and pagination capabilities.

## Tech Stack

**Frontend:** React 18, Vite, Axios, CSS3  
**Backend:** Node.js, Express, CSV Parser  
**Architecture:** REST API, Component-based UI

## Search Implementation Summary

Full-text search across customer name and phone number fields. Implemented with case-insensitive matching on the backend. Frontend uses debouncing (300ms) to optimize API calls and reduce server load. Search works seamlessly with active filters and sorting.

## Filter Implementation Summary

Multi-select filtering implemented with checkbox dropdowns for categorical fields (region, gender, category, tags, payment method) and range-based dropdowns for age and dates. Users can select multiple values per filter. Filters use AND logic between different types and OR logic within the same type (e.g., North OR South). All filters work independently or in combination. State is preserved across pagination, search, and sorting. Backend efficiently processes comma-separated multi-select values.

## Sorting Implementation Summary

Three sort options: Date (newest/oldest), Quantity (high/low), and Customer Name (A-Z/Z-A). Sorting is handled server-side and maintains active search and filter states. Page resets to 1 when sort changes to ensure consistent UX.

## Pagination Implementation Summary

Server-side pagination with 10 items per page. Includes Next/Previous navigation with disabled states at boundaries. Displays current page, total pages, and record count. Preserves all search, filter, and sort parameters across page changes.

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm installed
- CSV data file from provided link

### Backend Setup
```bash
cd backend
npm install
mkdir data
# Place sales_data.csv in backend/data/
npm run dev
```
Backend runs on http://localhost:5000

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on http://localhost:3000

### Environment Variables
Create `frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### Production Build
```bash
cd frontend
npm run build
```

## Project Structure
```
root/
├── backend/          # Express API server
├── frontend/         # React application
├── docs/             # Architecture documentation
└── README.md         # This file
```

## API Endpoints

**GET /api/sales** - Fetch paginated sales data  
**GET /api/sales/filters** - Get available filter options

## Features

- Real-time search with debouncing
- Multi-select filters with clear all
- Dynamic sorting with multiple options
- Pagination with state preservation
- Responsive table design
- Error handling and loading states
