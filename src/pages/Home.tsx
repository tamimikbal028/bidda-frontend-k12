const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Welcome to K12 Dashboard
        </h1>
        <p className="mx-auto max-w-lg text-lg text-gray-600">
          Your personal space for academic excellence, gaming competitions, and smarter learning.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6 shadow-sm transition hover:shadow-md">
          <h3 className="mb-2 text-lg font-bold text-blue-900">Gaming & Competition</h3>
          <p className="text-sm text-blue-700">Participate in school-wide gaming tournaments and win exciting rewards.</p>
        </div>
        <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-6 shadow-sm transition hover:shadow-md">
          <h3 className="mb-2 text-lg font-bold text-purple-900">Study Helper AI</h3>
          <p className="text-sm text-purple-700">Get instant help with your complex homework and study topics using our AI assistant.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
