# Important Notes

## Before You Start

### 1. Download the Dataset
**CRITICAL**: You must download the CSV file before running the application.

Download from: https://drive.google.com/file/d/1tzbyuxBmrBwMSXbL22r33FUMtO0V_lxb/view?usp=sharing

Save as: `backend/data/sales_data.csv`

Without this file, the backend will start but return empty results.

### 2. Node.js Version
Ensure you have Node.js 16 or higher installed:
```bash
node --version
```

### 3. Port Availability
- Backend uses port 5000
- Frontend uses port 3000
- Ensure these ports are not in use

## Quick Start Commands

```bash
# Install all dependencies
npm run install:all

# Start backend (Terminal 1)
cd backend
npm run dev

# Start frontend (Terminal 2)
cd frontend
npm run dev
```

## Key Implementation Details

### Search
- Searches: Customer Name, Phone Number
- Case-insensitive
- Debounced (300ms delay)
- Works with filters and sorting

### Filters
**Multi-select:**
- Customer Region
- Gender
- Product Category
- Tags
- Payment Method

**Range-based:**
- Age (min/max)
- Date (from/to)

### Sorting
- Date (Newest First / Oldest First)
- Quantity (High to Low / Low to High)
- Customer Name (A-Z / Z-A)

### Pagination
- 10 items per page
- Next/Previous buttons
- Shows: current page, total pages, total records
- Preserves all filters, search, and sort state

## Architecture Highlights

### Backend
- **Pattern**: Layered architecture
- **Data Storage**: In-memory (CSV loaded on startup)
- **API Style**: RESTful
- **Key Files**:
  - `salesController.js` - Request handling
  - `salesService.js` - Business logic
  - `dataLoader.js` - CSV parsing

### Frontend
- **Framework**: React 18 with Vite
- **State Management**: React hooks (useState, useEffect)
- **API Client**: Axios
- **Key Features**:
  - Debounced search
  - Multi-select filters
  - Dynamic sorting
  - Stateful pagination

## File Organization

```
Root Level:
- README.md              → Main documentation
- QUICKSTART.md          → Fast setup guide
- DEPLOYMENT.md          → Deployment instructions
- TESTING.md             → Testing checklist
- SUBMISSION_CHECKLIST.md → Pre-submission tasks

Backend:
- src/controllers/       → Request handlers
- src/services/          → Business logic
- src/routes/            → API routes
- src/utils/             → Helper functions

Frontend:
- src/components/        → React components
- src/services/          → API calls
- src/hooks/             → Custom hooks
- src/styles/            → CSS files

Documentation:
- docs/architecture.md   → System design
- docs/data-structure.md → Data schema
```

## Common Pitfalls to Avoid

1. **Forgetting CSV File**
   - Backend will start but show no data
   - Always check `backend/data/sales_data.csv` exists

2. **Wrong API URL**
   - Frontend needs correct backend URL in `.env`
   - Default: `VITE_API_URL=http://localhost:5000/api`

3. **Port Conflicts**
   - If ports are in use, change them in:
     - Backend: `backend/src/index.js` (PORT variable)
     - Frontend: `frontend/vite.config.js` (server.port)

4. **CORS Issues**
   - If deploying, update `corsConfig.js` with production URLs
   - Set `FRONTEND_URL` environment variable in production

5. **Build Errors**
   - Always test `npm run build` locally before deploying
   - Check for syntax errors with `npm run dev` first

## Testing the Application

### Basic Flow
1. Open http://localhost:3000
2. Type in search bar → Results filter in real-time
3. Select filters → Results update immediately
4. Change sort → Results reorder
5. Click Next → Move to page 2 (filters persist)

### Edge Cases to Test
- Search with no results
- Apply conflicting filters
- Invalid age range (min > max)
- Navigate to last page
- Clear all filters

## Deployment Checklist

### Backend (Render/Railway)
- [ ] Upload CSV file or include in repo
- [ ] Set NODE_ENV=production
- [ ] Test API endpoint after deployment

### Frontend (Vercel/Netlify)
- [ ] Set VITE_API_URL to deployed backend
- [ ] Test build locally first
- [ ] Verify CORS settings allow frontend domain

## Performance Notes

- **Initial Load**: CSV parsing happens once on backend startup
- **Search**: Debounced to reduce API calls
- **Filters**: Processed server-side for accuracy
- **Pagination**: Only 10 records sent per request

## Support Files

All documentation is self-contained in this repository:
- Setup instructions in README.md
- Architecture details in docs/architecture.md
- Testing guide in TESTING.md
- Deployment guide in DEPLOYMENT.md

## Ready to Start?

1. Download CSV file
2. Run `npm run install:all`
3. Start backend and frontend
4. Open http://localhost:3000
5. Test all features
6. Follow DEPLOYMENT.md for production

## Questions?

Check these files:
- Setup issues → QUICKSTART.md
- Architecture questions → docs/architecture.md
- Testing → TESTING.md
- Deployment → DEPLOYMENT.md
- Submission → SUBMISSION_CHECKLIST.md
