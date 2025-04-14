import { useTheme } from "./ThemeComponents/ThemeProvider";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  ShieldQuestion,
  Phone,
} from "lucide-react";

const Footer = () => {
  const { theme } = useTheme();

  const textColor = theme === "light" ? "text-slate-700" : "text-slate-300";
  const bgColor = theme === "light" ? "bg-gray-100" : "bg-slate-900";
  const borderColor =
    theme === "light" ? "border-slate-300" : "border-slate-700";

  return (
    <footer
      className={`${bgColor} ${textColor} py-12 px-6 md:px-20 border-t ${borderColor}`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p className="flex items-center gap-2 mb-2">
            <Phone size={18} /> +91-99999-99999
          </p>
          <p className="flex items-center gap-2">
            <Mail size={18} /> hello@samvaad.org
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer flex items-center gap-2">
              <ShieldQuestion size={18} /> FAQs
            </li>
            <li className="hover:underline cursor-pointer flex items-center gap-2">
              <ShieldQuestion size={18} /> Privacy Policy
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-teal-500 transition">
              <Facebook size={22} />
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              <Instagram size={22} />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <Twitter size={22} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-sm">
        &copy; {new Date().getFullYear()} Samvaad. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
