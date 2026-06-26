# 🚀 CodeVector Backend Task

A high-performance backend service built with **Node.js, Express.js, and MongoDB** to efficiently browse **200,000+ products** using **cursor-based pagination**. The application supports category filtering, fast pagination, and is designed to handle large datasets efficiently.

---

## ✨ Features

- Browse 200,000+ products
- Cursor-based pagination (no duplicate or missing records)
- Category filtering
- Fast MongoDB queries using compound indexes
- Bulk product seeding using `insertMany()`
- RESTful API
- MongoDB Atlas integration
- Optional React frontend for API demonstration

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Faker.js
- React (Bonus UI)

---

## 📂 Project Structure

```
codevector-task
│
├── frontend/
├── scripts/
│   └── seed.js
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── app.js
├── index.js
├── package.json
└── README.md
```

---

## 📦 Database Schema

```js
Product
{
  name: String,
  category: String,
  price: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## ⚡ Pagination Strategy

This project uses **Cursor Pagination** instead of Offset Pagination.

Sorting order:

```js
updatedAt DESC
_id DESC
```

Cursor contains:

```json
{
  "updatedAt": "...",
  "id": "..."
}
```

### Why Cursor Pagination?

- Faster on large datasets
- No expensive `skip()`
- Prevents duplicate records
- Prevents missing records when new products are added

---

## 📑 API Endpoints

### Get Products

```
GET /api/products
```

---

### Category Filter

```
GET /api/products?category=Electronics
```

---

### Cursor Pagination

```
GET /api/products?limit=20&cursorUpdatedAt=<date>&cursorId=<id>
```

---

## 🌱 Seeding Strategy

A seed script generates **200,000 products** using Faker.js.

To improve performance:

- Products are generated in batches
- Bulk insertion uses `insertMany()`
- Batch size = 5000

This significantly reduces database round trips compared to inserting one document at a time.

---

## 📈 Indexing Strategy

Indexes used:

```js
updatedAt + _id
```

Supports efficient cursor pagination.

```js
category + updatedAt + _id
```

Supports fast category filtering with pagination.

---

## ▶️ Local Setup

Clone the repository:

```bash
git clone <repo-url>
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Seed database:

```bash
npm run seed
```

Run server:

```bash
npm run dev
```

---

## 🚀 Deployment

Backend can be deployed on **Render**.

Database is hosted on **MongoDB Atlas**.

---

## 🔮 Future Improvements

- Full-text product search
- Redis caching
- API rate limiting
- Unit & integration tests
- Docker support
- API documentation using Swagger

---

## 🤖 AI Usage

AI tools were used to:

- Discuss implementation approaches
- Review pagination logic
- Improve code readability
- Generate documentation

All implementation details, code structure, and design decisions were reviewed and understood before submission.

---

## 👨‍💻 Author

**Harsh Berwa**

GitHub:
https://github.com/harshberwa
