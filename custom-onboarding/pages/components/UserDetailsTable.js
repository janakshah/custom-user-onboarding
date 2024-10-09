import React, { useEffect, useState } from 'react';

const UserDetailsTable = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const { data } = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserDetails();
  }, []);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="mt-6">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">User ID</th>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">About Me</th>
            <th className="border border-gray-300 px-4 py-2">Birthday</th>
            <th className="border border-gray-300 px-4 py-2">Street Address</th>
            <th className="border border-gray-300 px-4 py-2">City</th>
            <th className="border border-gray-300 px-4 py-2">State</th>
            <th className="border border-gray-300 px-4 py-2">Zip Code</th>
          </tr>
        </thead>
        <tbody>
          {userData.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-4">
                No user details found.
              </td>
            </tr>
          ) : (
            userData.map((user) => (
              <tr key={user.user_id}>
                <td className="border border-gray-300 px-4 py-2">
                  {user.user_id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.username}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.about_me}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.birthday}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.street_address}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.city}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.state}
                </td>
                <td className="border border-gray-300 px-4 py-2">
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
