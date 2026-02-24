const STORAGE_KEY = 'ats_portfolios';

/** Save portfolio data and return a unique ID */
export function savePortfolio(personalInfo, enhanced, educations) {
  const id = `${personalInfo.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
  const portfolios = getAllPortfolios();
  portfolios[id] = { personalInfo, enhanced, educations, createdAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
  return id;
}

/** Get a single portfolio by ID */
export function getPortfolio(id) {
  const portfolios = getAllPortfolios();
  return portfolios[id] || null;
}

/** Get all portfolios */
function getAllPortfolios() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}
