import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddLoan = () => {
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

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoanData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...loanData,
      createdAt: new Date().toISOString(),
      createdBy: "Admin", // optional, could integrate with auth
    };

    try {
      const res = await axios.post("http://localhost:5000/LoanRequests", payload);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Loan Added Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        // Reset form
        setLoanData({
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
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to add loan",
        text: error.message,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-6">Add New Loan</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
        {/* Loan Title */}
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

        {/* Description */}
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

        {/* Category */}
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

        {/* Interest Rate */}
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

        {/* Max Loan Limit */}
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

        {/* Required Documents */}
        <div>
          <label className="block font-medium">Required Documents</label>
          <input
            type="text"
            name="requiredDocuments"
            value={loanData.requiredDocuments}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            placeholder="List documents separated by commas"
          />
        </div>

        {/* EMI Plans */}
        <div>
          <label className="block font-medium">EMI Plans</label>
          <input
            type="text"
            name="emiPlans"
            value={loanData.emiPlans}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            placeholder="e.g., 6 months, 12 months, 24 months"
          />
        </div>

        {/* Image URL */}
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

        {/* Show on Home Toggle */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Loan
        </button>
      </form>
    </div>
  );
};

export default AddLoan;
