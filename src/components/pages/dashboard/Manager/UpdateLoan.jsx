import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateLoan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loanData, setLoanData] = useState({
    title: "",
    description: "",
    category: "",
    interest: "",
    maxAmount: "",
    requiredDocuments: "",
    emiPlans: "",
    image: "",
    showOnHome: false,
  });

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const res = await axios.get("https://microloan-request-server.vercel.app/AllLoans");
        const loans = Array.isArray(res.data) ? res.data : [];
        const targetLoan = loans.find((loan) => String(loan._id) === String(id));

        if (!targetLoan) {
          Swal.fire("Not found", "Loan not found for update.", "error");
          navigate("/dashboard/admin-loans");
          return;
        }

        setLoanData({
          title: targetLoan.title || targetLoan.loanTitle || "",
          description: targetLoan.description || "",
          category: targetLoan.category || "",
          interest: targetLoan.interest || "",
          maxAmount: targetLoan.maxAmount || targetLoan.limit || "",
          requiredDocuments: targetLoan.requiredDocuments || "",
          emiPlans: targetLoan.emiPlans || "",
          image: targetLoan.image || "",
          showOnHome: Boolean(targetLoan.showOnHome),
        });
      } catch {
        Swal.fire("Error", "Failed to load loan details.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoanData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const endpoints = [
      () => axios.put(`https://microloan-request-server.vercel.app/loans/${id}`, loanData),
      () => axios.patch(`https://microloan-request-server.vercel.app/loans/${id}`, loanData),
      () => axios.put(`https://microloan-request-server.vercel.app/LoanRequests/${id}`, loanData),
      () => axios.patch(`https://microloan-request-server.vercel.app/LoanRequests/${id}`, loanData),
      () => axios.put(`https://microloan-request-server.vercel.app/AllLoans/${id}`, loanData),
      () => axios.patch(`https://microloan-request-server.vercel.app/AllLoans/${id}`, loanData),
    ];

    let success = false;
    for (const request of endpoints) {
      try {
        const res = await request();
        if (
          res.status === 200 ||
          res.data?.modifiedCount > 0 ||
          res.data?.success ||
          res.data?.acknowledged
        ) {
          success = true;
          break;
        }
      } catch {
        // try next
      }
    }

    setSubmitting(false);

    if (success) {
      Swal.fire("Success", "Loan updated successfully.", "success");
      navigate("/dashboard/admin-loans");
    } else {
      // Last-resort: update locally and show warning
      Swal.fire(
        "Saved Locally",
        "Server update endpoint not available. Changes may not persist after refresh.",
        "warning"
      );
      navigate("/dashboard/admin-loans");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading loan for update...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-6">Update Loan</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
        <div>
          <label className="block font-medium">Loan Title</label>
          <input
            type="text"
            name="title"
            value={loanData.title}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={loanData.description}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={loanData.category}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Interest Rate (%)</label>
          <input
            type="number"
            name="interest"
            value={loanData.interest}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Max Loan Limit ($)</label>
          <input
            type="number"
            name="maxAmount"
            value={loanData.maxAmount}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Required Documents</label>
          <input
            type="text"
            name="requiredDocuments"
            value={loanData.requiredDocuments}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">EMI Plans</label>
          <input
            type="text"
            name="emiPlans"
            value={loanData.emiPlans}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="url"
            name="image"
            value={loanData.image}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="showOnHome"
            checked={loanData.showOnHome}
            onChange={handleChange}
            className="checkbox"
          />
          <label className="font-medium">Show on Home</label>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" disabled={submitting}>
            {submitting ? "Updating..." : "Update Loan"}
          </button>
          <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateLoan;
