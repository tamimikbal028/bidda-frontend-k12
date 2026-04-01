const OpenDiscussion = () => {
  return (
    <>
      <h1 className="text-center text-2xl font-bold text-gray-900">
        Open Discussion
      </h1>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white bg-white/80 p-4 text-left shadow-sm">
          <h2 className="font-semibold text-gray-900">Topic Rooms</h2>
          <p className="mt-2 text-sm text-gray-500">
            Different discussion topics will appear here.
          </p>
        </div>
        <div className="rounded-2xl border border-white bg-white/80 p-4 text-left shadow-sm">
          <h2 className="font-semibold text-gray-900">Student Questions</h2>
          <p className="mt-2 text-sm text-gray-500">
            Learners will be able to post and answer questions.
          </p>
        </div>
        <div className="rounded-2xl border border-white bg-white/80 p-4 text-left shadow-sm">
          <h2 className="font-semibold text-gray-900">Announcements</h2>
          <p className="mt-2 text-sm text-gray-500">
            Community updates and highlighted discussions will show here.
          </p>
        </div>
      </div>
    </>
  );
};

export default OpenDiscussion;
