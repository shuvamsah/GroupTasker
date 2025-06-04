# GroupTasker (Lab 04) 🚀

A collaborative task management web application, now migrated to **Next.js** and running in **Docker**.

---

## 📦 Features

- View all tasks
- Create new tasks
- View task details
- Edit existing tasks
- Delete tasks
- Fully Dockerized for consistent deployment

---

## 🧱 Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)

---

## 🚀 Getting Started

### ▶️ Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the dev server**
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 🐳 Docker

1. **Build Docker image**
   ```bash
   docker build -t grouptasker .
   ```

2. **Run container**
   ```bash
   docker run -p 3000:3000 grouptasker
   ```

Then visit [http://localhost:3000](http://localhost:3000)

---

## 🗃️ Project Structure

```
/pages         → All routes like /tasks, /create-task
/components    → Shared React components
/context       → Task state using React Context
Dockerfile     → Docker setup
README.md      → You’re reading it
```

---

## 👥 Authors

- Shuvam Kumar Sah  
- Talha Tayyab  
- Syed Hammad Alam  
- Muhammad Naeem Laghari
