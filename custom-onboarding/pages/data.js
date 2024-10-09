import React from 'react';
import UserDetailsTable from './components/UserDetailsTable';

const DataPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <UserDetailsTable />
    </div>
  );
};

export default DataPage;
