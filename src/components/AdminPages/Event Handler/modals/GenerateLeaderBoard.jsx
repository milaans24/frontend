import React, { useState } from "react";
import axiosInstance from "../../../../extras/axiosInstance";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const GenerateLeaderBoard = ({ selectedEvent }) => {
  const backendLink = useSelector((state) => state.prod.link);
  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    id: localStorage.getItem("id"),
  };

  const [entries, setEntries] = useState([
    { name: "", score: "", description: "" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, key, value) => {
    const updated = [...entries];
    updated[index][key] = value;
    setEntries(updated);
  };

  const addEntry = () => {
    setEntries([...entries, { name: "", score: "", description: "" }]);
  };

  const removeEntry = (index) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
  };

  const handleSubmit = async () => {
    if (!selectedEvent?._id) return toast.error("No event selected.");

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `${backendLink}/api/v1/event-leaderboard/${selectedEvent._id}`,
        { leaderboard: entries },
        { headers }
      );
      toast.success("Leaderboard submitted successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message || "Failed to submit leaderboard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {entries.map((entry, index) => (
        <div key={index} className="border rounded p-4 space-y-2">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Participant Name"
              className="border p-2 rounded"
              value={entry.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
            <input
              type="number"
              placeholder="Score"
              className="border p-2 rounded"
              value={entry.score}
              onChange={(e) => handleChange(index, "score", e.target.value)}
            />
            <textarea
              placeholder="Description (optional)"
              className="border p-2 rounded"
              value={entry.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
            />
          </div>
          <button
            onClick={() => removeEntry(index)}
            className="text-red-600 mt-2"
          >
            ❌ Remove
          </button>
        </div>
      ))}

      <div className="flex justify-between">
        <button
          onClick={addEntry}
          className="border px-4 py-2 rounded hover:shadow"
        >
          ➕ Add Participant
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Leaderboard"}
        </button>
      </div>
    </div>
  );
};

export default GenerateLeaderBoard;
