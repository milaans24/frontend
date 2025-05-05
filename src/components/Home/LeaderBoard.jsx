import React from "react";
import { FaCrown } from "react-icons/fa";
import { motion } from "framer-motion";

const winners = [
  { name: "Niti Goyal", points: 339, color: "bg-yellow-200", crown: true },
  { name: "Piyush Kumar", points: 307, color: "bg-gray-200" },
  { name: "Shivam Dubey", points: 289, color: "bg-amber-100" },
  { name: "Vaishnavi Singh", points: 284, color: "bg-pink-100" },
  { name: "Sanjeevani Sikawat", points: 270, color: "bg-purple-100" },
];

const LeaderBoard = () => {
  return (
    <div className="min-h-auto bg-gradient-to-br from-pink-50 via-white to-yellow-50 p-6">
      <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-8 drop-shadow">
        🏆 Poetry Competition Leaderboard 🏆
      </h1>

      <div className="max-w-3xl mx-auto grid gap-6">
        {winners.map((winner, index) => (
          <motion.div
            key={winner.name}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`rounded-xl shadow-xl border-2 border-white p-5 ${winner.color} flex items-center justify-between relative overflow-hidden`}
          >
            {winner.crown && (
              <FaCrown className="absolute -top-4 -left-4 text-yellow-500 text-6xl rotate-[-15deg] drop-shadow" />
            )}
            <div className="text-lg font-bold text-gray-800">
              {index + 1}. {winner.name}
            </div>
            <div className="text-right text-md font-semibold text-purple-700">
              {winner.points} / 400
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center text-sm text-gray-500 animate-pulse">
        Congratulations to all the participants! 🌟
      </div>
    </div>
  );
};

export default LeaderBoard;
