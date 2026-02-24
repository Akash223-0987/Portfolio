# 🚀 Akash's Professional Portfolio

A modern, high-performance full-stack portfolio application designed to showcase my journey as a Full-Stack Developer, AI Enthusiast, and Data Analyst. Built with a focus on speed, aesthetics, and user experience.

---

## ✨ Key Features

- **Dynamic Frontend**: Built with **React 19** and **Vite** for lightning-fast performance.
- **Micro-Animations**: Smooth transitions and interactive elements powered by **Framer Motion**.
- **Intelligent AI Integration**: Integrated with **Step Fun 3.5 Flash** for smart, context-aware interactions and streaming responses.
- **Robust Backend**: A high-performance **FastAPI** (Python) server handling data and logic.
- **Admin Dashboard**: A secure, protected space to manage projects and contact messages dynamically (JWT & Bcrypt).
- **Modern UI/UX**: Styled with **Tailwind CSS 4**, featuring a sleek dark-themed aesthetic with custom particles and premium typography.
- **Real-time Contact**: Integrated contact system for direct professional inquiries.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/), [Simple Icons](https://simpleicons.org/)
- **Animation**: [TSParticles](https://particles.js.org/)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Database**: [MongoDB](https://www.mongodb.com/) (using Motor for async operations)
- **Security**: JWT Authentication, Bcrypt hashing
- **Environment**: [Dotenv](https://github.com/theskumar/python-dotenv)

---

## 📂 Project Structure

```text
akash-portfolio/
├── frontend/               # React + Vite Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Main page layouts
│   │   ├── data/           # Portfolio content & constants
│   │   └── assets/         # Images and icons
│   └── package.json
├── backend/                # FastAPI Application
│   ├── app/
│   │   ├── routes/         # API endpoints
│   │   ├── models/         # Database schemas
│   │   ├── auth/           # Security logic
│   │   └── ai/             # Step Fun integration
│   └── requirements.txt
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- MongoDB (Local or Atlas)

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Akash223-0987/Portfolio.git
   cd Portfolio
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   python -m venv venv
   source venv/Scripts/activate  # On Windows use: venv\Scripts\activate
   pip install -r requirements.txt
   # Configure .env with MONGO_URL, DB_NAME, SECRET_KEY, STEPFUN_API_KEY
   python -m uvicorn app.main:app --reload
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   # Configure .env with VITE_API_BASE_URL
   npm run dev
   ```

---

## 🏆 Featured Projects

- **Kairos**: Intelligent AI chatbot built with Node.js and Express.
- **Gesture-Based Mario Game**: Computer vision project using OpenCV and JavaFX.
- **NubesVault**: Secure cloud storage application with React and MongoDB.
- **Press Pulse**: Automated news pipeline with AI-driven sentiment analysis.
- **Spendora**: Smart expense tracker with data visualization and financial insights.

---

## 📬 Connect with Me

- **GitHub**: [@Akash223-0987](https://github.com/Akash223-0987)
- **Live Portfolio**: [dakashdora.vercel.app](https://dakashdora.vercel.app)

---

*Made with ❤️ by Akash*
