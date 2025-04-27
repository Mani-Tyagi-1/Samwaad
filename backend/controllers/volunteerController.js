// backend/controllers/volunteerController.js
import { VolunteerApplication } from "../models/VolunteerApplication.js";

// --- Controller to Handle Volunteer Application Submission ---
export const submitApplication = async (req, res) => {
  try {
    const {
      fullName, email, phone, age, gender, city, state,
      education, interest, availability, motivation
    } = req.body;

    // --- Basic Validation ---
    const requiredFields = { fullName, email, phone, age, city, state, interest, availability, motivation };
    for (const [key, value] of Object.entries(requiredFields)) {
        if (!value || (typeof value === 'string' && !value.trim())) {
            return res.status(400).json({ message: `${key.replace(/([A-Z])/g, ' $1')} is required.` });
        }
    }
    // Age validation
     const ageNum = parseInt(age, 10);
     if (isNaN(ageNum) || ageNum < 16) {
        return res.status(400).json({ message: 'Valid age (16+) is required.' });
     }

    // Check if email already exists (optional, maybe allow multiple applications?)
    const existingApplication = await VolunteerApplication.findOne({ email: email.toLowerCase().trim() });
    if (existingApplication && existingApplication.status !== 'Rejected') { // Allow re-applying if rejected?
        // Decide policy: update existing, reject new, or allow multiple 'Pending'
         console.log(`Duplicate application attempt for email: ${email}`);
         return res.status(409).json({ message: 'An application with this email address already exists and is pending or accepted.' });
    }


    // --- Prepare Data for Model ---
    const applicationData = {
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      age: ageNum, // Use parsed number
      gender,
      city: city.trim(),
      state: state.trim(),
      education: education ? education.trim() : "",
      interest: interest.trim(),
      availability: availability.trim(),
      motivation: motivation.trim(),
      status: 'Pending', // Default status
      // --- Get Resume Path if Uploaded ---
      resumePath: req.file ? req.file.path : "", // Get path from multer
    };

    // --- Create and Save Application ---
    const newApplication = new VolunteerApplication(applicationData);
    const savedApplication = await newApplication.save();

    console.log(`Volunteer application saved for ${savedApplication.fullName} (${savedApplication.email})`);

    // Send Email Notification (Optional - Implement using Nodemailer or similar)
    // sendNotificationEmail(savedApplication);

    res.status(201).json({
        message: 'Application submitted successfully!',
        applicationId: savedApplication._id, // Send back the ID
    });

  } catch (error) {
     console.error("❌ Error submitting volunteer application:", error);

    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: "Validation Error", errors: messages });
    }
     // Handle potential Multer errors (though they often stop before controller)
     if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File too large. Please upload a smaller resume.' });
     }


    res.status(500).json({ message: 'Internal server error submitting application.' });
  }
};

// --- Controller to Get All Applications (Example - Add Authentication Later) ---
export const getAllApplications = async (req, res) => {
    try {
        // Add Filtering/Pagination/Sorting later
        const applications = await VolunteerApplication.find().sort({ createdAt: -1 }); // Newest first
        res.status(200).json(applications);
    } catch (error) {
        console.error("❌ Error fetching volunteer applications:", error);
        res.status(500).json({ message: 'Internal server error fetching applications.' });
    }
};

// Add controllers for getting single application, updating status, deleting etc. as needed
// Make sure to add authentication/authorization middleware to protect these routes.