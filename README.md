# Odin Inventory PROCosmetics App

### Description
The Odin Inventory PROCosmetics App is a web application built to manage cosmetic product inventories. It allows users to view, add, and manage products using a simple and intuitive interface. This project was created as part of [The Odin Project](https://www.theodinproject.com/) curriculum to learn the fundamentals of building full-stack web applications.

### Features
- View a list of all products.
- Add new products with relevant details.
- Update and delete cosmetic products.
- Basic validation for product inputs.
- MVC architecture for clean and maintainable code.
- Integration with PostgreSQL for data storage.
- Deployment on Railway for easy access.

### Technologies Used
- **Backend**: Express.js
- **Database**: PostgreSQL
- **Architecture**: MVC Pattern
- **Validation**: Express Validator for input validation
- **Templating Engine**: EJS for rendering views
- **Styling**: CSS for basic styling

### Installation
To run the Odin Inventory App locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Lanut1/odin-inventory-app.git
   cd odin-inventory-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up the Database**:
   - Create a PostgreSQL database.
   - Update the `.env` file with your database connection details:
     ```env
     DATABASE_URL=your_postgresql_connection_string
     ```

4. **Run Database Script to Seed Data**:
   ```bash
   node db/populatedb.js
   ```

5. **Start the Application**:
   - By default, the application runs on port `3000`. If you want to specify a different port, set the `PORT` variable in your `.env` file:
     ```env
     PORT=your_custom_port
     ```
   - To start the application, run:
     ```bash
     node app.js
     ```

6. **Visit the Application**:
   Open [http://localhost:3000](http://localhost:3000) in your web browser (replace `3000` with your custom port if applicable).

### Deployment
The application is deployed on [Railway](https://railway.app/). You can access the live version using the link below:
- [Live Application](https://odin-inventory-app-production-6ef5.up.railway.app/)

### Future Enhancements
- Add user authentication for better access control.
- Implement pagination for the products list.
- Add image optimization for faster loading.
- Improve UI design for a better user experience.

### License
This project is licensed under the MIT License.
