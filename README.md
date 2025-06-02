# 🧰 Node.js E-Commerce Dashboard Insights

A minimal Node.js Dashboard Insights using Express.js, Prisma ORM, and Joi for building RESTful APIs, primarily focused on sales and inventory management.

---

## Key Information

*   **Programming Language & Framework:** Node.js with Express.js
*   **API Type:** RESTful API
*   **Database Used:** PostgreSQL (managed via Prisma ORM)

---

## 🚀 Features

- ✅ **Prisma ORM** for type-safe database access and migrations with PostgreSQL.
- ✅ **Express.js** as the robust web framework for building APIs.
- ✅ **Joi** for powerful input validation using a custom middleware.
- ✅ **Standardized API responses** via `utils/apiResponse.js` for consistency.
- ✅ Well-structured codebase: `controllers`, `routes`, `middleware`, `validation`, and `utils`.
- ✅ Essential Dependencies:
    - `http-status` for HTTP status codes.
    - `dotenv` for environment variable management.
    - `cors` for enabling Cross-Origin Resource Sharing.
- ✅ Pre-configured scripts for development, production and migrations.

---

## 📁 Project Structure

```
├── controllers/         # Contains the business logic for API routes
├── middleware/          # Express middlewares (e.g., Joi validation)
│   └── validate.js      # Custom validation middleware
├── prisma/              # Prisma setup: schema, migrations, and client instance
│   ├── migrations/      # Database migration files
│   ├── client.js        # Shared Prisma client instance
│   └── schema.prisma    # Defines database models and relations
├── routes/              # API route definitions (Express routers)
├── validation/          # Joi schemas for request input validation
├── utils/               # Utility functions (e.g., apiResponse)
│   └── apiResponse.js
├── .env.example         # Example environment variables template
├── server.js            # Main Express application entry point
└── package.json         # Project dependencies and npm scripts
```

---

## 🛠️ Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    This command installs all necessary project dependencies, including development tools like Jest and Supertest.
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file by copying the example template. Then, update the variables in `.env` as needed, especially the `DATABASE_URL` for your PostgreSQL instance.
    ```bash
    cp .env.example .env
    ```
    *Example `DATABASE_URL` format for PostgreSQL:*
    `DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"`

4.  **Run initial database migration:**
    This command applies any pending migrations to set up your database schema according to `prisma/schema.prisma`. If it's the first time, Prisma might prompt you for a migration name (e.g., "init").
    ```bash
    npm run dev-migrate
    ```

---

## 📜 Available Scripts

The following scripts are available in `package.json` and can be run using `npm run <script-name>`:

| Command             | Description                                                       |
|---------------------|-------------------------------------------------------------------|
| `npm run dev`       | Starts the application in development mode with `nodemon` for auto-reloading. |
| `npm start`         | Starts the application in production mode.                        |
| `npm run dev-migrate` | Creates and applies new Prisma migrations (for development).      |
| `npm run deploy-migration` | Applies existing migrations to the database (for production).    |
| `npm run generate`  | Regenerates the Prisma client based on `prisma/schema.prisma`.    |
| `npm run seed`      | (Optional) Runs the database seeding script (`prisma/seed.js`).   |

---

## 📖 API Endpoints

All endpoints are prefixed with `/api`.

### Sales API (`/api/sales`)

*   **`GET /`**: Retrieves a list of sales records.
    *   **Query Parameters**:
        *   `startDate` (date, optional): Filter sales from this date (ISO format, e.g., `YYYY-MM-DD`).
        *   `endDate` (date, optional): Filter sales up to this date (ISO format, e.g., `YYYY-MM-DD`). Requires `startDate`.
        *   `productId` (integer, optional): Filter sales by a specific product ID.
        *   `categoryId` (integer, optional): Filter sales by a specific category ID (filters products belonging to this category).
*   **`GET /summary`**: Calculates and retrieves a revenue summary based on a specified period.
    *   **Query Parameters**:
        *   `period` (string, required): Aggregation period. Must be one of: `'daily'`, `'weekly'`, `'monthly'`, `'yearly'`.
        *   `startDate` (date, optional): Start date for the summary (ISO format).
        *   `endDate` (date, optional): End date for the summary (ISO format).
*   **`GET /comparison`**: Compares revenue between two distinct date periods.
    *   **Query Parameters**:
        *   `firstStartDate` (date, required): Start date for the first comparison period.
        *   `firstEndDate` (date, required): End date for the first comparison period.
        *   `secondStartDate` (date, required): Start date for the second comparison period.
        *   `secondEndDate` (date, required): End date for the second comparison period.
        *   `categoryId` (integer, optional): Filter comparison by a specific product category ID.

### Inventory API (`/api/inventory`)

*   **`GET /status`**: Retrieves the current status of all inventory items. This includes product name, current quantity, low stock threshold, a flag if stock is low, and location.
*   **`PATCH /update`**: Updates the quantity of a specific inventory item and logs the change.
    *   **Request Body** (JSON):
        *   `productId` (integer, required): The ID of the product whose inventory is being updated.
        *   `quantityChange` (integer, required): The amount by which to change the quantity (positive for adding stock, negative for reducing).
        *   `changeType` (string, required): A descriptive string for the type of change (e.g., "purchase_order_received", "customer_sale", "stock_adjustment").
        *   `userId` (integer, required): The ID of the user initiating the inventory change (for auditing).
