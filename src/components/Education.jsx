import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUniversity, FaSchool, FaMapMarkerAlt, FaCalendarAlt, FaGraduationCap, FaBook, FaTrophy } from "react-icons/fa";

const educationData = [
  {
    icon: <FaUniversity />,
    school: "University of Engineering and Technology, Lahore",
    degree: "Bachelor of Science in Computer Science",
    year: "Sep 2023 - Present",
    location: "Lahore, Pakistan",
    expected: null,
    gpa: "3.59/4.0",
    description: "Pursuing a comprehensive computer science degree with focus on AI/ML, software engineering, and data science.",
    coursework: [
      "Artificial Intelligence",
      "Data Structures and Algorithms",
      "Object Oriented Programming",
      "Software Engineering",
      "Applied Probability and Statistics",
      "Database Systems",
      "Computer Vision",
      "Linear Algebra",
      "Multivariate Calculus"
    ],
    achievements: null
  },
  {
    icon: <FaSchool />,
    school: "Punjab College, Sadiqabad",
    degree: "Intermediate in Computer Science (ICS)",
    year: "2020 - 2022",
    location: "Sadiqabad, Pakistan",
    expected: null,
    gpa: null,
    marks: "1018/1100",
    description: "Completed intermediate education with focus on Computer Science, Mathematics, and Physics.",
    coursework: [
      "Computer Science",
      "Mathematics",
      "Physics",
      "English"
    ],
    achievements: null
  }
];

const Education = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const checkTheme = () => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section
      id="education"
      className={`min-h-screen py-20 transition-colors duration-500 flex flex-col items-center px-6 md:px-16
        ${theme === "dark"
          ? "bg-gradient-to-br from-[#18181b] via-[#232336] to-[#18181b] text-white"
          : "bg-gradient-to-br from-[#f3f4f6] via-[#e0e7ef] to-[#f3f4f6] text-gray-900"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className={`text-5xl md:text-6xl font-bold mb-4 font-mono transition-colors duration-500
          ${theme === "dark" ? "text-purple-400" : "text-purple-700"}`}>
          Education
        </h2>
        <p className={`text-lg font-mono ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>
          Academic journey in computer science and technology
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-6xl relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Timeline Line */}
        <div className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-1 transform md:-translate-x-1/2 rounded-full
          ${theme === "dark" 
            ? "bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500" 
            : "bg-gradient-to-b from-purple-400 via-pink-400 to-cyan-400"}`}
        />

        {educationData.map((edu, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className={`relative flex items-start mb-16 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
          >
            {/* Timeline Dot with Icon */}
            <div className={`absolute left-8 md:left-1/2 w-16 h-16 rounded-full transform -translate-x-1/2 z-10 flex items-center justify-center
              ${theme === "dark"
                ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30"
                : "bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg shadow-purple-300/50"}`}
            >
              <span className="text-white text-2xl">{edu.icon}</span>
            </div>

            {/* Content Card */}
            <div className={`w-[calc(100%-5rem)] ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${idx % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className={`p-6 rounded-2xl shadow-xl transition-all duration-300 border
                  ${theme === "dark"
                    ? "bg-[#232336] border-white/10 hover:border-purple-500/50 hover:shadow-purple-500/20"
                    : "bg-white border-indigo-100 hover:border-purple-300 hover:shadow-purple-200/50"}`}
              >
                {/* Header */}
                <div className="mb-4">
                  <h3 className={`text-xl md:text-2xl font-bold font-mono mb-2
                    ${theme === "dark" ? "text-white" : "text-indigo-900"}`}>
                    {edu.school}
                  </h3>
                  <p className={`text-lg font-semibold flex items-center gap-2
                    ${theme === "dark" ? "text-cyan-400" : "text-cyan-700"}`}>
                    <FaGraduationCap />
                    {edu.degree}
                  </p>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 mb-4">
                  <span className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full
                    ${theme === "dark"
                      ? "bg-pink-500/20 text-pink-300"
                      : "bg-pink-100 text-pink-600"}`}>
                    <FaCalendarAlt />
                    {edu.year}
                  </span>
                  <span className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full
                    ${theme === "dark"
                      ? "bg-cyan-500/20 text-cyan-300"
                      : "bg-cyan-100 text-cyan-600"}`}>
                    <FaMapMarkerAlt />
                    {edu.location}
                  </span>
                  {edu.gpa && (
                    <span className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full
                      ${theme === "dark"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-green-100 text-green-600"}`}>
                      GPA: {edu.gpa}
                    </span>
                  )}
                  {edu.marks && (
                    <span className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full
                      ${theme === "dark"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-green-100 text-green-600"}`}>
                      Marks: {edu.marks}
                    </span>
                  )}
                </div>

                {edu.expected && (
                  <p className={`text-sm mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    {edu.expected}
                  </p>
                )}

                {/* Description */}
                <p className={`text-sm leading-relaxed mb-4
                  ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  {edu.description}
                </p>

                {/* Coursework */}
                {edu.coursework && (
                  <div className={`p-4 rounded-xl mb-4 border
                    ${theme === "dark"
                      ? "bg-[#18181b]/50 border-cyan-500/20"
                      : "bg-gray-50 border-gray-200"}`}>
                    <div className={`font-bold mb-3 flex items-center gap-2 text-sm
                      ${theme === "dark" ? "text-cyan-400" : "text-cyan-700"}`}>
                      <FaBook />
                      Relevant Coursework
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className={`px-3 py-1 rounded-lg text-xs font-mono
                            ${theme === "dark"
                              ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30"
                              : "bg-gradient-to-r from-cyan-50 to-purple-50 text-cyan-700 border border-cyan-200"}`}
                        >
                          {course}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}


              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Education;