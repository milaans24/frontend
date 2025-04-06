import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const PoetrySubmission = () => {
  const navigate = useNavigate();
  const [Loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    language: "",
    poemFile: null,
    agreement: false,
  });
  const backendLink = useSelector((state) => state.prod.link);
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    if (
      formData.fullName.trim().length === 0 ||
      formData.email.trim().length === 0 ||
      formData.phoneNumber.trim().length === 0 ||
      formData.language.trim().length === 0 ||
      formData.poemFile === null ||
      formData.agreement === false
    ) {
      toast.error("All fields are required.");
    }

    const submissionData = new FormData();
    submissionData.append("fullName", formData.fullName);
    submissionData.append("email", formData.email);
    submissionData.append("phoneNumber", formData.phoneNumber);
    submissionData.append("language", formData.language);
    submissionData.append("pdf", formData.poemFile);

    try {
      const res = await axios.post(
        `${backendLink}/api/v1/submit-poetry`,
        submissionData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Poetry submitted successfully!");
      sessionStorage.setItem(
        "payment-verification-session",
        res.data.submissionId
      );
      navigate("/poetry-payment");
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        language: "",
        poemFile: null,
        agreement: false,
      });
    } catch (err) {
      //   console.error(err);
      toast.error("Failed to submit poetry.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-400 to-red-400 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg p-8 w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🌸 Poetry Submission Form 🌸
        </h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Your full name"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email ID
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="your@email.com"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number (WhatsApp preferred)
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="+91-XXXXXXXXXX"
          />
        </div>

        {/* Language */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Language of Poem
          </label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select...</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
          </select>
        </div>

        {/* Upload PDF File */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload PDF File
          </label>
          <input
            type="file"
            name="poemFile"
            accept="application/pdf"
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Agreement */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="agreement"
            checked={formData.agreement}
            onChange={handleChange}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            I confirm that this poem is my original work.
          </label>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {Loader ? "Submitting..." : "Submit Poem"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PoetrySubmission;
