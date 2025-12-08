# Visual Guide - Retail Sales Management System

## 🎯 What You're Building

```
┌─────────────────────────────────────────────────────────────┐
│                    RETAIL SALES DASHBOARD                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  [Search: Customer name or phone...]        [Sort: Date ▼]  │
│                                                               │
├──────────────┬──────────────────────────────────────────────┤
│              │                                               │
│  FILTERS     │           SALES TABLE                        │
│              │                                               │
│  ☐ North     │  Date | Customer | Phone | Product | ...    │
│  ☐ South     │  ─────┼──────────┼───────┼─────────┼────    │
│  ☐ East      │  1/15 | John Doe | +123  | Laptop  | ...    │
│  ☐ West      │  1/16 | Jane S.  | +456  | Phone   | ...    │
│              │  1/17 | Bob M.   | +789  | Tablet  | ...    │
│  ☐ Male      │  ...  | ...      | ...   | ...     | ...    │
│  ☐ Female    │                                               │
│              │                                               │
│  Age Range   │                                               │
│  [25] - [50] │                                               │
│              │                                               │
│  [Clear All] │  ← Previous | Page 1 of 10 | Next →         │
│              │                                               │
└──────────────┴──────────────────────────────────────────────┘
```

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         BROWSER                              │
│                    (User Interface)                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP Requests
                         │
        ┌────────────────┴────────────────┐
        │                                  │
        ▼                                  ▼
┌──────────────┐                  ┌──────────────┐
│   FRONTEND   │                  │   BACKEND    │
│              │                  │              │
│  React App   │◄────────────────►│  Express API │
│  Port 3000   │   JSON Data      │  Port 5000   │
│              │                  │              │
│  Components: │                  │  Endpoints:  │
│  - SearchBar │                  │  - /sales    │
│  - Filters   │                  │  - /filters  │
│  - Table     │                  │              │
│  - Pagination│                  │  Services:   │
│              │                  │  - Filter    │
│              │                  │  - Sort      │
│              │                  │  - Paginate  │
└──────────────┘                  └──────┬───────┘
                                         │
                                         │ Reads
                                         ▼
                                  ┌──────────────┐
                                  │  CSV FILE    │
                                  │ sales_data   │
                                  │ (In Memory)  │
                                  └──────────────┘
```

## 📊 Data Flow

### User Action → Result

```
1. USER TYPES "John" IN SEARCH
   │
   ├─ Frontend: Update search state
   ├─ Hook: Debounce 300ms
   ├─ API: GET /api/sales?search=John
   ├─ Backend: Filter data
   └─ Frontend: Display results
   
2. USER SELECTS "North" FILTER
   │
   ├─ Frontend: Update filters state
   ├─ API: GET /api/sales?regions=North
   ├─ Backend: Filter by region
   └─ Frontend: Display filtered results
   
3. USER CLICKS "Sort by Quantity"
   │
   ├─ Frontend: Update sort state
   ├─ API: GET /api/sales?sortBy=quantity&sortOrder=desc
   ├─ Backend: Sort data
   └─ Frontend: Display sorted results
   
4. USER CLICKS "Next Page"
   │
   ├─ Frontend: Update page state
   ├─ API: GET /api/sales?page=2
   ├─ Backend: Return page 2 data
   └─ Frontend: Display page 2
```

## 🔄 Component Hierarchy

```
App.jsx (Root)
│
├─ SearchBar
│  └─ Input field
│
├─ SortDropdown
│  └─ Select dropdown
│
├─ FilterPanel
│  ├─ Region checkboxes
│  ├─ Gender checkboxes
│  ├─ Age range inputs
│  ├─ Category checkboxes
│  ├─ Tags checkboxes
│  ├─ Payment checkboxes
│  ├─ Date range inputs
│  └─ Clear button
│
├─ SalesTable
│  ├─ Table header
│  └─ Table rows (10 items)
│
└─ Pagination
   ├─ Previous button
   ├─ Page info
   └─ Next button
```

## 🎨 UI Layout

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                      │
│  Retail Sales Management                                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  CONTROLS                                                    │
│  ┌──────────────────────────────────┐  ┌─────────────────┐ │
│  │ Search...                        │  │ Sort: Date ▼    │ │
│  └──────────────────────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────┘

┌──────────────┬──────────────────────────────────────────────┐
│              │                                               │
│  FILTERS     │  MAIN CONTENT                                │
│  (Sidebar)   │  (Table + Pagination)                        │
│              │                                               │
│  280px wide  │  Flexible width                              │
│              │                                               │
└──────────────┴──────────────────────────────────────────────┘
```

