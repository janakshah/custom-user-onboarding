import React, { useEffect, useState } from 'react';
import Birthdate from './BirthDate';
import Address from './Address';
import AboutMe from './AboutMe';

const componentMapping = {
  address: Address,
  birthday: Birthdate,
  about_me: AboutMe,
};

const PageComponentLoader = ({
  pageNumber,
  userDetails = {},
  onNextPage,
  onPreviousPage,
}) => {
  const [components, setComponents] = useState([]);
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [errorMessage, setErrorMessage] = useState('');
  const [userDetailsState, setUserDetailsState] = useState({
    address: {
      street_address: userDetails.street_address || '',
      city: userDetails.city || '',
      state: userDetails.state || '',
      zip_code: userDetails.zip_code || '',
    },
    birthday: userDetails.birthday || '',
    about_me: userDetails.about_me || '',
  });

  useEffect(() => {
    async function fetchPageComponents() {
      try {
        const response = await fetch('/api/settings');
        const { data } = await response.json();
        const pageComponents = [];

        if (data?.birthdate_page === currentPage)
          pageComponents.push('birthday');
        if (data?.address_page === currentPage) pageComponents.push('address');
        if (data?.about_me_page === currentPage)
          pageComponents.push('about_me');

        setComponents(pageComponents);
      } catch (error) {
        console.error('Error fetching page components:', error);
      }
    }

    fetchPageComponents();
  }, [currentPage]);

  const validateFields = () => {
    for (const component of components) {
      if (component === 'address') {
        const { street_address, city, state, zip_code } =
          userDetailsState.address;
        if (!street_address || !city || !state || !zip_code) {
          setErrorMessage('Please fill out all address fields.');
          return false;
        }
      }
      if (component === 'birthday' && !userDetailsState.birthday) {
        setErrorMessage('Please enter your birthdate.');
        return false;
      }
      if (component === 'about_me' && !userDetailsState.about_me) {
        setErrorMessage('Please tell us about yourself.');
        return false;
      }
    }
    setErrorMessage('');
    return true;
  };

  const handleUserDetailChange = (field, value, type = 'basic') => {
    setUserDetailsState((prev) => ({
      ...prev,
      [type === 'address' ? 'address' : field]:
        type === 'address' ? { ...prev.address, [field]: value } : value,
    }));
    updateUserDetail(field, value);
  };

  const updateUserDetail = async (column, value) => {
    try {
      const res = await fetch('/api/user-details', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userDetails.user_id,
          column,
          value,
        }),
      });

      if (!res.ok) {
        console.error('Failed to update user detail');
      }
    } catch (error) {
      console.error('Error updating user detail:', error);
    }
  };

  const updatePageProgress = async (newPage) => {
    try {
      const res = await fetch('/api/page-progress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userDetails.user_id,
          current_page: newPage,
        }),
      });

      if (!res.ok) {
        console.error('Failed to update page progress');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating page progress:', error);
      return false;
    }
  };

  const handleNextPage = async () => {
    if (!validateFields()) return;

    const nextPage = currentPage + 1;
    const success = await updatePageProgress(nextPage);

    if (success) {
      setCurrentPage(nextPage);
      onNextPage();
    }
  };

  const handlePreviousPage = async () => {
    const previousPage = currentPage - 1;
    const success = await updatePageProgress(previousPage);

    if (success) {
      setCurrentPage(previousPage);
      onPreviousPage();
    }
  };

  return (
    <div className="space-y-8 px-4">
      <div className="mt-12 mb-8"></div>
      <div className="mb-8">
        {components.map((componentName) => {
          const Component = componentMapping[componentName];
          if (!Component) return null;

          const componentProps =
            componentName === 'address'
              ? {
                  address: userDetailsState.address,
                  onChange: (field, value) =>
                    handleUserDetailChange(field, value, 'address'),
                }
              : componentName === 'birthday'
                ? {
                    value: userDetailsState.birthday,
                    onChange: (value) =>
                      handleUserDetailChange('birthday', value),
                  }
                : componentName === 'about_me'
                  ? {
                      value: userDetailsState.about_me,
                      onChange: (value) =>
                        handleUserDetailChange('about_me', value),
                    }
                  : null;

          return (
            <div
              key={componentName}
              className="mb-8 mx-auto max-w-md bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-6"
            >
              <Component {...componentProps} />
            </div>
          );
        })}
      </div>
      {errorMessage && (
        <p className="text-red-500 dark:text-red-400 text-center">
          {errorMessage}
        </p>
      )}
      <div className="flex justify-center mt-8 items-center px-4">
        {currentPage === 3 && (
          <button
            onClick={handlePreviousPage}
            className="bg-gray-500 text-white dark:bg-gray-700 dark:text-white px-4 py-2 rounded"
          >
            Previous
          </button>
        )}
        {currentPage === 2 && (
          <button
            onClick={handleNextPage}
            className="bg-blue-500 text-white dark:bg-blue-700 dark:text-white px-4 py-2 rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PageComponentLoader;
