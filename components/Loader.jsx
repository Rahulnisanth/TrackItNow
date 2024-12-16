import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh] w-screen md:w-full">
      <div className="flex items-center justify-center gap-3">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="md:text-[35px] text-center text-[25px] tracking-wide font-bold text-gray-700 gap-4">
          Loading<span className="text-red-500"> . . .</span>
        </p>
      </div>
      <p className="hidden md:block mt-2 md:text-[25px] text-[14px] tracking-wider font-semibold text-gray-500">
        Please wait a moment
      </p>
    </div>
  );
};

export default Loader;
