import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 py-20">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          At MicroLoan, we are committed to providing fast, secure, and flexible loan solutions tailored to your needs. 
          Our mission is to empower individuals and businesses to achieve their goals with reliable financial support.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg text-center"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-semibold mb-2">Fast Approval</h3>
          <p className="text-gray-500">Get approved for loans in just a few minutes.</p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg text-center"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
          <p className="text-gray-500">Your data and money are safe with our secure platform.</p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg text-center"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
          <p className="text-gray-500">Our team is always here to help with your loan queries.</p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg text-center"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-semibold mb-2">Flexible Loans</h3>
          <p className="text-gray-500">Choose plans and amounts that suit your needs.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
