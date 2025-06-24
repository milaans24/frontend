import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../extras/axiosInstance";
import DOMPurify from "dompurify";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EventDetails = () => {
  const { id } = useParams();
  const backendLink = useSelector((state) => state.prod.link);
  const [event, setEvent] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEventDetails = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${backendLink}/api/v1/getSingleEvent/${id}`
      );
      setEvent(data.event);
      setLeaderboard(data.leaderboard || null);
      //console.log(data);
    } catch (error) {
      toast.error("Failed to fetch event details.");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: event.title,
      text: `Check out this amazing event: ${event.title}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      toast.error("Failed to share the event.");
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-32 text-xl font-semibold text-gray-500">
        Loading event details...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-32 text-xl font-semibold text-red-500">
        Event not found.
      </div>
    );
  }

  const { title, description, image, startDate, endDate, isLive } = event;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT SECTION */}
        <div className="lg:col-span-7 space-y-6">
          {!event.isLive && leaderboard?.entries?.length > 0 && (
            <div className="bg-white border border-gray-300 rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                🏆 Leaderboard
              </h2>
              <ol className="space-y-3 list-decimal list-inside text-gray-700 font-medium">
                {leaderboard.entries
                  .sort((a, b) => b.score - a.score)
                  .map((entry, index) => (
                    <li
                      key={entry._id}
                      className={`p-3 rounded-xl ${
                        index === 0
                          ? "bg-yellow-100 border-l-4 border-yellow-500"
                          : index === 1
                          ? "bg-gray-100 border-l-4 border-gray-400"
                          : index === 2
                          ? "bg-orange-100 border-l-4 border-orange-500"
                          : "bg-gray-50 border-l-4 border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-lg">
                          {entry.name}
                        </span>
                        <span className="text-xl font-bold text-blue-600">
                          {entry.score}
                        </span>
                      </div>
                    </li>
                  ))}
              </ol>
            </div>
          )}

          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            {title}
          </h1>

          {isLive ? (
            <div className="inline-block bg-red-100 text-red-600 text-sm font-semibold px-4 py-1 rounded-full shadow-sm animate-pulse">
              🔴 Live Event
            </div>
          ) : !event.isLive ? (
            <div className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full shadow-sm">
              ✅ Ended Event
            </div>
          ) : (
            <div className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1 rounded-full shadow-sm">
              🔜 Upcoming Event
            </div>
          )}

          <div className="text-gray-500 text-sm font-medium space-y-2">
            <div>
              🟢 Start:{" "}
              <strong className="text-gray-800">
                {new Date(startDate).toLocaleString()}
              </strong>
            </div>
            <div>
              🔚 End:{" "}
              <strong className="text-gray-800">
                {new Date(endDate).toLocaleString()}
              </strong>
            </div>
          </div>

          {description && (
            <div
              className="prose prose-gray max-w-none mt-6"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(description),
              }}
            />
          )}

          {isLive && (
            <div className="pt-10">
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:brightness-110 hover:scale-105 transition-all">
                🚀 Register for this Event
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-[280px] object-cover rounded-t-2xl"
            />
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Event Info
                </h3>
                <ul className="mt-2 space-y-2 text-sm text-gray-600">
                  <li>
                    📅 <strong>Start:</strong>{" "}
                    {new Date(startDate).toLocaleString()}
                  </li>
                  <li>
                    ⏰ <strong>End:</strong>{" "}
                    {new Date(endDate).toLocaleString()}
                  </li>
                  <li>
                    {isLive ? (
                      <span className="text-red-600 font-semibold">
                        🟢 Currently Live
                      </span>
                    ) : (
                      <span className="text-blue-700 font-semibold">
                        🔜 Upcoming
                      </span>
                    )}
                  </li>
                </ul>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleShare}
                  className="w-full bg-gray-900 text-white py-3 rounded-xl text-center font-semibold hover:bg-gray-800 transition"
                >
                  🔗 Share Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
