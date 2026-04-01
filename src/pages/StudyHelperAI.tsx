const StudyHelperAI = () => {
  return (
    <div className="flex min-h-[calc(100vh-96px)] items-center justify-center rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mx-auto w-full max-w-3xl rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-8 text-center shadow-lg">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-600 text-2xl font-bold text-white shadow-md">
          AI
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Study Helper</h1>
        <p className="mt-3 text-base leading-7 text-gray-600">
          This is a dummy Study Helper page for the K12 app.
        </p>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          Chat assistant, subject tools, and smart suggestions will be added
          here later.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white bg-white/80 p-4 text-left shadow-sm">
            <h2 className="font-semibold text-gray-900">Ask Questions</h2>
            <p className="mt-2 text-sm text-gray-500">
              Students will be able to ask study questions here.
            </p>
          </div>
          <div className="rounded-2xl border border-white bg-white/80 p-4 text-left shadow-sm">
            <h2 className="font-semibold text-gray-900">Practice Help</h2>
            <p className="mt-2 text-sm text-gray-500">
              Homework and revision support section will live here.
            </p>
          </div>
          <div className="rounded-2xl border border-white bg-white/80 p-4 text-left shadow-sm">
            <h2 className="font-semibold text-gray-900">Subject Tips</h2>
            <p className="mt-2 text-sm text-gray-500">
              Quick learning tips and resources will be shown here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyHelperAI;
