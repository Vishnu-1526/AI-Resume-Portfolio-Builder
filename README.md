# 🤖 AI Resume & Portfolio Builder

An AI-powered, ATS-friendly resume builder that enhances your resume using a Large Language Model, scores it against a job description, and generates a shareable portfolio page — all deployable for free on Vercel.

**Acess at:** [ats-resume-builder-two-vert.vercel.app](https://ats-resume-builder-two-vert.vercel.app)

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


## 🙏 Acknowledgements

- [Groq](https://groq.com) for blazing-fast LLM inference
- [Meta AI](https://ai.meta.com) for the Llama 3.3 model
- [Vercel](https://vercel.com) for seamless deployment
- [Tailwind CSS](https://tailwindcss.com) for the utility-first styling


