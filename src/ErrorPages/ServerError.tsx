const ServerError = () => {
  return (
    <div className=" flex items-center justify-center flex-col text-center">
      <h1 className="text-5xl font-bold text-red-600">500</h1>
      <p className="text-lg text-gray-600 mt-2">Internal Server Error</p>
      <a href="/" className="text-blue-500 underline mt-4">
        Try Again
      </a>
    </div>
  );
};

export default ServerError;
