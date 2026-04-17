import { useState, useEffect } from "react";
import { FaGift, FaTrophy, FaCoins } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const GAMING_TIME_ZONE = "Asia/Dhaka";
dayjs.extend(utc);
dayjs.extend(timezone);

const getTimeUntilMidnightLabel = (date = new Date()) => {
  const now = dayjs(date).tz(GAMING_TIME_ZONE);
  const totalSeconds = Math.max(now.endOf("day").diff(now, "second"), 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
};

const DailyXPClaim = () => {
  const navigate = useNavigate();

  // Static context for now
  const canClaim = true;
  const userXP = 0;
  const isLoading = false;

  const [timeUntilMidnight, setTimeUntilMidnight] = useState(
    getTimeUntilMidnightLabel()
  );

  // Keep countdown ticking and clean up interval on unmount.
  useEffect(() => {
    const updateCountdown = () => {
      setTimeUntilMidnight(getTimeUntilMidnightLabel());
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClaim = async () => {
    // console.log("XP Claimed (Static Mode)");
  };

  const rewards = [
    {
      icon: FaGift,
      label: "Daily Reward",
      value: "10 XP",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: FaCoins,
      label: "Your XP",
      value: `${userXP} XP`,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="relative space-y-3 overflow-hidden rounded-lg border border-gray-200 bg-white p-3 shadow">
      {/* Header with Stats */}
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-1">
          <h3 className="mb-1 text-2xl font-bold text-blue-600">
            Daily XP Claim
          </h3>

          {canClaim && (
            <p className="text-sm font-medium text-orange-700">
              Claim expires at midnight Dhaka time ({timeUntilMidnight}{" "}
              remaining)
            </p>
          )}
        </div>
        <div className="flex gap-3">
          {rewards.map((item, index) => (
            <div
              key={index}
              className={`rounded-lg border border-gray-200 ${item.bgColor} px-4 py-1.5 text-center`}
            >
              <item.icon className={`mx-auto mb-1 text-xl ${item.iconColor}`} />
              <p className="text-xs text-gray-500">{item.label}</p>
              <p className="font-bold text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Claim Button Section */}
      <div className="space-y-3">
        {!canClaim && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-center">
            <p className="text-sm font-medium text-green-700">
              Already claimed today!
            </p>
            <div className="mt-2 flex items-center justify-center gap-2 text-xs font-medium text-gray-600">
              <span>
                Next claim available in Dhaka time:{" "}
                <span className="font-bold text-blue-600">
                  {timeUntilMidnight}
                </span>
              </span>
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/gaming/tournament")}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-300 bg-white py-3 font-medium text-blue-600 transition-all hover:border-blue-400 hover:bg-blue-50 active:scale-95"
          >
            <FaTrophy />
            View Tournament
          </button>
          <button
            onClick={handleClaim}
            disabled={!canClaim || isLoading}
            className={`w-full rounded-lg py-3 font-semibold text-white shadow transition-all ${
              canClaim
                ? "bg-blue-600 hover:bg-blue-700 active:scale-95"
                : "cursor-not-allowed bg-gray-400"
            }`}
          >
            {canClaim ? (
              <span className="flex items-center justify-center gap-2">
                <FaGift />
                Claim 10 XP Now
              </span>
            ) : (
              "Already Claimed Today"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyXPClaim;
