import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaPython, FaReact, FaDocker, FaGitAlt, FaAws, FaDatabase, FaLinux, FaHtml5, FaCss3Alt, FaJs
} from "react-icons/fa";
import {
  SiTensorflow, SiPytorch, SiOpencv, SiScikitlearn, SiNumpy, SiPandas, SiFastapi, SiMongodb, SiPostgresql, SiJupyter, SiKeras, SiStreamlit
} from "react-icons/si";

const skillsData = {
  "Programming Languages": {
    skills: [
      { name: "Python", icon: <FaPython />, level: 95 },
      { name: "C#", icon: <FaJs />, level: 85 },
      { name: "C++", icon: <FaJs />, level: 80 },
      { name: "JavaScript", icon: <FaJs />, level: 85 },
      { name: "TypeScript", icon: <FaJs />, level: 80 },
      { name: "HTML", icon: <FaHtml5 />, level: 90 },
      { name: "CSS/SCSS", icon: <FaCss3Alt />, level: 85 },
      { name: "SQL", icon: <FaDatabase />, level: 85 },
    ],
    color: "from-blue-500 to-cyan-500"
  },
  "AI/ML Frameworks": {
    skills: [
      { name: "PyTorch", icon: <SiPytorch />, level: 90 },
      { name: "TensorFlow", icon: <SiTensorflow />, level: 90 },
      { name: "OpenCV", icon: <SiOpencv />, level: 88 },
      { name: "NumPy", icon: <SiNumpy />, level: 92 },
    ],
    color: "from-purple-500 to-pink-500"
  },
  "Web Frameworks": {
    skills: [
      { name: "Angular", icon: <FaReact />, level: 85 },
      { name: "React", icon: <FaReact />, level: 85 },
      { name: ".NET Core", icon: <FaDatabase />, level: 88 },
      { name: "ASP.NET Web API", icon: <FaDatabase />, level: 85 },
      { name: "Tailwind CSS", icon: <FaCss3Alt />, level: 88 },
    ],
    color: "from-cyan-500 to-blue-500"
  },
  "Tools & Technologies": {
    skills: [
      { name: "Git", icon: <FaGitAlt />, level: 90 },
      { name: "GitHub", icon: <FaGitAlt />, level: 90 },
      { name: "Visual Studio", icon: <FaDatabase />, level: 88 },
      { name: "VS Code", icon: <FaDatabase />, level: 92 },
      { name: "Postman", icon: <FaDatabase />, level: 85 },
      { name: "Docker", icon: <FaDocker />, level: 75 },
    ],
    color: "from-red-500 to-rose-500"
  },
  "Databases": {
    skills: [
      { name: "MongoDB", icon: <SiMongodb />, level: 85 },
      { name: "MSSQL", icon: <SiPostgresql />, level: 82 },
      { name: "MongoDB Compass", icon: <SiMongodb />, level: 80 },
    ],
    color: "from-green-500 to-emerald-500"
  },
  "Automation & Scraping": {
    skills: [
      { name: "Selenium", icon: <FaPython />, level: 85 },
      { name: "Puppeteer", icon: <FaJs />, level: 80 },
      { name: "Playwright", icon: <FaJs />, level: 80 },
    ],
    color: "from-orange-500 to-yellow-500"
  }
};

const Skills = () => {
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
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section
      id="skills"
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
          Skills
        </h2>
        <p className={`text-lg font-mono ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>
          Technologies and tools I work with
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {Object.entries(skillsData).map(([category, { skills, color }], idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className={`p-6 rounded-2xl shadow-xl transition-all duration-300 border
              ${theme === "dark"
                ? "bg-[#232336] border-white/10 hover:border-purple-500/50"
                : "bg-white border-indigo-100 hover:border-purple-300"}`}
          >
            {/* Category Header */}
            <h3 className={`text-xl font-bold font-mono mb-6 pb-2 border-b
              ${theme === "dark" ? "text-white border-white/10" : "text-indigo-900 border-gray-200"}`}>
              {category}
            </h3>

            {/* Skills */}
            <div className="space-y-4">
              {skills.map((skill, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`text-xl ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`}>
                        {skill.icon}
                      </span>
                      <span className={`font-mono text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                        {skill.name}
                      </span>
                    </div>
                    <span className={`text-xs font-mono ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className={`h-2 rounded-full overflow-hidden
                    ${theme === "dark" ? "bg-[#18181b]" : "bg-gray-200"}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Skills Tags */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <h4 className={`text-lg font-mono mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          Other technologies I'm familiar with:
        </h4>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl">
          {["SignalR", "Pandas", "Streamlit", "Scikit-learn", "Keras", "Google Colab", "Canva", "Figma", "Azure DevOps", "n8n", "YOLO", "Transformers", "FastAPI", "Node.js"].map((tech, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.1 }}
              className={`px-4 py-2 rounded-full text-sm font-mono cursor-default transition-all duration-300
                ${theme === "dark"
                  ? "bg-[#232336] text-gray-300 border border-white/10 hover:border-cyan-500/50 hover:text-cyan-400"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-cyan-300 hover:text-cyan-600"}`}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
