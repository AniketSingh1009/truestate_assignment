import pool from '../config/database.js';

const createTables = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS sales (
      id SERIAL PRIMARY KEY,
      customer_id VARCHAR(50),
      customer_name VARCHAR(255),
      phone_number VARCHAR(50),
      gender VARCHAR(20),
      age INTEGER,
      customer_region VARCHAR(100),
      customer_type VARCHAR(50),
      product_id VARCHAR(50),
      product_name VARCHAR(255),
      brand VARCHAR(100),
      product_category VARCHAR(100),
      tags TEXT,
      quantity INTEGER,
      price_per_unit DECIMAL(10, 2),
      discount_percentage DECIMAL(5, 2),
      total_amount DECIMAL(10, 2),
      final_amount DECIMAL(10, 2),
      date DATE,
      payment_method VARCHAR(50),
      order_status VARCHAR(50),
      delivery_type VARCHAR(50),
      store_id VARCHAR(50),
      store_location VARCHAR(255),
      salesperson_id VARCHAR(50),
      employee_name VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_customer_name ON sales(customer_name);
    CREATE INDEX IF NOT EXISTS idx_phone_number ON sales(phone_number);
    CREATE INDEX IF NOT EXISTS idx_customer_region ON sales(customer_region);
    CREATE INDEX IF NOT EXISTS idx_gender ON sales(gender);
    CREATE INDEX IF NOT EXISTS idx_product_category ON sales(product_category);
    CREATE INDEX IF NOT EXISTS idx_payment_method ON sales(payment_method);
    CREATE INDEX IF NOT EXISTS idx_date ON sales(date);
  `;

  try {
    console.log('Creating tables...');
    await pool.query(createTableQuery);
    console.log('✓ Tables created successfully');
  } catch (error) {
    console.error('✗ Error creating tables:', error);
    throw error;
  }
};

const runMigration = async () => {
  try {
    await createTables();
    console.log('✓ Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('✗ Migration failed:', error);
    process.exit(1);
  }
};

runMigration();
