const AuthLoading = () => {
  const text = "Checking Authentication...";

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100 text-center font-mono">
      <div className="flex gap-[0.1em]">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="inline-block text-5xl font-bold tracking-widest text-gray-600"
            style={{
              animation: "colorFade 1.5s infinite",
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes colorFade {
          0%, 100% {
            color: #d1d5db; /* gray-600 */
          }
          50% {
            color: #2563eb; /* blue-600 */
          }
        }
      `}</style>
    </div>
  );
};

export default AuthLoading;
