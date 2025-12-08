# Deployment Guide

## Backend Deployment (Render/Railway/Heroku)

### Environment Variables
Set the following in your hosting platform:
```
NODE_ENV=production
PORT=5000
```

### Build Command
```bash
npm install
```

### Start Command
```bash
npm start
```

### Files to Upload
- Entire `backend/` directory
- Include `backend/data/sales_data.csv`

## Frontend Deployment (Vercel/Netlify)

### Environment Variables
```
VITE_API_URL=https://your-backend-url.com/api
```

### Build Command
```bash
npm run build
```

### Output Directory
```
dist
```

### Files to Upload
- Entire `frontend/` directory

## Deployment Platforms

### Backend Options
1. **Render** (Recommended)
   - Free tier available
   - Easy Node.js deployment
   - Automatic HTTPS

2. **Railway**
   - Simple deployment
   - Good free tier
   - Fast builds

3. **Heroku**
   - Reliable platform
   - Easy scaling
   - Add-ons available

### Frontend Options
1. **Vercel** (Recommended)
   - Optimized for Vite/React
   - Automatic deployments
   - Free tier

2. **Netlify**
   - Easy setup
   - Continuous deployment
   - Free tier

## Post-Deployment Checklist

- [ ] Backend API is accessible
- [ ] Frontend can connect to backend
- [ ] CORS is properly configured
- [ ] CSV data is loaded
- [ ] All features work (search, filter, sort, pagination)
- [ ] Error handling works
- [ ] Performance is acceptable

## Testing Deployed Application

1. Open frontend URL
2. Test search functionality
3. Apply multiple filters
4. Change sorting options
5. Navigate through pages
6. Check browser console for errors
