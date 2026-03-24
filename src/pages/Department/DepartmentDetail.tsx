import { Routes, Route, Navigate } from "react-router-dom";
import departmentHooks from "../../hooks/useDepartment";
import DepartmentHeader from "../../components/Department/DepartmentHeader";
import DepartmentFeed from "../../components/Department/tabs/DepartmentFeed";
import DepartmentAbout from "../../components/Department/tabs/DepartmentAbout";
import DepartmentFacultyTab from "../../components/Department/tabs/DepartmentFacultyTab";
import DepartmentNavBar from "../../components/Department/DepartmentNavBar";
import CreateDepartmentPost from "../../components/Department/CreateDepartmentPost";

const DepartmentDetail = () => {
  const {
    data: headerResponse,
    isLoading: isLoadingHeader,
    error: headerError,
  } = departmentHooks.useDepartmentHeader();

  if (isLoadingHeader) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 border p-25">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
        <p className="text-3xl">Loading Department Header...</p>
      </div>
    );
  }

  if (headerError || !headerResponse) {
    return (
      <div className="flex flex-col items-center justify-center border py-15 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Department Not Found
        </h2>
        <p className="mt-2 text-gray-600">
          The department you are looking for does not exist.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-5 rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { department, meta } = headerResponse.data;

  return (
    // this return section will be removed in future
    <div className="flex items-center justify-center">
      <h1 className="text-2xl font-bold">Will Come Soon...</h1>
    </div>
  );

  return (
    <div className="space-y-3">
      <div>
        <DepartmentHeader department={department} meta={meta} />
        <DepartmentNavBar />
      </div>

      <div className="space-y-3">
        <Routes>
          <Route
            index
            element={
              <>
                {meta.canPost && (
                  <CreateDepartmentPost DepartmentId={department._id} />
                )}
                <DepartmentFeed />
              </>
            }
          />
          <Route path="faculty" element={<DepartmentFacultyTab />} />
          <Route path="details" element={<DepartmentAbout />} />
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default DepartmentDetail;
