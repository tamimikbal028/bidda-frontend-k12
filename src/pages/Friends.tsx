import { Routes, Route, Navigate } from "react-router-dom";
import {
  FriendsHeader,
  FriendsTabs,
  FriendsList,
  FriendRequests,
  FriendSuggestions,
  SentRequests,
} from "../components/Friends";
import SearchFriends from "../components/Friends/SearchFriends";

const Friends = () => {
  return (
    <>
      <FriendsHeader />
      <FriendsTabs />
      <Routes>
        <Route index element={<FriendsList />} />
        <Route path="requests" element={<FriendRequests />} />
        <Route path="suggestions" element={<FriendSuggestions />} />
        <Route path="sent" element={<SentRequests />} />
        <Route path="search" element={<SearchFriends />} />
        {/* Redirect unknown sub-routes to main list */}
        <Route path="*" element={<Navigate to="." replace />} />
      </Routes>
    </>
  );
};

export default Friends;
