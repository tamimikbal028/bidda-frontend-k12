const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Open Study</h2>
      <p className="text-gray-600">Pore home niye kaj kora hobe, ekhn na</p>
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-blue-600 mb-2">Competition</h3>
          <p className="text-sm text-gray-500">Test your knowledge and compete with others.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-green-600 mb-2">Open Discussion</h3>
          <p className="text-sm text-gray-500">Join real-time study discussions.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
