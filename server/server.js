const express = require('express');
const axios = require('axios');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

// Use CORS to allow requests from React frontend
app.use(cors());

// MySQL database connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'store_db'
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Function to fetch and store data from API (optional)
async function fetchDataAndStore() {
  const apiURL = 'https://raw.githubusercontent.com/Bit-Code-Technologies/mockapi/main/purchase.json';
  
  try {
    const response = await axios.get(apiURL);
    const data = response.data;

    data.forEach((item) => {
      const createdAt = new Date(item.created_at).toISOString().slice(0, 19).replace('T', ' ');

      // Insert Users into the database
      const insertUserQuery = `
        INSERT INTO users (name, user_phone) 
        VALUES ('${item.name}', '${item.user_phone}')
        ON DUPLICATE KEY UPDATE id=id;
      `;

      db.query(insertUserQuery, (err) => {
        if (err) throw err;
      });

      // Insert Products into the database
      const insertProductQuery = `
        INSERT INTO products (product_code, product_name, product_price)
        VALUES ('${item.product_code}', '${item.product_name}', '${item.product_price}')
        ON DUPLICATE KEY UPDATE id=id;
      `;

      db.query(insertProductQuery, (err) => {
        if (err) throw err;
      });

      // Insert Purchase History into the database
      const insertHistoryQuery = `
        INSERT INTO purchase_history (order_no, user_id, product_id, purchase_quantity, created_at)
        VALUES (
          '${item.order_no}', 
          (SELECT id FROM users WHERE user_phone = '${item.user_phone}' LIMIT 1), 
          (SELECT id FROM products WHERE product_code = '${item.product_code}' LIMIT 1), 
          '${item.purchase_quantity}', 
          '${createdAt}'
        );
      `;

      db.query(insertHistoryQuery, (err) => {
        if (err) throw err;
      });
    });

    console.log('Data stored successfully');
  } catch (error) {
    console.error('Error fetching API data', error);
  }
}

// API to generate report
app.get('/generate-report', (req, res) => {
  
  const reportQuery = `
 SELECT 
    p.product_name AS "Product Name",
    u.name AS "Customer Name",
    SUM(ph.purchase_quantity) AS "Quantity",
    p.product_price AS "Price",
    SUM(ph.purchase_quantity * p.product_price) AS "Total"
FROM purchase_history ph
JOIN users u ON ph.user_id = u.id
JOIN products p ON ph.product_id = p.id
GROUP BY u.name, p.product_name, p.product_price
ORDER BY "Total" DESC;
`;


  db.query(reportQuery, (err, results) => {
    if (err) {
      console.error('Error querying database', err);
      res.status(500).json({ error: 'Error generating report' });
      return;
    }

    let totalQuantity = 0;
    let totalPrice = 0;
    let grossTotal = 0;

    results.forEach(row => {
      totalQuantity += row.Quantity;
      totalPrice += row.Price;
      grossTotal += row.Total;
    });

    res.json({
      data: results,
      totals: {
        quantity: totalQuantity,
        price: totalPrice.toFixed(2),
        grossTotal: grossTotal.toFixed(2)
      }
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
// const reportQuery = `
  //   SELECT 
  //     p.product_name AS "Product Name",
  //     u.name AS "Customer Name",
  //     SUM(ph.purchase_quantity) AS "Quantity",
  //     p.product_price AS "Price",
  //     SUM(ph.purchase_quantity * p.product_price) AS "Total"
  //   FROM purchase_history ph
  //   JOIN users u ON ph.user_id = u.id
  //   JOIN products p ON ph.product_id = p.id
  //   GROUP BY u.name, p.product_name, p.product_price
  //   ORDER BY Total DESC;
  // `;