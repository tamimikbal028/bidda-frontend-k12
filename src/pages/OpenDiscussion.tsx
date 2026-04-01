const OpenDiscussion = () => {
  return (
    <div className="flex min-h-[calc(100vh-96px)] items-center justify-center rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mx-auto w-full max-w-3xl rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-8 text-center shadow-lg">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-bold text-white shadow-md">
          OD
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Open Discussion</h1>
        <p className="mt-3 text-base leading-7 text-gray-600">
          This is a dummy Open Discussion page for the K12 app.
        </p>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          Public discussion threads, question boards, and student conversations
          will be added here later.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
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
      </div>
    </div>
  );
};

export default OpenDiscussion;
