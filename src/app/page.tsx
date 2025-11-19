'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi';
import { socialLinks } from '@/lib/data';

export default function Home() {
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-900/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 dark:bg-pink-900/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center justify-center min-h-screen text-center py-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-500 dark:ring-blue-400 shadow-2xl">
              <Image
                src="/images/93026897_10221138784714823_467816329030664192_n.jpg"
                alt="Will Parker"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
              👋 Hey, I&apos;m Will
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Software Engineer
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              Security Practitioner
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              Data Analyst
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8 leading-relaxed"
          >
            I enjoy all aspects of development, from back-end to front-end. I&apos;m
            dedicated to creating{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              secure, dynamic, and responsive
            </span>{' '}
            web applications and software solutions for any situation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link
              href="/projects"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              View My Work
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-gray-200 dark:border-gray-700"
            >
              Get In Touch
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex gap-6"
          >
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="GitHub"
            >
              <FiGithub className="w-6 h-6" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-6 h-6" />
            </a>
            <a
              href={`mailto:${socialLinks.email}`}
              className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="Email"
            >
              <FiMail className="w-6 h-6" />
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-gray-400 dark:text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
