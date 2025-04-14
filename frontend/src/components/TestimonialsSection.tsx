import { useTheme } from "./ThemeComponents/ThemeProvider";
import { motion } from "framer-motion";
import { MessageCircleHeart, Users, Star } from "lucide-react";

const testimonials = [
  {
    name: "Aarav Mehta",
    feedback:
      "Samvaad truly helped me during a mentally exhausting phase. The experts here don’t just listen — they guide with heart.",
  },
  {
    name: "Nitya Sharma",
    feedback:
      "I joined as an advisor to share my experiences. Samvaad gave me the platform to connect and help others meaningfully.",
  },
  {
    name: "Rohan Verma",
    feedback:
      "It felt like therapy without judgment. Free consultation, real advice, and real people. Game changer!",
  },
];

const stats = [
  {
    label: "Users Helped",
    value: "12,000+",
    icon: Users,
  },
  {
    label: "Total Consultations",
    value: "25,000+",
    icon: MessageCircleHeart,
  },
  {
    label: "Avg. Rating",
    value: "4.9/5",
    icon: Star,
  },
];

const TestimonialsSection = () => {
  const { theme } = useTheme();

  return (
    <section
      className={`w-full py-20 px-6 md:px-16 transition-all duration-500 ${
        theme === "light" ? "bg-white" : "bg-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-3xl md:text-5xl font-bold mb-6 ${
            theme === "light" ? "text-slate-800" : "text-white"
          }`}
        >
          Hear it from our people 💬
        </motion.h2>
        <p
          className={`text-lg md:text-xl mb-16 ${
            theme === "light" ? "text-slate-600" : "text-slate-300"
          }`}
        >
          Real stories, real impact.
        </p>

        {/* Testimonials */}
        <div className="grid gap-10 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`rounded-xl p-6 shadow-xl transition-colors ${
                theme === "light"
                  ? "bg-gray-100 text-slate-800"
                  : "bg-slate-800 text-white"
              }`}
            >
              <p className="text-lg italic mb-4">“{testimonial.feedback}”</p>
              <p className="font-semibold text-teal-500">
                — {testimonial.name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Impact Numbers */}
        <div className="mt-20 grid gap-8 md:grid-cols-3 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`flex flex-col items-center p-6 rounded-2xl shadow-md ${
                theme === "light" ? "bg-gray-50" : "bg-slate-800"
              }`}
            >
              <stat.icon
                size={32}
                className={`mb-4 ${
                  theme === "light" ? "text-teal-600" : "text-teal-400"
                }`}
              />
              <p
                className={`text-2xl font-bold ${
                  theme === "light" ? "text-slate-800" : "text-white"
                }`}
              >
                {stat.value}
              </p>
              <p
                className={`text-sm ${
                  theme === "light" ? "text-slate-500" : "text-slate-300"
                }`}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
