import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useTheme } from "../components/ThemeComponents/ThemeProvider"; // Adjust the import path as needed
import Themes from "../components/ThemeComponents/themes"; // Adjust the import path as needed

const ContactPage = () => {
  const { theme } = useTheme();
  const currentTheme = Themes[theme];

  return (
    <div
      className={`min-h-screen px-4 sm:px-6 py-16 ${currentTheme.bg} ${currentTheme.text}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            Get in Touch
          </h1>
          <p className={`text-xl ${currentTheme.muted} max-w-2xl mx-auto`}>
            We'd love to hear from you! Reach out for inquiries, support, or
            just to say hello.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div
              className={`p-8 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="flex items-start gap-6">
                <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p className={currentTheme.muted}>support@samwaad.org</p>
                  <a
                    href="mailto:support@samwaad.org"
                    className="inline-block mt-3 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Send us a message
                  </a>
                </div>
              </div>
            </div>

            <div
              className={`p-8 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="flex items-start gap-6">
                <div className="p-3 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Phone</h3>
                  <p className={currentTheme.muted}>+91 12345 67890</p>
                  <a
                    href="tel:+911234567890"
                    className="inline-block mt-3 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Call us now
                  </a>
                </div>
              </div>
            </div>

            <div
              className={`p-8 rounded-2xl ${currentTheme.card} shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="flex items-start gap-6">
                <div className="p-3 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Office</h3>
                  <p className={currentTheme.muted}>
                    Samwaad HQ, New Delhi, India
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Get directions
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`p-8 rounded-2xl ${currentTheme.card} shadow-lg`}>
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${currentTheme.muted}`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 border rounded-lg ${
                    currentTheme.card
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    theme === "light" ? "border-gray-200" : "border-gray-700"
                  }`}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${currentTheme.muted}`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  className={`w-full px-4 py-3 border rounded-lg ${
                    currentTheme.card
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    theme === "light" ? "border-gray-200" : "border-gray-700"
                  }`}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${currentTheme.muted}`}
                >
                  Your Message
                </label>
                <textarea
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg ${
                    currentTheme.card
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    theme === "light" ? "border-gray-200" : "border-gray-700"
                  }`}
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg font-medium"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
