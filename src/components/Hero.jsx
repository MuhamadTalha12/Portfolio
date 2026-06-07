
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useRef, useEffect, useState } from "react";
import myPhoto from "../assets/Talha.jpg";
import { FaGithub, FaLinkedin, FaInstagram, FaSun, FaMoon } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


const Hero = () => {
  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // For 3D perspective effect
  const rotateX = useTransform(y, [-1, 1], [10, -10]);
  const rotateY = useTransform(x, [-1, 1], [-10, 10]);
  const scale = useMotionValue(1);

  // For floating animation
  useEffect(() => {
    const floatAnimation = animate(scale, 1.05, {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    });
    return () => floatAnimation.stop();
  }, [scale]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate position relative to center
    const xPos = (mouseX - width / 2) / (width / 2);
    const yPos = (mouseY - height / 2) / (height / 2);

    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    animate(x, 0, { duration: 0.5 });
    animate(y, 0, { duration: 0.5 });
  };


  // Particle background config
  const particlesInit = async (main) => {
    await loadFull(main);
  };
  const particlesOptions = {
    fullScreen: false,
    background: { color: theme === "dark" ? "#18181b" : "#f3f4f6" },
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: {
        value: theme === "dark"
          ? ["#a78bfa", "#818cf8", "#f472b6", "#facc15"]
          : ["#6366f1", "#a21caf", "#f59e42", "#f43f5e"]
      },
      shape: { type: "circle" },
      opacity: { value: 0.6, random: true },
      size: { value: 6, random: { enable: true, minimumValue: 2 } },
      move: { enable: true, speed: 1.2, direction: "none", out_mode: "out" }
    },
    interactivity: {
      events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
      modes: { repulse: { distance: 120 }, push: { quantity: 6 } }
    },
    detectRetina: true
  };

  return (
    <section
      className={`min-h-screen py-20 transition-colors duration-500
        ${theme === "dark"
          ? "bg-gradient-to-br from-[#18181b] via-[#232336] to-[#18181b] text-white"
          : "bg-gradient-to-br from-[#f3f4f6] via-[#e0e7ef] to-[#f3f4f6] text-gray-900"}
        flex flex-col md:flex-row items-center justify-center px-6 md:px-16 gap-10 relative overflow-hidden`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Particle Background */}
      <Particles className="absolute inset-0 z-0" id="tsparticles" init={particlesInit} options={particlesOptions} />

      {/* Combined Theme Toggle and Available Badge */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className={`fixed bottom-6 right-6 z-[70] p-4 rounded-2xl shadow-2xl border max-w-xs hidden md:block
          ${theme === "dark"
            ? "bg-[#232336]/95 backdrop-blur-lg border-white/10"
            : "bg-white/95 backdrop-blur-lg border-purple-200"}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <span className="relative flex h-3 w-3 mt-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <div>
              <span className={`font-mono font-bold text-sm block mb-1 ${theme === "dark" ? "text-green-400" : "text-green-600"}`}>
                Available for Opportunities
              </span>
              <p className={`text-xs leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                I'm currently looking for internship and freelance opportunities in AI/ML and software development.
              </p>
            </div>
          </div>
          
          {/* Theme Toggle Button */}
          <button
            className={`p-2 rounded-lg border transition-colors duration-300 flex-shrink-0
              ${theme === "dark"
                ? "bg-[#18181b] border-white/20 hover:bg-[#35355a]"
                : "bg-gray-100 border-gray-300 hover:bg-indigo-100"}`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark"
              ? <FaSun className="text-yellow-400 text-lg" />
              : <FaMoon className="text-indigo-500 text-lg" />}
          </button>
        </div>
      </motion.div>

      {/* Left Content - Takes more vertical space now */}
      <motion.div
        className={`flex-1 text-center md:text-left z-10 space-y-8 transition-colors duration-500 md:ml-20
          ${theme === "dark" ? "" : ""}`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.p
          className={`text-lg md:text-xl mb-2 font-mono transition-colors duration-500
            ${theme === "dark" ? "text-indigo-300" : "text-indigo-700"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Hi, My Name is
        </motion.p>

        <motion.h1
          className={`text-4xl sm:text-6xl md:text-8xl font-bold transition-colors duration-500
            ${theme === "dark" ? "text-white" : "text-indigo-900"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Muhammad Talha
        </motion.h1>

        <motion.div
          className="text-2xl md:text-4xl font-medium min-h-[60px] md:min-h-[80px] mb-8"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className={`bg-clip-text text-transparent font-bold relative drop-shadow-[0_0_8px_rgba(236,72,153,0.8)] transition-colors duration-500
            ${theme === "dark"
              ? "bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-300"
              : "bg-gradient-to-r from-indigo-700 via-purple-500 to-pink-500"}`}
          >
            <Typewriter
              words={[
                "AI/ML Intern",
                "Computer Vision Specialist",
                ".NET Developer",
                "Freelance Software Developer",
                "CS Student @ UET"
              ]}
              loop
              cursor={false}
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
            <span className="ml-1 align-up blink-cursor">|</span>
          </span>
        </motion.div>

        <motion.p
          className={`max-w-2xl text-base md:text-lg leading-relaxed mb-10 transition-colors duration-500
            ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Computer Science student at UET Lahore with hands-on experience in AI/ML and .NET development.
          I build intelligent systems using deep learning, computer vision, and modern web technologies.
          Recemtly worked as an AI/ML Intern at LYSA Labs and freelancing on Fiverr.
        </motion.p>

        <motion.div
          className="flex flex-col gap-6 justify-center md:justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a
              href="#contact"
              className={`px-6 py-3 sm:px-10 sm:py-4 rounded-full font-medium transition-all duration-300 shadow-lg text-base sm:text-lg flex items-center gap-2
              ${theme === "dark"
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/30 text-white"
                : "bg-gradient-to-r from-indigo-200 to-purple-200 hover:from-indigo-300 hover:to-purple-300 text-indigo-900 border border-indigo-200"}`}
            >
              <span>Get In Touch</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </a>
            <a
              href="https://github.com/MuhamadTalha12?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3 sm:px-10 sm:py-4 rounded-full font-medium transition-all duration-300 text-base sm:text-lg flex items-center gap-2
              ${theme === "dark"
                ? "border border-indigo-400/50 text-indigo-300 hover:bg-indigo-500/10"
                : "border border-indigo-300 text-indigo-700 hover:bg-indigo-100"}`}
            >
              <span>View Projects</span>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                ↻
              </motion.span>
            </a>
            {/* Download CV Button (aligned) */}
            <a
              href="/Talha(CV).pdf"
              download
              className={`px-6 py-3 sm:px-10 sm:py-4 rounded-full font-medium transition-all duration-300 shadow-lg text-base sm:text-lg flex items-center gap-2
                ${theme === "dark"
                  ? "bg-indigo-700 text-white hover:bg-indigo-800"
                  : "bg-indigo-200 text-indigo-900 hover:bg-indigo-300 border border-indigo-200"}`}
            >
              <span>Download CV</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
              </svg>
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 mt-8 justify-center md:justify-start text-2xl">
            <a
              href="https://github.com/MuhamadTalha12"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <span className={`flex items-center justify-center w-14 h-14 rounded-xl shadow-lg border transition-all duration-300
                ${theme === "dark"
                  ? "bg-[#18191a] border-white/10 group-hover:bg-black"
                  : "bg-white border-indigo-200 group-hover:bg-indigo-100"}`}
              >
                <FaGithub className={`transition-all duration-300 text-2xl
                  ${theme === "dark" ? "text-indigo-400 group-hover:text-white" : "text-indigo-700 group-hover:text-black"}`} />
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-talha-1b88992a6/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <span className={`flex items-center justify-center w-14 h-14 rounded-xl shadow-lg border transition-all duration-300
                ${theme === "dark"
                  ? "bg-[#18191a] border-white/10 group-hover:bg-[#0077b5]"
                  : "bg-white border-indigo-200 group-hover:bg-[#0077b5]"}`}
              >
                <FaLinkedin className={`transition-all duration-300 text-2xl
                  ${theme === "dark" ? "text-indigo-400 group-hover:text-white" : "text-indigo-700 group-hover:text-white"}`} />
              </span>
            </a>
            <a
              href="https://www.instagram.com/beingrealtalhaa?igsh=d3dmejJsaHpvcnUx"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <span className={`flex items-center justify-center w-14 h-14 rounded-xl shadow-lg border transition-all duration-300 instagram-hover
                ${theme === "dark"
                  ? "bg-[#18191a] border-white/10 group-hover:bg-gradient-to-tr group-hover:from-yellow-400 group-hover:via-pink-500 group-hover:to-purple-600"
                  : "bg-white border-indigo-200 group-hover:bg-gradient-to-tr group-hover:from-yellow-400 group-hover:via-pink-500 group-hover:to-purple-600"}`}
              >
                <FaInstagram className={`transition-all duration-300 text-2xl
                  ${theme === "dark" ? "text-indigo-400 group-hover:text-white" : "text-indigo-700 group-hover:text-white"}`} />
              </span>
            </a>
          </div>
        </motion.div>


      </motion.div>

      {/* Right Image with 3D perspective and mobile tilt */}
      <motion.div
        className="flex-1 flex justify-center z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Tilt
          className="relative perspective-1000"
          tiltMaxAngleX={20}
          tiltMaxAngleY={20}
          perspective={1000}
          scale={1.05}
          gyroscope={true}
          glareEnable={false}
        >
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 opacity-70 blur-xl animate-pulse"></div>
          <motion.div
            className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96"
            style={{
              rotateX,
              rotateY,
              scale,
              transformStyle: "preserve-3d"
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={myPhoto}
              alt="Talha"
              loading="lazy"
              className="w-full h-full object-cover rounded-full border-4 border-indigo-500/30 shadow-2xl hover:shadow-indigo-500/50"
              style={{
                transform: "translateZ(30px)"
              }}
            />
            <div className="absolute inset-0 rounded-full border-2 border-white/10 pointer-events-none"></div>
          </motion.div>

          <div className="absolute bottom-0 right-0 md:-bottom-8 md:-right-8 bg-indigo-600/90 text-xs sm:text-sm font-mono px-4 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Available for work
          </div>
        </Tilt>
      </motion.div>
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className={`mb-1 text-base md:text-lg font-mono transition-colors duration-500
          ${theme === "dark" ? "text-indigo-200/70" : "text-indigo-700/60"}`}
          style={{ opacity: 0.7 }}
        >
          Scroll Down
        </span>
        <span className="text-indigo-500 text-3xl animate-bounce">↓</span>
      </motion.div>

    </section>

  );
};

export default Hero;
// Neon solid pink blinking cursor style
if (typeof document !== 'undefined' && !document.getElementById('neon-blink-cursor-style')) {
  const style = document.createElement('style');
  style.id = 'neon-blink-cursor-style';
  style.innerHTML = `
    .neon-blink-cursor {
      color: #ec4899;
      text-shadow: 0 0 8px #ec4899, 0 0 16px #ec4899;
      animation: neon-blink 1s steps(2, start) infinite;
      font-weight: bold;
    }
    @keyframes neon-blink {
      to { visibility: hidden; }
    }
  `;
  document.head.appendChild(style);
}