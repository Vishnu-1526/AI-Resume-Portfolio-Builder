# 🤖 AI Resume & Portfolio Builder

An AI-powered, ATS-friendly resume builder that enhances your resume using a Large Language Model, scores it against a job description, and generates a shareable portfolio page — all deployable for free on Vercel.

**Live Demo:** [ats-resume-builder-two-vert.vercel.app](https://ats-resume-builder-two-vert.vercel.app)

---

## ✨ Features

- **5-Step Guided Form** — Personal info, work experience, education, skills, and job description input
- **AI Enhancement** — Rewrites bullet points, generates a professional summary, and tailors content to the job description using Groq's Llama 3.3 70B model
- **ATS Score** — Returns a 0–100 compatibility score with matched keywords
- **PDF Export** — Downloads a clean, ATS-safe single-column resume as PDF
- **Portfolio Page** — One-click generates a beautiful shareable public portfolio from your resume data
- **Serverless** — No backend server needed in production; runs entirely on Vercel

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 5, Tailwind CSS 3, React Router v6 |
| AI | [Groq API](https://console.groq.com) — `llama-3.3-70b-versatile` |
| PDF | react-to-pdf |
| HTTP | Axios |
| Backend (local) | Node.js, Express |
| Deployment | Vercel (SPA + Serverless Functions) |
| Storage | Browser localStorage |

---

## 📁 Project Structure

```
ats-resume-builder/
├── backend/                    # Local dev Express server
│   ├── server.js
│   ├── routes/resume.js        # Groq API call
│   ├── .env.example
│   └── package.json
│
└── frontend/                   # React/Vite app
    ├── api/
    │   └── resume/enhance.js   # Vercel Serverless Function
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Builder.jsx     # 5-step form
    │   │   ├── Preview.jsx     # AI result + PDF download
    │   │   └── Portfolio.jsx   # Shareable portfolio page
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ResumePreview.jsx
    │   ├── api/resumeApi.js
    │   ├── utils/portfolio.js
    │   └── App.jsx
    ├── vercel.json
    ├── vite.config.js
    ├── .env.example
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A free [Groq API key](https://console.groq.com)

### 1. Clone the repository

```bash
git clone https://github.com/Vishnu-1526/AI-Resume-Portfolio-Builder.git
cd AI-Resume-Portfolio-Builder
```

### 2. Set up the frontend

```bash
cd frontend
npm install
cp .env.example .env.local
```

Edit `.env.local`:
```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

### 3. Set up the backend (for local dev)

```bash
cd ../backend
npm install
cp .env.example .env
```

Edit `.env`:
```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
PORT=5000
```

### 4. Run locally

In one terminal (backend):
```bash
cd backend
npm start
```

In another terminal (frontend):
```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ☁️ Deploy to Vercel

The entire app (frontend + API) deploys to Vercel with no separate backend.

```bash
cd frontend
npm install -g vercel
vercel --prod
```

Set these environment variables in your [Vercel Dashboard](https://vercel.com/dashboard) → Project → Settings → Environment Variables:

| Variable | Value |
|---|---|
| `GROQ_API_KEY` | Your Groq API key |
| `GROQ_MODEL` | `llama-3.3-70b-versatile` |

---

## 🔌 API Reference

### `POST /api/resume/enhance`

Enhances resume data using the Groq LLM.

**Request body:**
```json
{
  "personalInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "location": "Bangalore, India",
    "targetRole": "Software Engineer",
    "linkedin": "https://linkedin.com/in/johndoe"
  },
  "experiences": [
    {
      "role": "Junior Developer",
      "company": "TechCorp",
      "duration": "Jan 2023 - Present",
      "description": "Worked on React apps, fixed bugs, wrote tests"
    }
  ],
  "educations": [
    {
      "degree": "B.Tech Computer Science",
      "institution": "XYZ University",
      "year": "2022",
      "grade": "8.5 CGPA"
    }
  ],
  "skills": "React, Node.js, Python, SQL",
  "jobDescription": "Looking for a React developer with REST API experience..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": "Results-driven Software Engineer with 2+ years...",
    "skills": ["React", "Node.js", "Python", "REST APIs", "SQL"],
    "experience": [
      {
        "role": "Junior Developer",
        "company": "TechCorp",
        "duration": "Jan 2023 - Present",
        "bullets": [
          "Developed 3 production React applications serving 10K+ users...",
          "Reduced bug backlog by 40% through systematic testing..."
        ]
      }
    ],
    "atsScore": 87,
    "keywords": ["React", "REST API", "TypeScript", "Agile", "CI/CD"]
  }
}
```

---

## 📸 Screenshots

| Page | Description |
|---|---|
| **Home** | Landing page with feature overview |
| **Builder** | 5-step wizard to input resume data |
| **Preview** | AI-enhanced resume with ATS score + PDF download |
| **Portfolio** | Dark-themed shareable portfolio page |

---

## 📄 License

MIT License — feel free to use, modify, and distribute.

---

## 🙏 Acknowledgements

- [Groq](https://groq.com) for blazing-fast LLM inference
- [Meta AI](https://ai.meta.com) for the Llama 3.3 model
- [Vercel](https://vercel.com) for seamless deployment
- [Tailwind CSS](https://tailwindcss.com) for the utility-first styling

---

> Built as part of the Edunet Foundation AI Internship — February 2026
