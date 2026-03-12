import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import loansApi from "../../../api/Loans";

const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: loan,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["loan-details", id],
    queryFn: () => loansApi.getLoanById(id),
    enabled: Boolean(id),
  });

  if (isLoading) return <p className="text-center mt-10">Loading loan details...</p>;

  if (isError) return <p className="text-center mt-10 text-red-500">Loan details not found.</p>;

  if (!loan) return <p className="text-center mt-10">Loan details not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-5 mt-10 bg-white shadow-lg rounded-xl">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-sm btn-outline mb-4"
      >
        Back
      </button>

      <img src={loan.image} alt={loan.loanTitle || loan.title} className="w-full h-60 object-cover rounded-lg" />
      <h2 className="text-3xl font-bold mt-5">{loan.loanTitle || loan.title}</h2>
      <p className="text-gray-500 mt-2">{loan.category}</p>
      <p className="mt-2 font-medium">Interest: {loan.interest}%</p>
      <p className="mt-1 font-medium">Max Loan Limit: ${loan.maxAmount || loan.limit}</p>
      <p className="mt-4 text-gray-700">{loan.description || "No description available."}</p>
    </div>
  );
};

export default LoanDetails;
