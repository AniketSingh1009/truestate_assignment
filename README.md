# Retail Sales Management System

## Overview

A full-stack web application for managing and analyzing retail sales data with advanced search, filtering, sorting, and pagination capabilities. Built with React and Node.js, the system provides real-time data visualization and efficient query processing through PostgreSQL database integration.

## Tech Stack

**Frontend:** React 18, Vite, Axios, CSS3  
**Backend:** Node.js, Express.js, PostgreSQL (Neon DB)  
**Database:** PostgreSQL with connection pooling

## Search Implementation Summary

Full-text search implemented across customer name and phone number fields using PostgreSQL ILIKE queries for case-insensitive matching. Search queries are debounced (300ms) on the frontend to optimize API calls. The backend uses parameterized SQL queries to prevent injection attacks while maintaining high performance. Search works seamlessly alongside active filters and sorting, with results updating in real-time.

## Filter Implementation Summary

Multi-select filtering implemented for categorical fields (Customer Region, Gender, Product Category, Tags, Payment Method) using dropdown menus with single-selection behavior. Range-based filtering for Age and Date using predefined ranges. Filters use SQL WHERE clauses with ANY operators for array matching and BETWEEN for ranges. All filters work independently and in combination using AND logic between different filter types. Filter state is preserved across pagination, search, and sorting operations.

## Sorting Implementation Summary

Three sorting options implemented: Date (newest/oldest first), Quantity (high/low), and Customer Name (A-Z/Z-A). Sorting is performed at the database level using SQL ORDER BY clauses for optimal performance. Sort state is maintained across all filter and search operations. Page resets to 1 when sort order changes to ensure consistent user experience.

## Pagination Implementation Summary

Server-side pagination with 10 items per page implemented using SQL LIMIT and OFFSET clauses. Includes numbered page navigation with ellipsis for large page counts, and Previous/Next buttons with disabled states at boundaries. Total record count and page information displayed. All search, filter, and sort parameters are preserved across page navigation through query string management.

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- PostgreSQL database (Neon DB account)

### Backend Setup
```bash
cd backend
npm install

# Create .env file with your database connection
echo "DATABASE_URL=your_postgresql_connection_string" > .env
echo "PORT=5000" >> .env

# Run database migrations
npm run migrate

# Seed database with CSV data (place sales_data.csv in backend/data/)
npm run seed

# Start backend server
npm run dev
```

Backend runs on http://localhost:5000

### Frontend Setup
```bash
cd frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start frontend development server
npm run dev
```

Frontend runs on http://localhost:3000

### Production Build
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
```

## Project Structure
```
root/
├── backend/              # Express API server
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── controllers/ # Request handlers
│   │   ├── models/      # Database queries
│   │   ├── routes/      # API routes
│   │   ├── scripts/     # Migration and seeding scripts
│   │   └── utils/       # Helper functions
│   └── package.json
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── services/    # API client
│   │   ├── hooks/       # Custom React hooks
│   │   └── styles/      # CSS files
│   └── package.json
├── docs/
│   └── architecture.md  # System architecture documentation
└── README.md           # This file
```

## API Endpoints

**GET /api/sales** - Fetch paginated sales data with filters  
**GET /api/sales/filters** - Get available filter options

## Features

- Real-time search with debouncing
- Multi-select dropdown filters
- Dynamic sorting with 6 options
- Numbered pagination with state preservation
- Summary cards showing aggregated statistics
- Responsive table design
- Loading skeleton for better UX
- Error handling and edge case management
