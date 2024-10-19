import React from 'react';
import UserDetailsTable from './components/UserDetailsTable';

const DataPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Details</h1>
        <UserDetailsTable />
      </div>
    </div>
  );
};

export default DataPage;
