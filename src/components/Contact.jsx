import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedin, FaInstagram, FaPaperPlane } from "react-icons/fa";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [theme, setTheme] = useState("dark");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // EmailJS credentials from environment variables
      const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'talhaghaffar455@gmail.com',
        website: 'Muhammad Talha Portfolio',
        reply_to: formData.email
      };
      
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setIsSubmitting(false);
      alert('Failed to send message. Please try again or contact me directly at talhaghaffar455@gmail.com');
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: "talhaghaffar455@gmail.com",
      link: "mailto:talhaghaffar455@gmail.com"
    },
    {
      icon: <FaPhone />,
      label: "Phone",
      value: "+92 301 3820080",
      link: "tel:+923013820080"
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Location",
      value: "Lahore, Pakistan",
      link: null
    }
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/MuhamadTalha12", label: "GitHub" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/muhammad-talha-1b88992a6/", label: "LinkedIn" },
    { icon: <FaInstagram />, url: "https://www.instagram.com/beingrealtalhaa?igsh=d3dmejJsaHpvcnUx", label: "Instagram" }
  ];

  return (
    <section
      id="contact"
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
          Get In Touch
        </h2>
        <p className={`text-lg font-mono max-w-2xl ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>
          Have a project in mind or want to collaborate? Feel free to reach out!
          I'm always open to discussing new opportunities.
        </p>
      </motion.div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-mono mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl transition-all duration-300 outline-none
                    ${theme === "dark"
                      ? "bg-[#232336] border border-white/10 text-white focus:border-purple-500"
                      : "bg-white border border-gray-200 text-gray-900 focus:border-purple-400"}`}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className={`block text-sm font-mono mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl transition-all duration-300 outline-none
                    ${theme === "dark"
                      ? "bg-[#232336] border border-white/10 text-white focus:border-purple-500"
                      : "bg-white border border-gray-200 text-gray-900 focus:border-purple-400"}`}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-mono mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-xl transition-all duration-300 outline-none
                  ${theme === "dark"
                    ? "bg-[#232336] border border-white/10 text-white focus:border-purple-500"
                    : "bg-white border border-gray-200 text-gray-900 focus:border-purple-400"}`}
                placeholder="Project Inquiry"
              />
            </div>

            <div>
              <label className={`block text-sm font-mono mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className={`w-full px-4 py-3 rounded-xl transition-all duration-300 outline-none resize-none
                  ${theme === "dark"
                    ? "bg-[#232336] border border-white/10 text-white focus:border-purple-500"
                    : "bg-white border border-gray-200 text-gray-900 focus:border-purple-400"}`}
                placeholder="Tell me about your project..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 rounded-xl font-mono font-bold transition-all duration-300 flex items-center justify-center gap-3
                ${isSubmitting || submitted
                  ? theme === "dark"
                    ? "bg-green-600 text-white"
                    : "bg-green-500 text-white"
                  : theme === "dark"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30"
                    : "bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:shadow-lg hover:shadow-purple-300/50"}`}
            >
              {isSubmitting ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Sending...
                </>
              ) : submitted ? (
                <>
                  ✓ Message Sent!
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Contact Cards */}
          <div className="space-y-4">
            {contactInfo.map((info, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 10 }}
                className={`p-5 rounded-xl transition-all duration-300 flex items-center gap-4 border
                  ${theme === "dark"
                    ? "bg-[#232336] border-white/10 hover:border-purple-500/50"
                    : "bg-white border-gray-200 hover:border-purple-300"}`}
              >
                <span className={`text-2xl p-3 rounded-xl
                  ${theme === "dark"
                    ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400"
                    : "bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600"}`}>
                  {info.icon}
                </span>
                <div>
                  <p className={`text-sm font-mono ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    {info.label}
                  </p>
                  {info.link ? (
                    <a
                      href={info.link}
                      className={`font-mono transition-colors break-all text-sm sm:text-base
                        ${theme === "dark" ? "text-white hover:text-purple-400" : "text-gray-900 hover:text-purple-600"}`}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className={`font-mono break-all text-sm sm:text-base ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {info.value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <div className={`p-6 rounded-xl border
            ${theme === "dark"
              ? "bg-[#232336] border-white/10"
              : "bg-white border-gray-200"}`}
          >
            <h4 className={`font-mono font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Connect with me
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  className={`p-4 rounded-xl text-2xl transition-all duration-300
                    ${theme === "dark"
                      ? "bg-[#18181b] text-gray-400 hover:text-purple-400 hover:bg-purple-500/10"
                      : "bg-gray-100 text-gray-600 hover:text-purple-600 hover:bg-purple-50"}`}
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>


        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={`mt-20 pt-8 border-t w-full max-w-6xl text-center
          ${theme === "dark" ? "border-white/10" : "border-gray-200"}`}
      >
        <p className={`font-mono text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
          © 2025 Muhammad Talha. Built with React & Tailwind CSS
        </p>
      </motion.div>
    </section>
  );
};

export default Contact;
