# 📖 **Biblical Quotes App**

> ✨ *A daily source of inspiration powered by Scripture.*

---

## 🕊️ **Project Description**

The **Biblical Quotes App** is a web-based platform that displays a new Bible verse every day to inspire and uplift users.
Visitors can view today's verse, generate a random future quote, save favorites, and browse collections of meaningful passages.

The project uses a lightweight backend API and a clean static frontend. It is fully containerized and ready for deployment on platforms like **Google Cloud Run**.

---

## ⚙️ **Technology Stack**

| Layer               | Technology               |
| ------------------- | ------------------------ |
| **Frontend**        | HTML, CSS, JavaScript    |
| **Backend**         | Node.js + Express        |
| **Deployment**      | Docker, Google Cloud Run |
| **Version Control** | Git + GitHub             |

---

## 🎯 **MVP Features**

* 🗓️ Display **today's scheduled Bible verse**
* 🔄 Generate random quotes from future dates
* ❤️ Save favorite verses (localStorage)
* 📱 Responsive modern UI
* 🐳 Fully Dockerized for easy deployment

---

## 📁 **Project Structure**

```
project/
├── backend/        # Node.js API (Express)
├── frontend/       # HTML/CSS/JS + Nginx container
└── docker-compose.yml
```

---

## 🛠️ **Run Locally**

### **Backend (Node.js API)**

```
cd backend
npm install
npm start
```

Runs on → **[http://localhost:5000](http://localhost:5000)**

---

### **Frontend**

You can:

✔ Open `index.html` directly
or
✔ Use VSCode **Live Server**

---

## 🐳 **Run With Docker (Recommended)**

```
docker-compose up --build
```

* Frontend → **[http://localhost:8080](http://localhost:8080)**
* Backend → **[http://localhost:5000](http://localhost:5000)**

---

# ☁️ **Minimal Deployment (Google Cloud Run)**


### **Frontend**

```
cd frontend
gcloud builds submit --tag gcr.io/PROJECT_ID/frontend
gcloud run deploy frontend --image gcr.io/PROJECT_ID/frontend --platform managed --allow-unauthenticated
```

### **Backend**

```
cd backend
gcloud builds submit --tag gcr.io/PROJECT_ID/backend
gcloud run deploy backend --image gcr.io/PROJECT_ID/backend --platform managed --allow-unauthenticated
```

### **Frontend JS**

Replace your API URL:

```js
const BACKEND_URL = "https://your-backend-url.a.run.app";
```

---

## 🚀 **Future Enhancements**

* ❤️ User favoriting with accounts
* 🔗 Sharing quotes on social media
* 👤 User profiles
* 🤖 Optional AI-generated reflections
* 🌐 Multi-language Bible quotations

---

## 🧩 **Project Goals**

* Deliver daily spiritual encouragement through a simple UI
* Practice full-stack cloud deployment workflow
* Provide a clean, modern devotional experience

---


