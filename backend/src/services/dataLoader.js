import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csvParser from 'csv-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadSalesData = () => {
  console.log('Loading sales data...');
  const startTime = Date.now();
  
  return new Promise((resolve, reject) => {
    const results = [];
    const csvPath = path.join(__dirname, '../../data/sales_data.csv');

    if (!fs.existsSync(csvPath)) {
      console.warn('⚠ CSV file not found. Using empty dataset.');
      resolve([]);
      return;
    }

    const stream = fs.createReadStream(csvPath, { highWaterMark: 64 * 1024 });
    
    stream
      .pipe(csvParser())
      .on('data', (row) => {
        results.push({
          customerId: row['Customer ID'],
          customerName: row['Customer Name'],
          phoneNumber: row['Phone Number'],
          gender: row['Gender'],
          age: parseInt(row['Age']) || 0,
          customerRegion: row['Customer Region'],
          customerType: row['Customer Type'],
          productId: row['Product ID'],
          productName: row['Product Name'],
          brand: row['Brand'],
          productCategory: row['Product Category'],
          tags: row['Tags'],
          quantity: parseInt(row['Quantity']) || 0,
          pricePerUnit: parseFloat(row['Price per Unit']) || 0,
          discountPercentage: parseFloat(row['Discount Percentage']) || 0,
          totalAmount: parseFloat(row['Total Amount']) || 0,
          finalAmount: parseFloat(row['Final Amount']) || 0,
          date: row['Date'],
          paymentMethod: row['Payment Method'],
          orderStatus: row['Order Status'],
          deliveryType: row['Delivery Type'],
          storeId: row['Store ID'],
          storeLocation: row['Store Location'],
          salespersonId: row['Salesperson ID'],
          employeeName: row['Employee Name']
        });
      })
      .on('end', () => {
        const duration = Date.now() - startTime;
        console.log(`✓ Loaded ${results.length} records in ${duration}ms`);
        resolve(results);
      })
      .on('error', (error) => {
        console.error('✗ Error loading CSV:', error);
        reject(error);
      });
  });
};
