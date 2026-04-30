# Assignment-4-RESTful-API
RESTful API using Express.js and MongoDB with Mongoose. A robust, well-documented API that demonstrates mastery of server-side development, database integration, data modeling, and RESTful design principles.

Our Database Idea: https://stthomas.instructure.com/groups/111969/pages/database-idea


# RateMeals API

## Project Overview
The RateMeals API is a backend RESTful service built with Node.js, Express, and MongoDB. It allows users to track, rate, and review their favorite restaurants and specific meals. The API features full CRUD functionality, data relationships between collections, and advanced query parameters including filtering, sorting, and regex searching.

## Technologies Used
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (MongoDB Atlas)
* **ODM:** Mongoose
* **Testing:** Postman

## Installation & Setup
To run this API locally, follow these steps:

1. **Clone the repository** to your local machine.
2. **Install dependencies:**
   ```bash
   npm install

3. node server.js (to start the server)

API Endpoints
Restaurants (/api/restaurants)

GET /api/restaurants - Retrieve all restaurants (supports query parameters like ?cuisine=American)

GET /api/restaurants/:id - Retrieve a specific restaurant by its ID

POST /api/restaurants - Create a new restaurant

PUT /api/restaurants/:id - Update an existing restaurant

DELETE /api/restaurants/:id - Delete a restaurant

Meals / Foods (/api/meals)

GET /api/meals - Retrieve all meals (supports ?search=regex, ?sort=true, and pagination)

GET /api/meals?restaurant=[ID] - Retrieve all meals linked to a specific restaurant ID

GET /api/meals/:id - Retrieve a specific meal

POST /api/meals - Create a new meal (Requires a valid Restaurant _id)

PUT /api/meals/:id - Update an existing meal

DELETE /api/meals/:id - Delete a meal

Wishlists (/api/wishlists)

Note: The data model for Wishlists has been established, but the routing is currently under development.

Data Models & Relationships
The database utilizes Mongoose schemas to enforce data validation.

Restaurants: Contains standard string and number validations (e.g., ratings must be between 1 and 10).

Meals: Demonstrates a one-to-many relationship by requiring a valid ObjectId referencing the Restaurant model upon creation.

Testing & Quality Assurance
The API was rigorously tested using Postman. The testing suite verifies:

Successful CRUD operations across collections.

Database error handling (e.g., rejecting POST requests missing required fields like restName).

Proper execution of Mongoose relational linking (Meals to Restaurants).

Verification of custom URL query logic (filtering by cuisine, regex text searches, and numerical sorting).

Group Contributions & Challenges Solved:
Alex — Database & Models Lead

Created all Mongoose schemas for the collections (Restaurants, Foods, Wishlists).

Implemented strict database rules including field types, min/max validations, and automatic timestamps.

Engineered data relationships using Mongoose ObjectId references to link collections together.

Established the main database connection (config/db.js) and created virtual properties for computed fields.

Ashley — API Routes (CRUD) Lead

Built out the core Express routing architecture, organizing routes into specific modular files (routes/restaurants.js, routes/foods.js).

Developed all CRUD endpoints (GET, POST, PUT, DELETE) utilizing async/await and try/catch blocks.

Designed and implemented URL query features including filtering, sorting, and pagination logic.

James — Advanced Features & Validation Lead

Developed the advanced search functionality utilizing MongoDB $regex for partial text matching.

Built out custom validators and advanced error handling to return clean, readable error messages and correct HTTP status codes.

Handled API edge cases, including catching invalid IDs and rejecting POST requests with missing required fields to ensure strict RESTful design.

Destin Thompson - Testing Lead

Role: Designed and executed the Postman testing suite to verify all routing, schema validation, and database operations.

Challenge 1: During initial testing, the GET request for Restaurants was returning all documents and ignoring query parameters (like ?cuisine=American). Solution: Debugged the route and updated the Mongoose query from Restaurant.find() to Restaurant.find(req.query) to properly ingest dynamic URL queries.

Challenge 2: Discovered a 404 Not Found error when attempting to POST to the Foods collection. Solution: Traced the routing architecture back to server.js and discovered a mismatch between the filename (foods.js) and the established URL path (/api/meals). Adapted the testing suite to utilize the correct endpoint.

Challenge 3: Identified that the wishlists routes were missing from the main server architecture, preventing Postman from interacting with the database schema. Reported the missing endpoints to the development team for patching.