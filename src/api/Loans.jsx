const BASE_URL = "https://microloan-request-server.vercel.app";

// Fetch all loans (prefer the endpoint already used across this project).
const getLoans = async () => {
  const endpoints = [`${BASE_URL}/AllLoans`, `${BASE_URL}/loans`];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint);
      if (!res.ok) continue;
      const data = await res.json();
      if (Array.isArray(data)) return data;
    } catch {
      // Try next endpoint.
    }
  }

  throw new Error("Failed to fetch loans.");
};

// Fetch loan by ID from the loan list to avoid unstable single-item endpoints.
const getLoanById = async (id) => {
  const loans = await getLoans();
  const loan = loans.find((item) => String(item?._id) === String(id));

  if (!loan) {
    throw new Error("Loan not found.");
  }

  return loan;
};

const getPopularLoans = async (limit = 6) => {
  const endpoint = `${BASE_URL}/LoanRequests?limit=${limit}`;

  try {
    const res = await fetch(endpoint);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch {
    // Fallback below.
  }

  const loans = await getLoans();
  return loans.slice(0, limit);
};

export default {
  getLoans,
  getLoanById,
  getPopularLoans,
};
