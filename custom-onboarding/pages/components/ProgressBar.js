const ProgressBar = ({ currentProgress, totalSteps }) => {
  const progress = (currentProgress / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-8">
      <div
        className="bg-green-500 dark:bg-green-600 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
      <p className="text-center mt-2 text-sm text-gray-700 dark:text-gray-300">
        {currentProgress} of {totalSteps} tasks completed
      </p>
    </div>
  );
};

export default ProgressBar;
