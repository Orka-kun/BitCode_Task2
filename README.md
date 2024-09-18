The goal of this project is to fetch data from an API, store it in a MySQL database, and then generate a report based on that data. The report displays customer purchase history, showing products bought, quantities, prices, and totals.
Step-by-Step Development Process
1. Database Setup
•	Created a MySQL database named store_db using Laragon.
•	Defined tables for users, products, and purchase_history to store API data related to customer purchases.
2. Frontend: React App Creation
•	Set up a React app using Create React App.
•	Installed necessary dependencies including axios for HTTP requests.
•	Created the main component ReportGenerator.jsx to handle the report generation and display.
•	Used Tailwind CSS for styling.
3. Backend: Node.js & Express Server
•	Created a simple Node.js/Express server to handle requests from the React frontend.
•	Configured CORS to allow requests from the React app.
•	Set up a MySQL connection using the mysql package to interact with the store_db database.
4. Fetching and Storing Data
•	Used axios in the backend to fetch data from an external API.
•	Stored the fetched data into the MySQL database:
o	Inserted or updated user, product, and purchase history data based on unique identifiers (e.g., user phone and product code).
5. Report Generation
•	Implemented an API route /generate-report in the Node.js backend.
•	Created a SQL query to calculate the total purchase amount by each customer and product, along with the total quantity and price.
•	Returned the report data to the React frontend.
6. Displaying the Report
•	In the React app, displayed the generated report in a table format.
7. Running the Application
•	Started the backend server on http://localhost:3001 to handle requests.
•	Used the frontend React app to trigger report generation and view the results in the UI.
Thought Process and Design Decisions
•	Used React for the frontend and Node.js/Express for the backend to maintain clear separation between the two.
•	Carefully structured the database to accommodate different pieces of data (users, products, and purchase history) and ensure data consistency.
•	Focused on making the UI simple and clean, using a table to neatly present the report data.
Project Setup Steps
1.	Clone the project from GitHub
2.	Navigate to the project directory and run npm install to install all necessary dependencies for both the frontend (React) and backend (Node.js/Express).
3.	Import the provided SQL database(store_db.sql) file into your MySQL server.
4.	Run the backend server using node server/server.js. Ensure it’s running at http://localhost:3001.
5.	In a separate terminal, Run npm run dev in the React project directory to launch the frontend.
6.	Open the React app in your browser, click the Generate Report button, and view the data fetched table from the MySQL database.

