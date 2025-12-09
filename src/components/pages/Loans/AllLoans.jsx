import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllLoans = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/AllLoans")
      .then(res => setLoans(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5">
        <h1 className="text-3xl font-bold text-center mb-10">
          Available Loans
        </h1>

        {loans.length === 0 ? (
          <p className="text-center text-gray-500">Loading loans...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loans.map((loan) => (
              <div
                key={loan._id}
                className="border rounded-xl bg-white shadow-lg p-5 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <img
                  src={loan.image || "https://via.placeholder.com/300"}
                  alt={loan.title}
                  className="rounded-xl w-full h-40 object-cover"
                />

                <h2 className="text-xl font-semibold mt-4">{loan.title}</h2>
                <p className="text-sm text-gray-500">{loan.category}</p>

                <div className="flex justify-between items-center mt-4 text-sm font-medium">
                  <span>Interest: {loan.interest}%</span>
                  <span>Max: ${loan.limit}</span>
                </div>

                <Link
                  to={`/loan-details/${loan._id}`}
                  className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all block text-center"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllLoans;
