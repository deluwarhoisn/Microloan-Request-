import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import loansApi from "../../../api/Loans";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";

const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, isManager } = useUserRole();
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

  const canApply = user && !isAdmin && !isManager;

  return (
    <div className="max-w-3xl mx-auto p-5 mt-10 bg-base-100 shadow-lg rounded-xl">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-sm btn-outline mb-4"
      >
        Back
      </button>

      <img src={loan.image} alt={loan.loanTitle || loan.title} className="w-full h-60 object-cover rounded-lg" />
      <h2 className="text-3xl font-bold mt-5">{loan.loanTitle || loan.title}</h2>
      <p className="text-base-content/60 mt-2">{loan.category}</p>

      <div className="grid grid-cols-2 gap-4 mt-4 bg-base-200 rounded-xl p-4">
        <div>
          <p className="text-xs text-base-content/50 uppercase tracking-wide">Interest Rate</p>
          <p className="text-xl font-bold text-primary">{loan.interest}%</p>
        </div>
        <div>
          <p className="text-xs text-base-content/50 uppercase tracking-wide">Max Loan Limit</p>
          <p className="text-xl font-bold">${Number(loan.maxAmount || loan.limit || 0).toLocaleString()}</p>
        </div>
        {loan.emiPlans && (
          <div className="col-span-2">
            <p className="text-xs text-base-content/50 uppercase tracking-wide">Available EMI Plans</p>
            <p className="font-medium">{loan.emiPlans}</p>
          </div>
        )}
      </div>

      <p className="mt-4 text-base-content/80 leading-relaxed">{loan.description || "No description available."}</p>

      <div className="mt-6">
        {canApply ? (
          <Link
            to="/loan-form"
            state={{ loan }}
            className="btn btn-primary w-full text-base"
          >
            Apply Now
          </Link>
        ) : !user ? (
          <Link
            to="/login"
            state={{ from: `/loan-details/${id}` }}
            className="btn btn-outline btn-primary w-full text-base"
          >
            Login to Apply
          </Link>
        ) : (
          <div className="alert alert-info text-sm">
            Admin and Manager accounts cannot apply for loans.
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanDetails;
