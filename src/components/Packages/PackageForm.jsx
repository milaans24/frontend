import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PackageForm = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    aboutBook: "",
    package: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${backendLink}/api/send-email`, formData);
      toast.success("Email sent successfully!", {
        position: "top-right",
      });
      setFormData({ name: "", mobile: "", aboutBook: "", package: "" });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send email", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="w-[300px] p-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="font-semibold">Name</label>
          <input
            type="text"
            className="border rounded px-4 py-2"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Mobile Number</label>
          <input
            type="text"
            className="border rounded px-4 py-2"
            placeholder="Your Mobile Number"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">About Your Book</label>
          <textarea
            className="border rounded px-4 py-2"
            placeholder="Tell us about your book"
            value={formData.aboutBook}
            onChange={(e) =>
              setFormData({ ...formData, aboutBook: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Select Package</label>
          {[
            "Basic Package",
            "Standard Package",
            "Premium Package",
            "Elite Package",
          ].map((pkg) => (
            <div key={pkg} className="flex items-center gap-2">
              <input
                type="radio"
                name="package"
                value={pkg}
                checked={formData.package === pkg}
                onChange={(e) =>
                  setFormData({ ...formData, package: e.target.value })
                }
              />
              <label>{pkg}</label>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Contact Me
        </button>
      </form>
    </div>
  );
};

export default PackageForm;
