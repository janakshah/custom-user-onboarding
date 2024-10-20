const Address = ({ address = {}, onChange }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 border-2 border-indigo-200 dark:border-indigo-600 rounded-md shadow-sm max-w-md mx-auto mb-6">
      <label
        className="block text-sm font-medium text-indigo-700 dark:text-indigo-300"
        htmlFor="street_address"
      >
        Address
      </label>
      <input
        type="text"
        name="street_address"
        id="street_address"
        placeholder="Street Address"
        className="mt-1 block w-full rounded-md border-2 border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        value={address.street_address || ''}
        onChange={(e) => onChange('street_address', e.target.value)}
      />
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="City"
            className="block w-full rounded-md border-2 border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            value={address.city || ''}
            onChange={(e) => onChange('city', e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            name="state"
            id="state"
            placeholder="State"
            className="block w-full rounded-md border-2 border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            value={address.state || ''}
            onChange={(e) => onChange('state', e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            name="zip_code"
            id="zip_code"
            placeholder="Zip Code"
            className="block w-full rounded-md border-2 border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            value={address.zip_code || ''}
            onChange={(e) => onChange('zip_code', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Address;
