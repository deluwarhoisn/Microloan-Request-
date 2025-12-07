// Fetch all loans
const getLoans = async () => {
  const res = await fetch("http://localhost:5000/loans");
  return res.json();
};

// Fetch loan by ID
const getLoanById = async (id) => {
  const res = await fetch(`http://localhost:5000/loans/${id}`);
  return res.json();
};

export default {
  getLoans,
  getLoanById,
};
