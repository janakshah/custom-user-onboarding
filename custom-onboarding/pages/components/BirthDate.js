const BirthDate = ({ value, onChange }) => {
  return (
    <div className="p-6 bg-white border-2 border-indigo-200 rounded-md shadow-sm max-w-md mx-auto mb-6">
      <label
        htmlFor="birthdate"
        className="block text-sm font-medium text-indigo-700"
      >
        Birth Date
      </label>
      <input
        type="date"
        id="birthdate"
        name="birthdate"
        className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50 p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default BirthDate;
