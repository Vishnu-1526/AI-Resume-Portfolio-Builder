import Groq from 'groq-sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { personalInfo, experience, education, skills, jobDescription } = req.body;

  if (!personalInfo || !experience || !skills || !jobDescription) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

  const systemPrompt = `You are an expert ATS (Applicant Tracking System) resume writer with 10+ years of experience.
Your task is to enhance resume content to be highly ATS-friendly, keyword-optimized, and professionally compelling.
IMPORTANT: Respond ONLY with a valid JSON object, no additional text, no markdown code blocks.`;

  const userPrompt = `Enhance this resume for the given job description. Make bullets action-oriented (start with strong verbs), quantify achievements where possible, and inject relevant ATS keywords from the job description.

JOB DESCRIPTION:
${jobDescription}

CURRENT RESUME DATA:
Name: ${personalInfo.name}
Role Applying For: ${personalInfo.targetRole || 'Not specified'}
Current Experience: ${JSON.stringify(experience, null, 2)}
Education: ${JSON.stringify(education, null, 2)}
Skills: ${skills.join(', ')}

Return ONLY this JSON structure (no markdown, no extra text):
{
  "summary": "2-3 sentence ATS-optimized professional summary tailored to the job",
  "skills": ["keyword1", "keyword2", "...up to 15 relevant skills"],
  "experience": [
    {
      "company": "company name",
      "role": "job title",
      "duration": "duration",
      "location": "location or Remote",
      "bullets": [
        "Action verb + task + measurable result (ATS-optimized)",
        "Action verb + task + measurable result (ATS-optimized)",
        "Action verb + task + measurable result (ATS-optimized)"
      ]
    }
  ],
  "atsScore": 85,
  "keywords": ["top ATS keywords found in job description that were incorporated"]
}`;

  try {
    const result = await client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 2048,
      temperature: 0.4,
    });

    const content = result.choices[0].message.content.trim();
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ success: false, error: 'Model returned invalid format', raw: content });
    }

    const enhanced = JSON.parse(jsonMatch[0]);
    return res.json({ success: true, data: enhanced });
  } catch (err) {
    console.error('Groq API Error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
}
