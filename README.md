# 🧰 node-starter-with-prisma

A minimal Node.js starter kit using **Prisma ORM**, **Joi** for validation, and a consistent API response utility.

---

## 🚀 Features

- ✅ **Prisma ORM** for type-safe database access and migrations
- ✅ **Express.js** as the web framework
- ✅ **Joi** for robust input validation via custom middleware
- ✅ **Jest & Supertest** for unit and integration testing
- ✅ **Standardized API responses** using a utility file (`utils/apiResponse.js`)
- ✅ Structured with `controllers`, `routes`, `middleware`, `validation`, `test`, and `utils`
- ✅ Key Dependencies: `http-status` for HTTP status codes, `dotenv` for environment variables, `cors` for CORS.
- ✅ Ready-to-use development and production scripts

---

## 📁 Project Structure
```
├── controllers/         # Route logic
├── middleware/          # Express middlewares (e.g., Joi validation)
│   └── validate.js      # Custom validation middleware
├── prisma/              # Prisma schema, migrations, and client
│   └── schema.prisma
│   └── client.js
├── routes/              # API route definitions
├── validation/          # Joi validation schemas
├── utils/               # Utility functions (e.g., apiResponse)
│   └── apiResponse.js
├── .env.example         # Example environment variables
├── server.js            # Express application entry point
└── package.json         # Project dependencies and scripts
```

---

## 🛠️ Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    This will install all necessary dependencies, including development ones like Jest and Supertest.
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Copy the example `.env.example` file to `.env` and update the variables as needed (e.g., `DATABASE_URL`).
    ```bash
    cp .env.example .env
    ```

4.  **Run initial database migration:**
    This will set up your database schema based on `prisma/schema.prisma`.
    ```bash
    npm run dev-migrate 
    ```
    *(This script typically runs `prisma migrate dev --name init` or similar for the first migration if you haven't made one yet, or prompts you for a name.)*

---

## 📜 Available Scripts

| Command             | Description                                        |
|---------------------|----------------------------------------------------|
| `npm run dev`       | Run in development mode using nodemon.             |
| `npm start`         | Run in production mode.                            |
| `npm run dev-migrate` | Create and apply new Prisma migrations (development). |
| `npm run deploy-migration` | Apply migrations in production.                 |
| `npm run generate`  | Regenerate Prisma client.                          |
| `npm run seed`      | (Optional) Seed your database.                     |
| `npm test`          | Run the test suite using Jest.                     |
```
