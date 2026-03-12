import React from "react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import loansApi from "../../../api/Loans";

const AllLoans = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [compareIds, setCompareIds] = useState([]);
  const [savedIds, setSavedIds] = useState(() => {
    const raw = localStorage.getItem("saved_loan_ids");
    return raw ? JSON.parse(raw) : [];
  });

  const {
    data: loans = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["loans"],
    queryFn: loansApi.getLoans,
  });

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(loans.map((loan) => loan.category).filter(Boolean)));
    return ["all", ...uniqueCategories];
  }, [loans]);

  const visibleLoans = useMemo(() => {
    let filtered = loans.filter((loan) => {
      const title = loan.loanTitle || loan.title || "";
      const category = loan.category || "";
      const matchesSearch = title.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory = selectedCategory === "all" || category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === "interest-asc") {
      filtered = [...filtered].sort((a, b) => Number(a.interest || 0) - Number(b.interest || 0));
    }
    if (sortBy === "interest-desc") {
      filtered = [...filtered].sort((a, b) => Number(b.interest || 0) - Number(a.interest || 0));
    }
    if (sortBy === "amount-desc") {
      filtered = [...filtered].sort((a, b) => Number(b.maxAmount || b.limit || 0) - Number(a.maxAmount || a.limit || 0));
    }

    return filtered;
  }, [loans, searchText, selectedCategory, sortBy]);

  const compareLoans = useMemo(() => {
    return loans.filter((loan) => compareIds.includes(loan._id));
  }, [loans, compareIds]);

  const handleToggleCompare = (loanId) => {
    setCompareIds((prev) => {
      if (prev.includes(loanId)) {
        return prev.filter((id) => id !== loanId);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, loanId];
    });
  };

  const handleToggleSave = (loanId) => {
    setSavedIds((prev) => {
      const next = prev.includes(loanId) ? prev.filter((id) => id !== loanId) : [...prev, loanId];
      localStorage.setItem("saved_loan_ids", JSON.stringify(next));
      return next;
    });
  };

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5">
        <h1 className="text-3xl font-bold text-center mb-10">
          Available Loans
        </h1>

        <div className="bg-white border rounded-xl p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by loan title"
            className="input input-bordered w-full"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select select-bordered w-full"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="default">Sort: Default</option>
            <option value="interest-asc">Interest: Low to High</option>
            <option value="interest-desc">Interest: High to Low</option>
            <option value="amount-desc">Max Amount: High to Low</option>
          </select>

          <button
            onClick={() => {
              setSearchText("");
              setSelectedCategory("all");
              setSortBy("default");
            }}
            className="btn btn-outline"
          >
            Reset Filters
          </button>
        </div>

        {compareLoans.length > 0 && (
          <div className="bg-slate-900 text-white rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Quick Compare ({compareLoans.length}/3)</h2>
              <button className="btn btn-xs btn-outline text-white" onClick={() => setCompareIds([])}>
                Clear
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr className="text-slate-200">
                    <th>Loan</th>
                    <th>Category</th>
                    <th>Interest</th>
                    <th>Max Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {compareLoans.map((loan) => (
                    <tr key={loan._id}>
                      <td>{loan.loanTitle || loan.title}</td>
                      <td>{loan.category}</td>
                      <td>{loan.interest}%</td>
                      <td>${loan.maxAmount || loan.limit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {isLoading ? (
          <p className="text-center text-gray-500">Loading loans...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load loans.</p>
        ) : visibleLoans.length === 0 ? (
          <p className="text-center text-gray-500">No loans match your filter.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleLoans.map((loan) => (
              <div
                key={loan._id}
                className="border rounded-xl bg-white shadow-lg p-5 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <img
                  src={loan.image || "https://via.placeholder.com/300"}
                  alt={loan.loanTitle || loan.title}
                  className="rounded-xl w-full h-40 object-cover"
                />

                <h2 className="text-xl font-semibold mt-4">{loan.loanTitle || loan.title}</h2>
                <p className="text-sm text-gray-500">{loan.category}</p>

                <div className="flex justify-between items-center mt-4 text-sm font-medium">
                  <span>Interest: {loan.interest}%</span>
                  <span>Max: ${loan.maxAmount || loan.limit}</span>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleToggleCompare(loan._id)}
                    className={`btn btn-xs ${compareIds.includes(loan._id) ? "btn-warning" : "btn-outline"}`}
                  >
                    {compareIds.includes(loan._id) ? "Remove Compare" : "Compare"}
                  </button>

                  <button
                    onClick={() => handleToggleSave(loan._id)}
                    className={`btn btn-xs ${savedIds.includes(loan._id) ? "btn-success" : "btn-outline"}`}
                  >
                    {savedIds.includes(loan._id) ? "Saved" : "Save"}
                  </button>
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
