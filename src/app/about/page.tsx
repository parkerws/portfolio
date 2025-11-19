'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiLinkedin, FiDownload } from 'react-icons/fi';
import { skills, socialLinks } from '@/lib/data';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const skillsByCategory = {
    frontend: skills.filter((s) => s.category === 'frontend'),
    backend: skills.filter((s) => s.category === 'backend'),
    other: skills.filter((s) => s.category === 'other' || s.category === 'tools'),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                About Me
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Software Engineer | Security Practitioner | Data Analyst
            </p>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-12"
          >
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Profile Image */}
              <div className="md:col-span-1 flex justify-center">
                <div className="relative w-48 h-48 rounded-2xl overflow-hidden ring-4 ring-blue-500 dark:ring-blue-400 shadow-xl">
                  <Image
                    src="/images/93026897_10221138784714823_467816329030664192_n.jpg"
                    alt="Will Parker"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Bio Text */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Will Parker
                  </h2>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:scale-110 transition-transform"
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin className="w-5 h-5" />
                  </a>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  I&apos;ve been fascinated by technology since I was a kid. My father,
                  an electrical engineer, inspired me to continue to tinker, learn,
                  and succeed.
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Through a decade of military service, I picked up many perspectives
                  on how technology permeates our everyday lives, and even more so, how
                  it can be used against us when we are most vulnerable. This inspired
                  me to focus on security, both physical and technological, for several
                  years. I learned scripting, how HTTP worked, and how even the most
                  robust security solutions can easily be broken by some clever and
                  inexpensive social engineering.
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  My journey led me to today, where I develop secure software solutions
                  that enable others to thrive. I have experience in back-end
                  technologies/languages such as Node.js, C#/ASP.NET, Entity Framework,
                  and Python/Flask/Django.
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  More recently, I have been determined to take on front-end development
                  as well, working with languages/technologies such as HTML/CSS/JavaScript,
                  React, Next.js, Tailwind CSS, and modern web frameworks.
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  I also picked up skillsets in other domains, such as server
                  administration, ethical hacking, social engineering, machine learning,
                  and data analytics.
                </p>

                {/* Resume Download Button */}
                <div className="pt-4">
                  <a
                    href="/William_Parker_Resume_10OCT2020.pdf"
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:scale-105 transition-transform shadow-lg"
                  >
                    <FiDownload className="w-5 h-5" />
                    Download Resume
                    <span className="text-sm opacity-80">(Oct 2020)</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Technical Skills
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Frontend */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                  Frontend
                </h3>
                <div className="space-y-3">
                  {skillsByCategory.frontend.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          viewport={{ once: true }}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                  Backend
                </h3>
                <div className="space-y-3">
                  {skillsByCategory.backend.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          viewport={{ once: true }}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Skills */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-pink-600 dark:text-pink-400">
                  Other Skills
                </h3>
                <div className="space-y-3">
                  {skillsByCategory.other.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          viewport={{ once: true }}
                          className="bg-gradient-to-r from-pink-500 to-blue-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
