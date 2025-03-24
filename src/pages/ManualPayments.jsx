import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

const ManualPayments = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactionId, setTransactionId] = useState("");

  const backendLink = useSelector((state) => state.prod.link);
  const navigate = useNavigate();
  const { id } = useParams();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(
          `${backendLink}/api/v1/get-order-details/${id}`,
          { headers }
        );
        setPaymentDetails(response.data);
      } catch (err) {
        toast.error("Failed to fetch payment details");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [backendLink, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!transactionId.trim()) {
      toast.error("Transaction ID cannot be empty");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(
        `${backendLink}/api/v1/manualPaymentDoneByUser/${id}`,
        { transactionId },
        { headers }
      );
      toast.success(response.data.message || "Payment updated successfully!");
      setLoading(false);
      setTimeout(() => {
        navigate("/profile");
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      toast.error("Failed to submit transaction ID");
      setLoading(false);
    }
  };

  if (loading) return <Loader />; // Show only the Loader while loading

  return (
    <div className="px-8 md:px-10 py-4 md:py-12">
      <div className="flex gap-6">
        <div className="w-1/3">
          <img src="./scanner2.jpg" alt="QR Code" className="h-[80vh]" />
        </div>
        <div className="w-2/3">
          <h2 className="text-2xl font-medium">Scan the QR and Pay</h2>
          <p className="text-lg mt-4">
            UPI ID:{" "}
            <span className="font-semibold">sekharmilaan7714@okicici</span>
          </p>
          <p className="text-lg">
            Amount:{" "}
            <span className="font-semibold">₹{paymentDetails?.total}</span>
          </p>
          <mark>After paying, enter the payment transaction ID here</mark>
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              placeholder="Enter the transaction ID"
              className="w-full bg-zinc-200 rounded px-4 py-2 outline-none"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
            <button
              type="submit"
              className="bg-sky-900 text-white px-4 py-2 hover:bg-sky-800 rounded mt-3"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManualPayments;
