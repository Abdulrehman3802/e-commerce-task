# 🧰 node-starter-with-prisma

A minimal Node.js starter kit using **Prisma ORM**, **Joi** for validation, and a consistent API response utility.

---

## 🚀 Features

- ✅ **Prisma** for database access and migrations
- ✅ **Joi** for schema validation via custom middleware
- ✅ **Standardized API responses** using a utility file
- ✅ Structured with `controllers`, `routes`, `middleware`, and `utils`
- ✅ Ready-to-use development and production scripts

---

## 📁 Project Structure
```
├── controllers/ # Route logic
├── middleware/ # Joi validation and other middlewares
│ └── validate.js # Custom validation middleware
├── prisma/ # Prisma schema and migrations
│ └── schema.prisma
├── routes/ # API route definitions
├── utils/ # Utility functions (e.g., apiResponse)
│ └── apiResponse.js
├── server.js # Entry point
└── package.json # Scripts and dependencies
```

---

## 🛠️ Setup Instructions

### 1. Install dependencies

```bash
npm install
```
### 1. Configure .env and Run Initial Migration

```bash
cp .env.example .env

npx prisma migrate dev --name init
```

OR

```bash
npm run migrate
```
---

## 📜 Available Scripts
### Command	Description :

```
npm run dev	Run in development mode using nodemon
npm start	Run in production mode
npm run migrate	Create and apply new Prisma migrations
npm run deploy-migrate	Apply migrations in production
npm run generate	Regenerate Prisma client
npm run seed	(Optional) Seed your database
```