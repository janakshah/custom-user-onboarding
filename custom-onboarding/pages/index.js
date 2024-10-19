import { useEffect, useState } from 'react';
import Login from './components/Login';
import PageComponentLoader from './components/PageComponentLoader';
import ProgressBar from './components/ProgressBar';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [totalSteps] = useState(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/check-login');
        const { loggedIn, userId } = await res.json();

        if (loggedIn) {
          const pageRes = await fetch(`/api/page-progress?user_id=${userId}`);
          const { data: pageData } = await pageRes.json();

          const userDetailRes = await fetch(
            `/api/user-details?user_id=${userId}`
          );
          const { data: userData } = await userDetailRes.json();

          if (pageData && userData) {
            setCurrentPage(pageData);
            setUserDetails(userData);
            setIsLoggedIn(true);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="spinner border-4 border-t-4 border-blue-500 h-12 w-12 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <ProgressBar currentPage={currentPage} totalSteps={totalSteps} />
      <PageComponentLoader
        pageNumber={currentPage}
        userDetails={userDetails}
        onNextPage={() => setCurrentPage((prev) => prev + 1)}
        onPreviousPage={() => setCurrentPage((prev) => prev - 1)}
      />
    </div>
  );
}
