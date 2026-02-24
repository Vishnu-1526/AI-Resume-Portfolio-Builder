import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';
import { getPortfolio } from '../utils/portfolio.js';

export default function Portfolio() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const { toPDF, targetRef } = usePDF({
    filename: `${id}_portfolio.pdf`,
    page: { margin: 15, format: 'A4' },
  });

  useEffect(() => {
    setData(getPortfolio(id));
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'linear-gradient(135deg,#0f0c29 0%,#1a1040 40%,#24243e 100%)' }}>
        <div className="text-center">
          <div className="text-7xl mb-6">🔍</div>
          <h2 className="text-3xl font-bold text-white mb-3">Portfolio not found</h2>
          <p className="text-gray-400 mb-8">This link may have expired or does not exist.</p>
          <Link to="/builder" className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-3 rounded-xl transition">
            Create Your Resume →
          </Link>
        </div>
      </div>
    );
  }

  const { personalInfo, enhanced, educations } = data;
  const { summary, experience, skills, keywords, atsScore } = enhanced;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const initials = personalInfo.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const createdDate = new Date(data.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const skillGradients = ['from-violet-600 to-indigo-600','from-pink-600 to-rose-600','from-cyan-600 to-blue-600','from-emerald-600 to-teal-600','from-orange-600 to-amber-600'];
  const navItems = [{ id:'about',label:'About' },{ id:'experience',label:'Experience' },{ id:'skills',label:'Skills' },{ id:'education',label:'Education' }];

  return (
    <div className="min-h-screen font-sans" style={{ background: 'linear-gradient(135deg,#0f0c29 0%,#1a1040 40%,#24243e 100%)' }}>

      {/* Floating Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/5" style={{ background: 'rgba(15,12,41,0.85)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white"
              style={{ background: 'linear-gradient(135deg,#7c3aed,#db2777)' }}>{initials}</div>
            <span className="text-white font-semibold text-sm hidden sm:block">{personalInfo.name}</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setActiveSection(item.id)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${activeSection === item.id ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleCopyLink} className="text-xs font-medium px-4 py-2 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition">
              {copied ? '✅ Copied!' : '🔗 Share'}
            </button>
            <button onClick={() => toPDF()} className="text-xs font-bold px-4 py-2 rounded-lg text-white" style={{ background: 'linear-gradient(135deg,#7c3aed,#db2777)' }}>
              ⬇ PDF
            </button>
          </div>
        </div>
      </nav>

      <div ref={targetRef} className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">

        {/* Hero */}
        <section className="pt-20 pb-16 text-center relative" id="about">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle,#7c3aed 0%,transparent 70%)' }} />
          <div className="relative inline-block mb-6">
            <div className="w-28 h-28 rounded-full flex items-center justify-center text-4xl font-black text-white mx-auto ring-4 ring-violet-500/30 shadow-2xl shadow-violet-900/50"
              style={{ background: 'linear-gradient(135deg,#7c3aed 0%,#db2777 100%)' }}>
              {initials}
            </div>
            {atsScore && (
              <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-lg ring-2 ring-[#0f0c29]"
                style={{ background: atsScore >= 80 ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(135deg,#f59e0b,#d97706)' }}>
                {atsScore}
              </div>
            )}
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-2 tracking-tight">{personalInfo.name}</h1>
          {personalInfo.targetRole && (
            <p className="text-xl sm:text-2xl font-bold mb-6 text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg,#a78bfa,#f472b6)' }}>
              {personalInfo.targetRole}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full transition">
                📧 {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                📞 {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                📍 {personalInfo.location}
              </span>
            )}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 text-sm bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 px-4 py-2 rounded-full transition">
                🔗 LinkedIn
              </a>
            )}
          </div>
          {summary && (
            <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 p-6 text-left relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ background: 'linear-gradient(180deg,#7c3aed,#db2777)' }} />
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base pl-4">{summary}</p>
            </div>
          )}
          {atsScore && (
            <div className="max-w-3xl mx-auto mt-4 flex items-center gap-4 border border-white/10 rounded-xl px-5 py-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <span className="text-gray-400 text-xs font-medium whitespace-nowrap">ATS Score</span>
              <div className="flex-1 bg-white/10 rounded-full h-2">
                <div className="h-2 rounded-full" style={{ width: `${atsScore}%`, background: atsScore >= 80 ? 'linear-gradient(90deg,#10b981,#34d399)' : 'linear-gradient(90deg,#f59e0b,#fbbf24)' }} />
              </div>
              <span className={`text-sm font-black ${atsScore >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>{atsScore}/100</span>
            </div>
          )}
        </section>

        {/* Experience */}
        {Array.isArray(experience) && experience.length > 0 && (
          <section id="experience" className="mb-16">
            <SectionHeading icon="💼" label="Experience" />
            <div className="relative">
              <div className="absolute left-6 top-2 bottom-2 w-px ml-px" style={{ background: 'linear-gradient(to bottom,#7c3aed,#db2777,transparent)' }} />
              <div className="space-y-8 pl-16">
                {experience.map((exp, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-10 top-1.5 w-4 h-4 rounded-full ring-4 ring-violet-500/20 shadow-lg shadow-violet-500/30"
                      style={{ background: 'linear-gradient(135deg,#7c3aed,#db2777)' }} />
                    <div className="rounded-2xl border border-white/10 p-6 hover:border-violet-500/40 transition-all group" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <h3 className="text-white font-bold text-lg group-hover:text-violet-300 transition">{exp.role}</h3>
                          <p className="text-gray-400 text-sm mt-0.5">{exp.company}{exp.location && <span className="text-gray-500"> · {exp.location}</span>}</p>
                        </div>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full border border-violet-500/30 text-violet-300" style={{ background: 'rgba(124,58,237,0.1)' }}>
                          {exp.duration}
                        </span>
                      </div>
                      {Array.isArray(exp.bullets) && (
                        <ul className="space-y-2.5">
                          {exp.bullets.map((b, bi) => (
                            <li key={bi} className="flex gap-3 text-sm text-gray-300">
                              <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-pink-400" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Skills + Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {Array.isArray(skills) && skills.length > 0 && (
            <section id="skills">
              <SectionHeading icon="⚡" label="Skills" />
              <div className="rounded-2xl border border-white/10 p-6" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((s, i) => (
                    <span key={s} className={`bg-gradient-to-r ${skillGradients[i % skillGradients.length]} text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm`}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}
          {Array.isArray(educations) && educations.length > 0 && (
            <section id="education">
              <SectionHeading icon="🎓" label="Education" />
              <div className="space-y-4">
                {educations.map((edu, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 p-5 hover:border-cyan-500/30 transition-all" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ background: 'linear-gradient(135deg,#0891b2,#2563eb)' }}>🏛️</div>
                      <div>
                        <p className="text-white font-bold text-sm">{edu.degree}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{edu.institution}</p>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <span className="text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">{edu.year}</span>
                          {edu.grade && <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">{edu.grade}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ATS Keywords */}
        {Array.isArray(keywords) && keywords.length > 0 && (
          <section className="mb-16">
            <SectionHeading icon="🎯" label="ATS Keywords" />
            <div className="rounded-2xl border border-emerald-500/20 p-6" style={{ background: 'rgba(16,185,129,0.04)' }}>
              <p className="text-emerald-400 text-xs mb-4 font-medium">✅ These keywords were extracted from the job description and incorporated into your resume.</p>
              <div className="flex flex-wrap gap-2">
                {keywords.map((k) => (
                  <span key={k} className="text-xs font-medium px-3 py-1.5 rounded-full border border-emerald-500/30 text-emerald-300" style={{ background: 'rgba(16,185,129,0.08)' }}>
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">Generated on {createdDate} · AI Resume &amp; Portfolio Builder</p>
          <div className="flex gap-3">
            <button onClick={handleCopyLink} className="text-xs px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition">
              {copied ? '✅ Copied!' : '🔗 Copy Link'}
            </button>
            <button onClick={() => toPDF()} className="text-xs font-bold px-4 py-2 rounded-lg text-white" style={{ background: 'linear-gradient(135deg,#7c3aed,#db2777)' }}>
              ⬇ Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ icon, label }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-xl">{icon}</span>
      <h2 className="text-white font-black text-xl tracking-tight">{label}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
    </div>
  );
}