## 📁 Folder Structure Visual

```
retail-sales-management/
│
├─ 📄 Documentation (Root)
│  ├─ README.md ⭐ (Main docs)
│  ├─ START_HERE.md ⭐ (Start here!)
│  ├─ QUICKSTART.md
│  ├─ DEPLOYMENT.md
│  └─ ...
│
├─ 📁 backend/
│  ├─ 📁 src/
│  │  ├─ 📁 controllers/ → Handle requests
│  │  ├─ 📁 services/ → Business logic
│  │  ├─ 📁 routes/ → API endpoints
│  │  └─ 📄 index.js → Entry point
│  │
│  └─ 📁 data/
│     └─ 📄 sales_data.csv ⚠️ (Download needed)
│
├─ 📁 frontend/
│  └─ 📁 src/
│     ├─ 📁 components/ → UI pieces
│     ├─ 📁 services/ → API calls
│     ├─ 📁 hooks/ → Custom hooks
│     ├─ 📁 styles/ → CSS
│     └─ 📄 App.jsx → Main component
│
└─ 📁 docs/
   ├─ architecture.md ⭐ (Required)
   ├─ data-structure.md
   └─ ...
```

## 🚀 Setup Flow

```
Step 1: Download CSV
   │
   ▼
Step 2: Install Dependencies
   │
   ├─ npm run install:all
   │
   ▼
Step 3: Start Backend
   │
   ├─ cd backend
   ├─ npm run dev
   │
   ▼
Step 4: Start Frontend
   │
   ├─ cd frontend
   ├─ npm run dev
   │
   ▼
Step 5: Open Browser
   │
   └─ http://localhost:3000
```

## 🔍 Feature Demonstration

### Search Feature
```
Input: "John"
   ↓
Debounce (300ms)
   ↓
API Call: ?search=John
   ↓
Backend: Filter by name/phone
   ↓
Result: All records with "John"
```

### Filter Feature
```
Select: ☑ North, ☑ Male
   ↓
API Call: ?regions=North&genders=Male
   ↓
Backend: Filter by both
   ↓
Result: North region + Male customers
```

### Sort Feature
```
Select: "Quantity (High to Low)"
   ↓
API Call: ?sortBy=quantity&sortOrder=desc
   ↓
Backend: Sort by quantity descending
   ↓
Result: Highest quantity first
```

### Pagination Feature
```
Click: "Next"
   ↓
API Call: ?page=2
   ↓
Backend: Return records 11-20
   ↓
Result: Page 2 data
```

## 📊 State Management

```
App.jsx State:
┌─────────────────────────────────────┐
│ search: ""                          │
│ filters: {                          │
│   regions: [],                      │
│   genders: [],                      │
│   ageMin: "",                       │
│   ageMax: "",                       │
│   categories: [],                   │
│   tags: [],                         │
│   paymentMethods: [],               │
│   dateFrom: "",                     │
│   dateTo: ""                        │
│ }                                   │
│ sortBy: "date"                      │
│ sortOrder: "desc"                   │
│ page: 1                             │
│ sales: []                           │
│ pagination: {}                      │
└─────────────────────────────────────┘
```

## 🎯 API Endpoints Visual

```
Backend API (Port 5000)
│
├─ GET /api/sales
│  │
│  ├─ Query: ?search=...
│  ├─ Query: ?regions=...
│  ├─ Query: ?sortBy=...
│  ├─ Query: ?page=...
│  │
│  └─ Returns: { data: [...], pagination: {...} }
│
└─ GET /api/sales/filters
   │
   └─ Returns: { regions: [...], genders: [...], ... }
```

## 📦 Deployment Flow

```
Local Development
   │
   ├─ Test all features
   │
   ▼
Create GitHub Repo
   │
   ├─ git init
   ├─ git add .
   ├─ git commit
   ├─ git push
   │
   ▼
Deploy Backend (Render)
   │
   ├─ Connect GitHub
   ├─ Set environment
   ├─ Deploy
   │
   ▼
Deploy Frontend (Vercel)
   │
   ├─ Connect GitHub
   ├─ Set API URL
   ├─ Deploy
   │
   ▼
Test Live Application
   │
   └─ Submit URLs
```

## ✅ Success Checklist

```
□ CSV file downloaded
□ Dependencies installed
□ Backend running (port 5000)
□ Frontend running (port 3000)
□ Search works
□ Filters work
□ Sorting works
□ Pagination works
□ No console errors
□ Code pushed to GitHub
□ Backend deployed
□ Frontend deployed
□ Live app tested
□ Ready to submit!
```

## 🎉 You're All Set!

Follow START_HERE.md to begin!
