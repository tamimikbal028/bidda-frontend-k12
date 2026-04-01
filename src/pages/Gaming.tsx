import { Routes, Route, Navigate } from "react-router-dom";
import GamingHeader from "../components/Gaming/GamingHeader.tsx";
import Dashboard from "../components/Gaming/Dashboard.tsx";
import Play from "../components/Gaming/Play.tsx";
import Leaderboard from "../components/Gaming/Leaderboard.tsx";
import Achievements from "../components/Gaming/Achievements.tsx";
import Tournament from "../components/Gaming/Tournament.tsx";

const Gaming = () => {
  return (
    <>
      <GamingHeader />
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="play" element={<Play />} />
        <Route path="tournament" element={<Tournament />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="achievements" element={<Achievements />} />

        {/* Redirect to dashboard if no route matches */}
        <Route path="*" element={<Navigate to="/gaming" replace />} />
      </Routes>
    </>
  );
};

export default Gaming;
