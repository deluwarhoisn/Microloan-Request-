import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loan, setLoan] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/LoanRequests/${id}`)
      .then(res => setLoan(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!loan)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-20 px-10">
      <h1 className="text-4xl font-bold mb-4">{loan.title}</h1>
      <img
        src={loan.image || "https://via.placeholder.com/600x400"}
        alt={loan.title}
        className="w-full h-96 object-cover rounded mb-6"
      />
      <p className="mb-4">{loan.shortDesc || "No description available."}</p>
      <p className="font-bold mb-2">Max Loan: ${loan.maxLimit || "N/A"}</p>
      <p className="mb-4">{loan.details || "No further details available."}</p>
      <button
        onClick={() => navigate(`/apply/${loan._id}`)}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Apply Now
      </button>
    </div>
  );
};

export default LoanDetails;
