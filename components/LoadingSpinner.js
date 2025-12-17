function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-red-200 border-t-red-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 text-center">Loading...</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
