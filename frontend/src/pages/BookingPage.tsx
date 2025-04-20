import { useState } from "react";
import { useTheme } from "../components/ThemeComponents/ThemeProvider";
import Themes from "../components/ThemeComponents/themes";
import { Users, Briefcase, DollarSign } from "lucide-react";

const categories = [
  { label: "Mental Health", icon: <Users className="mr-2" /> },
  { label: "Career", icon: <Briefcase className="mr-2" /> },
  { label: "Finance", icon: <DollarSign className="mr-2" /> },
];

export default function ConsultationBooking() {
  const { theme } = useTheme();
  const styles = Themes[theme];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: "",
    date: "",
    time: "",
    name: "",
    email: "",
    notes: "",
  });
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
    setIsBookingSuccess(true);
  };

  return (
    <div className={`min-h-screen py-12 px-4 ${styles.bg} ${styles.text}`}>
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-md space-y-8 transition-all duration-300">
        {isBookingSuccess ? (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Booking Confirmed 🎉</h2>
            <p>We've sent the details to your email.</p>
            <button
              onClick={() => setStep(1)}
              className={`${styles.button} px-6 py-2 rounded-lg`}
            >
              Book Another
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center">
              Book a Consultation
            </h1>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-400">
                <span
                  className={
                    step >= 1 ? "text-blue-600 dark:text-blue-400" : ""
                  }
                >
                  Category
                </span>
                <span
                  className={
                    step >= 2 ? "text-blue-600 dark:text-blue-400" : ""
                  }
                >
                  Date & Time
                </span>
                <span
                  className={
                    step === 3 ? "text-blue-600 dark:text-blue-400" : ""
                  }
                >
                  Details
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="h-2 bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-300"
                  style={{
                    width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
                  }}
                ></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Choose Category */}
              {step === 1 && (
                <div className="space-y-4">
                  <label className="block font-medium">Choose a Category</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {categories.map((cat) => (
                      <button
                        type="button"
                        key={cat.label}
                        onClick={() => handleChange("category", cat.label)}
                        className={`py-2 px-4 rounded-xl border transition-all duration-300 ${
                          formData.category === cat.label
                            ? styles.button
                            : "border-gray-300 dark:border-slate-600"
                        }`}
                      >
                        {cat.icon}
                        {cat.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.category}
                      className={`${styles.button} mt-4 px-6 py-2 rounded-lg`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium">Select a Date</label>
                    <input
                      type="date"
                      className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-700"
                      value={formData.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium">Select a Time</label>
                    <input
                      type="time"
                      className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-700"
                      value={formData.time}
                      onChange={(e) => handleChange("time", e.target.value)}
                    />
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="text-sm underline"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.date || !formData.time}
                      className={`${styles.button} px-6 py-2 rounded-lg`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: User Details */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium">Your Name</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-700"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium">Email Address</label>
                    <input
                      type="email"
                      className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-700"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium">
                      Any Notes (optional)
                    </label>
                    <textarea
                      className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-700"
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                    />
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="text-sm underline"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className={`${styles.button} px-6 py-2 rounded-lg`}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
