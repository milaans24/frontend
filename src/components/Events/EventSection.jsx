import React from "react";
import EventCard from "./EventCard";

const EventSection = ({ title, events, showRegister = false }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {events?.length === 0 ? (
        <p className="text-gray-500">No {title.toLowerCase()} available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              showRegister={showRegister}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventSection;
