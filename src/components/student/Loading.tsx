const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="relative w-20 h-20">
        {/* Spinner */}
        <div className="absolute inset-0 border-4 border-gray-300 border-t-4 border-t-blue-400 rounded-full animate-spin" />

        {/* Logo scaling */}
        <img
          src="/favicon.svg"
          alt="company-logo"
          className="absolute inset-0 m-auto w-10 h-10 animate-pulse"
        />
      </div>
    </div>
  );
};

export default Loading;
