import { useTheme } from "./ThemeComponents/ThemeProvider";
import { motion } from "framer-motion";
import {
  MessagesSquare,
  UserCheck,
  BookOpen,
  Users,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    title: "Free Mental Health Consultation",
    desc: "Get initial help for stress, anxiety, or emotional burnout without any cost.",
    icon: <MessagesSquare size={28} />,
  },
  {
    title: "Connect with Professional Advisors",
    desc: "We link you with licensed counselors, therapists, and domain experts for deep guidance.",
    icon: <UserCheck size={28} />,
  },
  {
    title: "Anonymity & Privacy First",
    desc: "You’re safe here. No need to reveal identity unless you’re comfortable.",
    icon: <ShieldCheck size={28} />,
  },
  {
    title: "Student-Centric Platform",
    desc: "Designed with students and young professionals in mind, we understand your struggle.",
    icon: <BookOpen size={28} />,
  },
  {
    title: "Easy Access to Experts",
    desc: "From career doubts to mental stress, we have verified experts across fields.",
    icon: <Users size={28} />,
  },
  {
    title: "One Tap Booking",
    desc: "Consultations at your time. Book sessions in just a few taps, no hassle.",
    icon: <PhoneCall size={28} />,
  },
];

const KeyFeatures = () => {
  const { theme } = useTheme();

  const bg = theme === "light" ? "bg-[#F7FAFC]" : "bg-slate-900";
  const card =
    theme === "light" ? "bg-white text-slate-800" : "bg-slate-800 text-white";

  return (
    <section
      className={`${bg} py-16 px-6 md:px-20 transition-all duration-500`}
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Why Choose Samvaad?</h2>
        <p className="text-lg max-w-2xl mx-auto text-gray-500">
          Because your peace of mind deserves a safe, accessible, and
          expert-backed space.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feat, idx) => (
          <motion.div
            key={idx}
            className={`p-6 rounded-xl shadow-lg border border-slate-200  ${card} transition-all`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 text-teal-500">{feat.icon}</div>
            <h4 className="text-xl font-semibold mb-2">{feat.title}</h4>
            <p className="text-sm  text-slate-600">
              {feat.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default KeyFeatures;
