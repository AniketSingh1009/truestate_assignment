# Quick Start Guide

## Step 1: Download the Dataset
Download the CSV file from:
https://drive.google.com/file/d/1tzbyuxBmrBwMSXbL22r33FUMtO0V_lxb/view?usp=sharing

Save it as `backend/data/sales_data.csv`

## Step 2: Install Dependencies

### Option A: Install All at Once
```bash
npm run install:all
```

### Option B: Install Separately
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## Step 3: Start the Backend
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5000

## Step 4: Start the Frontend (in a new terminal)
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:3000

## Step 5: Open in Browser
Navigate to http://localhost:3000

## Features to Test

### Search
- Type customer name or phone number in the search bar
- Results update automatically after 300ms

### Filters
- Select multiple regions, genders, categories, etc.
- Enter age range (min/max)
- Select date range
- Click "Clear All" to reset

### Sorting
- Use dropdown to sort by:
  - Date (Newest/Oldest First)
  - Quantity (High/Low)
  - Customer Name (A-Z/Z-A)

### Pagination
- Navigate using Previous/Next buttons
- View current page and total records
- All filters and search persist across pages

## Troubleshooting

### Backend won't start
- Ensure Node.js 16+ is installed
- Check if port 5000 is available
- Verify CSV file is in `backend/data/sales_data.csv`

### Frontend won't start
- Ensure port 3000 is available
- Check `.env` file exists in frontend folder
- Verify backend is running

### No data showing
- Check browser console for errors
- Verify backend API is accessible at http://localhost:5000/api/sales
- Ensure CSV file is properly formatted
