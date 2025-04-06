import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PoetryPayment = () => {
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const backendLink = useSelector((state) => state.prod.link);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const token = sessionStorage.getItem("payment-verification-session");
      const res = await axios.post(
        `${backendLink}/api/v1/payment-verification`,
        { transactionId, submissionId: token }
      );
      sessionStorage.clear("payment-verification-session");
      //toast.success(res.data.message);
      toast.success("Payment Submitted");
      setTransactionId("");
      navigate("/");
    } catch (error) {
      toast.error("No submission found");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="px-8 md:px-10 py-4 md:py-12">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <img
            src="https://res.cloudinary.com/dzgq7wugj/image/upload/v1742824591/scanner2_d07x5g.jpg"
            alt="QR Code"
            className="h-[80vh] object-cover"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-medium">Scan the QR and Pay</h2>
          <p className="text-lg mt-4">
            UPI ID:{" "}
            <span className="font-semibold">sekharmilaan7714@okicici</span>
          </p>
          <p className="text-lg">
            Amount: <span className="font-semibold">₹99</span>
          </p>
          <mark>After paying, enter the payment transaction ID here</mark>
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              placeholder="Enter the transaction ID"
              required
              className="w-full bg-zinc-200 rounded px-4 py-2 outline-none"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
            <button
              type="submit"
              className="bg-sky-900 text-white px-4 py-2 hover:bg-sky-800 rounded mt-3"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                    viewBox="0 0 24 24"
                  ></svg>
                  Processing...
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PoetryPayment;
