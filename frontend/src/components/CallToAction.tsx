import { useTheme } from "./ThemeComponents/ThemeProvider";
import { motion } from "framer-motion";
import { ArrowRight, UserPlus } from "lucide-react";

const CallToAction = () => {
  const { theme } = useTheme();

  return (
    <section
      className={`w-full py-20 px-6 md:px-16 transition-all duration-500 ${
        theme === "light" ? "bg-gray-50" : "bg-slate-900"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`max-w-6xl mx-auto rounded-3xl shadow-2xl p-10 md:p-16 text-center relative overflow-hidden backdrop-blur-md ${
          theme === "light" ? "bg-white/80" : "bg-slate-800/60"
        }`}
      >
        {/* Soft glowy background dots */}
        <div className="absolute w-72 h-72 rounded-full bg-teal-400 blur-[120px] opacity-20 top-[-80px] left-[-80px]" />
        <div className="absolute w-72 h-72 rounded-full bg-blue-400 blur-[120px] opacity-20 bottom-[-80px] right-[-80px]" />

        <h2
          className={`text-3xl md:text-5xl font-extrabold tracking-tight mb-6 ${
            theme === "light" ? "text-slate-800" : "text-white"
          }`}
        >
          Empower Your Mind, Elevate Your Life
        </h2>
        <p
          className={`text-lg md:text-xl mb-10 ${
            theme === "light" ? "text-slate-600" : "text-slate-300"
          }`}
        >
          Whether you’re seeking clarity or looking to guide others — Samvaad is
          your space to connect, grow, and thrive.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 shadow-md bg-teal-500 text-white hover:bg-teal-600"
          >
            Get Free Consultation <ArrowRight size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 shadow-md ${
              theme === "light"
                ? "bg-slate-800 text-white hover:bg-slate-700"
                : "bg-white text-slate-900 hover:bg-slate-200"
            }`}
          >
            Join as Advisor <UserPlus size={20} />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
