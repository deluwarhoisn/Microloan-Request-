import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const LoanDetails = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);

  useEffect(() => {
  axios.get(`http://localhost:5000/loan-details/${id}`) // ✅ "details" matches server
    .then(res => {
      if (res.data.success) {
        setLoan(res.data.loan);
      }
    })
    .catch(err => console.log(err));
}, [id]);


  if (!loan) return <p className="text-center mt-10">Loading loan details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-5 mt-10 bg-white shadow-lg rounded-xl">
      <img src={loan.image} alt={loan.loanTitle} className="w-full h-60 object-cover rounded-lg" />
      <h2 className="text-3xl font-bold mt-5">{loan.loanTitle}</h2>
      <p className="text-gray-500 mt-2">{loan.category}</p>
      <p className="mt-2 font-medium">Interest: {loan.interest}%</p>
      <p className="mt-1 font-medium">Max Loan Limit: ${loan.maxAmount}</p>
      <p className="mt-4 text-gray-700">{loan.description || "No description available."}</p>
    </div>
  );
};

export default LoanDetails;
