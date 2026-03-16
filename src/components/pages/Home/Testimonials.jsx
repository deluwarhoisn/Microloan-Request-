import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const STORAGE_KEY = 'microloan_user_reviews';

const defaultReviews = [
  {
    id: 'default-1',
    name: 'Nusrat Jahan',
    comment: 'Fast approval and absolutely no hassle. Got my business loan within 48 hours!',
    rating: 5,
  },
  {
    id: 'default-2',
    name: 'Rafiqul Islam',
    comment: 'The process was smooth and the support team was very responsive.',
    rating: 4,
  },
  {
    id: 'default-3',
    name: 'Sadia Akter',
    comment: 'One of the easiest loan experiences I have ever had. Highly recommend!',
    rating: 5,
  },
];

const StarDisplay = ({ rating }) => (
  <div className="flex gap-0.5 text-yellow-400 text-sm">
    {[1, 2, 3, 4, 5].map(star => (
      <FaStar key={star} className={star <= rating ? 'text-yellow-400' : 'text-base-300'} />
    ))}
  </div>
);

const StarInput = ({ value, onChange }) => (
  <div className="flex gap-1 text-2xl cursor-pointer">
    {[1, 2, 3, 4, 5].map(star => (
      <FaStar
        key={star}
        onClick={() => onChange(star)}
        className={star <= value ? 'text-yellow-400' : 'text-base-300 hover:text-yellow-300 transition-colors'}
      />
    ))}
  </div>
);

const Testimonials = () => {
  const [reviews, setReviews] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [form, setForm] = useState({ name: '', comment: '', rating: 0 });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const allReviews = [...defaultReviews, ...reviews];

  const avgRating =
    allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) {
      setError('Please fill in your name and comment.');
      return;
    }
    if (form.rating === 0) {
      setError('Please select a star rating.');
      return;
    }
    setError('');

    const newReview = {
      id: Date.now().toString(),
      name: form.name.trim(),
      comment: form.comment.trim(),
      rating: form.rating,
    };

    const updated = [...reviews, newReview];
    setReviews(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setForm({ name: '', comment: '', rating: 0 });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-20">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Customer Reviews</h2>
        <div className="flex justify-center items-center gap-2 mt-3">
          <StarDisplay rating={Math.round(avgRating)} />
          <span className="text-base-content/60 text-sm">
            {avgRating.toFixed(1)} / 5 &nbsp;·&nbsp; {allReviews.length} reviews
          </span>
        </div>
      </div>

      {/* Review Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      >
        {allReviews.map(review => (
          <motion.div
            key={review.id}
            className="bg-base-100 border border-base-300 rounded-xl p-5 shadow-md"
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4 }}
          >
            <StarDisplay rating={review.rating} />
            <p className="mt-3 text-base-content/80 italic">"{review.comment}"</p>
            <p className="mt-3 text-sm font-semibold text-base-content/60">— {review.name}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Submit Review Form */}
      <div className="max-w-xl mx-auto bg-base-100 border border-base-300 rounded-2xl p-8 shadow-lg">
        <h3 className="text-xl font-bold mb-1">Leave a Review</h3>
        <p className="text-sm text-base-content/50 mb-5">Share your experience with others</p>

        {submitted && (
          <div className="alert alert-success mb-4 text-sm">
            Thank you for your review! ⭐
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="input input-bordered w-full"
            maxLength={60}
          />

          <textarea
            placeholder="Write your review here..."
            value={form.comment}
            onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
            className="textarea textarea-bordered w-full"
            rows={3}
            maxLength={300}
          />

          <div>
            <p className="text-sm text-base-content/60 mb-1">Your Rating</p>
            <StarInput
              value={form.rating}
              onChange={val => setForm(f => ({ ...f, rating: val }))}
            />
          </div>

          {error && <p className="text-error text-sm">{error}</p>}

          <button type="submit" className="btn btn-primary w-full">
            Submit Review
          </button>
        </form>
      </div>
    </section>
  );
};

export default Testimonials;