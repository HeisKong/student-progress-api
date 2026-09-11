# Student Progress API

Backend REST API สำหรับระบบติดตาม Progress ของนักศึกษา พัฒนาด้วย Node.js, TypeScript, Express, Prisma และ PostgreSQL

## Tech Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Prisma ORM
- Zod
- Docker Compose
- Jest + Supertest (test setup)

## Requirements

- Node.js 20+
- npm 10+
- Docker Desktop

## Getting Started

### 1. Clone project และเข้าโฟลเดอร์

```bash
git clone <repository-url>
cd student-progress-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env`

สร้างไฟล์ `.env` ที่ root ของ project และใส่ค่า:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/student_progress?schema=public"
PORT=3000
```

> PostgreSQL ใช้ port `5433` ที่เครื่อง Host เพราะ Docker map จาก `5433:5432`

### 4. Start PostgreSQL ด้วย Docker

```bash
docker compose up -d
```

ตรวจสอบ container:

```bash
docker compose ps
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Run Database Migration

โปรเจกต์มี migration อยู่ใน `prisma/migrations` แล้ว สามารถใช้คำสั่งนี้เพื่อ sync database:

```bash
npx prisma migrate dev
```

### 7. Seed Sample Data

สร้างข้อมูลตัวอย่างสำหรับทดสอบ API:

```bash
npm run prisma:seed
```

### 8. Start Development Server

```bash
npm run dev
```

API จะทำงานที่:

```text
http://localhost:3000
```

Health Check:

```text
GET http://localhost:3000/health
```

Expected response:

```json
{
  "success": true,
  "message": "API is running"
}
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/students` | Create student |
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get student by ID |
| PUT | `/api/students/:id` | Update student |
| POST | `/api/students/:studentId/progress` | Create/update progress |
| PUT | `/api/students/:studentId/progress` | Create/update progress |
| GET | `/api/students/:studentId/progress` | Get student progress |
| GET | `/api/summary` | Get progress summary |

## Example Requests

### Create Student

```http
POST http://localhost:3000/api/students
Content-Type: application/json
```

```json
{
  "studentCode": "65010001",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com"
}
```

### Get All Students

```http
GET http://localhost:3000/api/students
```

### Get Student by ID

```http
GET http://localhost:3000/api/students/1
```

### Update Student

```http
PUT http://localhost:3000/api/students/1
Content-Type: application/json
```

```json
{
  "firstName": "John Updated"
}
```

### Save Progress

```http
POST http://localhost:3000/api/students/1/progress
Content-Type: application/json
```

```json
{
  "status": "IN_PROGRESS"
}
```

Available status:

```text
NOT_STARTED
IN_PROGRESS
COMPLETED
```

### Get Student Progress

```http
GET http://localhost:3000/api/students/1/progress
```

### Get Summary

```http
GET http://localhost:3000/api/summary
```

Example response:

```json
{
  "success": true,
  "data": {
    "totalStudents": 3,
    "completed": 1,
    "inProgress": 1,
    "notStarted": 1
  }
}
```

## Validation

Student:

- `studentCode` ต้องไม่ว่าง
- `firstName` ต้องไม่ว่าง
- `lastName` ต้องไม่ว่าง
- `email` ต้องเป็นรูปแบบ Email ที่ถูกต้อง
- `email` ต้องไม่ซ้ำ
- `studentCode` ต้องไม่ซ้ำ

Progress:

- `status` ต้องเป็น `NOT_STARTED`, `IN_PROGRESS` หรือ `COMPLETED`

## Project Structure

```text
student-progress-api/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── app.ts
│   └── server.ts
├── .env
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

## Architecture

```text
Client / Postman / cURL
        ↓
      Routes
        ↓
    Middleware
    (Validation)
        ↓
    Controller
        ↓
      Service
        ↓
      Prisma
        ↓
   PostgreSQL
```

## Useful Commands

Start PostgreSQL:

```bash
docker compose up -d
```

Stop PostgreSQL:

```bash
docker compose down
```

Start development server:

```bash
npm run dev
```

Build project:

```bash
npm run build
```

Run production build:

```bash
npm start
```

Generate Prisma Client:

```bash
npm run prisma:generate
```

Run Prisma migration:

```bash
npm run prisma:migrate
```

Seed sample data:

```bash
npm run prisma:seed
```

Run tests:

```bash
npm test
```
