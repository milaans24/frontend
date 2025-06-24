import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axiosInstance from "../../../../extras/axiosInstance";

const UpdateEventTab = ({ selectedEvent }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isLive: false,
    endDate: "",
  });

  const backendLink = useSelector((state) => state.prod.link);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const [loading, setLoading] = useState(false);
  const [isEndDisabled, setIsEndDisabled] = useState(true);

  useEffect(() => {
    if (selectedEvent) {
      const eventEndDate = selectedEvent.endDate
        ? new Date(selectedEvent.endDate)
        : null;

      const isPastEndDate = eventEndDate && new Date() >= eventEndDate;

      setFormData({
        title: selectedEvent.title || "",
        description: selectedEvent.description || "",
        image: selectedEvent.image || "",
        startDate: selectedEvent.startDate
          ? new Date(selectedEvent.startDate).toISOString().slice(0, 16)
          : "",
        endDate: eventEndDate ? eventEndDate.toISOString().slice(0, 16) : "",
        isLive: selectedEvent.isLive || false,
      });

      setIsEndDisabled(!isPastEndDate);
    }
  }, [selectedEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleLiveToggle = (value) => {
    setFormData((prev) => ({ ...prev, isLive: value }));
  };

  const handleEndEvent = () => {
    setFormData((prev) => ({ ...prev, isLive: false }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axiosInstance.put(
        `${backendLink}/api/v1/updateEvent/${selectedEvent._id}`,
        formData,
        { headers }
      );
      toast.success("Event updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error || "Error updating event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Event Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter event title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <ReactQuill
          theme="snow"
          value={formData.description}
          onChange={handleDescriptionChange}
          className="bg-white"
        />
      </div>

      <div className="flex items-center space-x-3">
        <Switch
          checked={formData.isLive}
          onChange={handleLiveToggle}
          className={`${
            formData.isLive ? "bg-green-500" : "bg-gray-300"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
        >
          <span
            className={`${
              formData.isLive ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
        <label className="text-sm font-medium text-gray-700 select-none">
          Make Event Live
        </label>
      </div>

      <div className="flex items-center space-x-3">
        <Switch
          checked={!formData.isLive}
          onChange={handleEndEvent}
          disabled={isEndDisabled}
          className={`${
            !formData.isLive ? "bg-red-500" : "bg-gray-300"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
            isEndDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span
            className={`${
              !formData.isLive ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
        <label className="text-sm font-medium text-gray-700 select-none">
          End Event
        </label>
      </div>

      <button
        disabled={loading}
        onClick={handleUpdate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Event"}
      </button>
    </div>
  );
};

export default UpdateEventTab;
