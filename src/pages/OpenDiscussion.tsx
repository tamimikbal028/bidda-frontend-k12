import {
  FaUsers,
  FaComments,
  FaSearch,
  FaChalkboardTeacher,
  FaLightbulb,
} from "react-icons/fa";

const OpenDiscussion = () => {
  return (
    <div className="flex min-h-[90vh] flex-col overflow-hidden rounded-3xl bg-white shadow-xl">
      {/* Premium Gradient Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 px-8 py-12 text-white">
        <div className="relative z-10 max-w-2xl">
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight">
            Open Discussion
          </h1>
          <p className="text-xl font-medium text-blue-100 opacity-90">
            The nexus for knowledge sharing and collaborative learning at BUET.
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 h-64 w-64 translate-x-12 -translate-y-12 rounded-full bg-white opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-12 translate-y-24 rounded-full bg-blue-400 opacity-20 blur-2xl"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-12 p-8">
        {/* Search Mockup */}
        <div className="relative mx-auto -mt-16 max-w-2xl">
          <div className="group relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-5 text-gray-400">
              <FaSearch className="h-5 w-5 transition-colors group-focus-within:text-blue-500" />
            </div>
            <input
              type="text"
              placeholder="Search for discussions, questions, or topics..."
              className="h-16 w-full rounded-2xl border-none bg-white px-12 text-lg shadow-2xl ring-1 ring-gray-100 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Features Preview Section */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Live Chat Rooms",
              desc: "Join real-time discussion rooms categorized by departments and topics.",
              icon: FaComments,
              color: "bg-blue-500",
            },
            {
              title: "Peer Collaboration",
              desc: "Find and connect with fellow students working on similar projects.",
              icon: FaUsers,
              color: "bg-indigo-500",
            },
            {
              title: "Q&A Hub",
              desc: "Ask questions and get answers from seniors and experts in the community.",
              icon: FaLightbulb,
              color: "bg-amber-500",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group flex flex-col items-start rounded-2xl border border-gray-100 bg-gray-50/50 p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-white hover:shadow-lg"
            >
              <div
                className={`${feature.color} mb-5 rounded-xl p-3 text-white shadow-md`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Coming Soon Alert */}
        <div className="flex items-center gap-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <FaChalkboardTeacher className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-blue-900">
              Preparing for BUET Launch
            </h4>
            <p className="text-blue-700">
              We are fine-tuning the discussion engine to ensure a smooth
              experience for the campus community. Stay tuned!
            </p>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="border-t border-gray-100 bg-gray-50 px-8 py-4 text-center text-sm font-medium text-gray-400">
        SocialHub Open Discussion Engine v1.0 Preview
      </div>
    </div>
  );
};

export default OpenDiscussion;
