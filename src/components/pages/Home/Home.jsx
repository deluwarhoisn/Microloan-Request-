import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "motion/react"

const Home = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/LoanRequests")
      .then(res => setLoans(res.data))
      .catch(err => console.log(err));
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
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
              Apply Now
            </button>
            <button className="border px-6 py-3 rounded-lg hover:bg-gray-100">
              Explore Loans
            </button>
          </div>
        </div>

        <motion.img
          src="https://via.placeholder.com/500x350"
          alt="loan"
          className="rounded-lg shadow-xl flex-1"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>

      {/* AVAILABLE LOANS */}
      <h2 className="text-3xl font-bold text-center mb-8">Available Loan Options</h2>

      {loans.length === 0 ? (
        <p className="text-center text-gray-500">Loading loans...</p>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
        >
          {loans.map(loan => (
            <motion.div 
              key={loan._id} 
              className="border rounded-xl shadow-md p-5 hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <img src={loan.image} className="w-full h-40 object-cover rounded-lg" />
              <h3 className="text-xl font-semibold mt-4">{loan.loanTitle}</h3>
              <p className="text-gray-500">{loan.category}</p>
              <p className="mt-2 font-medium">Max Limit: ${loan.maxAmount}</p>

              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                View Details
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* HOW IT WORKS */}
      <div className="py-20">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">
          {["Apply Online", "Verify Documents", "Get Approved"].map((step, i) => (
            <motion.div 
              key={i} 
              className="p-6 border rounded-lg shadow-md"
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.2 }}
            >
              <h3 className="text-xl font-semibold">{step}</h3>
              <p className="text-gray-500 mt-2">
                Simple and fast process with complete transparency.
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CUSTOMER FEEDBACK */}
      <div className="py-20">
        <h2 className="text-3xl font-bold text-center mb-10">What Customers Say</h2>

        <motion.div 
          className="bg-gray-100 p-10 rounded-xl text-center max-w-2xl mx-auto"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg italic">
            "Amazing experience! Got my loan approved within 24 hours."
          </p>
          <p className="mt-4 font-semibold">— Rahim, Business Loan</p>
        </motion.div>
      </div>

      {/* EXTRA SECTION 1: WHY CHOOSE US */}
      <section className="py-20 bg-blue-50 rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">
          {["Low Interest Rates", "Fast Approval", "Secure Process"].map((item, index) => (
            <div key={index} className="p-6">
              <h3 className="text-xl font-semibold">{item}</h3>
              <p className="text-gray-500 mt-2">
                Trusted by thousands of users every month.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* EXTRA SECTION 2: FAQ */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>

        <div className="space-y-5 max-w-3xl mx-auto">
          <div className="border p-5 rounded-lg">
            <h4 className="font-semibold">How long does approval take?</h4>
            <p className="text-gray-500">Most requests get approval within 24–48 hours.</p>
          </div>

          <div className="border p-5 rounded-lg">
            <h4 className="font-semibold">Do I need collateral?</h4>
            <p className="text-gray-500">Some loans require it, some don’t — depends on category.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
