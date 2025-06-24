import React, { useEffect, useState } from "react";
import axiosInstance from "../../extras/axiosInstance";
import EventSection from "./EventSection";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EventCompo = () => {
  const { id } = useParams();
  const backendLink = useSelector((state) => state.prod.link);

  const [eventsData, setEventsData] = useState({
    liveEvents: [],
    upcomingEvents: [],
    pastEvents: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchCategoryDetails = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${backendLink}/api/v1/getEventsOfCategory/${id}`
      );

      setEventsData({
        liveEvents: data.category.liveEvents || [],
        upcomingEvents: data.category.upcomingEvents || [],
        pastEvents: data.category.pastEvents || [],
      });
    } catch (err) {
      toast.error("Failed to fetch events data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-medium text-gray-600">
        Loading events...
      </div>
    );
  }

  const { liveEvents, upcomingEvents, pastEvents } = eventsData;
  const noEvents =
    liveEvents.length === 0 &&
    upcomingEvents.length === 0 &&
    pastEvents.length === 0;

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      {liveEvents.length > 0 && (
        <EventSection title="Live Events" events={liveEvents} showRegister />
      )}
      {upcomingEvents.length > 0 && (
        <EventSection title="Upcoming Events" events={upcomingEvents} />
      )}
      {pastEvents.length > 0 && (
        <EventSection title="Past Events" events={pastEvents} />
      )}
      {noEvents && (
        <div className="text-center text-gray-600 text-lg py-16 font-medium">
          No events scheduled yet.
        </div>
      )}
    </div>
  );
};

export default EventCompo;
