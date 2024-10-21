import React, { useEffect, useState } from 'react';
import { getUserDetailsList } from '../../services/dataService';

const UserDetailsTable = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data, error } = await getUserDetailsList();
      if (error) {
        setError(error);
      } else {
        setUserData(data);
      }
    };

    fetchUserDetails();
  }, []);

  if (error) {
    return <p className="text-red-500 dark:text-red-400">Error: {error}</p>;
  }

  return (
    <div className="mt-6">
      <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
        <thead>
          <tr>
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              User ID
            </th>
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              Username
            </th>
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              About Me
            </th>
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              Birthday
            </th>
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              Street Address
            </th>
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              City
            </th>
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              State
            </th>
            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              Zip Code
            </th>
          </tr>
        </thead>
        <tbody>
          {userData.length === 0 ? (
            <tr>
              <td
                colSpan="8"
                className="text-center py-4 text-gray-900 dark:text-gray-100"
              >
                No user details found.
              </td>
            </tr>
          ) : (
            userData.map((user) => (
              <tr key={user.user_id}>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                  {user.user_id}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                  {user.username}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                  {user.about_me}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                  {user.birthday}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                  {user.street_address}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                  {user.city}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                  {user.state}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                  {user.zip_code}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetailsTable;
