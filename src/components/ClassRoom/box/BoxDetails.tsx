import { FaBox, FaDownload, FaFile, FaArrowLeft, FaCopy } from "react-icons/fa";
import boxHooks from "../../../hooks/useBox";

import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "../../../utils/sweetAlert";
import CopyLinkButton from "../../Shared/Action Buttons/CopyLinkButton";

const BoxDetails = () => {
  const { data: boxData, isPending, error } = boxHooks.useGetBoxDetails();
  const { mutate: toggleStatus, isPending: isToggling } =
    boxHooks.useToggleBoxStatus();
  const { mutate: deleteBox, isPending: isDeleting } = boxHooks.useDeleteBox();
  const navigate = useNavigate();
  const { boxId } = useParams();

  const handleToggle = () => {
    if (boxId) {
      toggleStatus(boxId);
    }
  };

  const handleDelete = async () => {
    if (!boxId) return;

    const isConfirmed = await confirm({
      title: "Delete Box?",
      text: "This box and all its submissions will be permanently deleted. This action cannot be undone.",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      icon: "warning",
      isDanger: true,
    });

    if (isConfirmed) {
      deleteBox(boxId);
    }
  };

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h1 className="text-3xl font-medium text-gray-500">
          Loading details...
        </h1>
      </div>
    );
  }

  if (error || !boxData) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-red-50 p-4">
          <FaBox className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-red-900">Error</h3>
        <p className="mt-2 text-sm font-medium text-red-500">
          {error?.message || "Failed to fetch box details"}
        </p>
      </div>
    );
  }

  const { box, submissions } = boxData.data;

  return (
    <div className="space-y-5">
      {/* Back Button */}
      <div className="flex justify-start">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
        >
          <FaArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to Boxes</span>
        </button>
      </div>

      {/* Header Section */}
      <div
        className={`${box.isActive ? "bg-green-100" : "bg-white"} flex flex-col rounded-xl border border-gray-400 p-5 shadow-sm`}
      >
        <div className="mb-2 flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-gray-900">{box.title}</h1>
          <CopyLinkButton
            displayText={box.code}
            copyValue={box.code}
            icon={<FaCopy className="h-4 w-4 flex-shrink-0 text-gray-400" />}
            className="flex cursor-pointer items-center justify-center gap-2 rounded border bg-amber-50 px-2 py-1 text-xl font-medium tracking-widest transition-colors hover:bg-amber-100"
          />
        </div>

        {/* Date Created and buttons */}
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-medium text-gray-500">
            {" "}
            {new Date(box.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handleToggle}
              disabled={isToggling || isDeleting}
              className="text-black-600 flex flex-shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-black bg-yellow-50 px-4 py-2 text-sm font-medium transition-colors hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isToggling
                ? "Updating..."
                : box.isActive
                  ? "Deactivate"
                  : "Activate"}
            </button>
            <button
              onClick={handleDelete}
              disabled={isToggling || isDeleting}
              className="flex flex-shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-black bg-red-50 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>

      {/* Submissions Section */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-5 border-b border-gray-200 bg-gray-50 p-3">
          <p className="mt-1 text-sm font-medium text-gray-500">
            Total {submissions.length}{" "}
            {submissions.length <= 1 ? "file" : "files"} submitted
          </p>
          <button className="ml-4 flex flex-shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50">
            <FaDownload className="h-4 w-4" />
            <span className="hidden sm:inline">Download All</span>
          </button>
        </div>

        {submissions.length === 0 ? (
          <div className="p-10 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
              <FaFile className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              No submissions yet
            </h3>
            <p className="mt-1 text-sm font-medium text-gray-500">
              Files submitted by students will appear here
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {submissions.map((submission, index) => (
              <div
                key={submission._id}
                className="group flex items-center justify-between p-3 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 text-lg font-medium text-gray-900">
                    {index + 1}
                  </span>

                  <div className="flex flex-shrink-0 items-center gap-5">
                    <p
                      className="truncate font-medium text-gray-900"
                      title={submission.fieldValue}
                    >
                      {submission.fieldValue}
                    </p>

                    <p className="truncate font-medium text-gray-500">
                      {new Date(submission.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                      {" - "}
                      {new Date(submission.createdAt).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                </div>

                <a
                  href={submission.fileUrl}
                  download={submission.fileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 flex flex-shrink-0 items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
                >
                  <FaDownload className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BoxDetails;
