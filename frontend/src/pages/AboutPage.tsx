import { useState, useEffect } from "react";
import { Users, Briefcase, DollarSign, Star, ArrowRight } from "lucide-react";
import { useTheme } from "../components/ThemeComponents/ThemeProvider";
import Themes from "../components/ThemeComponents/themes";
import { motion } from "framer-motion";

const team = [
  {
    name: "Aarav Sharma",
    role: "Founder & Mental Health Lead",
    img: "/api/placeholder/150/150",
  },
  {
    name: "Meera Patel",
    role: "Career Consultant",
    img: "/api/placeholder/150/150",
  },
  {
    name: "Rahul Verma",
    role: "Financial Advisor",
    img: "/api/placeholder/150/150",
  },
];

// Background animation component
const BackgroundAnimation = ({ theme }: { theme: string }) => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number; }[]>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));

    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full opacity-10 ${
            theme === "dark" ? "bg-blue-400" : "bg-blue-500"
          }`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s infinite ease-in-out ${particle.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(20px, -15px) rotate(5deg);
          }
          50% {
            transform: translate(-10px, 20px) rotate(-5deg);
          }
          75% {
            transform: translate(15px, 10px) rotate(3deg);
          }
        }
      `}</style>
    </div>
  );
};

// Custom button component with hover animation
const AnimatedButton = ({ children, className }: { children: React.ReactNode; className: string }) => {
  return (
    <motion.button
      className={`relative overflow-hidden group ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.span
        className="absolute inset-0 w-full h-full bg-white dark:bg-slate-700 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{
          scale: 1,
          opacity: 0.15,
          transition: { duration: 0.4 },
        }}
      />
      <span className="relative z-10 flex items-center justify-center">
        {children}
        <motion.span
          className="inline-block ml-2"
          initial={{ x: -3, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.span>
      </span>
    </motion.button>
  );
};

// Enhanced card component with hover effects
const AnimatedCard = ({ children, className, variants, index = 0 }: { children: React.ReactNode; className: string; variants: any; index?: number }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      className={`${className} relative overflow-hidden group`}
      variants={variants}
      whileHover={{
        y: -8,
        boxShadow:
          theme === "dark"
            ? "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
            : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: index * 0.05,
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
      <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default function AboutPage() {
  const { theme } = useTheme();
  const styles = Themes[theme];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div
      className={`min-h-screen ${styles.bg} ${styles.text} py-16 px-6 space-y-20 transition-all duration-500 relative overflow-hidden`}
    >
      <BackgroundAnimation theme={theme} />

      {/* Hero Section */}
      <motion.div
        className="max-w-5xl mx-auto space-y-8 text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-block">
          <motion.h1
            className="text-5xl font-bold mb-2 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            About{" "}
            <span
              className={`text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400`}
            >
              Samwaad
            </span>
          </motion.h1>
          <motion.div
            className={`h-1 w-24 mx-auto ${styles.accent} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 0.8, duration: 0.6 }}
          />
        </div>
        <motion.p
          className={`text-xl ${styles.muted} max-w-3xl mx-auto`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Samwaad is a platform built to make essential guidance in mental
          health, career, and financial wellness accessible and affordable for
          everyone.
        </motion.p>
      </motion.div>

      {/* Mission & Vision */}
      <motion.div
        className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <AnimatedCard
          className={`${
            styles.card
          } p-8 rounded-2xl shadow-lg border border-opacity-10 ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
          variants={itemVariants}
          index={0}
        >
          <div className="flex items-center mb-4">
            <motion.div
              className={`${styles.primary} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg`}
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Star className="h-6 w-6 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold ml-4">Our Mission</h2>
          </div>
          <p className={`${styles.muted} text-lg`}>
            We aim to break down the barriers to professional consultation by
            offering a simple, affordable, and inclusive solution for
            individuals seeking clarity and support.
          </p>
        </AnimatedCard>

        <AnimatedCard
          className={`${
            styles.card
          } p-8 rounded-2xl shadow-lg border border-opacity-10 ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
          variants={itemVariants}
          index={1}
        >
          <div className="flex items-center mb-4">
            <motion.div
              className={`${styles.secondary} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg`}
              whileHover={{ rotate: -10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Star className="h-6 w-6 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold ml-4">Our Vision</h2>
          </div>
          <p className={`${styles.muted} text-lg`}>
            To be the most trusted online companion for people looking for
            professional advice without the pressure of high fees or stigma,
            ensuring every voice is heard and helped.
          </p>
        </AnimatedCard>
      </motion.div>

      {/* Team Section */}
      <motion.div
        className="max-w-6xl mx-auto text-center space-y-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h2
          className="text-4xl font-bold relative inline-block"
          variants={itemVariants}
        >
          Meet Our Team
          <div
            className={`h-1 w-24 mx-auto mt-2 ${styles.accent} rounded-full`}
          />
        </motion.h2>
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {team.map((member, index) => (
            <AnimatedCard
              key={index}
              className={`${
                styles.card
              } p-8 rounded-xl shadow-lg border border-opacity-10 ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              } flex flex-col items-center`}
              variants={itemVariants}
              index={index}
            >
              <motion.div
                className="relative mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <div
                  className={`absolute inset-0 rounded-full ${styles.accent} blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
                ></div>
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-28 h-28 rounded-full object-cover relative z-10 border-4 border-white dark:border-slate-700"
                />
              </motion.div>
              <h3 className="text-2xl font-semibold mb-1">{member.name}</h3>
              <p className={`${styles.muted} text-lg`}>{member.role}</p>
              <div className="flex space-x-3 mt-4">
                {[1, 2, 3].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                    whileHover={{
                      scale: 1.2,
                      backgroundColor: theme === "dark" ? "#4b5563" : "#d1d5db",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      {i + 1}
                    </span>
                  </motion.div>
                ))}
              </div>
            </AnimatedCard>
          ))}
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className={`${
          styles.card
        } py-16 px-4 rounded-3xl shadow-lg border border-opacity-10 ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: <Users className="h-8 w-8" />,
              label: "Users Helped",
              value: "5,000+",
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: <Briefcase className="h-8 w-8" />,
              label: "Consultations",
              value: "12,000+",
              color: "from-emerald-500 to-emerald-600",
            },
            {
              icon: <DollarSign className="h-8 w-8" />,
              label: "Saved in Fees",
              value: "₹30L+",
              color: "from-teal-500 to-teal-600",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="space-y-4 relative"
              variants={itemVariants}
            >
              <motion.div
                className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center bg-gradient-to-br ${item.color} text-white shadow-lg`}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                {item.icon}
              </motion.div>
              <motion.div
                className="text-3xl font-bold"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{
                  delay: 0.2 + idx * 0.1,
                  duration: 0.4,
                  type: "spring",
                }}
              >
                {item.value}
              </motion.div>
              <div className={`text-lg ${styles.muted}`}>{item.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="max-w-4xl mx-auto text-center py-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl font-bold mb-6">Ready to get started?</h3>
        <AnimatedButton
          className={`${styles.button} px-8 py-3 rounded-xl text-lg font-medium shadow-lg`}
        >
          Book a Consultation
        </AnimatedButton>
      </motion.div>
    </div>
  );
}
