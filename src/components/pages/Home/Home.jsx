import { useQuery } from "@tanstack/react-query";
import { motion as Motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import loansApi from "../../../api/Loans";
import img from "../../../assets/images (1).png";
import Testimonials from "./Testimonials";

const processSteps = [
  {
    title: "Apply Online",
    description: "Fill out a quick digital form with your financial details and required documents.",
  },
  {
    title: "Get Approved",
    description: "Our review team evaluates your request and provides a decision as quickly as possible.",
  },
  {
    title: "Receive Funds",
    description: "Once approved, funds are disbursed through your selected payment channel.",
  },
];

const developerProfile = {
  name: "Deluwar Hosin",
  role: "Frontend and Backend Developer",
  summary:
    "Designs intuitive user interfaces and develops robust backend services to deliver a smooth and secure lending experience.",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const Home = () => {
  const navigate = useNavigate();

  const {
    data: loans = [],
    isLoading: isLoadingLoans,
    isError: isLoansError,
  } = useQuery({
    queryKey: ["popular-loans", 6],
    queryFn: () => loansApi.getPopularLoans(6),
  });

  const highestLimitLoan = loans.reduce(
    (max, loan) => {
      const currentLimit = Number(loan.maxAmount || loan.limit || 0);
      return currentLimit > max ? currentLimit : max;
    },
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-5">

      {/* HERO SECTION */}
      <Motion.div
        className="flex flex-col lg:flex-row items-center gap-10 py-20"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <Motion.div className="flex-1" variants={fadeUp} transition={{ duration: 0.55 }}>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Get Funding Fast, Easy & Secure.
          </h1>
          <p className="mt-5 text-gray-600">
            Apply for personal, business or education loans in minutes with fast approval.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 max-w-md">
            <div className="rounded-lg bg-blue-50 border border-blue-100 p-3">
              <p className="text-xs text-blue-700">Popular Loans</p>
              <p className="text-xl font-bold text-blue-900">{loans.length || 0}+</p>
            </div>
            <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-3">
              <p className="text-xs text-emerald-700">Highest Limit</p>
              <p className="text-xl font-bold text-emerald-900">${highestLimitLoan.toLocaleString()}</p>
            </div>
          </div>

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
        </Motion.div>

        <Motion.img
          src={img}
          alt="loan"
          className="rounded-lg shadow-xl flex-1 max-h-[440px] object-cover"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
        />
      </Motion.div>

      {/* AVAILABLE LOANS */}
      <h2 className="text-3xl font-bold text-center mb-8">Popular Loan Options</h2>

      {isLoadingLoans ? (
        <p className="text-center text-gray-500">Loading loan data...</p>
      ) : isLoansError ? (
        <p className="text-center text-red-500">Failed to load loan data.</p>
      ) : loans.length === 0 ? (
        <p className="text-center text-gray-500">No loan data found.</p>
      ) : (
        <Motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {loans.map((loan, index) => (
            <Motion.div
              key={loan._id}
              className="border rounded-xl p-5 shadow-lg hover:shadow-xl transition-all bg-base-100"
              variants={fadeUp}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              whileHover={{ y: -6, scale: 1.01 }}
            >
              <div className="relative">
                <img src={loan.image} className="w-full h-40 object-cover rounded-lg" />
                <span className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-black/75 text-white">
                  {loan.category || "General"}
                </span>
              </div>

              <h3 className="text-xl font-semibold mt-4">{loan.loanTitle || loan.title}</h3>

              <div className="mt-3 flex items-center justify-between text-sm">
                <p className="text-gray-500">Interest</p>
                <p className="font-semibold text-blue-700">{loan.interest}%</p>
              </div>

              <div className="mt-2 flex items-center justify-between text-sm">
                <p className="text-gray-500">Max Limit</p>
                <p className="font-semibold">${Number(loan.maxAmount || loan.limit || 0).toLocaleString()}</p>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min((Number(loan.interest || 0) / 15) * 100, 100)}%` }}></div>
              </div>

              <Link
                to={`/loan-details/${loan._id}`}
                className="btn btn-primary btn-sm mt-4 w-full"
              >
                View Details
              </Link>
            </Motion.div>
          ))}
        </Motion.div>
      )}

      {/* HOW IT WORKS */}
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>

        <Motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {processSteps.map((step, index) => (
            <Motion.div
              key={step.title}
              className="p-6 border rounded-xl shadow-md bg-base-100"
              variants={fadeUp}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-500">
                {step.description}
              </p>
            </Motion.div>
          ))}
        </Motion.div>
      </div>

      {/* CUSTOMER REVIEWS - Rating System */}
      <Testimonials />

      {/* EXTRA SECTION 1 */}
      <div className="py-16 text-center bg-blue-50 rounded-xl my-10 border border-blue-100">
        <h2 className="text-3xl font-bold">Why Choose Us?</h2>
        <p className="max-w-xl mx-auto mt-4 text-gray-600">
          Trusted by thousands with transparent rates, secure processing, and dedicated support.
        </p>
      </div>

      {/* DEVELOPER CARD */}
      <Motion.div
        className="my-12 bg-gradient-to-br from-white to-slate-100 border border-slate-200 rounded-3xl p-10 shadow-md"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-slate-800">
          👨‍💻 Developer
        </h2>

        <div className="max-w-2xl mx-auto mt-8 bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300">

          {/* Avatar */}
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-md">
            {developerProfile.name.charAt(0)}
          </div>

          {/* Name */}
          <p className="text-2xl font-semibold text-slate-900 mt-4">
            {developerProfile.name}
          </p>

          {/* Role */}
          <p className="text-blue-600 font-medium mt-1 tracking-wide">
            {developerProfile.role}
          </p>

          {/* Divider */}
          <div className="w-16 h-1 bg-blue-500 mx-auto my-4 rounded-full"></div>

          {/* Summary */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {developerProfile.summary}
          </p>

        </div>
      </Motion.div>

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
