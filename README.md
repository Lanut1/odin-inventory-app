# Odin Inventory PROCosmetics App

### Description
PROCosmetics App is a web application built to manage cosmetic product inventories and allow users to browse products, write, and view comments. It provides a simple and intuitive interface for managing cosmetic products while offering the functionality for users to engage with the products through reviews. This project was created as part of [The Odin Project](https://www.theodinproject.com/) curriculum to learn the fundamentals of building full-stack web applications.

### Features
- Users can register, log in, and authenticate with Passport.js. Passwords are stored securely using bcrypt.
- Logged-in users can write and view comments about products.
- Admin users can add new products and update them, delete products and comments.
- Basic validation for product inputs.
- MVC architecture for clean and maintainable code.
- Integration with PostgreSQL for data storage.
- Deployment on Railway for easy access.
- The design is inspired by Figma templates from [Nickel Fox](https://www.figma.com/@nickelfox) and [UIUX Expert(Aashifa)](https://www.figma.com/@uiux_expert)
- Images are sourced from [Freepik](https://www.freepik.com/serie/13863102), [Way Home Studio](https://www.freepik.com/author/wayhomestudio) and the official websites of [Avene](https://www.eau-thermale-avene.com/) and [Bioderma](https://www.bioderma.com/). Products images have been uploaded to Cloudinary for efficient management and display.
- The app includes a responsive mobile version, optimized for smaller screens, ensuring smooth navigation and user experience on mobile devices.

### Technologies Used
- **Backend**: Express.js
- **Database**: PostgreSQL
- **Authentication**: Passport.js 
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
   npm run populatedb
   ```

5. **Start the Application**:
   - By default, the application runs on port `3000`. If you want to specify a different port, set the `PORT` variable in your `.env` file:
     ```env
     PORT=your_custom_port
     ```
   - To start the application, run:
     ```bash
     npm start
     ```

6. **Visit the Application**:
   Open [http://localhost:3000](http://localhost:3000) in your web browser (replace `3000` with your custom port if applicable).

### Deployment
The application is deployed on [Railway](https://railway.app/). You can access the live version using the link below:
- [Live Application](https://odin-inventory-app-production-6ef5.up.railway.app/)

### Future Enhancements
- Implement pagination for the products list.
- Add image optimization for faster loading.
- Create user profiles where users can manage their information and preferences.
- Allow users to add their own photos and upload pictures to their comments.

### License
This project is licensed under the MIT License.