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

## Requirements

- Node.js 20+
- npm 10+
- Docker Desktop

## Getting Started

### 1. Clone project และเข้าโฟลเดอร์

```bash
git clone https://github.com/HeisKong/student-progress-api.git
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

