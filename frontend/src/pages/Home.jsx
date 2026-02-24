import { Link } from 'react-router-dom';

const features = [
  {
    icon: '🤖',
    title: 'AI-Powered Enhancement',
    desc: 'Hugging Face LLM rewrites your bullet points with action verbs and quantifiable results.',
  },
  {
    icon: '✅',
    title: 'ATS Optimized',
    desc: 'Keywords from the job description are intelligently woven into your resume content.',
  },
  {
    icon: '🌐',
    title: 'Shareable Portfolio Page',
    desc: 'Generate a beautiful public portfolio page with a shareable link — no signup needed.',
  },
  {
    icon: '📄',
    title: 'One-Click PDF Export',
    desc: 'Download a clean, professional PDF ready to submit to any job portal.',
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 text-white py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
            AI + ATS Friendly
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
            Build an ATS Resume &amp;&nbsp;
            <span className="text-yellow-300">Portfolio Page</span> with AI
          </h1>
          <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
            Paste your experience, add the job description, and let our AI generate an
            ATS-optimized resume tailored specifically for the role you want.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/builder"
              className="bg-white text-brand-700 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition text-center shadow-lg"
            >
              Build My Resume →
            </Link>
            <a
              href="#how-it-works"
              className="border border-white/50 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition text-center"
            >
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4" id="how-it-works">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Use AI Resume Builder?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card text-center hover:shadow-md transition">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-brand-50 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <ol className="space-y-6 relative border-l-2 border-brand-200 ml-4">
            {[
              { n: 1, title: 'Enter Your Details', desc: 'Fill in personal info, work experience, education, and skills.' },
              { n: 2, title: 'Paste the Job Description', desc: 'Add the job posting you\'re targeting so AI can tailor your resume.' },
              { n: 3, title: 'AI Enhances Your Resume', desc: 'Groq-powered Llama model rewrites your content with ATS keywords and strong action verbs.' },
              { n: 4, title: 'Download PDF & Share Portfolio', desc: 'Download a polished PDF and instantly publish a shareable portfolio webpage.' },
            ].map(({ n, title, desc }) => (
              <li key={n} className="ml-8 pb-4">
                <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-brand-600 rounded-full text-white font-bold text-sm">
                  {n}
                </span>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600 mt-1">{desc}</p>
              </li>
            ))}
          </ol>
          <div className="text-center mt-12">
            <Link to="/builder" className="btn-primary text-base px-10 py-3 inline-block rounded-xl">
              Get Started — It's Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-sm text-center py-6">
        Built with React · Tailwind · Express · Groq AI &nbsp;|&nbsp; Edunet Internship Project
      </footer>
    </main>
  );
}
