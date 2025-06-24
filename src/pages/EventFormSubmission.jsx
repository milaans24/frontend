import React, { useEffect, useState } from "react";
import axiosInstance from "../extras/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventFormSubmission = () => {
  const { id: eventId } = useParams();
  const backendLink = useSelector((state) => state.prod.link);
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        const res = await axiosInstance.get(
          `${backendLink}/api/v1/event-registration-form/${eventId}`
        );
        const fields = res.data.formFields;

        setFormFields(fields);

        // Initialize formData
        const initialData = {};
        fields.forEach((field) => {
          initialData[field.name] =
            field.type === "checkbox"
              ? false
              : field.type === "file"
              ? null
              : "";
        });
        setFormData(initialData);
      } catch (error) {
        toast.error("Failed to fetch form fields.");
      }
    };

    fetchFormFields();
  }, [backendLink, eventId]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const submissionData = new FormData();
      for (let key in formData) {
        submissionData.append(key, formData[key]);
      }

      await axiosInstance.post(
        `${backendLink}/api/v1/submit-form/${eventId}`,
        submissionData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Form submitted successfully!");
      navigate("/thank-you");
    } catch (err) {
      toast.error("Form submission failed.");
    } finally {
      setLoader(false);
    }
  };

  const renderField = (field) => {
    const commonProps = {
      name: field.name,
      value: formData[field.name] || "",
      onChange: handleChange,
      className:
        "w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500",
    };

    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {field.name}
            </label>
            <input
              type={field.type}
              {...commonProps}
              name={field.label}
              placeholder={field.name}
              required={field.required}
            />
          </div>
        );

      case "file":
        return (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {field.name}
            </label>
            <input
              type="file"
              name={field.name}
              accept={field.accept || "*"}
              onChange={handleChange}
              className={commonProps.className}
              required={field.required}
            />
          </div>
        );

      case "select":
        return (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <select {...commonProps} required={field.required}>
              <option value="">Select...</option>
              {field.options.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        );

      case "checkbox":
        return (
          <div key={field.name} className="mb-4 flex items-center">
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name]}
              onChange={handleChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-900">{field.label}</label>
          </div>
        );

      default:
        return null;
    }
  };

  if (!formFields.length) return <div className="text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-400 to-red-400 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg p-8 w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Event Form Submission
        </h2>

        {formFields.map((field) => renderField(field))}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {loader ? "Submitting..." : "Submit Form"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EventFormSubmission;
