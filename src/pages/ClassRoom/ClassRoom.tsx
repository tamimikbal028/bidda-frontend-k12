import { Suspense, lazy } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "../../components/ClassRoom/Header";
import ClassRoomNavBar from "../../components/ClassRoom/ClassRoomNavBar";
import Rooms from "../../components/ClassRoom/Tabs/Rooms";
import HiddenRooms from "../../components/ClassRoom/Tabs/HiddenRooms";
import ArchivedRooms from "../../components/ClassRoom/Tabs/ArchivedRooms";
import Box from "../../components/ClassRoom/Tabs/Box";
import MoreTab from "../../components/ClassRoom/Tabs/MoreTab";
import PageLoader from "../Fallbacks/PageLoader";

// Lazy load pages
const RoomDetails = lazy(() => import("./RoomDetails"));
const RoomLive = lazy(() => import("./RoomLive"));
const CreateRoomPage = lazy(() => import("./CreateRoomPage"));
const JoinRoomPage = lazy(() => import("./JoinRoomPage"));
const EditRoomPage = lazy(() => import("./EditRoomPage"));
const BoxDetails = lazy(
  () => import("../../components/ClassRoom/box/BoxDetails")
);

const ClassRoomLayout = () => {
  return (
    <>
      <Header />
      <ClassRoomNavBar />
      <Outlet />
    </>
  );
};

const ClassRoom = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<ClassRoomLayout />}>
          <Route index element={<Rooms />} />
          <Route path="hidden" element={<HiddenRooms />} />
          <Route path="archived" element={<ArchivedRooms />} />
          <Route path="box" element={<Box />} />
          <Route path="more" element={<MoreTab />} />
          <Route path="box/:boxId" element={<BoxDetails />} />
        </Route>

        {/* Standalone Routes (No Header/Tabs) */}
        <Route path="createroom" element={<CreateRoomPage />} />
        <Route path="joinroom" element={<JoinRoomPage />} />
        <Route path="rooms/:roomId/edit" element={<EditRoomPage />} />
        <Route path="rooms/:roomId/*" element={<RoomDetails />} />
        <Route path="rooms/:roomId/live" element={<RoomLive />} />
      </Routes>
    </Suspense>
  );
};

export default ClassRoom;
