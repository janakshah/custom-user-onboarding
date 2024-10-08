const ProgressBar = ({ currentPage, totalSteps }) => {
  const progress = (currentPage / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
      <div
        className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
      <p className="text-center mt-2 text-sm text-gray-700">
        {currentPage} of {totalSteps} tasks completed
      </p>
    </div>
  );
};

export default ProgressBar;
