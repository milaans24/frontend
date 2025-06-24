import React, { useState } from "react";
import CategoryManager from "../components/AdminPages/Event Handler/CategoryManager";
import EventManager from "../components/AdminPages/Event Handler/EventManager.jsx";
import EventOverview from "../components/AdminPages/Event Handler/EventOverview.jsx";

const AdminEventHandler = () => {
  const [section, setSection] = useState("category");

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-6">
        {["category", "event", "overview"].map((sec) => (
          <button
            key={sec}
            className={`px-4 py-2 rounded ${
              section === sec ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSection(sec)}
          >
            {sec[0].toUpperCase() + sec.slice(1)}
          </button>
        ))}
      </div>

      {section === "category" && <CategoryManager />}
      {section === "event" && <EventManager />}
      {section === "overview" && <EventOverview />}
    </div>
  );
};

export default AdminEventHandler;
