import React, { useEffect, useState } from 'react';
import Birthdate from './BirthDate';
import Address from './Address';
import AboutMe from './AboutMe';
import { fetchPageComponents } from '../../services/pageComponentService';
import { saveUserDetail } from '../../services/userDetailService';

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
  onSubmit,
}) => {
  const [components, setComponents] = useState([]);
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
    const getPageComponents = async () => {
      try {
        const { data, error } = await fetchPageComponents();
        if (error) {
          throw new Error(error);
        }
        const pageComponents = [];
        if (data?.birthdate_page === pageNumber)
          pageComponents.push('birthday');
        if (data?.address_page === pageNumber) pageComponents.push('address');
        if (data?.about_me_page === pageNumber) pageComponents.push('about_me');
        setComponents(pageComponents);
      } catch (error) {
        console.error('Error fetching page components:', error);
      }
    };
    getPageComponents();
  }, [pageNumber]);

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

  const updateUserDetail = async (column, value) => {
    try {
      const { error } = await saveUserDetail(
        userDetails.user_id,
        column,
        value
      );

      if (error) {
        console.error('Failed to update user detail:', error);
      }
    } catch (error) {
      console.error('Error updating user detail:', error);
    }
  };

  const handleUserDetailChange = (field, value, type = 'basic') => {
    setUserDetailsState((prev) => ({
      ...prev,
      [type === 'address' ? 'address' : field]:
        type === 'address' ? { ...prev.address, [field]: value } : value,
    }));
    updateUserDetail(field, value);
  };

  const handleNext = () => {
    if (validateFields()) {
      onNextPage();
    }
  };

  const handleSubmitForm = () => {
    if (validateFields()) {
      onSubmit();
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
        {pageNumber === 3 ? (
          <>
            <button
              onClick={onPreviousPage}
              className="bg-gray-500 text-white dark:bg-gray-700 dark:text-white px-4 py-2 rounded mr-4"
            >
              Previous
            </button>
            <button
              onClick={handleSubmitForm}
              className="bg-green-500 text-white dark:bg-green-700 dark:text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </>
        ) : (
          <>
            {pageNumber === 2 && (
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white dark:bg-blue-700 dark:text-white px-4 py-2 rounded"
              >
                Next
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PageComponentLoader;
