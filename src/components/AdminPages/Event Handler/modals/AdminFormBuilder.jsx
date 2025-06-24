import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../extras/axiosInstance";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const fieldTypes = [
  "text",
  "email",
  "password",
  "radio",
  "checkbox",
  "file",
  "image",
  "pdf",
];

const AdminFormBuilder = ({ selectedEvent }) => {
  const backendLink = useSelector((state) => state.prod.link);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);

  // 👇 Fetch form fields when selectedEvent changes
  useEffect(() => {
    const fetchFormFields = async () => {
      if (!selectedEvent?._id) return;

      try {
        const res = await axiosInstance.get(
          `${backendLink}/api/v1/event-registration-form/${selectedEvent._id}`,
          { headers }
        );
        if (res.data?.formFields) {
          setFields(res.data.formFields);
        }
      } catch (err) {
        // console.error(err);
        // toast.error("Failed to load existing form fields.");
      }
    };

    fetchFormFields();
  }, [selectedEvent]);

  const addField = () => {
    setFields([
      ...fields,
      { label: "", name: "", type: "text", required: false, options: [] },
    ]);
  };

  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    if (key === "type" && !["radio", "checkbox"].includes(value)) {
      updatedFields[index].options = [];
    }
    setFields(updatedFields);
  };

  const addOption = (index) => {
    const updatedFields = [...fields];
    updatedFields[index].options.push("");
    setFields(updatedFields);
  };

  const handleOptionChange = (fieldIndex, optionIndex, value) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options[optionIndex] = value;
    setFields(updatedFields);
  };

  const removeField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axiosInstance.put(
        `${backendLink}/api/v1/event-registration-form/${selectedEvent._id}`,
        { formFields: fields },
        { headers }
      );
      toast.success("Form saved successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to save form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={index} className="p-3 border rounded space-y-2">
          <div className="flex gap-4 flex-wrap">
            <input
              type="text"
              placeholder="Label"
              className="border p-1 rounded w-1/3"
              value={field.label}
              onChange={(e) =>
                handleFieldChange(index, "label", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Name"
              className="border p-1 rounded w-1/3"
              value={field.name}
              onChange={(e) => handleFieldChange(index, "name", e.target.value)}
            />
            <select
              className="border p-1 rounded"
              value={field.type}
              onChange={(e) => handleFieldChange(index, "type", e.target.value)}
            >
              {fieldTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) =>
                  handleFieldChange(index, "required", e.target.checked)
                }
              />
              Required
            </label>
            <button
              onClick={() => removeField(index)}
              className="text-red-600 font-bold"
            >
              ❌
            </button>
          </div>

          {["radio", "checkbox"].includes(field.type) && (
            <div className="space-y-2">
              <p className="font-medium">Options:</p>
              {field.options.map((option, optIndex) => (
                <input
                  key={optIndex}
                  type="text"
                  placeholder={`Option ${optIndex + 1}`}
                  className="border p-1 rounded w-full"
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(index, optIndex, e.target.value)
                  }
                />
              ))}
              <button
                onClick={() => addOption(index)}
                className="text-sm text-blue-600"
              >
                Add Option
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-between">
        <button
          onClick={addField}
          className="border hover:shadow-sm transition-all duration-300  px-4 py-1 rounded"
        >
          Add Field
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-white px-4 py-1 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Form"}
        </button>
      </div>
    </div>
  );
};

export default AdminFormBuilder;
