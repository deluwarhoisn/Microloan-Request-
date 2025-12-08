import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Shared/Navbar";

const AllLoans = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/loans")
      .then(res => setLoans(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <section>
    
       <div className="max-w-7xl mx-auto px-5 py-10">
      
      <h1 className="text-3xl font-bold text-center mb-10">Available Loans</h1>

      {loans.length === 0 ? (
        <p className="text-center text-gray-500">Loading loans...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loans.map((loan) => (
            <div 
              key={loan._id} 
              className="border rounded-xl shadow-xl p-5 hover:shadow-2xl transition-all duration-300"
            >
              <img 
                src={loan.image} 
                alt={loan.title}
                className="rounded-xl w-full h-40 object-cover"
              />
              <h2 className="text-xl font-semibold mt-4">{loan.title}</h2>
              <p className="text-gray-500">{loan.category}</p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-medium">Interest: {loan.interest}</span>
                <span className="text-sm font-medium">Max: {loan.limit}</span>
              </div>

              <button className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </section>
  );
};

export default AllLoans;
