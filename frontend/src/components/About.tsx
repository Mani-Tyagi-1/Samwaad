import { useTheme } from "./ThemeComponents/ThemeProvider";
import { motion } from "framer-motion";
import Themes from "./ThemeComponents/themes";
import { Lightbulb, Users, Heart } from "lucide-react";

const About = () => {
  const { theme } = useTheme();
  const currentTheme = Themes[theme];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const valueCardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
  };

  // Random circles for background animation
  const circles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 80 + 40,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <section
      className={`min-h-screen relative overflow-hidden py-16 px-4 md:px-8 ${currentTheme.bg} ${currentTheme.text} transition-all duration-500`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 opacity-40">
        {circles.map((circle) => (
          <motion.div
            key={circle.id}
            className={`absolute rounded-full ${
              theme === "light"
                ? "bg-gradient-to-br from-teal-300 to-blue-300"
                : "bg-gradient-to-br from-teal-700 to-blue-700"
            } opacity-20`}
            style={{
              width: circle.size,
              height: circle.size,
              left: `${circle.x}%`,
              top: `${circle.y}%`,
            }}
            animate={{
              x: [0, 30, -20, 10, 0],
              y: [0, -30, 20, -10, 0],
              scale: [1, 1.1, 0.9, 1.05, 1],
            }}
            transition={{
              duration: circle.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: circle.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full"
        >
          {/* Header section with animated underline */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2
              className={`text-5xl md:text-6xl font-bold mb-2 ${
                currentTheme.accent === "bg-teal-500"
                  ? "text-teal-500"
                  : "text-teal-600"
              }`}
            >
              Who Are We?
            </h2>
            <motion.div
              className={`h-1 w-24 mx-auto ${currentTheme.accent} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl max-w-4xl mx-auto mt-8 font-light leading-relaxed"
            >
              At Samvaad, we're more than just a platform. We are a vibrant
              collective of innovators, thinkers, and doers, dedicated to
              connecting people and sparking meaningful conversations.
            </motion.p>
          </motion.div>

          {/* Mission statement with animated reveal */}
          <motion.div
            variants={itemVariants}
            className={`${
              theme === "light"
                ? "bg-gradient-to-r from-teal-50 to-blue-50"
                : "bg-gradient-to-r from-slate-800 to-slate-700"
            } rounded-2xl p-8 mb-16 shadow-lg max-w-4xl mx-auto text-center`}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-lg md:text-xl italic"
            >
              Our goal is to create digital experiences that empower
              individuals, foster growth, and provide a safe space for sharing
              knowledge and support.
            </motion.p>
          </motion.div>

          {/* Core values section with fancy cards */}
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-semibold text-center mb-12"
          >
            Our Core Values
          </motion.h3>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10"
          >
            {[
              {
                icon: "lightbulb",
                title: "Innovation",
                description:
                  "We pride ourselves on thinking outside the box and pushing boundaries to create impactful solutions.",
                gradient:
                  theme === "light"
                    ? "from-teal-400 to-blue-500"
                    : "from-teal-600 to-blue-700",
              },
              {
                icon: "users",
                title: "Community",
                description:
                  "Our platform is built on the power of community, where individuals come together to learn, share, and grow.",
                gradient:
                  theme === "light"
                    ? "from-emerald-400 to-teal-500"
                    : "from-emerald-600 to-teal-700",
              },
              {
                icon: "heart",
                title: "Empathy",
                description:
                  "We approach everything we do with empathy, ensuring that every user has a meaningful and supportive experience.",
                gradient:
                  theme === "light"
                    ? "from-blue-400 to-purple-500"
                    : "from-blue-600 to-purple-700",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                variants={valueCardVariants}
                whileHover="hover"
                className={`${currentTheme.card} rounded-xl overflow-hidden shadow-lg`}
              >
                <div className={`h-2 bg-gradient-to-r ${value.gradient}`} />
                <div className="p-8">
                  <motion.div
                    className="mb-6 flex justify-center"
                    animate={{
                      rotate: [0, 5, -5, 5, 0],
                      scale: [1, 1.1, 1, 1.05, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 1.5,
                    }}
                  >
                    <div
                      className={`bg-gradient-to-br ${value.gradient} text-white p-5 rounded-full w-16 h-16 flex items-center justify-center`}
                    >
                        {value.icon === "lightbulb" && <Lightbulb size={32} />}
                        {value.icon === "users" && <Users size={32} />}
                        {value.icon === "heart" && <Heart size={32} />}
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    {value.title}
                  </h3>
                  <p className={`${currentTheme.muted} text-center`}>
                    {value.description}
                  </p>

                  <motion.button
                    className={`mt-6 mx-auto block px-6 py-2 rounded-full bg-gradient-to-br ${value.gradient} text-sm font-medium transition-all`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + index * 0.2 }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Join us call to action */}
          <motion.div variants={itemVariants} className="mt-20 text-center">
            <motion.button
              className={`${currentTheme.accent} text-white px-10 py-4 rounded-full text-xl font-semibold`}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            >
              Join Our Community
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
