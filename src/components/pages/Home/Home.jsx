import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import img from '../../../assets/images (1).png'

const Home = () => {
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/LoanRequests?limit=6")
      .then((res) => setLoans(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-5">

      {/* HERO SECTION */}
      <motion.div
        className="flex flex-col lg:flex-row items-center gap-10 py-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex-1">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Get Funding Fast, Easy & Secure.
          </h1>
          <p className="mt-5 text-gray-600">
            Apply for personal, business or education loans in minutes with fast approval.
          </p>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => navigate("/loan-form")}
              className="btn btn-primary px-6 py-3 rounded-lg"
            >
              Apply Now
            </button>

            <button
              onClick={() => navigate("/loans")}
              className="btn border px-6 py-3 rounded-lg"
            >
              Explore Loans
            </button>
          </div>
        </div>

        <motion.img
          src={img}
          alt="loan"
          className="rounded-lg shadow-xl flex-1"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>

      {/* AVAILABLE LOANS */}
      <h2 className="text-3xl font-bold text-center mb-8">Popular Loan Options</h2>

      {loans.length === 0 ? (
        <p className="text-center text-gray-500">Loading loan data...</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
        >
          {loans.map((loan) => (
            <motion.div
              key={loan._id}
              className="border rounded-xl p-5 shadow-lg hover:shadow-xl transition-all bg-base-100"
              whileHover={{ scale: 1.05 }}
            >
              <img src={loan.image} className="w-full h-40 object-cover rounded-lg" />
              <h3 className="text-xl font-semibold mt-4">{loan.loanTitle}</h3>
              <p className="text-gray-500">{loan.category}</p>
              <p className="mt-2 font-medium">Max Limit: ${loan.maxAmount}</p>

              <Link
                to={`/loan-details/${loan._id}`}
                onClick={() => navigate(`/loan/${loan._id}`)}
                className="btn btn-primary btn-sm mt-4 w-full"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* HOW IT WORKS */}
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {["Apply Online", "Get Approved", "Receive Funds"].map((step, index) => (
            <motion.div
              key={index}
              className="p-6 border rounded-xl shadow-md bg-base-100"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <h3 className="text-xl font-bold mb-3">{step}</h3>
              <p className="text-gray-500">
                Fast processing with easy required documents and approval system.
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CUSTOMER FEEDBACK */}
      <div className="py-20">
        <h2 className="text-3xl font-bold text-center mb-8">What Clients Say</h2>
        <div className="carousel rounded-box">
          <div className="carousel-item p-5 bg-base-200 rounded-lg shadow-md">
            ⭐⭐⭐⭐⭐ "Fast approval and no hassle!"
          </div>
          <div className="carousel-item p-5 bg-base-200 rounded-lg shadow-md">
            ⭐⭐⭐⭐⭐ "Very good support and easy process!"
          </div>
          <div className="carousel-item p-5 bg-base-200 rounded-lg shadow-md">
            ⭐⭐⭐⭐⭐ "Best loan service. Highly recommended!"
          </div>
        </div>
      </div>

      {/* EXTRA SECTION 1 */}
      <div className="py-16 text-center bg-blue-50 rounded-xl my-10">
        <h2 className="text-3xl font-bold">Why Choose Us?</h2>
        <p className="max-w-xl mx-auto mt-4 text-gray-600">
          Trusted by thousands with secure loan process and 24/7 support.
        </p>
      </div>

      {/* EXTRA SECTION 2 - CTA */}
      <div className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Apply?</h2>
        <button onClick={() => navigate("/loan-form")} className="btn btn-primary px-10 py-4 text-lg">
          Apply Loan Now
        </button>
      </div>

    </div>
  );
};

export default Home;
