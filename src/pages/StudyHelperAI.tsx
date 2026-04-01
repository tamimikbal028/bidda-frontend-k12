const StudyHelperAI = () => {
  return (
    <>
      <h1 className="text-center text-2xl font-bold text-gray-900">
        Study Helper AI
      </h1>

      <div className="grid gap-4 md:grid-cols-3">
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
    </>
  );
};

export default StudyHelperAI;
