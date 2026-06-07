import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link as ScrollLink } from "react-scroll";
import { FaSun, FaMoon } from "react-icons/fa";
import myPhoto from "../assets/Talha.jpg";

const NavBar = () => {
  const navRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeItem, setActiveItem] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const navOffset = -96;

  useEffect(() => {
    const checkTheme = () => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  // Scroll-aware navbar style.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { name: "Home", to: "home" },
    { name: "Education", to: "education" },
    { name: "Experience", to: "experience" },
    { name: "Projects", to: "projects" },
    { name: "Skills", to: "skills" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400"
        style={{ scaleX: smoothScrollProgress }}
      />

      <motion.nav
        ref={navRef}
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed left-0 right-0 top-0 z-50"
      >
        <div
          className={`flex w-full items-center justify-between border-b px-4 py-4 shadow-[0_12px_36px_-16px_rgba(15,23,42,0.45)] transition-all duration-300 sm:px-6 lg:px-10 ${
            isScrolled
              ? "border-white/20 bg-white/90 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/85"
              : "border-white/30 bg-white/70 backdrop-blur-lg dark:border-slate-700/40 dark:bg-slate-900/70"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-3"
          >
            <ScrollLink
              to="home"
              spy={true}
              isDynamic={true}
              smooth={true}
              duration={500}
              offset={navOffset}
              className="group flex cursor-pointer items-center gap-3"
            >
              <img 
                src={myPhoto} 
                alt="Muhammad Talha" 
                loading="lazy"
                className="h-10 w-10 rounded-xl object-cover shadow-lg ring-2 ring-indigo-500/30 transition-all group-hover:ring-indigo-500/60"
              />
              <span className="leading-tight">
                <span className="block text-base font-semibold text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-300">
                  Muhammad Talha
                </span>
              </span>
            </ScrollLink>
          </motion.div>

          <div className="hidden items-center gap-2 md:flex">
            <div className="flex items-center gap-1 rounded-xl border border-slate-200/70 bg-white/80 p-1 dark:border-slate-700 dark:bg-slate-800/70">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  <ScrollLink
                    to={item.to}
                    spy={true}
                    isDynamic={true}
                    smooth={true}
                    duration={500}
                    offset={navOffset}
                    onSetActive={() => setActiveItem(item.name)}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`relative z-10 block cursor-pointer rounded-lg px-4 py-2 text-base font-medium transition-colors ${
                      activeItem === item.name
                        ? "text-indigo-700 dark:text-indigo-200"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    }`}
                  >
                    {item.name}
                  </ScrollLink>

                  <AnimatePresence>
                    {(hoveredItem === item.name || activeItem === item.name) && (
                      <motion.span
                        layoutId="navHover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute inset-0 rounded-lg ${
                          activeItem === item.name
                            ? "bg-indigo-100 dark:bg-indigo-500/20"
                            : "bg-slate-100 dark:bg-slate-700/40"
                        }`}
                      />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-colors duration-300 flex-shrink-0
                ${theme === "dark"
                  ? "bg-slate-800/80 border-slate-700/60 hover:bg-slate-700 text-yellow-400"
                  : "bg-gray-100 border-gray-300 hover:bg-indigo-100 text-indigo-600"}`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
            </button>

            <ScrollLink
              to="contact"
              spy={true}
              isDynamic={true}
              smooth={true}
              duration={500}
              offset={navOffset}
              className="ml-2 cursor-pointer rounded-xl bg-slate-900 px-5 py-2.5 text-base font-semibold text-white transition hover:bg-indigo-600 dark:bg-white dark:text-slate-900 dark:hover:bg-indigo-300"
            >
              Let&apos;s Talk
            </ScrollLink>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-colors duration-300 flex-shrink-0
                ${theme === "dark"
                  ? "bg-slate-850/90 border-slate-700/60 hover:bg-slate-700 text-yellow-400"
                  : "bg-gray-100 border-gray-300 hover:bg-indigo-100 text-indigo-600"}`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FaSun className="text-base" /> : <FaMoon className="text-base" />}
            </button>

            <button
              type="button"
              className="group inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300/80 text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-indigo-400 dark:hover:text-indigo-300"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="relative h-4 w-5">
                <span
                  className={`absolute left-0 top-0 block h-0.5 w-5 rounded bg-current transition-all ${
                    mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] block h-0.5 w-5 rounded bg-current transition-all ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[14px] block h-0.5 w-5 rounded bg-current transition-all ${
                    mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.24 }}
              className="overflow-hidden border-b border-white/25 bg-white/95 p-3 shadow-[0_16px_40px_-18px_rgba(15,23,42,0.5)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/95 md:hidden"
            >
              <div className="grid gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <ScrollLink
                      to={item.to}
                      spy={true}
                      isDynamic={true}
                      smooth={true}
                      duration={500}
                      offset={navOffset}
                      onSetActive={() => setActiveItem(item.name)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block cursor-pointer rounded-xl px-4 py-3 text-base font-medium transition ${
                        activeItem === item.name
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      }`}
                    >
                      {item.name}
                    </ScrollLink>
                  </motion.div>
                ))}
              </div>

              <ScrollLink
                to="contact"
                spy={true}
                isDynamic={true}
                smooth={true}
                duration={500}
                offset={navOffset}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 block cursor-pointer rounded-xl bg-slate-900 px-4 py-3 text-center text-base font-semibold text-white transition hover:bg-indigo-600 dark:bg-white dark:text-slate-900 dark:hover:bg-indigo-300"
              >
                Start a Conversation
              </ScrollLink>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default NavBar;