import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const experienceData = [
  {
    title: "AI/ML Intern",
    company: "LYSA Labs",
    location: "Remote",
    period: "Jul 2025 - Aug 2025",
    type: "Internship",
    description: "Worked on machine learning projects including CNN model optimization, web scraping automation, and API development.",
    responsibilities: [
      "Implemented and fine-tuned a CNN model on the MNIST dataset, optimizing hyperparameters for improved digit recognition performance",
      "Designed and developed an automated web scraping solution for the Taiwan Market Observation Post System (MOPS) to collect structured financial and disclosure data",
      "Developed and deployed machine learning APIs using FastAPI for model inference and integration",
      "Completed a 100 Days of Machine Learning course, gaining hands-on experience with model architectures, training workflows, and backend ML concepts"
    ],
    technologies: ["Python", "TensorFlow", "FastAPI", "Web Scraping", "CNN"]
  },
  {
    title: "Freelance Software Developer",
    company: "Fiverr",
    location: "Remote",
    period: "Oct 2025 - Present",
    type: "Freelance",
    description: "Delivering custom software and web solutions to clients worldwide, specializing in database-driven systems and ML applications.",
    responsibilities: [
      "Delivered custom software and web solutions, including database-driven systems and responsive user interfaces",
      "Developed Windows Forms and Console applications using C# and .NET",
      "Built full-stack web applications using HTML, CSS, JavaScript, and the MERN stack",
      "Performed machine learning model tuning and optimization on custom datasets"
    ],
    technologies: ["C#", ".NET", "MERN Stack", "HTML", "CSS", "JavaScript", "Machine Learning"]
  }
];

const Experience = () => {
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
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  return (
    <section
      id="experience"
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
          Experience
        </h2>
        <p className={`text-lg font-mono ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>
          My professional journey and work experience
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-4xl relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Timeline Line */}
        <div className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 transform md:-translate-x-1/2
          ${theme === "dark" ? "bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500" : "bg-gradient-to-b from-purple-400 via-pink-400 to-cyan-400"}`}
        />

        {experienceData.map((exp, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className={`relative flex items-start mb-12 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
          >
            {/* Timeline Dot */}
            <div className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 z-10 border-4
              ${theme === "dark" 
                ? "bg-purple-500 border-[#18181b]" 
                : "bg-purple-500 border-[#f3f4f6]"}`}
            />

            {/* Content Card */}
            <div className={`w-[calc(100%-4rem)] ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${idx % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className={`p-6 rounded-2xl shadow-xl transition-all duration-300 border
                  ${theme === "dark"
                    ? "bg-[#232336] border-white/10 hover:border-purple-500/50 hover:shadow-purple-500/20"
                    : "bg-white border-indigo-100 hover:border-purple-300 hover:shadow-purple-200/50"}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`text-xl font-bold font-mono mb-1
                      ${theme === "dark" ? "text-white" : "text-indigo-900"}`}>
                      {exp.title}
                    </h3>
                    <p className={`text-lg font-semibold
                      ${theme === "dark" ? "text-cyan-400" : "text-cyan-700"}`}>
                      {exp.company}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium
                    ${theme === "dark"
                      ? "bg-purple-500/20 text-purple-300"
                      : "bg-purple-100 text-purple-700"}`}>
                    {exp.type}
                  </span>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm">
                  <span className={`flex items-center gap-2
                    ${theme === "dark" ? "text-pink-300" : "text-pink-600"}`}>
                    <FaCalendarAlt />
                    {exp.period}
                  </span>
                  <span className={`flex items-center gap-2
                    ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    <FaMapMarkerAlt />
                    {exp.location}
                  </span>
                </div>

                {/* Description */}
                <p className={`mb-4 text-sm leading-relaxed
                  ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  {exp.description}
                </p>

                {/* Responsibilities */}
                <ul className={`mb-4 space-y-2 text-sm
                  ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">▹</span>
                      {resp}
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-lg text-xs font-mono
                        ${theme === "dark"
                          ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300"
                          : "bg-gradient-to-r from-cyan-100 to-purple-100 text-cyan-700"}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Experience;
