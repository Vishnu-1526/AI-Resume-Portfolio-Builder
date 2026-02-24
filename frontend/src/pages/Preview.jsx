import { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';
import ResumePreview from '../components/ResumePreview.jsx';
import { savePortfolio } from '../utils/portfolio.js';

export default function Preview() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [portfolioLink, setPortfolioLink] = useState('');
  const [copied, setCopied] = useState(false);

  const { toPDF, targetRef } = usePDF({
    filename: `${state?.personalInfo?.name?.replace(/\s+/g, '_') || 'resume'}_ATS.pdf`,
    page: { margin: 20, format: 'A4' },
  });

  if (!state?.enhanced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">No resume data found</h2>
        <p className="text-gray-500 mb-6">Please go through the builder to generate your resume.</p>
        <Link to="/builder" className="btn-primary">Go to Builder →</Link>
      </div>
    );
  }

  const { enhanced, personalInfo, educations } = state;

  const handleCreatePortfolio = () => {
    const id = savePortfolio(personalInfo, enhanced, educations);
    const link = `${window.location.origin}/portfolio/${id}`;
    setPortfolioLink(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your ATS Resume is Ready! 🎉</h1>
          <p className="text-gray-500 text-sm mt-1">
            Review your AI-enhanced resume below, then download it as a PDF.
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/builder" className="btn-secondary text-sm">
            ← Edit Resume
          </Link>
          <button
            onClick={handleCreatePortfolio}
            className="btn-secondary text-sm flex items-center gap-2 border-purple-400 text-purple-600 hover:bg-purple-50"
          >
            🌐 Create Portfolio Page
          </button>
          <button
            onClick={() => toPDF()}
            className="btn-primary text-sm flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>

      {/* Portfolio link banner */}
      {portfolioLink && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl px-5 py-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-purple-800 mb-1">🌐 Portfolio page created!</p>
            <a href={portfolioLink} target="_blank" rel="noreferrer" className="text-purple-600 text-xs underline break-all">
              {portfolioLink}
            </a>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={handleCopyLink} className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium px-3 py-1.5 rounded-lg transition">
              {copied ? '✅ Copied!' : '📋 Copy Link'}
            </button>
            <a href={portfolioLink} target="_blank" rel="noreferrer" className="text-xs bg-purple-600 hover:bg-purple-700 text-white font-medium px-3 py-1.5 rounded-lg transition">
              View →
            </a>
          </div>
        </div>
      )}

      {/* ATS Keywords banner */}
      {Array.isArray(enhanced.keywords) && enhanced.keywords.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 mb-6">
          <p className="text-sm font-semibold text-green-800 mb-2">
            ✅ ATS Keywords Incorporated
          </p>
          <div className="flex flex-wrap gap-2">
            {enhanced.keywords.map((kw) => (
              <span key={kw} className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Resume Preview */}
      <div
        ref={targetRef}
        className="shadow-xl rounded-2xl overflow-hidden ring-1 ring-gray-200"
      >
        <ResumePreview
          personalInfo={personalInfo}
          enhanced={enhanced}
          educations={educations}
        />
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          Not satisfied? Go back and tweak your information, then regenerate.
        </p>
        <div className="flex justify-center gap-4 mt-3">
          <Link to="/builder" className="btn-secondary text-sm">← Rebuild Resume</Link>
          <button onClick={() => toPDF()} className="btn-primary text-sm">
            ⬇ Download PDF
          </button>
        </div>
      </div>
    </main>
  );
}
