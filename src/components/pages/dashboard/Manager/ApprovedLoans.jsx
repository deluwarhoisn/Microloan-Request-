import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const ApprovedLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/loan-applications")
      .then(res => {
        const approved = res.data.filter(loan => loan.status === "Approved");
        setLoans(approved);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Approved Loans</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white dark:bg-gray-900 rounded-md shadow">
          <thead>
            <tr>
              <th className="px-4 py-2">Loan ID</th>
              <th className="px-4 py-2">User Info</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Approved Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map(loan => (
              <tr key={loan._id} className="border-t">
                <td className="px-4 py-2">{loan._id}</td>
                <td className="px-4 py-2">{loan.displayName} <br /> {loan.email}</td>
                <td className="px-4 py-2">${loan.amount}</td>
                <td className="px-4 py-2">{new Date(loan.approvedDate).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedLoans;
