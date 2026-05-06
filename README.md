# CS375 Final

RateMeals is a RESTful API built with Node.js, Express, and MongoDB. It exposes CRUD endpoints for restaurants, meals, and wishlists, with support for filtering, search, sorting, and populated Mongoose relationships.

## Tech Stack

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Postman

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file from `.env.example` and set the values for your environment, including `JWT_SECRET`.
3. Start the server:
   ```bash
   npm start
   ```

The API listens on `PORT`, defaulting to `3000` when the environment variable is not set.

## Endpoints

### Restaurants

- `GET /api/restaurants`
- `GET /api/restaurants/:id`
- `POST /api/restaurants`
- `PUT /api/restaurants/:id`
- `DELETE /api/restaurants/:id`

### Meals

- `GET /api/meals`
- `GET /api/meals/:id`
- `POST /api/meals`
- `PUT /api/meals/:id`
- `DELETE /api/meals/:id`

Query support includes:

- `restaurant=<restaurantId>` to filter by restaurant
- `search=<text>` for case-insensitive meal name matching
- `sort=true` to sort returned meals by rating
- `page` and `limit` for pagination

### Wishlists

- `GET /api/wishlists`
- `POST /api/wishlists`
- `PUT /api/wishlists/:id`
- `DELETE /api/wishlists/:id`

Authentication details are documented in [AUTHENTICATION.md](C:/Users/James/Downloads/CS375-Final/AUTHENTICATION.md).

## Notes

- The original repository included committed `node_modules` and a hardcoded database connection string. This cleanup removes generated files from source control and moves configuration to environment variables.
- The included Postman collection can still be used for manual API testing.
