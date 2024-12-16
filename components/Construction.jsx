const Construction = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh] w-screen md:w-full">
      <div className="flex items-center justify-center">
        <p className="md:text-[35px] text-center text-[25px] tracking-wide font-bold text-gray-700 gap-4">
          Page under <span className="text-red-500">construction</span>
        </p>
      </div>
      <p className="mt-2 md:text-[25px] text-[18px] tracking-wider font-semibold text-gray-500">
        Please wait for the version 2.0
      </p>
    </div>
  );
};

export default Construction;
