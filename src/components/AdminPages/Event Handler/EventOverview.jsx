import React, { useEffect, useState, Fragment } from "react";
import axiosInstance from "../../../extras/axiosInstance";
import { useSelector } from "react-redux";
import { Tab } from "@headlessui/react";
import { toast } from "react-toastify";
import { FaPencilAlt } from "react-icons/fa";
import UpdateEventTab from "./modals/UpdateEventTab";
import AdminFormBuilder from "./modals/AdminFormBuilder";
import GenerateLeaderBoard from "./modals/GenerateLeaderBoard";

const classNames = (...classes) => classes.filter(Boolean).join(" ");

const EventOverview = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLive, setIsLive] = useState(false);

  const fetchEvents = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${backendLink}/api/v1/getAllEvents`
      );
      setEvents(data.events || []);
    } catch (error) {
      toast.error("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsLive(event.isLive || false);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedEvent(null);
  };

  const handleLiveToggle = async () => {
    try {
      const { data } = await axiosInstance.put(
        `${backendLink}/api/v1/updateEventLiveStatus/${selectedEvent._id}`,
        { isLive: !isLive }
      );
      setIsLive(!isLive);
      toast.success(`Event is now ${!isLive ? "Live" : "Not Live"}`);
      fetchEvents();
    } catch (error) {
      toast.error("Failed to update live status");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {event.title}
              </h3>
              <div className="flex justify-between items-center pt-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    event.isLive
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {event.isLive ? "Live" : "Not Live"}
                </span>
                <button
                  onClick={() => openModal(event)}
                  className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1 text-sm"
                >
                  <FaPencilAlt className="h-4 w-4" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm px-4 py-10">
          <div className="bg-white max-w-3xl w-full rounded-xl shadow-xl p-6 overflow-y-auto max-h-full">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Manage Event
            </h3>

            <Tab.Group>
              <Tab.List className="flex space-x-4 border-b pb-2">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "px-4 py-2 text-sm font-medium rounded-t-md",
                      selected
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-blue-600"
                    )
                  }
                >
                  Edit Event
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "px-4 py-2 text-sm font-medium rounded-t-md",
                      selected
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-blue-600"
                    )
                  }
                >
                  Generate Form
                </Tab>

                <Tab
                  className={({ selected }) =>
                    classNames(
                      "px-4 py-2 text-sm font-medium rounded-t-md",
                      selected
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-blue-600"
                    )
                  }
                >
                  Generate Leaderboard
                </Tab>
              </Tab.List>

              <Tab.Panels className="mt-6">
                <Tab.Panel>
                  <UpdateEventTab selectedEvent={selectedEvent} />
                </Tab.Panel>
                <Tab.Panel>
                  <AdminFormBuilder selectedEvent={selectedEvent} />
                </Tab.Panel>
                <Tab.Panel>
                  <GenerateLeaderBoard selectedEvent={selectedEvent} />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>

            <div className="mt-6 text-right">
              <button
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventOverview;
