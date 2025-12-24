import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://microloan-request-server.vercel.app/LoanRequests?limit=6")
      .then((res) => setLoans(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-5">

      {/* ================= HERO SECTION ================= */}
      <motion.section
        className="grid lg:grid-cols-2 gap-12 items-center py-24"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div>
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
            Fast & Secure <span className="text-primary">Micro Loans</span>
          </h1>
          <p className="mt-5 text-gray-600 max-w-md">
            Apply for personal, business or education loans in minutes with quick approval.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate("/loan-form")}
              className="btn btn-primary px-8"
            >
              Apply Now
            </button>

            <button
              onClick={() => navigate("/loans")}
              className="btn btn-outline px-8"
            >
              Explore Loans
            </button>
          </div>
        </div>

        <motion.img
          src="./../../../../public/shutterstock_568573969-min.jpg"
          alt="Loan Hero"
          className="rounded-2xl shadow-xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        />
      </motion.section>

      {/* ================= POPULAR LOANS ================= */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Loan Options
        </h2>

        {loans.length === 0 ? (
          <p className="text-center text-gray-500">Loading loan data...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loans.map((loan) => (
              <motion.div
                key={loan._id}
                className="card bg-base-100 shadow-lg hover:shadow-2xl transition"
                whileHover={{ scale: 1.05 }}
              >
                <figure>
                  <img
                    src={loan.image}
                    alt={loan.loanTitle}
                    className="h-48 w-full object-cover"
                  />
                </figure>

                <div className="card-body">
                  <h3 className="card-title">{loan.loanTitle}</h3>
                  <p className="text-sm text-gray-500">{loan.category}</p>
                  <p className="font-medium">
                    Max Amount:{" "}
                    <span className="text-primary">${loan.maxAmount}</span>
                  </p>

                  <div className="card-actions mt-3">
                    <Link
                      to={`/loan-details/${loan._id}`}
                      className="btn btn-primary btn-sm w-full"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 bg-base-200 rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10 px-6">
          {[
            {
              title: "Apply Online",
              img: "https://i.ibb.co/6yQy5Hf/apply.png",
            },
            {
              title: "Get Approved",
              img: "https://i.ibb.co/0ZcH1TX/approve.png",
            },
            {
              title: "Receive Funds",
              img: "https://i.ibb.co/WKk1hHb/money.png",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-base-100 p-6 rounded-xl shadow-md text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <img src={item.img} className="w-20 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">
                Simple process with fast approval and minimum documents.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Our Clients Say
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Fast approval & very reliable service!",
            "Easy process and helpful support team.",
            "Best micro-loan platform I’ve used.",
          ].map((review, index) => (
            <div
              key={index}
              className="p-6 bg-base-100 shadow-md rounded-xl"
            >
              <p className="text-yellow-500 mb-2">⭐⭐⭐⭐⭐</p>
              <p className="text-gray-600">{review}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 text-center bg-primary text-white rounded-2xl mb-20">
        <h2 className="text-4xl font-bold mb-5">
          Ready to Apply for a Loan?
        </h2>
        <p className="mb-8">
          Apply today and get fast approval with secure processing.
        </p>
        <button
          onClick={() => navigate("/loan-form")}
          className="btn btn-secondary px-10 text-lg"
        >
          Apply Loan Now
        </button>
      </section>

    </div>
  );
};

export default Home;
