import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { enhanceResume } from '../api/resumeApi.js';

// ─── Initial State ────────────────────────────────────────────────────────────
const INIT_PERSONAL = {
  name: '', email: '', phone: '', location: '', linkedin: '', targetRole: '',
};
const INIT_EXP = {
  company: '', role: '', duration: '', location: '', description: '',
};
const INIT_EDU = {
  institution: '', degree: '', year: '', grade: '',
};

const STEPS = ['Personal Info', 'Experience', 'Education', 'Skills & JD', 'Generate'];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Builder() {
  const navigate = useNavigate();
  const { state: incoming } = useLocation();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [personalInfo, setPersonalInfo] = useState(incoming?.personalInfo || INIT_PERSONAL);
  const [experiences, setExperiences] = useState(incoming?.experiences || [{ ...INIT_EXP }]);
  const [educations, setEducations] = useState(incoming?.educations || [{ ...INIT_EDU }]);
  const [skills, setSkills] = useState(incoming?.rawSkills || '');
  const [jobDescription, setJobDescription] = useState(incoming?.jobDescription || '');

  // ── Helpers ──────────────────────────────────────────────────────────────
  const updateExp = (i, field, value) =>
    setExperiences((prev) => prev.map((e, idx) => idx === i ? { ...e, [field]: value } : e));
  const addExp = () => setExperiences((prev) => [...prev, { ...INIT_EXP }]);
  const removeExp = (i) => setExperiences((prev) => prev.filter((_, idx) => idx !== i));

  const updateEdu = (i, field, value) =>
    setEducations((prev) => prev.map((e, idx) => idx === i ? { ...e, [field]: value } : e));
  const addEdu = () => setEducations((prev) => [...prev, { ...INIT_EDU }]);
  const removeEdu = (i) => setEducations((prev) => prev.filter((_, idx) => idx !== i));

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      setError('Please paste a job description.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const enhanced = await enhanceResume({
        personalInfo,
        experience: experiences,
        education: educations,
        skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
        jobDescription,
      });
      navigate('/preview', {
        state: { enhanced, personalInfo, educations, experiences, rawSkills: skills, jobDescription },
      });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* Step Progress */}
      <div className="flex items-center gap-0 mb-10">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center flex-1">
            <button
              onClick={() => i < step && setStep(i)}
              className={`step-indicator shrink-0 transition ${
                i < step
                  ? 'bg-green-500 text-white cursor-pointer hover:bg-green-600'
                  : i === step
                  ? 'bg-brand-600 text-white ring-4 ring-brand-100'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {i < step ? '✓' : i + 1}
            </button>
            {i < STEPS.length - 1 && (
              <div className={`h-1 flex-1 transition-all ${i < step ? 'bg-green-400' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{STEPS[step]}</h2>

      {/* ── Step 0: Personal Info ─────────────────────────────────────── */}
      {step === 0 && (
        <div className="card space-y-4">
          {[
            { id: 'name', label: 'Full Name *', placeholder: 'John Doe' },
            { id: 'email', label: 'Email Address *', placeholder: 'john@example.com' },
            { id: 'phone', label: 'Phone Number', placeholder: '+91 98765 43210' },
            { id: 'location', label: 'Location', placeholder: 'Mumbai, India' },
            { id: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/johndoe' },
            { id: 'targetRole', label: 'Target Job Role *', placeholder: 'Frontend Developer' },
          ].map(({ id, label, placeholder }) => (
            <div key={id}>
              <label className="label">{label}</label>
              <input
                className="input-field"
                placeholder={placeholder}
                value={personalInfo[id]}
                onChange={(e) => setPersonalInfo({ ...personalInfo, [id]: e.target.value })}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── Step 1: Experience ────────────────────────────────────────── */}
      {step === 1 && (
        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <div key={i} className="card space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Experience #{i + 1}</h3>
                {experiences.length > 1 && (
                  <button onClick={() => removeExp(i)} className="text-red-500 text-sm hover:underline">
                    Remove
                  </button>
                )}
              </div>
              {[
                { f: 'company', label: 'Company Name *', ph: 'Google' },
                { f: 'role', label: 'Job Title *', ph: 'Software Engineer' },
                { f: 'duration', label: 'Duration *', ph: 'Jan 2022 – Present' },
                { f: 'location', label: 'Location', ph: 'Bangalore / Remote' },
              ].map(({ f, label, ph }) => (
                <div key={f}>
                  <label className="label">{label}</label>
                  <input
                    className="input-field"
                    placeholder={ph}
                    value={exp[f]}
                    onChange={(e) => updateExp(i, f, e.target.value)}
                  />
                </div>
              ))}
              <div>
                <label className="label">Job Description / Responsibilities *</label>
                <textarea
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Briefly describe what you did, technologies used, and any achievements..."
                  value={exp.description}
                  onChange={(e) => updateExp(i, 'description', e.target.value)}
                />
              </div>
            </div>
          ))}
          <button onClick={addExp} className="btn-secondary w-full">+ Add Another Experience</button>
        </div>
      )}

      {/* ── Step 2: Education ─────────────────────────────────────────── */}
      {step === 2 && (
        <div className="space-y-4">
          {educations.map((edu, i) => (
            <div key={i} className="card space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Education #{i + 1}</h3>
                {educations.length > 1 && (
                  <button onClick={() => removeEdu(i)} className="text-red-500 text-sm hover:underline">
                    Remove
                  </button>
                )}
              </div>
              {[
                { f: 'institution', label: 'Institution *', ph: 'IIT Bombay' },
                { f: 'degree', label: 'Degree / Field of Study *', ph: 'B.Tech in Computer Science' },
                { f: 'year', label: 'Year *', ph: '2019 – 2023' },
                { f: 'grade', label: 'CGPA / Percentage', ph: '8.5 / 10' },
              ].map(({ f, label, ph }) => (
                <div key={f}>
                  <label className="label">{label}</label>
                  <input
                    className="input-field"
                    placeholder={ph}
                    value={edu[f]}
                    onChange={(e) => updateEdu(i, f, e.target.value)}
                  />
                </div>
              ))}
            </div>
          ))}
          <button onClick={addEdu} className="btn-secondary w-full">+ Add Another Education</button>
        </div>
      )}

      {/* ── Step 3: Skills & Job Description ─────────────────────────── */}
      {step === 3 && (
        <div className="card space-y-5">
          <div>
            <label className="label">Skills (comma-separated) *</label>
            <input
              className="input-field"
              placeholder="React, Node.js, Python, SQL, Git, Docker..."
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              List all relevant technical and soft skills.
            </p>
          </div>
          <div>
            <label className="label">Target Job Description *</label>
            <textarea
              rows={10}
              className="input-field resize-none"
              placeholder="Paste the full job description here. The AI will extract keywords and tailor your resume to match..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              The more detailed the JD, the better the AI tailoring.
            </p>
          </div>
        </div>
      )}

      {/* ── Step 4: Generate ──────────────────────────────────────────── */}
      {step === 4 && (
        <div className="card text-center space-y-6">
          {loading ? (
            <div className="py-10">
              <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI is crafting your resume…</h3>
              <p className="text-gray-500 text-sm">
                Groq AI (Llama 3.3) is rewriting your content with ATS-optimized bullet points.
                <br />This may take 20–40 seconds on the free tier.
              </p>
            </div>
          ) : (
            <>
              <div className="text-6xl">🚀</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to generate your resume!
                </h3>
                <p className="text-gray-500 text-sm max-w-sm mx-auto">
                  Click below and our AI will enhance your resume with ATS keywords, strong action
                  verbs, and a professional summary — ready in seconds.
                </p>
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                  {error}
                </div>
              )}
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="btn-primary text-base px-10 py-3 w-full sm:w-auto rounded-xl"
              >
                ✨ Generate ATS Resume
              </button>
            </>
          )}
        </div>
      )}

      {/* ── Navigation ────────────────────────────────────────────────── */}
      {step < 4 && (
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="btn-secondary disabled:opacity-30"
          >
            ← Back
          </button>
          <button
            onClick={() => setStep((s) => s + 1)}
            className="btn-primary"
          >
            {step === 3 ? 'Proceed to Generate →' : 'Next →'}
          </button>
        </div>
      )}
    </main>
  );
}
