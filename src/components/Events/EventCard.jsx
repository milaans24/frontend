import React from "react";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

const EventCard = ({ event, showRegister }) => {
  const { title, description, image, startDate, endDate, _id } = event;

  return (
    <Link
      to={`/event-details/${_id}`}
      className=" bg-white rounded-2xl border border-gray-200 shadow hover:shadow-lg transition-all overflow-hidden gap-6 group"
    >
      <div className=" w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className=" w-full flex flex-col justify-between p-4">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800">
            {title}
          </h3>

          {/* Render sanitized HTML description 
          {description && (
            <div
              className="text-gray-600 mt-2 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(description),
              }}
            />
          )}
     */}
          <div className="mt-4 text-sm text-gray-500 space-y-2">
            <div>
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                Start: {new Date(startDate).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                End: {new Date(endDate).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {showRegister && (
          <div className="mt-6">
            <Link
              to={`/event-submission/${_id}`}
              className="w-fit bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2 rounded-xl font-medium hover:brightness-110 hover:scale-105 transition-all duration-200"
            >
              Register for this Event
            </Link>
          </div>
        )}
      </div>
    </Link>
  );
};

export default EventCard;
