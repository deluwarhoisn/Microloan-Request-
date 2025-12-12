// Fetch all loans
const getLoans = async () => {
  const res = await fetch("https://https://microloan-request-server.vercel.app/loans");
  return res.json();
};

// Fetch loan by ID
const getLoanById = async (id) => {
  const res = await fetch(`https://https://microloan-request-server.vercel.app/loans/${id}`);
  return res.json();
};

export default {
  getLoans,
  getLoanById,
};
