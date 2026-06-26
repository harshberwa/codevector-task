# 🚀 CodeVector Backend Task

A scalable backend application built with **Node.js, Express.js, and MongoDB Atlas** that efficiently handles **200,000+ products** using **Cursor-Based Pagination**.

The application supports fast pagination, category filtering, and optimized MongoDB queries through compound indexes.

---

# 🌐 Live Demo

### Backend

https://codevector-task-9wq0.onrender.com/

### GitHub Repository

https://github.com/harshberwa/codevector-task

---

# ✨ Features

- Browse 200,000+ products
- Cursor-Based Pagination
- Category Filtering
- Newest Products First
- Fast MongoDB Queries
- Compound Indexing
- Bulk Product Seeding
- REST API
- MongoDB Atlas Integration
- Ready for Deployment

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Utilities

- Faker.js

## Bonus

- React (Simple UI)

---

# 📁 Project Structure

```
codevector-task
│
├── frontend/
│
├── scripts/
│   └── seed.js
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   └── routes/
│
├── index.js
├── package.json
└── README.md
```

---

# 📦 Product Schema

```js
{
    name: String,
    category: String,
    price: Number,
    createdAt: Date,
    updatedAt: Date
}
```

---

# 🚀 API Endpoints

## Get Products

```
GET /api/products
```

Returns latest products.

---

## Category Filter

```
GET /api/products?category=Electronics
```

Returns products from a specific category.

---

## Cursor Pagination

```
GET /api/products?limit=20&cursorUpdatedAt=<timestamp>&cursorId=<productId>
```

Returns the next page using cursor pagination.

---

# ⚡ Pagination Strategy

This project uses **Cursor-Based Pagination** instead of traditional Skip/Limit pagination.

Products are sorted using:

```
updatedAt DESC
_id DESC
```

Each response returns a cursor:

```json
{
    "updatedAt": "...",
    "id": "..."
}
```

The client sends this cursor to fetch the next page.

---

# ✅ Why Cursor Pagination?

Cursor pagination was selected because:

- Faster than Skip Pagination
- Avoids expensive skip() operations
- Scales well with large datasets
- Prevents duplicate records
- Prevents missing records when new products are inserted while browsing

---

# 📈 Database Indexes

Two compound indexes are used.

### Cursor Pagination Index

```
updatedAt
_id
```

Supports fast pagination.

---

### Category Pagination Index

```
category
updatedAt
_id
```

Supports efficient category filtering with pagination.

---

# 🌱 Product Seeding

A seed script generates **200,000 products**.

Implementation details:

- Faker.js generates fake data
- Products are generated in batches
- Batch Size: 5000
- Uses insertMany()

Bulk insertion significantly reduces database operations compared to inserting one document at a time.

---

# ▶️ Running Locally

## Clone Repository

```bash
git clone https://github.com/harshberwa/codevector-task.git
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment

Create a `.env` file.

```env
MONGO_URI=your_connection_string
PORT=5000
```

---

## Seed Database

```bash
node scripts/seed.js
```

---

## Start Server

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# 🚀 Deployment

Backend is deployed on **Render**.

Database is hosted on **MongoDB Atlas**.

---

# 🔮 Future Improvements

- Product Search
- Price Filtering
- Redis Caching
- Authentication
- Rate Limiting
- Docker Support
- Swagger API Documentation
- Unit & Integration Tests

---

# 🤖 AI Usage

AI tools were used for:

- Discussing implementation approaches
- Reviewing pagination logic
- Improving code quality
- Explaining concepts
- Writing documentation

All architectural decisions, implementation, and code were reviewed and understood before submission.

---

# 👨‍💻 Author

**Harsh Berwa**

GitHub:

https://github.com/harshberwa
