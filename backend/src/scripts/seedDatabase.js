import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csvParser from 'csv-parser';
import pool from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedDatabase = async () => {
  const csvPath = path.join(__dirname, '../../data/sales_data.csv');

  if (!fs.existsSync(csvPath)) {
    console.error('✗ CSV file not found at:', csvPath);
    process.exit(1);
  }

  console.log('Starting database seeding...');
  console.log('Reading CSV file:', csvPath);

  const records = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csvParser())
      .on('data', (row) => {
        records.push(row);
      })
      .on('end', async () => {
        console.log(`✓ Read ${records.length} records from CSV`);
        
        try {
          // Clear existing data
          console.log('Clearing existing data...');
          await pool.query('TRUNCATE TABLE sales RESTART IDENTITY');
          
          // Insert records in batches
          const batchSize = 100;
          let inserted = 0;
          
          for (let i = 0; i < records.length; i += batchSize) {
            const batch = records.slice(i, i + batchSize);
            
            const insertQuery = `
              INSERT INTO sales (
                customer_id, customer_name, phone_number, gender, age,
                customer_region, customer_type, product_id, product_name, brand,
                product_category, tags, quantity, price_per_unit, discount_percentage,
                total_amount, final_amount, date, payment_method, order_status,
                delivery_type, store_id, store_location, salesperson_id, employee_name
              ) VALUES ${batch.map((_, idx) => {
                const offset = idx * 25;
                return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5},
                        $${offset + 6}, $${offset + 7}, $${offset + 8}, $${offset + 9}, $${offset + 10},
                        $${offset + 11}, $${offset + 12}, $${offset + 13}, $${offset + 14}, $${offset + 15},
                        $${offset + 16}, $${offset + 17}, $${offset + 18}, $${offset + 19}, $${offset + 20},
                        $${offset + 21}, $${offset + 22}, $${offset + 23}, $${offset + 24}, $${offset + 25})`;
              }).join(', ')}
            `;
            
            const values = batch.flatMap(row => [
              row['Customer ID'],
              row['Customer Name'],
              row['Phone Number'],
              row['Gender'],
              parseInt(row['Age']) || null,
              row['Customer Region'],
              row['Customer Type'],
              row['Product ID'],
              row['Product Name'],
              row['Brand'],
              row['Product Category'],
              row['Tags'],
              parseInt(row['Quantity']) || null,
              parseFloat(row['Price per Unit']) || null,
              parseFloat(row['Discount Percentage']) || null,
              parseFloat(row['Total Amount']) || null,
              parseFloat(row['Final Amount']) || null,
              row['Date'] || null,
              row['Payment Method'],
              row['Order Status'],
              row['Delivery Type'],
              row['Store ID'],
              row['Store Location'],
              row['Salesperson ID'],
              row['Employee Name']
            ]);
            
            await pool.query(insertQuery, values);
            inserted += batch.length;
            console.log(`Inserted ${inserted}/${records.length} records...`);
          }
          
          console.log(`✓ Successfully seeded ${inserted} records`);
          
          // Verify count
          const result = await pool.query('SELECT COUNT(*) FROM sales');
          console.log(`✓ Total records in database: ${result.rows[0].count}`);
          
          resolve();
        } catch (error) {
          console.error('✗ Error seeding database:', error);
          reject(error);
        }
      })
      .on('error', reject);
  });
};

const run = async () => {
  try {
    await seedDatabase();
    console.log('✓ Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('✗ Database seeding failed:', error);
    process.exit(1);
  }
};

run();
