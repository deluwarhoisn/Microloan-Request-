import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider"; // Adjust path if needed
import Swal from "sweetalert2";

const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loan, setLoan] = useState(null);
  const { user } = useContext(AuthContext); // Current logged-in user

  useEffect(() => {
    axios
      .get(`https://microloan-request-server.vercel.app/loan-details/${id}`)
      .then((res) => {
        if (res.data.success) setLoan(res.data.loan);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!loan) return <p className="text-center mt-10">Loading loan details...</p>;

  const handleApplyNow = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to apply for this loan.",
      });
      navigate("/login");
      return;
    }

    if (user.role === "Admin" || user.role === "Manager") {
      Swal.fire({
        icon: "info",
        title: "Access Denied",
        text: "Admins or Managers cannot apply for loans.",
      });
      return;
    }

    // Redirect to loan application form with loan ID
    navigate("/loan-form", { state: { loanId: id, loanTitle: loan.loanTitle } });
  };

  return (
    <div className="max-w-3xl mx-auto p-5 mt-10 bg-white shadow-lg rounded-xl">
      <img
        src={loan.image}
        alt={loan.loanTitle}
        className="w-full h-60 object-cover rounded-lg"
      />
      <h2 className="text-3xl font-bold mt-5">{loan.loanTitle}</h2>
      <p className="text-gray-500 mt-2">{loan.category}</p>
      <p className="mt-2 font-medium">Interest: {loan.interest}%</p>
      <p className="mt-1 font-medium">Max Loan Limit: ${loan.maxAmount}</p>

      {/* EMI Plans */}
      {loan.emiPlans && loan.emiPlans.length > 0 && (
        <div className="mt-3">
          <h3 className="font-semibold">Available EMI Plans:</h3>
          <ul className="list-disc list-inside">
            {loan.emiPlans.map((plan, idx) => (
              <li key={idx}>{plan}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 text-gray-700">{loan.description || "No description available."}</p>

      {/* Apply Now Button */}
      <button
        onClick={handleApplyNow}
        className={`mt-6 w-full py-2 rounded-lg text-white font-medium ${
          !user || user.role === "Admin" || user.role === "Manager"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
        disabled={!user || user.role === "Admin" || user.role === "Manager"}
      >
        Apply Now
      </button>
    </div>
  );
};

export default LoanDetails;
