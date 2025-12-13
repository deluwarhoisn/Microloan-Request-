import React from "react";

const LoanDetails = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Loan Image */}
      <div className="mb-8">
        <img
          src="https://via.placeholder.com/900x400"
          alt="Loan"
          className="w-full h-80 object-cover rounded-xl"
        />
      </div>

      {/* Loan Info */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Personal Micro Loan
        </h1>

        <p className="text-gray-600">
          This loan helps individuals manage personal expenses with flexible
          repayment options and low interest rates.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <p><span className="font-semibold">Category:</span> Personal</p>
          <p><span className="font-semibold">Interest Rate:</span> 8%</p>
          <p><span className="font-semibold">Max Limit:</span> ৳500,000</p>
          <p>
            <span className="font-semibold">EMI Plans:</span> 6, 12, 24 Months
          </p>
        </div>
      </div>

      {/* Apply Button */}
      <div className="mt-10">
        <button
          className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default LoanDetails;
