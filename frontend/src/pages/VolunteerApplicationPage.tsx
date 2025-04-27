import { useState, ChangeEvent, FormEvent } from "react";
import { useTheme } from "../components/ThemeComponents/ThemeProvider"; // Adjust path as needed
import Themes from "../components/ThemeComponents/themes";
import {
  Upload,
  Send,
  Loader2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

// Define interface for form data
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  age: string; // Use string initially for input, parse later if needed
  gender: string;
  city: string;
  state: string;
  education: string;
  interest: string;
  availability: string;
  motivation: string;
  resumeFile: File | null;
}

const VolunteerForm = () => {
  const { theme } = useTheme();
  const currentTheme = theme === "dark" ? Themes.dark : Themes.light;
  const themeFormBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const themeInputBorder =
    theme === "dark" ? "border-gray-700" : "border-gray-300";
  const themeInputText = theme === "dark" ? "text-gray-100" : "text-gray-900"; // Ensure text is visible

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    city: "",
    state: "",
    education: "",
    interest: "",
    availability: "",
    motivation: "",
    resumeFile: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });

  // --- Handle Input Changes ---
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear status message on new input
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: null });
    }
  };

  // --- Handle File Change ---
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, resumeFile: e.target.files![0] }));
    } else {
      setFormData((prev) => ({ ...prev, resumeFile: null }));
    }
    // Clear status message on new input
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: null });
    }
  };

  // --- Handle Form Submission ---
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: null });

    const dataToSubmit = new FormData();
    dataToSubmit.append("fullName", formData.fullName);
    dataToSubmit.append("email", formData.email);
    dataToSubmit.append("phone", formData.phone);
    dataToSubmit.append("age", formData.age);
    dataToSubmit.append("gender", formData.gender);
    dataToSubmit.append("city", formData.city);
    dataToSubmit.append("state", formData.state);
    dataToSubmit.append("education", formData.education);
    dataToSubmit.append("interest", formData.interest);
    dataToSubmit.append("availability", formData.availability);
    dataToSubmit.append("motivation", formData.motivation);
    if (formData.resumeFile) {
      dataToSubmit.append("resumeFile", formData.resumeFile);
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${API_URL}/volunteers/apply`, {
        method: "POST",
        body: dataToSubmit,
      });

      let result: any;
      try {
        result = await response.json();
      } catch (jsonError) {
        throw new Error(
          "Could not parse server response. Please try again later."
        );
      }

      if (!response.ok) {
        const errorMsg =
          result?.message ||
          `Submission failed with status ${response.status}: ${response.statusText}`;
        throw new Error(errorMsg);
      }

      setSubmitStatus({
        type: "success",
        message:
          "Application submitted successfully! We will get back to you soon.",
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        city: "",
        state: "",
        education: "",
        interest: "",
        availability: "",
        motivation: "",
        resumeFile: null,
      });

      const fileInput = document.getElementById(
        "resumeFile"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error: any) {
      console.error("Submission error:", error);
      setSubmitStatus({
        type: "error",
        message:
          error.message ||
          "Something went wrong while submitting the form. Please check your input or try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div
      className={`min-h-screen px-4 sm:px-6 py-16 ${currentTheme.bg} ${currentTheme.text} transition-colors duration-300`}
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600 dark:from-teal-400 dark:to-blue-500">
          Become a Volunteer
        </h1>
        <p className={`text-lg mb-10 text-center ${currentTheme.muted}`}>
          Join the Samwaad mission. Help us provide essential support and make a
          difference in the community.
        </p>

        <form
          onSubmit={handleSubmit}
          className={`space-y-6 ${themeFormBg} p-6 sm:p-8 rounded-2xl shadow-lg border ${currentTheme.border}`}
        >
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className={`block text-sm font-medium mb-1.5 ${currentTheme.textLabel}`}
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="e.g., Riya Sharma"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-2.5 border ${themeInputBorder} rounded-lg ${themeFormBg} ${themeInputText} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-1.5 ${currentTheme.textLabel}`}
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-2.5 border ${themeInputBorder} rounded-lg ${themeFormBg} ${themeInputText} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className={`block text-sm font-medium mb-1.5 ${currentTheme.textLabel}`}
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-2.5 border ${themeInputBorder} rounded-lg ${themeFormBg} ${themeInputText} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
            />
          </div>

          {/* Age & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="age"
                className={`block text-sm font-medium mb-1.5 ${currentTheme.textLabel}`}
              >
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="age"
                name="age"
                min="16" // Example minimum age
                placeholder="e.g., 25"
                value={formData.age}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-2.5 border ${themeInputBorder} rounded-lg ${themeFormBg} ${themeInputText} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className={`block text-sm font-medium mb-1.5 ${currentTheme.textLabel}`}
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 border ${themeInputBorder} rounded-lg ${themeFormBg} ${themeInputText} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-no-repeat bg-right pr-8`} // Basic styling for select
                style={{
                  backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" class="${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }"><path d="M7 10l5 5 5-5z"></path></svg>')`,
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1.2em",
                }}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* City and State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="city"
                className={`block text-sm font-medium mb-1.5 ${currentTheme.textLabel}`}
              >
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="e.g., Mumbai"
                value={formData.city}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-2.5 border ${themeInputBorder} rounded-lg ${themeFormBg} ${themeInputText} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className={`block text-sm font-medium mb-1.5 ${currentTheme.textLabel}`}
              >
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="e.g., Maharashtra"
                value={formData.state}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-2.5 border ${themeInputBorder} rounded-lg ${themeFormBg} ${themeInputText} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
              />
            </div>
          </div>

          {/* Education */}
          <div>
            <label
              htmlFor="education"
              className={`block text-sm font-medium mb-1.5 ${currentTheme.textLabel}`}
            >
              Highest Education Background
            </label>
            <input
              type="text"
              id="education"
              name="education"
              placeholder="e.g., BSc Psychology, M.Tech Computer Science"
              value={formData.education}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 border ${themeInputBorder} rounded-lg ${themeFormBg} ${themeInputText} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
            />
          </div>

          {/* Area of Interest */}
          <div>
            <label
              htmlFor="interest"
              className={`block text-sm font-medium mb-1.5 ${currentTheme.textLabel}`}
            >
              Primary Volunteering Interest{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              id="interest"
              name="interest"
              value={formData.interest}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-2.5 border ${themeInputBorder} rounded-lg ${themeFormBg} ${themeInputText} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-no-repeat bg-right pr-8`}
              style={{
                backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" class="${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }"><path d="M7 10l5 5 5-5z"></path></svg>')`,
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1.2em",
              }}
            >
              <option value="">Select area you'd like to help</option>
              <option value="Peer Support Facilitator">
                Peer Support Facilitator
              </option>
              <option value="Community Outreach">Community Outreach</option>
              <option value="Content Creation (Blog, Social Media)">
                Content Creation (Blog, Social Media)
              </option>
              <option value="Workshop Facilitator">Workshop Facilitator</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Event Management">Event Management</option>
              <option value="Fundraising Support">Fundraising Support</option>
              <option value="General Support / Admin">
                General Support / Admin
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Availability */}
          <div>
            <label
              htmlFor="availability"
              className={`block text-sm font-medium mb-1.5 ${currentTheme.textLabel}`}
            >
              Your Availability <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="availability"
              name="availability"
              placeholder="e.g., Weekends (4-6 hours), Tue/Thu evenings (2 hours)"
              value={formData.availability}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-2.5 border ${themeInputBorder} rounded-lg ${themeFormBg} ${themeInputText} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
            />
          </div>

          {/* Motivation */}
          <div>
            <label
              htmlFor="motivation"
              className={`block text-sm font-medium mb-1.5 ${currentTheme.textLabel}`}
            >
              Why do you want to volunteer with Samwaad?{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              id="motivation"
              name="motivation"
              rows={4}
              placeholder="Share your passion for mental health, community support, or specific skills you want to contribute..."
              value={formData.motivation}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-2.5 border ${themeInputBorder} rounded-lg ${themeFormBg} ${themeInputText} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
            />
          </div>

          {/* Resume Upload */}
          <div>
            <label
              htmlFor="resumeFile"
              className={`block text-sm font-medium mb-1.5 ${currentTheme.textLabel}`}
            >
              Upload Resume (Optional, PDF preferred)
            </label>
            <div
              className={`flex items-center gap-4 p-3 border ${themeInputBorder} rounded-lg ${themeFormBg}`}
            >
              <label
                htmlFor="resumeFile"
                className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                <Upload className="w-4 h-4 inline-block mr-2" />
                Choose File
              </label>
              <input
                type="file"
                id="resumeFile"
                name="resumeFile"
                accept=".pdf,.doc,.docx" // Accept common document types
                onChange={handleFileChange}
                className="hidden" // Hide the default input, use the label instead
              />
              <span className={`text-sm ${currentTheme.muted} truncate`}>
                {formData.resumeFile
                  ? formData.resumeFile.name
                  : "No file selected"}
              </span>
            </div>
          </div>

          {/* Submission Status */}
          {submitStatus.message && (
            <div
              className={`p-4 rounded-lg text-sm flex items-center gap-2 ${
                submitStatus.type === "success"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-700"
                  : submitStatus.type === "error"
                  ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700"
                  : ""
              }`}
            >
              {submitStatus.type === "success" && (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              )}
              {submitStatus.type === "error" && (
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              )}
              {submitStatus.message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" /> Submit Application
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerForm;
