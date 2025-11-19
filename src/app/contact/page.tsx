'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend, FiCheckCircle } from 'react-icons/fi';
import { socialLinks } from '@/lib/data';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle'
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/mpzodwnz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _replyto: formState.email,
          message: formState.message,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormState({ email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Let me know if you&apos;d like to work together, or if you have any
              comments or questions!
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Your message here..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className={`w-full py-4 px-6 rounded-lg font-medium text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                  status === 'success'
                    ? 'bg-green-500 hover:bg-green-600'
                    : status === 'error'
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:scale-105'
                } ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {status === 'submitting' && (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                )}
                {status === 'success' && (
                  <>
                    <FiCheckCircle className="w-5 h-5" />
                    Message Sent!
                  </>
                )}
                {status === 'error' && <>Failed to send. Please try again.</>}
                {status === 'idle' && (
                  <>
                    <FiSend className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>

              {/* Success Message */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg text-green-700 dark:text-green-300 text-center"
                >
                  Thanks for reaching out! I&apos;ll get back to you soon.
                </motion.div>
              )}
            </form>

            {/* Alternative Contact */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                Or email me directly at:
              </p>
              <a
                href={`mailto:${socialLinks.email}`}
                className="block text-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                {socialLinks.email}
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
