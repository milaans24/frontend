import React, { useState } from "react";
import { IoCall } from "react-icons/io5";
import { CgMail } from "react-icons/cg";
import { CiLocationOn } from "react-icons/ci";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const content = [
    { img: "call", title: "+91-8957795819" },
    { img: "email", title: "milaanyugampublication@gmail.com" },
    { img: "loc", title: "Om nagar colony, Varanasi, UP-221007" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const backendLink = useSelector((state) => state.prod.link);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${backendLink}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Your message has been sent!");
        setFormData({ name: "", mobile: "", email: "", message: "" }); // Reset form
      } else {
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 lg:px-10 py-4 lg:py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold">Contact Us</h1>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {content.map((item, index) => (
          <div
            key={index}
            className="rounded w-full flex flex-col items-center justify-center hover:border-black hover:scale-105 transition-all duration-500 hover:cursor-pointer"
          >
            <div className="text-4xl bg-orange-100 p-3 rounded-full shadow z-10">
              {item.img === "call" ? (
                <IoCall />
              ) : item.img === "email" ? (
                <CgMail />
              ) : (
                <CiLocationOn />
              )}
            </div>
            <h2 className="my-2 bg-white p-8 rounded -mt-4 text-center w-full shadow z-0">
              {item.title}
            </h2>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-2">
        <div className="w-full md:w-1/2">
          <img src="./contact.png" alt="Contact" />
        </div>
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded p-6 shadow-xl">
            <h1 className="text-2xl text-sky-900 font-semibold text-center">
              Consultation Form
            </h1>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-100 rounded px-4 py-2 w-full outline-none"
                  placeholder="Name"
                  required
                />
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="bg-gray-100 rounded px-4 py-2 w-full outline-none"
                  placeholder="Mobile Number"
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-100 rounded px-4 py-2 w-full outline-none"
                placeholder="Email"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="bg-gray-100 rounded px-4 py-2 w-full h-32 outline-none"
                placeholder="About your book"
                required
              />
              <button
                type="submit"
                className={`bg-sky-900 text-white rounded px-4 py-2 w-full ${
                  loading && "opacity-50 cursor-not-allowed"
                }`}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
