import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaFolder } from "react-icons/fa";

const projectsData = [
  {
    title: "SecureVision - Real-Time Face Detection & Intruder Alert System",
    description: "YOLO-based real-time face detection system with AI-powered insights. Features duplicate prevention via face encoding comparison, interactive Streamlit dashboard with live camera feed, detection logs, and Excel export functionality.",
    technologies: ["Python", "YOLOv8", "Streamlit", "OpenCV", "face_recognition", "Gemini API", "Pandas"],
    github: "https://github.com/MuhamadTalha12/Secure-Vision",
    live: "#",
    featured: true,
    category: "Computer Vision"
  },
  {
    title: "Income Prediction ML Project - Streamlit ML App",
    description: "Machine learning web app for income prediction and recommendations. Developed using a Random Forest model with 87% accuracy for income classification. Integrated Gemini API for personalized recommendations.",
    technologies: ["Python", "Streamlit", "Scikit-learn", "Pandas", "Gemini API", "Random Forest"],
    github: "https://github.com/MuhamadTalha12/Income_Prediction_AI",
    live: "#",
    featured: true,
    category: "Machine Learning"
  },
  {
    title: "Mnist Digit Classifier - Streamlit Deep Learning App",
    description: "CNN-powered web app for handwritten digit recognition. Built using a CNN trained on the MNIST dataset (70,000 images). Features dual input modes: image upload and interactive drawable canvas for real-time predictions.",
    technologies: ["Python", "TensorFlow", "Streamlit", "OpenCV", "NumPy", "Pillow"],
    github: "https://github.com/MuhamadTalha12/Mnist-Digit-Classifier",
    live: "#",
    featured: true,
    category: "Deep Learning"
  },
  {
    title: "ZenZone - Android Focus & Habit App",
    description: "Kotlin Android app for focus tracking and productivity. Built using MVVM architecture with ViewModel and LiveData. Features session tracking, stats visualization, and JSON-based local storage.",
    technologies: ["Kotlin", "Android SDK", "Jetpack", "Coroutines", "MPAndroidChart", "MVVM"],
    github: "https://github.com/MuhamadTalha12/ZenZone",
    live: "#",
    featured: false,
    category: "Mobile Development"
  },
  {
    title: "Solitaire Klondike Game",
    description: "C# WinForms implementation of classic card game. Developed a fully interactive Solitaire game with complete gameplay logic including card movement, drag-and-drop, auto-flip, and win detection.",
    technologies: ["C#", "WinForms", ".NET", "OOP"],
    github: "https://github.com/MuhamadTalha12/Solitaire",
    live: "#",
    featured: false,
    category: "Desktop Application"
  },
  {
    title: "Database Management System - C++ & React",
    description: "Full-stack database system with custom storage and query engine. Built with B+ Tree indexing supporting efficient CRUD operations. Implemented SQL-like query parser with filtering, joins, and relational constraints.",
    technologies: ["C++", "React", "Node.js", "B+ Trees", "File-based Storage"],
    github: "https://github.com/AmirHashmi017/Database-Project",
    live: "#",
    featured: false,
    category: "Full-Stack"
  },
  {
    title: "Inventory Management System - C# (.NET, WinForms, Console)",
    description: "Role-based inventory and billing management system backed by SQL. Features role-based access control for Admin, Employee, and Customer roles. Designed using OOP principles for scalability and maintainability.",
    technologies: ["C#", ".NET", "WinForms", "Console", "SQL", "OOP"],
    github: "https://github.com/MuhamadTalha12/FinalAppOOPGUI",
    live: "#",
    featured: false,
    category: "Desktop Application"
  }
];

const Projects = () => {
  const [theme, setTheme] = useState("dark");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const checkTheme = () => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const categories = ["All", "Machine Learning", "Computer Vision", "Deep Learning", "Full-Stack", "Mobile Development", "Desktop Application"];

  const filteredProjects = filter === "All" 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section
      id="projects"
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
        className="text-center mb-12"
      >
        <h2 className={`text-5xl md:text-6xl font-bold mb-4 font-mono transition-colors duration-500
          ${theme === "dark" ? "text-purple-400" : "text-purple-700"}`}>
          Projects
        </h2>
        <p className={`text-lg font-mono mb-8 ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>
          Some things I've built with passion and curiosity
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full font-mono text-sm transition-all duration-300
                ${filter === cat
                  ? theme === "dark"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                    : "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg shadow-purple-300/50"
                  : theme === "dark"
                    ? "bg-[#232336] text-gray-300 border border-white/10 hover:border-purple-500/50"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-purple-300"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className={`group relative p-6 rounded-2xl shadow-xl transition-all duration-300 border flex flex-col
              ${theme === "dark"
                ? "bg-[#232336] border-white/10 hover:border-cyan-500/50 hover:shadow-cyan-500/20"
                : "bg-white border-indigo-100 hover:border-cyan-300 hover:shadow-cyan-200/50"}`}
          >
            {/* Featured Badge */}
            {project.featured && (
              <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold
                ${theme === "dark"
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                  : "bg-gradient-to-r from-yellow-400 to-orange-400 text-white"}`}>
                Featured
              </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <FaFolder className={`text-4xl ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`} />
              <div className="flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-300 text-xl
                    ${theme === "dark"
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-500 hover:text-purple-600"}`}
                >
                  <FaGithub />
                </a>
              </div>
            </div>

            {/* Category */}
            <span className={`text-xs font-mono mb-2 inline-block
              ${theme === "dark" ? "text-pink-400" : "text-pink-600"}`}>
              {project.category}
            </span>

            {/* Title */}
            <h3 className={`text-xl font-bold font-mono mb-3 group-hover:text-cyan-400 transition-colors
              ${theme === "dark" ? "text-white" : "text-indigo-900"}`}>
              {project.title}
            </h3>

            {/* Description */}
            <p className={`text-sm leading-relaxed mb-4 flex-grow
              ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className={`px-2 py-1 rounded text-xs font-mono
                    ${theme === "dark"
                      ? "text-cyan-300 bg-cyan-500/10"
                      : "text-cyan-700 bg-cyan-50"}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View All Projects Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 flex gap-4"
      >
        <motion.a
          href="https://github.com/MuhamadTalha12?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-8 py-4 rounded-full font-mono text-sm transition-all duration-300 flex items-center gap-3 shadow-lg
            ${theme === "dark"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-purple-500/30"
              : "bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:shadow-purple-300/50"}`}
        >
          <FaGithub className="text-xl" />
          View All Projects
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Projects;
