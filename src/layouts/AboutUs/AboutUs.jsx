import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const values = [
  {
    title: 'Fast Approval',
    description: 'Most loan requests are reviewed quickly through our streamlined process.',
  },
  {
    title: 'Secure Transactions',
    description: 'We protect sensitive user and transaction data with strong security practices.',
  },
  {
    title: 'Transparent Terms',
    description: 'No hidden terms. Interest, fees, and repayment details are shown clearly.',
  },
  {
    title: 'Human Support',
    description: 'Our support team helps borrowers understand options and next steps.',
  },
];

const milestones = [
  { year: '2022', label: 'Platform Launch' },
  { year: '2023', label: '1K+ Applications Processed' },
  { year: '2024', label: 'Expanded Loan Categories' },
  { year: '2026', label: 'Data-Driven Dashboard Upgrade' },
];

const AboutUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 py-16 space-y-12">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-4">About LoanLink</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          LoanLink helps people and small businesses access reliable financial support with a modern, transparent,
          and user-friendly experience. Our mission is to reduce friction in lending and give every applicant a fair,
          trackable journey from application to approval.
        </p>
      </motion.div>

      <motion.div
        className="bg-slate-900 text-white rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
      >
        <div>
          <p className="text-sm text-slate-300">Borrowers Supported</p>
          <p className="text-3xl font-bold mt-1">5,000+</p>
        </div>
        <div>
          <p className="text-sm text-slate-300">Loan Categories</p>
          <p className="text-3xl font-bold mt-1">12+</p>
        </div>
        <div>
          <p className="text-sm text-slate-300">Support Availability</p>
          <p className="text-3xl font-bold mt-1">24/7</p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((item, index) => (
          <motion.div
            key={item.title}
            className="bg-white p-6 rounded-xl shadow-lg border border-slate-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            whileHover={{ y: -4 }}
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-500">{item.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="bg-blue-50 border border-blue-100 rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold mb-5 text-center">Our Growth Journey</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {milestones.map((item) => (
            <div key={item.year} className="bg-white rounded-xl p-4 border border-blue-100 text-center">
              <p className="text-sm text-blue-700 font-medium">{item.year}</p>
              <p className="font-semibold mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="text-center bg-white rounded-2xl border p-8 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold">Start Your Loan Journey Today</h3>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Explore available loan options, compare terms, and submit your application in minutes.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Link to="/loans" className="btn btn-primary">Explore Loans</Link>
          <Link to="/loan-form" className="btn btn-outline">Apply Now</Link>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
