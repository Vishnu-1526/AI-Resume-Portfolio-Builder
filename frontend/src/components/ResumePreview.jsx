/**
 * ATS-Friendly Resume Preview
 * Clean single-column layout — high ATS parse-ability, no tables/columns.
 */
export default function ResumePreview({ personalInfo, enhanced, educations }) {
  if (!enhanced) return null;

  const { summary, experience, skills, atsScore, keywords } = enhanced;

  return (
    <div
      id="resume-preview"
      className="bg-white font-resume text-[13px] text-gray-900 p-10 max-w-[820px] mx-auto"
      style={{ lineHeight: '1.55' }}
    >
      {/* ── Header ────────────────────────────────────────────────────── */}
      <header className="mb-5 border-b-2 border-gray-900 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 uppercase">
          {personalInfo.name}
        </h1>
        {personalInfo.targetRole && (
          <p className="text-brand-600 font-semibold text-sm mt-0.5">{personalInfo.targetRole}</p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-2 text-xs text-gray-600">
          {personalInfo.email && <span>📧 {personalInfo.email}</span>}
          {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo.linkedin && (
            <span>
              🔗{' '}
              <a href={personalInfo.linkedin} className="text-brand-600 underline">
                {personalInfo.linkedin.replace('https://', '')}
              </a>
            </span>
          )}
        </div>
      </header>

      {/* ── Summary ───────────────────────────────────────────────────── */}
      {summary && (
        <section className="mb-5">
          <SectionTitle>Professional Summary</SectionTitle>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* ── Experience ────────────────────────────────────────────────── */}
      {Array.isArray(experience) && experience.length > 0 && (
        <section className="mb-5">
          <SectionTitle>Work Experience</SectionTitle>
          <div className="space-y-4">
            {experience.map((exp, i) => (
              <div key={i}>
                <div className="flex flex-wrap justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-900">{exp.role}</p>
                    <p className="text-gray-700">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 shrink-0">{exp.duration}</p>
                </div>
                {Array.isArray(exp.bullets) && (
                  <ul className="mt-1.5 space-y-1 list-disc list-outside ml-4">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="text-gray-700">{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Education ─────────────────────────────────────────────────── */}
      {Array.isArray(educations) && educations.length > 0 && (
        <section className="mb-5">
          <SectionTitle>Education</SectionTitle>
          <div className="space-y-2">
            {educations.map((edu, i) => (
              <div key={i} className="flex flex-wrap justify-between">
                <div>
                  <p className="font-bold text-gray-900">{edu.degree}</p>
                  <p className="text-gray-700">{edu.institution}</p>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <p>{edu.year}</p>
                  {edu.grade && <p>{edu.grade}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Skills ────────────────────────────────────────────────────── */}
      {Array.isArray(skills) && skills.length > 0 && (
        <section className="mb-5">
          <SectionTitle>Skills</SectionTitle>
          <p className="text-gray-700">
            {skills.join(' · ')}
          </p>
        </section>
      )}

      {/* ── ATS Keywords (invisible for ATS parsers) ──────────────────── */}
      {Array.isArray(keywords) && keywords.length > 0 && (
        <p className="text-[0px] text-white select-none" aria-hidden="true">
          {keywords.join(' ')}
        </p>
      )}

      {/* ── ATS Score badge (won't appear in PDF but shows in preview) ── */}
      {atsScore && (
        <div className="mt-8 pt-4 border-t border-dashed border-gray-200 flex items-center gap-3 text-xs text-gray-400 no-print">
          <span>ATS Compatibility Score:</span>
          <span
            className={`font-bold text-sm px-2 py-0.5 rounded ${
              atsScore >= 80
                ? 'bg-green-100 text-green-700'
                : atsScore >= 60
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {atsScore} / 100
          </span>
          <span className="text-gray-300">(estimated — not shown in PDF)</span>
        </div>
      )}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-gray-300 pb-1 mb-3">
      {children}
    </h2>
  );
}
